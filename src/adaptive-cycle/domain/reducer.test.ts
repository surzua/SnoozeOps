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

    expect(state.store.experiments[0]?.state).toBe("under_review");
    expect(state.store.observations[0]?.sleepEstimateMinutes).toBeNull();
    expect(state.screen).toBe("evolution");
  });

  it("descartar una propuesta conserva el motivo sin crear una observación", () => {
    const state = adaptiveCycleReducer(draft(), { type: "reject_proposal", reason: "La franja no es viable." });

    expect(state.store.experiments[0]).toMatchObject({ state: "discarded", discardedReason: "La franja no es viable." });
    expect(state.store.observations).toHaveLength(0);
    expect(state.currentExperimentId).toBeNull();
  });

  it("pausa el experimento acordado y exige un nuevo contexto al cambiar de turno", () => {
    const state = adaptiveCycleReducer(agreed(), { type: "select_shift", shift: "night" });

    expect(state.selectedShift).toBe("night");
    expect(state.screen).toBe("prepare");
    expect(state.currentExperimentId).toBeNull();
    expect(state.store.experiments[0]).toMatchObject({ state: "paused", pausedFrom: "agreed" });
    expect(state.store.shifts).toHaveLength(2);
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

    expect(retried.store.observations).toHaveLength(1);
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
});
