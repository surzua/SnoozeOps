import { describe, expect, it } from "vitest";
import { compareRestRecords } from "@/adaptive-cycle/domain/summary";
import { createInitialAdaptiveState } from "@/adaptive-cycle/domain/reducer";

describe("comparación conservadora de descansos", () => {
  it("sólo agrupa datos con mismo turno, restricciones y duración conocida", () => {
    const comparison = compareRestRecords(createInitialAdaptiveState().store);
    expect(comparison.comparable).toHaveLength(2);
    expect(comparison.message).toContain("no demuestra una causa");
  });

  it("no convierte una duración desconocida en cero", () => {
    const records = compareRestRecords(createInitialAdaptiveState().store).records;
    expect(records.some((item) => item.sleepEstimateMinutes === null)).toBe(true);
  });

  it("separa una franja distinta o una transición de turno", () => {
    const state = createInitialAdaptiveState();
    const changedWindow = {
      ...state.store,
      rests: state.store.rests.map((rest) => rest.id === "rest-history-day-2" ? { ...rest, startsAt: "2026-10-22T00:30:00-03:00" } : rest),
    };
    const comparison = compareRestRecords(changedWindow);

    expect(comparison.comparable).toBeNull();
    expect(comparison.message).toContain("franja");
    expect(comparison.records.find((record) => record.shiftKind === "evening")?.hasShiftTransition).toBe(true);
  });
});
