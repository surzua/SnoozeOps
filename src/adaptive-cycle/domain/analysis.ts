import { actionCatalog, type CatalogAction } from "@/adaptive-cycle/domain/catalog";
import type { AdaptiveAnalysis, AllowedActionId, AnalysisContextReference, AnalysisDecision } from "@/adaptive-cycle/domain/types";

export type AnalysisRequest = {
  context: AnalysisContextReference;
  shiftKind: "day" | "evening" | "night";
  restWindow: string;
  declaredBarrier: string;
  activeConstraint: string;
  experiment: { actionId: AllowedActionId; action: string; moment: string; hypothesis: string; observationPrompt: string };
  /** Se envía para transparencia, pero el servidor lo reemplaza por su catálogo autorizado. */
  allowedActions: CatalogAction[];
  observation: { completion: "yes" | "partial" | "no"; sleepEstimateMinutes: number | null; event: "interruption" | "late_bedtime" | "sleep_onset" | "other" | "nothing_notable"; reviewPath?: "same_bedtime" | "earlier_sleep_onset" | "obligatory_interruption" | "other" | "not_sure"; detail?: string };
  memory: Array<{ observationId: string; constraint: string; recordedAt: string }>;
  reviewResponses: Array<{ question: string; response: string }>;
};
export type AnalysisPayload = Omit<AdaptiveAnalysis, "id" | "source" | "status" | "createdAt">;
const decisions: AnalysisDecision[] = ["maintain", "action", "clarification", "abstain"];
const actionIds = new Set<string>(actionCatalog.map((action) => action.id));
function strings(value: unknown): value is string[] { return Array.isArray(value) && value.every((item) => typeof item === "string" && item.length <= 280); }
function validReference(value: unknown): value is AnalysisContextReference { if (!value || typeof value !== "object") return false; const item = value as Record<string, unknown>; const version = item.experimentVersion; const revision = item.reviewRevision; return typeof item.restId === "string" && typeof item.experimentId === "string" && typeof version === "number" && Number.isInteger(version) && version > 0 && typeof item.shiftId === "string" && typeof item.observationId === "string" && typeof revision === "number" && Number.isInteger(revision) && revision >= 0; }

/** Defensa en profundidad: el JSON válido aún debe respetar la semántica del contrato. */
export function parseAnalysisPayload(value: unknown): AnalysisPayload | null {
  if (!value || typeof value !== "object") return null; const item = value as Record<string, unknown>; const decision = item.decision; const actionId = item.actionId; const question = item.question;
  if (typeof decision !== "string" || !decisions.includes(decision as AnalysisDecision) || typeof item.rationale !== "string" || item.rationale.length < 8 || item.rationale.length > 420 || !(question === null || (typeof question === "string" && question.length > 4 && question.length <= 280)) || !(actionId === null || (typeof actionId === "string" && actionIds.has(actionId))) || !strings(item.personSaid) || !strings(item.inferred) || !strings(item.unknown) || !validReference(item.context)) return null;
  if (decision === "action" && (!actionId || question !== null)) return null;
  if (decision === "clarification" && (!question || actionId !== null)) return null;
  if ((decision === "maintain" || decision === "abstain") && (question !== null || actionId !== null)) return null;
  return { decision: decision as AnalysisDecision, rationale: item.rationale, question, actionId: actionId as AllowedActionId | null, personSaid: item.personSaid, inferred: item.inferred, unknown: item.unknown, context: item.context };
}
export function isCoherentAnalysis(payload: AnalysisPayload, request: AnalysisRequest) {
  const text = [payload.rationale, payload.question ?? "", ...payload.personSaid, ...payload.inferred, ...payload.unknown].join(" ").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const claimsCompletedRestWindow = /(?:completo|completaste|completaron|finalizo|finalizaste) (?:la )?ventana (?:de )?(?:descanso|sueno)/.test(text);
  const claimsMeasuredSleep = /(?:midio|medicion|registro objetivo|objetivamente) (?:tu )?(?:sueno|descanso)/.test(text);
  const claimsKnownSleepWithoutEstimate = request.observation.sleepEstimateMinutes === null && /(?:dormiste|durmio|sueno de \d+)/.test(text);
  const repeatsCurrentActionAsAdaptation = payload.decision === "action" && payload.actionId === request.experiment.actionId;
  return !claimsCompletedRestWindow && !claimsMeasuredSleep && !claimsKnownSleepWithoutEstimate && !repeatsCurrentActionAsAdaptation;
}
export function isCurrentAnalysisContext(analysis: AdaptiveAnalysis, context: AnalysisContextReference) { return analysis.context.restId === context.restId && analysis.context.experimentId === context.experimentId && analysis.context.experimentVersion === context.experimentVersion && analysis.context.shiftId === context.shiftId && analysis.context.observationId === context.observationId && analysis.context.reviewRevision === context.reviewRevision; }
