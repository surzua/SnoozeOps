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
    title: "Andrea confirmó y asume el incidente",
    detail: "Rodrigo no será alertado.",
    tone: "safe",
  },
  alerted_to_primary: {
    icon: "!",
    title: "Alerta crítica enviada a Rodrigo",
    detail: "Andrea no confirmó dentro del plazo de 60 segundos.",
    tone: "critical",
  },
  routed_directly_to_primary: {
    icon: "!",
    title: "Alerta enviada directamente a Rodrigo",
    detail: "No hay relevo aceptado para esta ventana.",
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
      <h3>{decision.incident.title}</h3>
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
