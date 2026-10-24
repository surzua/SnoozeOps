import { describe, expect, it } from "vitest";
import { adaptiveCycleReducer, createInitialAdaptiveState } from "@/adaptive-cycle/domain/reducer";

function draft(description = "Sigo revisando tickets voluntariamente.", kind: "work_check" | "late_bedtime" = "work_check") { return adaptiveCycleReducer(createInitialAdaptiveState(), { type: "create_proposal", barrierDescription: description, barrierKind: kind }); }
function agreed() { return adaptiveCycleReducer(draft(), { type: "accept_proposal" }); }
function reviewed() { return adaptiveCycleReducer(agreed(), { type: "record_observation", completion: "yes", sleepEstimateMinutes: 0, event: "late_bedtime", reviewPath: "same_bedtime" }); }

describe("ciclo adaptativo determinístico", () => {
  it("rechazar, reformular y aceptar conserva ambos intentos con IDs únicos", () => {
    const rejected = adaptiveCycleReducer(draft(), { type: "reject_proposal" });
    const next = adaptiveCycleReducer(rejected, { type: "create_proposal", barrierDescription: "Me quedo terminando una tarea no urgente.", barrierKind: "late_bedtime" });
    const accepted = adaptiveCycleReducer(next, { type: "accept_proposal" });
    const current = accepted.store.experiments.find((item) => item.id === accepted.currentExperimentId);
    expect(new Set(accepted.store.experiments.map((item) => item.id)).size).toBe(accepted.store.experiments.length);
    expect(accepted.store.experiments.filter((item) => item.restId === accepted.currentRestId && item.state === "discarded")).toHaveLength(1);
    expect(current?.state).toBe("agreed");
  });
  it("no duplica compromisos ni observaciones con reintentos", () => {
    const once = adaptiveCycleReducer(draft(), { type: "accept_proposal" }); const twice = adaptiveCycleReducer(once, { type: "accept_proposal" });
    const first = adaptiveCycleReducer(twice, { type: "record_observation", completion: "yes", sleepEstimateMinutes: 360, event: "late_bedtime" }); const retried = adaptiveCycleReducer(first, { type: "record_observation", completion: "yes", sleepEstimateMinutes: 360, event: "late_bedtime" });
    expect(retried.store.experiments.filter((item) => item.state === "agreed" || item.state === "under_review")).toHaveLength(1); expect(retried.store.observations.filter((item) => item.experimentId === retried.currentExperimentId)).toHaveLength(1);
  });
  it("reconoce una traba fuera del catálogo sin sugerir tickets", () => {
    const state = adaptiveCycleReducer(createInitialAdaptiveState(), { type: "create_proposal", barrierDescription: "Hubo ruido de construcción.", barrierKind: "other" });
    expect(state.currentExperimentId).toBeNull(); expect(state.lastMessage).toContain("no sería honesto"); expect(state.store.barriers.find((item) => item.id === state.currentBarrierId)?.description).toBe("Hubo ruido de construcción.");
  });
  it("distingue cero de duración desconocida y rechaza valores inválidos", () => {
    const zero = reviewed(); expect(zero.store.observations.find((item) => item.id === zero.currentObservationId)?.sleepEstimateMinutes).toBe(0);
    const invalid = adaptiveCycleReducer(agreed(), { type: "record_observation", completion: "yes", sleepEstimateMinutes: -1, event: "other" }); expect(invalid.screen).toBe("agreed");
  });
  it("eliminar el registro actual pausado restaura un punto utilizable", () => {
    const paused = adaptiveCycleReducer(reviewed(), { type: "pause_review" }); const opened = adaptiveCycleReducer(paused, { type: "open_history" }); const deleted = adaptiveCycleReducer(opened, { type: "delete_observation", observationId: paused.currentObservationId as string }); const returned = adaptiveCycleReducer(deleted, { type: "close_history" });
    expect(returned.screen).toBe("agreed"); expect(returned.currentObservationId).toBeNull(); expect(returned.store.experiments.find((item) => item.id === returned.currentExperimentId)?.state).toBe("agreed");
  });
  it("descarta un análisis tardío después de corregir", () => {
    const state = reviewed(); const observationId = state.currentObservationId as string; const changed = adaptiveCycleReducer(state, { type: "update_observation", observationId, completion: "partial", sleepEstimateMinutes: null, event: "other" });
    const stale = adaptiveCycleReducer(changed, { type: "receive_analysis", analysis: { id: "late", source: "live", status: "ready", decision: "maintain", rationale: "Conviene mantener la acción mientras se observa otro registro.", question: null, actionId: null, personSaid: [], inferred: [], unknown: [], context: { restId: state.currentRestId, experimentId: state.currentExperimentId as string, experimentVersion: 1, shiftId: "shift-synthetic-day-2026-10-27", observationId, reviewRevision: state.reviewRevision }, createdAt: "2026-10-28T08:00:00-03:00" } });
    expect(stale.analysisStatus).toBe("stale");
  });
});
