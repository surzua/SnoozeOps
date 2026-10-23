import type { NightSummary as NightSummaryData } from "@/domain/types";

export function NightSummary({ summary }: { summary: NightSummaryData }) {
  const groupedCount = summary.groupedIncidents.length;

  if (groupedCount === 0) {
    return (
      <section className="morning-card night-summary night-summary--empty" aria-labelledby="night-summary-title">
        <span className="morning-icon" aria-hidden="true">○</span>
        <div>
          <p className="section-label">Resultado operacional</p>
          <h2 id="night-summary-title">Sin incidentes agrupados</h2>
          <p>No se registraron incidentes agrupados en este escenario de demo.</p>
        </div>
      </section>
    );
  }

  const incidentLabel = `${groupedCount} alerta${groupedCount === 1 ? "" : "s"} de baja prioridad quedó${groupedCount === 1 ? "" : "aron"} agrupada${groupedCount === 1 ? "" : "s"}`;
  return (
    <section className="morning-card night-summary" aria-labelledby="night-summary-title">
      <span className="morning-icon morning-icon--safe" aria-hidden="true">✓</span>
      <div>
        <p className="section-label">Resultado operacional</p>
        <h2 id="night-summary-title">Sin alertas durante tu ventana protegida</h2>
        <p>{incidentLabel} para revisión al cierre de tu ventana.</p>
        {summary.reviewAt && <p className="night-summary__pending">◷ Pendiente de revisión desde las {summary.reviewAt}</p>}
      </div>
    </section>
  );
}
