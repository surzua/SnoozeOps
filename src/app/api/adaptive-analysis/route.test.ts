import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { actionCatalog } from "@/adaptive-cycle/domain/catalog";
import type { AnalysisRequest } from "@/adaptive-cycle/domain/analysis";
import { POST } from "./route";

const context = { restId: "rest-test", experimentId: "experiment-test", experimentVersion: 1, shiftId: "shift-test", observationId: "observation-test", reviewRevision: 2 };
const body: AnalysisRequest = {
  context, shiftKind: "day", restWindow: "23:30–06:30", declaredBarrier: "Revisión voluntaria de tickets.", activeConstraint: "Conservar alertas obligatorias.",
  experiment: { actionId: actionCatalog[0].id, ...actionCatalog[0], hypothesis: actionCatalog[0].rationale },
  allowedActions: [...actionCatalog], observation: { completion: "yes", sleepEstimateMinutes: 360, event: "late_bedtime", reviewPath: "same_bedtime" }, memory: [], reviewResponses: [],
};
const analysis = { decision: "clarification", rationale: "Falta confirmar qué ocupó el tiempo disponible.", question: "¿Qué ocupó el tiempo disponible?", actionId: null, personSaid: ["Estima 360 minutos."], inferred: [], unknown: ["Qué retrasó el descanso."], context };
const request = () => new Request("http://localhost/api/adaptive-analysis", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
const generated = (value: unknown = analysis) => Response.json({ candidates: [{ content: { parts: [{ text: JSON.stringify(value) }] } }] });
const unavailable = () => Response.json({ error: { code: 503, status: "UNAVAILABLE", message: "The model is overloaded." } }, { status: 503 });

describe("ruta de revisión IA", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubEnv("GEMINI_API_KEY", "synthetic-test-key");
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.restoreAllMocks(); });

  async function finish(pending: Promise<Response>) { await vi.runAllTimersAsync(); return pending; }

  it("acepta el mismo contexto aunque Gemini reordene las propiedades JSON", async () => {
    const reordered = { reviewRevision: 2, observationId: "observation-test", shiftId: "shift-test", experimentVersion: 1, experimentId: "experiment-test", restId: "rest-test" };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(generated({ ...analysis, context: reordered })));
    expect((await POST(request())).status).toBe(200);
  });

  it("sigue rechazando una respuesta para otra observación", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(generated({ ...analysis, context: { ...context, observationId: "old-observation" } })));
    expect((await POST(request())).status).toBe(422);
  });

  it("exige al modelo todas las referencias que valida la aplicación", async () => {
    const fetch = vi.fn().mockResolvedValue(generated()); vi.stubGlobal("fetch", fetch);
    await POST(request());
    const sent = JSON.parse(fetch.mock.calls[0][1].body);
    expect(sent.generationConfig.response_schema.properties.context.required).toEqual(expect.arrayContaining(["observationId", "reviewRevision"]));
  });

  it("reintenta un timeout de transporte y puede recuperar la revisión", async () => {
    const fetch = vi.fn().mockRejectedValueOnce(new DOMException("Timeout", "TimeoutError")).mockResolvedValueOnce(generated());
    vi.stubGlobal("fetch", fetch);
    const response = await finish(POST(request()));
    expect(response.status).toBe(200); expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("mantiene el presupuesto total de doce segundos con dos intentos agotados", async () => {
    vi.spyOn(AbortSignal, "timeout").mockImplementation((milliseconds) => {
      const controller = new AbortController();
      setTimeout(() => controller.abort(new DOMException("Timeout", "TimeoutError")), milliseconds);
      return controller.signal;
    });
    const fetch = vi.fn().mockImplementation((_url: string, options: RequestInit) => new Promise((_resolve, reject) => {
      options.signal!.addEventListener("abort", () => reject(options.signal!.reason), { once: true });
    }));
    vi.stubGlobal("fetch", fetch);
    const started = Date.now(); const response = await finish(POST(request()));
    expect(response.status).toBe(503); expect(fetch).toHaveBeenCalledTimes(2);
    expect(Date.now() - started).toBe(12_000);
  });

  it("recupera un 503 transitorio y deja un diagnóstico sin datos ni claves", async () => {
    const fetch = vi.fn().mockResolvedValueOnce(unavailable()).mockResolvedValueOnce(generated()); vi.stubGlobal("fetch", fetch);
    const response = await finish(POST(request()));
    expect(response.status).toBe(200); expect(fetch).toHaveBeenCalledTimes(2);
    const logs = JSON.stringify(vi.mocked(console.warn).mock.calls);
    expect(logs).toContain("UNAVAILABLE"); expect(logs).not.toContain("synthetic-test-key"); expect(logs).not.toContain(body.declaredBarrier);
  });

  it("no reintenta un rechazo permanente de credenciales o permisos", async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ error: { code: 403, status: "PERMISSION_DENIED" } }, { status: 403 })); vi.stubGlobal("fetch", fetch);
    const response = await finish(POST(request()));
    expect(response.status).toBe(503); expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("limita a dos intentos y no fabrica análisis si el proveedor sigue caído", async () => {
    const fetch = vi.fn().mockImplementation(async () => unavailable()); vi.stubGlobal("fetch", fetch);
    const started = Date.now(); const response = await finish(POST(request()));
    expect(response.status).toBe(503); expect(fetch).toHaveBeenCalledTimes(2);
    expect(Date.now() - started).toBeLessThanOrEqual(12_000);
    expect(await response.json()).not.toHaveProperty("analysis");
    expect(response.headers.get("X-SnoozeOps-Request-Id")).toBeTruthy();
  });

  it("no reintenta antes del Retry-After si excede el presupuesto de demo", async () => {
    const fetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({ error: { code: 429, status: "RESOURCE_EXHAUSTED" } }), { status: 429, headers: { "Content-Type": "application/json", "Retry-After": "30" } })); vi.stubGlobal("fetch", fetch);
    const started = Date.now(); const response = await finish(POST(request()));
    expect(response.status).toBe(503); expect(fetch).toHaveBeenCalledTimes(1);
    expect(Date.now() - started).toBeLessThanOrEqual(12_000);
  });
});
