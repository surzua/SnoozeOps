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
});
