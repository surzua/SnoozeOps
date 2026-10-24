import { describe, expect, it } from "vitest";
import { isCoherentAnalysis, parseAnalysisPayload, type AnalysisRequest } from "@/adaptive-cycle/domain/analysis";
import { actionCatalog } from "@/adaptive-cycle/domain/catalog";

const context = { restId: "rest-1", experimentId: "experiment-1", experimentVersion: 1, shiftId: "shift-1", observationId: "observation-1", reviewRevision: 2 };
const base = { decision: "clarification", rationale: "El resultado no permite identificar por qué se mantuvo la misma duración.", question: "¿Qué ocupó el tiempo liberado antes de intentar dormir?", actionId: null, personSaid: ["Mantuvo la misma hora de intento."], inferred: ["El tiempo libre no se convirtió necesariamente en descanso."], unknown: ["Qué ocupó ese tiempo."], context };
const request: AnalysisRequest = { context, shiftKind: "day", restWindow: "23:30–06:30", declaredBarrier: "Volvió a revisar tickets.", activeConstraint: "Guardia vigente.", experiment: { actionId: "write-pending", action: actionCatalog[0].action, moment: actionCatalog[0].moment, hypothesis: actionCatalog[0].rationale, observationPrompt: actionCatalog[0].observationPrompt }, allowedActions: [...actionCatalog], observation: { completion: "yes", sleepEstimateMinutes: null, event: "late_bedtime" }, memory: [], reviewResponses: [] };
describe("contrato de análisis adaptativo", () => {
  it("acepta mantener y una aclaración estructurados", () => { expect(parseAnalysisPayload(base)).toMatchObject({ decision: "clarification" }); expect(parseAnalysisPayload({ ...base, decision: "maintain", question: null })).toMatchObject({ decision: "maintain" }); });
  it("rechaza acciones fuera del catálogo o la misma acción como adaptación", () => { expect(parseAnalysisPayload({ ...base, decision: "action", question: null, actionId: "take-medication" })).toBeNull(); const same = parseAnalysisPayload({ ...base, decision: "action", question: null, actionId: "write-pending" }); expect(same).not.toBeNull(); expect(isCoherentAnalysis(same!, request)).toBe(false); });
  it("rechaza afirmar sueño medido o conocido cuando falta estimación", () => { const payload = parseAnalysisPayload({ ...base, rationale: "Dormiste 360 minutos y completaste la ventana de descanso." }); expect(payload).not.toBeNull(); expect(isCoherentAnalysis(payload!, request)).toBe(false); });
});
