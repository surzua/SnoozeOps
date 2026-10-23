import { describe, expect, it } from "vitest";
import { evaluateIncident, resolveAcknowledgement } from "@/domain/incident-engine";
import type { RoutingContext } from "@/domain/incident-engine";
import type { Incident } from "@/domain/types";

const covered: RoutingContext = { hasAcceptedHandoff: true, reviewAt: "06:30", acknowledgmentTimeoutSeconds: 60 };
const uncovered: RoutingContext = { ...covered, hasAcceptedHandoff: false };
const incident = (overrides: Partial<Incident>): Incident => ({
  id: "test-incident",
  title: "Incidente sintético",
  severity: "P3",
  confidence: "high",
  impact: "stable",
  scenario: "night_simulation",
  ...overrides,
});

describe("evaluateIncident", () => {
  it("agrupa un P3 estable para revisión, sin marcarlo resuelto", () => {
    const decision = evaluateIncident(incident({}), covered);

    expect(decision.status).toBe("grouped_pending_review");
    expect(decision.nextOwner).toBe("Revisión al cierre");
    expect(decision.reviewAt).toBe("06:30");
  });

  it("escala un P2 creciente aunque no sea P1", () => {
    const decision = evaluateIncident(incident({ severity: "P2", impact: "growing" }), covered);

    expect(decision.status).toBe("escalated_waiting_for_ack");
    expect(decision.nextOwner).toBe("Andrea");
  });

  it("envía un P1 a Andrea solo con relevo aceptado", () => {
    const decision = evaluateIncident(incident({ severity: "P1", scenario: "security_test" }), covered);

    expect(decision.status).toBe("escalated_waiting_for_ack");
    expect(decision.timeoutSeconds).toBe(60);
  });

  it("alerta directamente a Rodrigo ante P1 sin relevo", () => {
    const decision = evaluateIncident(incident({ severity: "P1" }), uncovered);

    expect(decision.status).toBe("routed_directly_to_primary");
    expect(decision.nextOwner).toBe("Rodrigo");
  });

  it("trata una severidad desconocida o baja confianza como crítica", () => {
    const unknown = evaluateIncident(incident({ severity: "Unknown" }), uncovered);
    const lowConfidence = evaluateIncident(incident({ confidence: "low" }), uncovered);

    expect(unknown.status).toBe("routed_directly_to_primary");
    expect(lowConfidence.status).toBe("routed_directly_to_primary");
  });
});

describe("resolveAcknowledgement", () => {
  it("evita alertar a Rodrigo cuando Andrea confirma", () => {
    const waiting = evaluateIncident(incident({ severity: "P1" }), covered);
    const result = resolveAcknowledgement(waiting, "acknowledged");

    expect(result.status).toBe("acknowledged_by_backup");
    expect(result.nextOwner).toBe("Andrea");
  });

  it("alerta a Rodrigo al vencer los 60 segundos sin respuesta", () => {
    const waiting = evaluateIncident(incident({ severity: "P1" }), covered);
    const result = resolveAcknowledgement(waiting, "timed_out");

    expect(result.status).toBe("alerted_to_primary");
    expect(result.nextOwner).toBe("Rodrigo");
  });
});
