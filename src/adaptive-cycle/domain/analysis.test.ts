import { describe, expect, it } from "vitest";
import { isCoherentAnalysis, parseAnalysisPayload, type AnalysisRequest } from "@/adaptive-cycle/domain/analysis";
import { actionCatalog } from "@/adaptive-cycle/domain/catalog";

const base = {
  decision: "clarification",
  rationale: "El resultado no permite identificar por qué se mantuvo la misma duración.",
  question: "¿Qué ocupó el tiempo liberado antes de intentar dormir?",
  actionId: null,
  personSaid: ["Cerró antes y mantuvo la misma hora de intento."],
  inferred: ["El tiempo libre aún no se convirtió necesariamente en oportunidad de descanso."],
  unknown: ["Qué ocupó ese tiempo."],
  context: { restId: "rest-1", experimentId: "experiment-1", experimentVersion: 1, shiftId: "shift-1" },
};

const request: AnalysisRequest = {
  context: base.context,
  shiftKind: "day",
  restWindow: "23:30–06:30",
  declaredBarrier: "Volvió a revisar tickets.",
  activeConstraint: "Guardia vigente.",
  experiment: {
    action: actionCatalog[0].action,
    moment: actionCatalog[0].moment,
    hypothesis: actionCatalog[0].rationale,
    observationPrompt: actionCatalog[0].observationPrompt,
  },
  allowedActions: [...actionCatalog],
  observation: { completion: "yes", sleepEstimateMinutes: null, event: "late_bedtime" },
  memory: [],
  reviewResponses: [],
};

describe("contrato de análisis adaptativo", () => {
  it("acepta una aclaración estructurada y limitada", () => {
    expect(parseAnalysisPayload(base)).toMatchObject({ decision: "clarification", question: base.question });
  });

  it("rechaza una acción libre fuera del catálogo", () => {
    expect(parseAnalysisPayload({ ...base, decision: "action", question: null, actionId: "take-medication" })).toBeNull();
  });

  it("rechaza una decisión contradictoria", () => {
    expect(parseAnalysisPayload({ ...base, decision: "action", actionId: "write-pending" })).toBeNull();
  });

  it("rechaza una afirmación no respaldada de que se completó el descanso", () => {
    const payload = parseAnalysisPayload({ ...base, rationale: "Se completó la ventana de descanso y ahora falta contexto." });
    expect(payload).not.toBeNull();
    expect(isCoherentAnalysis(payload!, request)).toBe(false);
  });
});
