import type { Incident, RoutingDecision, RoutingStatus } from "@/domain/types";

export type RoutingContext = {
  hasAcceptedHandoff: boolean;
  reviewAt: string;
  acknowledgmentTimeoutSeconds: number;
};

const criticalStatus = (hasAcceptedHandoff: boolean): RoutingStatus =>
  hasAcceptedHandoff ? "escalated_waiting_for_ack" : "routed_directly_to_primary";

export function evaluateIncident(incident: Incident, context: RoutingContext): RoutingDecision {
  const isAmbiguous = incident.severity === "Unknown" || incident.confidence === "low";
  const canBeGrouped =
    !isAmbiguous &&
    (incident.severity === "P2" || incident.severity === "P3") &&
    incident.impact === "stable";

  if (canBeGrouped) {
    return {
      incident,
      status: "grouped_pending_review",
      rule: "P2/P3 estable: se agrupa para revisión al cierre; no se resuelve ni descarta.",
      nextOwner: "Revisión al cierre",
      reviewAt: context.reviewAt,
    };
  }

  const status = criticalStatus(context.hasAcceptedHandoff);
  const isGrowing = incident.impact === "growing" && (incident.severity === "P2" || incident.severity === "P3");
  const reason = isAmbiguous
    ? "Severidad desconocida, ambigua o de baja confianza: se trata como crítica por seguridad."
    : isGrowing
      ? "P2/P3 con impacto creciente: se escala de forma conservadora; no se agrupa."
      : "P1: se escala como incidente crítico.";

  if (status === "escalated_waiting_for_ack") {
    return {
      incident,
      status,
      rule: reason,
      nextOwner: "Andrea",
      timeoutSeconds: context.acknowledgmentTimeoutSeconds,
    };
  }

  return {
    incident,
    status,
    rule: `${reason} Sin relevo aceptado, Rodrigo recibe la alerta directamente.`,
    nextOwner: "Rodrigo",
  };
}

export function resolveAcknowledgement(
  decision: RoutingDecision,
  outcome: "acknowledged" | "timed_out",
): RoutingDecision {
  if (decision.status !== "escalated_waiting_for_ack") return decision;

  if (outcome === "acknowledged") {
    return {
      ...decision,
      status: "acknowledged_by_backup",
      nextOwner: "Andrea",
    };
  }

  return {
    ...decision,
    status: "alerted_to_primary",
    nextOwner: "Rodrigo",
  };
}
