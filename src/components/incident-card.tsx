import type { RoutingDecision, RoutingStatus } from "@/domain/types";

const statusCopy: Record<RoutingStatus, { icon: string; title: string; detail: string; tone: string }> = {
  grouped_pending_review: {
    icon: "◷",
    title: "Agrupado, no resuelto",
    detail: "Pendiente para revisión al cierre de la ventana.",
    tone: "quiet",
  },
  escalated_waiting_for_ack: {
    icon: "!",
    title: "Esperando confirmación de Andrea",
    detail: "La escalación crítica sigue activa.",
    tone: "waiting",
  },
  acknowledged_by_backup: {
    icon: "✓",
    title: "Andrea confirmó en la prueba sintética",
    detail: "La decisión quedó en manos de Andrea; no representa una alerta operativa real.",
    tone: "safe",
  },
  alerted_to_primary: {
    icon: "!",
    title: "Fallback simulado a Rodrigo",
    detail: "Atajo de demo: se eligió no confirmar dentro de 60 segundos simulados.",
    tone: "critical",
  },
  routed_directly_to_primary: {
    icon: "!",
    title: "Ruta directa a Rodrigo",
    detail: "No hay relevo aceptado para esta ventana sintética.",
    tone: "critical",
  },
};

export function IncidentCard({ decision }: { decision: RoutingDecision }) {
  const status = statusCopy[decision.status];
  const isAmbiguous = decision.incident.severity === "Unknown" || decision.incident.confidence === "low";

  return (
    <article className={`incident-card incident-card--${status.tone}`}>
      <div className="incident-card__heading">
        <span className={`incident-severity incident-severity--${decision.incident.severity.toLowerCase()}`}>
          {decision.incident.severity === "Unknown" ? "? Ambiguo" : decision.incident.severity}
        </span>
        <span className="incident-confidence">Confianza {decision.incident.confidence === "high" ? "alta" : "baja"}</span>
      </div>
      <p className="incident-scenario">{decision.incident.scenario === "security_test" ? "Prueba de seguridad · escenario sintético" : "Escenario habitual · simulación local"}</p>
      <h3>{decision.incident.title}</h3>
      <p className="incident-metadata">Impacto {decision.incident.impact === "growing" ? "creciente" : "estable"} · datos del escenario, no telemetría real.</p>
      <p className="incident-card__rule"><strong>Regla aplicada:</strong> {decision.rule}</p>
      <div className="incident-status">
        <span aria-hidden="true" className="incident-status__icon">{status.icon}</span>
        <div>
          <strong>{status.title}</strong>
          <p>{status.detail}</p>
        </div>
      </div>
      <p className="incident-card__next">
        {decision.status === "grouped_pending_review"
          ? `Revisión programada: ${decision.reviewAt}.`
          : `Siguiente responsable: ${decision.nextOwner}.`}
        {isAmbiguous && " La ambigüedad nunca se silencia."}
      </p>
    </article>
  );
}
