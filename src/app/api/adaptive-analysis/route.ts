import { isCoherentAnalysis, parseAnalysisPayload, type AnalysisRequest } from "@/adaptive-cycle/domain/analysis";

export const runtime = "nodejs";

const responseSchema = {
  // La API REST de generateContent usa los valores Schema en mayúsculas.
  type: "OBJECT",
  required: ["decision", "rationale", "question", "actionId", "personSaid", "inferred", "unknown", "context"],
  properties: {
    decision: { type: "STRING", enum: ["action", "clarification", "abstain"] },
    rationale: { type: "STRING" },
    question: { type: "STRING", nullable: true },
    actionId: { type: "STRING", enum: ["write-pending", "prepare-displaceable-task"], nullable: true },
    personSaid: { type: "ARRAY", items: { type: "STRING" } },
    inferred: { type: "ARRAY", items: { type: "STRING" } },
    unknown: { type: "ARRAY", items: { type: "STRING" } },
    context: {
      type: "OBJECT",
      required: ["restId", "experimentId", "experimentVersion", "shiftId"],
      properties: {
        restId: { type: "STRING" }, experimentId: { type: "STRING" }, experimentVersion: { type: "NUMBER" }, shiftId: { type: "STRING" },
      },
    },
  },
} as const;

function isRequest(value: unknown): value is AnalysisRequest {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<AnalysisRequest>;
  return Boolean(
    item.context && typeof item.shiftKind === "string" && typeof item.restWindow === "string" &&
    typeof item.declaredBarrier === "string" && typeof item.activeConstraint === "string" &&
    item.experiment && typeof item.experiment.action === "string" && typeof item.experiment.moment === "string" &&
    typeof item.experiment.hypothesis === "string" && typeof item.experiment.observationPrompt === "string" &&
    Array.isArray(item.allowedActions) && item.allowedActions.length > 0 && item.observation &&
    Array.isArray(item.memory) && Array.isArray(item.reviewResponses),
  );
}

function instructions() {
  return `Eres un revisor de experimentos de descanso en una demo completamente sintética. Devuelve sólo JSON que siga el esquema.\n
Límites: no diagnostiques, no prescribas ni hables de medicación. No modifiques turnos, alertas, obligaciones, políticas laborales ni disponibilidad. No atribuyas sueño a una intervención con un solo registro. No inventes datos.\n
El campo completion sólo declara si realizó la acción; nunca significa que completó una ventana de descanso. sleepEstimateMinutes es una estimación declarada, no sueño medido. No digas que la persona completó la ventana, durmió una duración concreta o descansó, salvo que lo expreses exactamente como una estimación declarada incluida en el contexto.\n
La sección experiment contiene exactamente qué se probó, cuándo y su hipótesis. allowedActions contiene las únicas alternativas permitidas con sus descripciones completas. Si eliges action, el motivo debe conectar explícitamente la acción probada, el resultado declarado y la respuesta a la aclaración; no uses una justificación genérica.

Decide exactamente una de estas alternativas: action (sólo actionId permitido), clarification (una pregunta breve si falta un dato decisivo) o abstain (si la información es ambigua, contradictoria o una obligación no deja margen). No repitas una pregunta ya respondida en reviewResponses. La memoria y las respuestas previas son contexto descriptivo, no prueba causal. Si existe una restricción previa potencialmente cambiante, pide confirmarla en vez de asumirla vigente. Separa con precisión lo declarado, lo inferido provisionalmente y lo desconocido.`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }
  if (!isRequest(body)) return Response.json({ error: "invalid_request" }, { status: 400 });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return Response.json({ error: "provider_unavailable", message: "No hay proveedor configurado para un nuevo análisis." }, { status: 503 });

  try {
    const model = process.env.GEMINI_MODEL ?? "gemini-3.5-flash-lite";
    const requestBody = JSON.stringify({
      contents: [{ role: "user", parts: [{ text: `${instructions()}\n\nContexto sintético confirmado:\n${JSON.stringify(body)}` }] }],
      generationConfig: {
        response_mime_type: "application/json",
        response_schema: responseSchema,
      },
    });
    let upstream: Response | null = null;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: requestBody,
        signal: AbortSignal.timeout(45_000),
      });
      const transient = upstream.status === 429 || upstream.status >= 500;
      if (!transient || attempt === 2) break;
      await new Promise((resolve) => setTimeout(resolve, 350 * (attempt + 1)));
    }
    if (!upstream) return Response.json({ error: "provider_unavailable", message: "No hubo un nuevo análisis; el registro manual sigue disponible." }, { status: 503 });
    if (!upstream.ok) {
      console.warn(`[adaptive-analysis] Gemini rechazó la solicitud con HTTP ${upstream.status}.`);
      return Response.json({ error: "provider_unavailable", message: `El proveedor rechazó la solicitud (HTTP ${upstream.status}).` }, { status: 503 });
    }
    const data = await upstream.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: unknown }> } }> };
    const outputText = data.candidates?.[0]?.content?.parts?.map((part) => part.text).filter((text): text is string => typeof text === "string").join("");
    if (!outputText) return Response.json({ error: "invalid_analysis" }, { status: 422 });
    let generated: unknown;
    try {
      generated = JSON.parse(outputText);
    } catch {
      return Response.json({ error: "invalid_analysis" }, { status: 422 });
    }
    const parsed = parseAnalysisPayload(generated);
    if (!parsed || !isCoherentAnalysis(parsed, body) || parsed.context.experimentId !== body.context.experimentId || parsed.context.experimentVersion !== body.context.experimentVersion || parsed.context.restId !== body.context.restId || parsed.context.shiftId !== body.context.shiftId) {
      return Response.json({ error: "invalid_analysis" }, { status: 422 });
    }
    return Response.json({ analysis: parsed, generatedAt: new Date().toISOString() });
  } catch (error) {
    console.error("[adaptive-analysis] Error de conexión con Gemini:", error instanceof Error ? error.message : "error desconocido");
    return Response.json({ error: "provider_unavailable", message: "No hubo un nuevo análisis; el registro manual sigue disponible." }, { status: 503 });
  }
}
