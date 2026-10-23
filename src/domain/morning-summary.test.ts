import { describe, expect, it } from "vitest";
import { getNightSummary } from "@/domain/morning-summary";
import type { RoutingDecision } from "@/domain/types";

const nightIncident: RoutingDecision = {
  incident: {
    id: "night-password-change",
    title: "Cambio de contraseña",
    severity: "P3",
    confidence: "high",
    impact: "stable",
    scenario: "night_simulation",
  },
  status: "grouped_pending_review",
  rule: "Agrupado para revisión.",
  nextOwner: "Revisión al cierre",
  reviewAt: "06:30",
};

const securityTest: RoutingDecision = {
  ...nightIncident,
  incident: { ...nightIncident.incident, id: "security-test", severity: "P1", scenario: "security_test" },
  status: "alerted_to_primary",
  nextOwner: "Rodrigo",
};

describe("getNightSummary", () => {
  it("incluye únicamente P3 agrupados del escenario habitual", () => {
    const summary = getNightSummary([nightIncident, securityTest]);

    expect(summary.groupedIncidents).toEqual([nightIncident]);
    expect(summary.reviewAt).toBe("06:30");
  });

  it("devuelve el estado vacío sin inventar alertas", () => {
    expect(getNightSummary([securityTest])).toEqual({ groupedIncidents: [], reviewAt: null });
  });
});
