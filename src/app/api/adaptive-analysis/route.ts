import { parseAnalysisPayload, type AnalysisRequest } from "@/adaptive-cycle/domain/analysis";

export const runtime = "nodejs";

const responseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["decision", "rationale", "question", "actionId", "personSaid", "inferred", "unknown", "context"],
  properties: {
    decision: { type: "string", enum: ["action", "clarification", "abstain"] },
    rationale: { type: "string" },
    question: { type: ["string", "null"] },
    actionId: { type: ["string", "null"], enum: ["write-pending", "prepare-displaceable-task", null] },
    personSaid: { type: "array", items: { type: "string" } },
    inferred: { type: "array", items: { type: "string" } },
    unknown: { type: "array", items: { type: "string" } },
    context: {
      type: "object",
      additionalProperties: false,
      required: ["restId", "experimentId", "experimentVersion", "shiftId"],
      properties: {
        restId: { type: "string" }, experimentId: { type: "string" }, experimentVersion: { type: "number" }, shiftId: { type: "string" },
      },
    },
  },
} as const;

function isRequest(value: unknown): value is AnalysisRequest {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<AnalysisRequest>;
  return Boolean(item.context && typeof item.shiftKind === "string" && typeof item.restWindow === "string" && typeof item.declaredBarrier === "string" && typeof item.activeConstraint === "string" && item.observation && Array.isArray(item.memory));
}

function instructions() {
  return `Eres un revisor de experimentos de descanso en una demo completamente sintética. Devuelve sólo JSON que siga el esquema.\n
Límites: no diagnostiques, no prescribas ni hables de medicación. No modifiques turnos, alertas, obligaciones, políticas laborales ni disponibilidad. No atribuyas sueño a una intervención con un solo registro. No inventes datos.\n
Decide exactamente una de estas alternativas: action (sólo actionId permitido), clarification (una pregunta breve si falta un dato decisivo) o abstain (si la información es ambigua, contradictoria o una obligación no deja margen). La memoria es contexto descriptivo, no prueba causal. Si existe una restricción previa potencialmente cambiante, pide confirmarla en vez de asumirla vigente. Separa con precisión lo declarado, lo inferido provisionalmente y lo desconocido.`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }
  if (!isRequest(body)) return Response.json({ error: "invalid_request" }, { status: 400 });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return Response.json({ error: "provider_unavailable", message: "No hay proveedor configurado para un nuevo análisis." }, { status: 503 });

  try {
    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-5-mini",
        store: false,
        instructions: instructions(),
        input: JSON.stringify(body),
        text: { format: { type: "json_schema", name: "adaptive_rest_review", strict: true, schema: responseSchema } },
      }),
    });
    if (!upstream.ok) return Response.json({ error: "provider_unavailable", message: "El proveedor no pudo entregar un análisis seguro." }, { status: 503 });
    const data = await upstream.json() as { output_text?: unknown };
    if (typeof data.output_text !== "string") return Response.json({ error: "invalid_analysis" }, { status: 422 });
    const parsed = parseAnalysisPayload(JSON.parse(data.output_text));
    if (!parsed || parsed.context.experimentId !== body.context.experimentId || parsed.context.experimentVersion !== body.context.experimentVersion || parsed.context.restId !== body.context.restId || parsed.context.shiftId !== body.context.shiftId) {
      return Response.json({ error: "invalid_analysis" }, { status: 422 });
    }
    return Response.json({ analysis: parsed, generatedAt: new Date().toISOString() });
  } catch {
    return Response.json({ error: "provider_unavailable", message: "No hubo un nuevo análisis; el registro manual sigue disponible." }, { status: 503 });
  }
}
