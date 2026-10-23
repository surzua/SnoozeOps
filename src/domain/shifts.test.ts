import { describe, expect, it } from "vitest";
import { getShiftPlan, handoffSummary } from "@/domain/shifts";

describe("propuesta por turno", () => {
  it("mantiene la oportunidad de 60 minutos para el turno de día", () => {
    const plan = getShiftPlan("day");

    expect(plan.usualWindow).toBe("00:30–06:30");
    expect(plan.proposedWindow).toBe("23:30–06:30");
    expect(plan.usualDuration).toBe("6 h");
    expect(plan.proposedDuration).toBe("7 h");
    expect(plan.lastCoffeeAt).toBe("18:30");
  });

  it("recalcula la propuesta para el turno de noche", () => {
    const plan = getShiftPlan("night");

    expect(plan.usualWindow).toBe("09:00–14:00");
    expect(plan.proposedWindow).toBe("08:30–14:30");
    expect(plan.lastCoffeeAt).toBe("03:30");
    expect(handoffSummary(plan)).toContain("14:30");
  });
});
