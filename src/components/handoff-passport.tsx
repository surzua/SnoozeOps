import type { CoverageSummary, ShiftPlan } from "@/domain/types";

type HandoffPassportProps = {
  summary: CoverageSummary;
  shift: ShiftPlan;
  variant?: "compact" | "prominent" | "historical";
  title?: string;
};

export function HandoffPassport({ summary, shift, variant = "compact", title = "Pasaporte de relevo" }: HandoffPassportProps) {
  const handoffLabel = summary.status === "complete" || summary.status === "accepted_pending_activation"
    ? "Andrea · aceptado"
    : summary.status === "pending"
      ? "Andrea · pendiente"
      : "Andrea · no confirmado";

  return (
    <section className={`handoff-passport handoff-passport--${variant}`} aria-labelledby={`${variant}-passport-title`}>
      <div className="handoff-passport__heading">
        <div>
          <p className="section-label">Contrato de esta ventana</p>
          <h2 id={`${variant}-passport-title`}>{title}</h2>
        </div>
        <span className={`coverage-badge coverage-badge--${summary.status}`}>{summary.label}</span>
      </div>
      <p className="handoff-passport__detail">{summary.detail}</p>
      <dl className="handoff-passport__grid">
        <div>
          <dt>Ventana</dt>
          <dd>{shift.label} · {summary.windowStart}–{summary.windowEnd}</dd>
        </div>
        <div>
          <dt>Responsable actual</dt>
          <dd>{summary.currentOwner}</dd>
        </div>
        <div>
          <dt>Relevo</dt>
          <dd>{handoffLabel}</dd>
        </div>
        <div>
          <dt>Revisión de agrupados</dt>
          <dd>{summary.groupedReviewOwner} · {summary.reviewAt}</dd>
        </div>
      </dl>
      <div className="handoff-passport__rule">
        <p className="section-label">Regla y siguiente acción</p>
        <p><strong>{summary.interruptionRule}</strong></p>
        <p>{summary.nextAction}</p>
      </div>
      <p className="handoff-passport__reason">Motivo factual: {summary.reason}</p>
      <p className="passport-demo-label">DEMO · DATOS SINTÉTICOS · no representa operación real</p>
    </section>
  );
}
