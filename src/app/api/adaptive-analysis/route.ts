import { isCoherentAnalysis, isCurrentAnalysisContext, parseAnalysisPayload, type AnalysisRequest } from "@/adaptive-cycle/domain/analysis";
import { actionCatalog } from "@/adaptive-cycle/domain/catalog";

export const runtime = "nodejs";

const responseSchema = {
  // La API REST de generateContent usa los valores Schema en mayúsculas.
  type: "OBJECT",
  required: ["decision", "rationale", "question", "actionId", "personSaid", "inferred", "unknown", "context"],
  properties: {
    decision: { type: "STRING", enum: ["maintain", "action", "clarification", "abstain"] },
    rationale: { type: "STRING" },
    question: { type: "STRING", nullable: true },
    actionId: { type: "STRING", enum: ["write-pending", "prepare-displaceable-task"], nullable: true },
    personSaid: { type: "ARRAY", items: { type: "STRING" } },
    inferred: { type: "ARRAY", items: { type: "STRING" } },
    unknown: { type: "ARRAY", items: { type: "STRING" } },
    context: {
      type: "OBJECT",
      required: ["restId", "experimentId", "experimentVersion", "shiftId", "observationId", "reviewRevision"],
      properties: {
        restId: { type: "STRING" }, experimentId: { type: "STRING" }, experimentVersion: { type: "NUMBER" }, shiftId: { type: "STRING" }, observationId: { type: "STRING" }, reviewRevision: { type: "NUMBER" },
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
    item.experiment && typeof item.experiment.actionId === "string" && typeof item.experiment.action === "string" && typeof item.experiment.moment === "string" &&
    typeof item.experiment.hypothesis === "string" && typeof item.experiment.observationPrompt === "string" &&
    Array.isArray(item.allowedActions) && item.allowedActions.length > 0 && item.observation &&
    Array.isArray(item.memory) && Array.isArray(item.reviewResponses),
  );
}

function instructions() {
  return `Eres un revisor de experimentos de descanso en una demo completamente sintética. Devuelve sólo JSON que siga el esquema.\n
Límites: no diagnostiques, no prescribas ni hables de medicación. No modifiques turnos, alertas, obligaciones, políticas laborales ni disponibilidad. No atribuyas sueño a una intervención con un solo registro. No inventes datos.\n
El campo completion sólo declara si realizó la acción; nunca significa que completó una ventana de descanso. sleepEstimateMinutes es una estimación declarada, no sueño medido. No digas que la persona completó la ventana, durmió una duración concreta o descansó, salvo que lo expreses exactamente como una estimación declarada incluida en el contexto.\n
La sección experiment contiene exactamente qué se probó, cuándo y su hipótesis. allowedActions contiene las únicas alternativas permitidas con sus descripciones completas. Si eliges action, el motivo debe conectar explícitamente la acción probada, el resultado declarado y la respuesta a la aclaración; no uses una justificación genérica. rationale debe tener entre 8 y 420 caracteres; question y cada elemento de personSaid, inferred y unknown, como máximo 280 caracteres.

declaredBarrier describe la traba al iniciar el experimento. reviewResponses contiene las declaraciones posteriores, en orden cronológico: pueden actualizar o resolver esa traba. Trata los hechos explícitos de esas respuestas como ya declarados para esta revisión; no pidas que los confirme otra vez salvo contradicción real. Si explica que dejó una revisión voluntaria y que una tarea no urgente desplazable ocupó ese tiempo, no necesitas volver a preguntar si sigue revisando tickets para valorar otra acción del catálogo. Distingue esa actualización de una obligación de guardia, que permanece vigente. Si reviewResponses ya contiene dos respuestas, no solicites una tercera aclaración: decide con los datos disponibles o abstente si son insuficientes.

Decide exactamente una alternativa: maintain (mantener explícitamente la acción vigente), action (sólo un actionId distinto del vigente), clarification (una pregunta breve si falta un dato decisivo) o abstain (si la información es ambigua, contradictoria o una obligación no deja margen).

Contrato obligatorio por decisión:
- maintain: question=null y actionId=null. Describe la continuidad en rationale; no devuelvas el identificador de la acción vigente.
- abstain: question=null y actionId=null.
- clarification: question es una pregunta breve no vacía y actionId=null.
- action: question=null y actionId es un identificador del catálogo distinto al vigente.

No repitas una pregunta ya respondida en reviewResponses. La memoria y las respuestas previas son contexto descriptivo, no prueba causal. Si existe una restricción previa potencialmente cambiante, pide confirmarla en vez de asumirla vigente. Separa con precisión lo declarado, lo inferido provisionalmente y lo desconocido.`;
}

function retryDelay(retryAfter: string | null, attempt: number) {
  const seconds = retryAfter === null ? NaN : Number(retryAfter);
  const requestedDelay = Number.isFinite(seconds) ? seconds * 1_000 : retryAfter ? Date.parse(retryAfter) - Date.now() : 0;
  return Math.max(1_000 * 2 ** (attempt - 1) + Math.floor(Math.random() * 250), Number.isFinite(requestedDelay) ? requestedDelay : 0);
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const started = Date.now();
  const reply = (body: unknown, status: number) => Response.json(body, { status, headers: { "X-SnoozeOps-Request-Id": requestId } });
  const invalidAnalysis = () => reply({ error: "invalid_analysis", message: "La revisión recibida no pasó la validación; tu plan y el registro siguen disponibles." }, 422);
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return reply({ error: "invalid_request" }, 400);
  }
  if (!isRequest(body)) return reply({ error: "invalid_request" }, 400);
  // El cliente puede describir el catálogo, pero no autorizar acciones nuevas.
  const safeBody: AnalysisRequest = { ...body, allowedActions: [...actionCatalog] };

  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL ?? "gemini-3.5-flash-lite";
  // Sólo metadatos operacionales: nunca claves, prompts ni respuestas de la persona.
  const log = (reason: string, details: Record<string, unknown> = {}) => console.warn("[adaptive-analysis]", { requestId, model, reason, elapsedMs: Date.now() - started, ...details });
  const unavailable = () => reply({ error: "provider_unavailable", message: "No hubo un nuevo análisis; el plan y el registro manual siguen disponibles." }, 503);
  if (!apiKey) {
    log("missing_provider_key");
    return reply({ error: "provider_unavailable", message: "No hay proveedor configurado para un nuevo análisis." }, 503);
  }

  const requestBody = JSON.stringify({
    contents: [{ role: "user", parts: [{ text: `${instructions()}\n\nContexto sintético confirmado:\n${JSON.stringify(safeBody)}` }] }],
    generationConfig: {
      response_mime_type: "application/json",
      response_schema: responseSchema,
    },
  });
  const deadline = started + 12_000;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const remaining = deadline - Date.now();
    if (remaining < 500) break;
    let waitMs = retryDelay(null, attempt);
    try {
      const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: requestBody,
        signal: AbortSignal.timeout(Math.min(remaining, 8_000)),
      });
      if (!upstream.ok) {
        const failure: unknown = await upstream.json().catch(() => null);
        const error = failure && typeof failure === "object" && "error" in failure ? failure.error : null;
        const fields = error && typeof error === "object" ? error as Record<string, unknown> : {};
        const providerStatus = typeof fields.status === "string" && /^[A-Z_]{1,64}$/.test(fields.status) ? fields.status : undefined;
        log("provider_http_error", { attempt, httpStatus: upstream.status, providerStatus, providerCode: typeof fields.code === "number" ? fields.code : undefined });
        const transient = upstream.status === 408 || upstream.status === 429 || upstream.status >= 500;
        if (!transient) return unavailable();
        waitMs = retryDelay(upstream.headers.get("Retry-After"), attempt);
      } else {
        let data: { candidates?: Array<{ content?: { parts?: Array<{ text?: unknown }> } }> };
        try {
          data = await upstream.json();
        } catch (error) {
          if (!(error instanceof SyntaxError)) throw error;
          log("invalid_provider_json", { attempt });
          return invalidAnalysis();
        }
        const outputText = data.candidates?.[0]?.content?.parts?.map((part) => part.text).filter((text): text is string => typeof text === "string").join("");
        if (!outputText) {
          log("empty_analysis", { attempt });
          return invalidAnalysis();
        }
        let generated: unknown;
        try {
          generated = JSON.parse(outputText);
        } catch {
          log("invalid_analysis_json", { attempt });
          return invalidAnalysis();
        }
        const parsed = parseAnalysisPayload(generated);
        if (!parsed || !isCoherentAnalysis(parsed, safeBody) || !isCurrentAnalysisContext(parsed, safeBody.context)) {
          log(!parsed ? "invalid_analysis_schema" : !isCoherentAnalysis(parsed, safeBody) ? "incoherent_analysis" : "stale_analysis_context", { attempt });
          return invalidAnalysis();
        }
        return reply({ analysis: parsed, generatedAt: new Date().toISOString() }, 200);
      }
    } catch (error) {
      const timeout = error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
      log(timeout ? "provider_timeout" : "provider_connection_error", { attempt });
    }
    if (attempt === 2 || deadline - Date.now() < waitMs + 500) break;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }
  return unavailable();
}
