import { describe, expect, it } from "vitest";
import { getCoverageSummary, isCompleteCoverage } from "@/domain/coverage-summary";
import { getShiftPlan } from "@/domain/shifts";
import type { ActivationMode, HandoffStatus } from "@/domain/types";

const shift = getShiftPlan("day");

describe("getCoverageSummary", () => {
  it.each([
    ["not_requested", "none", "unavailable"],
    ["pending", "none", "pending"],
    ["accepted", "none", "accepted_pending_activation"],
    ["accepted", "protected", "complete"],
    ["pending", "filtered", "filtered_uncovered"],
    ["declined", "none", "unavailable"],
    ["declined", "filtered", "filtered_uncovered"],
  ] as const)("deriva %s + %s como %s", (handoffStatus, activationMode, expected) => {
    expect(getCoverageSummary({ handoffStatus, activationMode }, shift).status).toBe(expected);
  });

  it.each([
    ["not_requested", "protected"],
    ["pending", "protected"],
    ["declined", "protected"],
    ["accepted", "filtered"],
  ] as const)("trata %s + %s como inválido", (handoffStatus, activationMode) => {
    expect(getCoverageSummary({ handoffStatus, activationMode }, shift).status).toBe("invalid");
  });

  it("só llama completa a aceptación más activación protegida", () => {
    expect(isCompleteCoverage({ handoffStatus: "accepted", activationMode: "protected" })).toBe(true);
    const combinations: [HandoffStatus, ActivationMode][] = [
      ["not_requested", "none"], ["pending", "none"], ["accepted", "none"],
      ["pending", "filtered"], ["declined", "none"], ["declined", "filtered"],
    ];
    for (const [handoffStatus, activationMode] of combinations) {
      expect(isCompleteCoverage({ handoffStatus, activationMode })).toBe(false);
    }
  });

  it("deriva la ventana del turno sin mutar el estado", () => {
    const state = { handoffStatus: "accepted" as const, activationMode: "protected" as const };
    const result = getCoverageSummary(state, shift);
    expect(result.windowStart).toBe("23:30");
    expect(result.windowEnd).toBe("06:30");
    expect(state).toEqual({ handoffStatus: "accepted", activationMode: "protected" });
  });
});
