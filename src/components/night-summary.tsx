import type { ActivationMode, NightSummary as NightSummaryData } from "@/domain/types";

export function NightSummary({ summary, activationMode }: { summary: NightSummaryData; activationMode: ActivationMode }) {
  const groupedCount = summary.groupedIncidents.length;

  if (groupedCount === 0) {
    return (
      <section className="morning-card night-summary night-summary--empty" aria-labelledby="night-summary-title">
        <span className="morning-icon" aria-hidden="true">○</span>
        <div>
          <p className="section-label">Resultado operacional</p>
          <h2 id="night-summary-title">No hubo incidentes agrupados</h2>
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
        <h2 id="night-summary-title">
          {incidentLabel} en el escenario habitual durante tu {activationMode === "protected" ? "ventana protegida" : "ventana planificada"}
        </h2>
        <p>Quedó pendiente de revisión al cierre de tu ventana; agrupado no significa resuelto o descartado.</p>
        {summary.reviewAt && <p className="night-summary__pending">◷ Pendiente de revisión desde las {summary.reviewAt}</p>}
      </div>
    </section>
  );
}
