import { describe, expect, it } from "vitest";
import { initialAdaptiveScenario } from "@/adaptive-cycle/fixtures/initial-scenario";
import { adaptiveCycleStorageKey } from "@/adaptive-cycle/domain/types";

describe("escenario inicial del ciclo adaptativo", () => {
  it("usa sólo datos sintéticos y referencias consistentes", () => {
    const shiftIds = new Set(initialAdaptiveScenario.shifts.map((shift) => shift.id));
    const restIds = new Set(initialAdaptiveScenario.rests.map((rest) => rest.id));

    expect(initialAdaptiveScenario.source).toBe("synthetic");
    expect(initialAdaptiveScenario.shifts.every((shift) => shift.source === "synthetic")).toBe(true);
    expect(initialAdaptiveScenario.rests.every((rest) => shiftIds.has(rest.shiftId))).toBe(true);
    expect(initialAdaptiveScenario.constraints.every((constraint) => restIds.has(constraint.restId))).toBe(true);
    expect(initialAdaptiveScenario.barriers.every((barrier) => restIds.has(barrier.restId))).toBe(true);
  });

  it("reserva un espacio de persistencia distinto al del MVP", () => {
    expect(adaptiveCycleStorageKey).toBe("snoozeops-adaptive-cycle-v2");
    expect(adaptiveCycleStorageKey).not.toBe("snoozeops-demo-state-v1");
  });
});
