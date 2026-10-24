import { describe, expect, it } from "vitest";
import { adaptiveCycleReducer, createInitialAdaptiveState } from "@/adaptive-cycle/domain/reducer";

function draft() {
  return adaptiveCycleReducer(createInitialAdaptiveState(), { type: "create_proposal" });
}

function agreed() {
  return adaptiveCycleReducer(draft(), { type: "accept_proposal" });
}

describe("ciclo adaptativo determinístico", () => {
  it("acepta una propuesta y registra una observación desconocida sin convertirla en cero", () => {
    const state = adaptiveCycleReducer(agreed(), {
      type: "record_observation",
      completion: "partial",
      sleepEstimateMinutes: null,
      event: "other",
    });

    expect(state.store.experiments.find((item) => item.id === state.currentExperimentId)?.state).toBe("under_review");
    expect(state.store.observations.find((item) => item.id === state.currentObservationId)?.sleepEstimateMinutes).toBeNull();
    expect(state.screen).toBe("evolution");
  });

  it("descartar una propuesta conserva el motivo sin crear una observación", () => {
    const state = adaptiveCycleReducer(draft(), { type: "reject_proposal", reason: "La franja no es viable." });

    expect(state.store.experiments.find((item) => item.id === "experiment-rest-synthetic-day-2026-10-27")).toMatchObject({ state: "discarded", discardedReason: "La franja no es viable." });
    expect(state.store.observations).toHaveLength(3);
    expect(state.currentExperimentId).toBeNull();
  });

  it("pausa el experimento acordado y exige un nuevo contexto al cambiar de turno", () => {
    const state = adaptiveCycleReducer(agreed(), { type: "select_shift", shift: "night" });

    expect(state.selectedShift).toBe("night");
    expect(state.screen).toBe("prepare");
    expect(state.currentExperimentId).toBeNull();
    expect(state.store.experiments.find((item) => item.id === "experiment-rest-synthetic-day-2026-10-27")).toMatchObject({ state: "paused", pausedFrom: "agreed" });
    expect(state.store.shifts).toHaveLength(5);
  });

  it("no duplica una observación si se reintenta el registro", () => {
    const reviewed = adaptiveCycleReducer(agreed(), {
      type: "record_observation",
      completion: "yes",
      sleepEstimateMinutes: 360,
      event: "late_bedtime",
      reviewPath: "same_bedtime",
    });
    const retried = adaptiveCycleReducer(reviewed, {
      type: "record_observation",
      completion: "yes",
      sleepEstimateMinutes: 360,
      event: "late_bedtime",
    });

    expect(retried.store.observations.filter((item) => item.experimentId === "experiment-rest-synthetic-day-2026-10-27")).toHaveLength(1);
  });

  it("separa las ramas de revisión y limita las aclaraciones", () => {
    const reviewed = adaptiveCycleReducer(agreed(), {
      type: "record_observation",
      completion: "yes",
      sleepEstimateMinutes: 360,
      event: "late_bedtime",
      reviewPath: "same_bedtime",
    });
    const clarified = adaptiveCycleReducer(reviewed, { type: "answer_clarification", path: "same_bedtime" });
    const twice = adaptiveCycleReducer(clarified, { type: "answer_clarification", path: "earlier_sleep_onset" });
    const capped = adaptiveCycleReducer(twice, { type: "answer_clarification", path: "not_sure" });

    expect(clarified.store.reviews[0]?.decision).toBe("adapt");
    expect(twice.clarificationCount).toBe(2);
    expect(capped).toEqual(twice);
  });

  it("corregir o eliminar un registro retira los análisis vinculados", () => {
    const reviewed = adaptiveCycleReducer(agreed(), { type: "record_observation", completion: "yes", sleepEstimateMinutes: 360, event: "late_bedtime" });
    const observationId = reviewed.currentObservationId as string;
    const withAnalysis = adaptiveCycleReducer(reviewed, {
      type: "receive_analysis",
      analysis: {
        id: "analysis-1", source: "live", status: "ready", decision: "abstain", rationale: "Falta información para una propuesta segura.", question: null, actionId: null,
        personSaid: [], inferred: [], unknown: ["Contexto"], context: { restId: reviewed.currentRestId, experimentId: reviewed.currentExperimentId as string, experimentVersion: 1, shiftId: "shift-synthetic-day-2026-10-27" }, createdAt: "2026-10-28T08:00:00-03:00",
      },
    });
    const corrected = adaptiveCycleReducer(withAnalysis, { type: "update_observation", observationId, completion: "partial", sleepEstimateMinutes: null, event: "interruption" });
    const deleted = adaptiveCycleReducer(corrected, { type: "delete_observation", observationId });

    expect(corrected.store.analyses).toHaveLength(0);
    expect(deleted.store.observations.some((item) => item.id === observationId)).toBe(false);
  });

  it("vuelve desde registros a la pantalla exacta desde la que se abrió", () => {
    const proposal = draft();
    const returnedToProposal = adaptiveCycleReducer(adaptiveCycleReducer(proposal, { type: "open_history" }), { type: "close_history" });
    const reviewed = adaptiveCycleReducer(agreed(), { type: "record_observation", completion: "yes", sleepEstimateMinutes: 360, event: "late_bedtime" });
    const returnedToEvolution = adaptiveCycleReducer(adaptiveCycleReducer(reviewed, { type: "open_history" }), { type: "close_history" });

    expect(returnedToProposal.screen).toBe("proposal");
    expect(returnedToEvolution.screen).toBe("evolution");
  });

  it("guarda una revisión pausada y permite retomarla sin crear otra propuesta", () => {
    const reviewed = adaptiveCycleReducer(agreed(), { type: "record_observation", completion: "yes", sleepEstimateMinutes: 360, event: "late_bedtime" });
    const paused = adaptiveCycleReducer(reviewed, { type: "pause_review" });
    const resumed = adaptiveCycleReducer(paused, { type: "resume_paused_experiment" });

    expect(paused.screen).toBe("prepare");
    expect(resumed.screen).toBe("evolution");
    expect(resumed.store.experiments.find((item) => item.id === resumed.currentExperimentId)?.state).toBe("under_review");
  });

  it("convierte una acción de IA permitida en una propuesta que la persona aún debe aceptar", () => {
    const reviewed = adaptiveCycleReducer(agreed(), { type: "record_observation", completion: "yes", sleepEstimateMinutes: 360, event: "late_bedtime" });
    const withAnalysis = adaptiveCycleReducer(reviewed, {
      type: "receive_analysis",
      analysis: {
        id: "analysis-action", source: "live", status: "ready", decision: "action", rationale: "Conviene probar una sola acción del catálogo.", question: null, actionId: "prepare-displaceable-task",
        personSaid: ["Declaró que realizó la acción."], inferred: [], unknown: [], context: { restId: reviewed.currentRestId, experimentId: reviewed.currentExperimentId as string, experimentVersion: 1, shiftId: "shift-synthetic-day-2026-10-27" }, createdAt: "2026-10-28T08:00:00-03:00",
      },
    });
    const proposal = adaptiveCycleReducer(withAnalysis, { type: "review_analysis_action", analysisId: "analysis-action" });

    expect(proposal.screen).toBe("proposal");
    expect(proposal.store.experiments.find((item) => item.id === proposal.currentExperimentId)).toMatchObject({ state: "draft", currentVersion: 2 });
    expect(proposal.lastMessage).toContain("no la aceptó por ti");
  });
});
