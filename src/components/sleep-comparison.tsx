import type { MorningMetrics } from "@/domain/types";

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder === 0 ? `${hours} h` : `${hours} h ${remainder} min`;
}

export function SleepComparison({ metrics }: { metrics: MorningMetrics }) {
  const hasReservedTime = metrics.minutesReserved > 0;

  return (
    <section className="morning-card sleep-comparison" aria-labelledby="sleep-comparison-title">
      <div>
        <p className="section-label">Tu ventana de descanso</p>
        <h2 id="sleep-comparison-title">Una hora más planificada</h2>
      </div>
      <div className="sleep-comparison__windows" aria-label="Comparación de ventanas de descanso">
        <div>
          <span>Habitual</span>
          <strong>{metrics.usualWindow}</strong>
          <p>{formatDuration(metrics.usualDurationMinutes)}</p>
        </div>
        <div className="sleep-comparison__proposed">
          <span>Planificada</span>
          <strong>{metrics.proposedWindow}</strong>
          <p>{formatDuration(metrics.proposedDurationMinutes)}</p>
        </div>
      </div>
      {hasReservedTime && (
        <p className="sleep-comparison__gain">
          +{metrics.minutesReserved} min reservados para descansar
        </p>
      )}
      <p className="measurement-note">SnoozeOps muestra tiempo reservado para dormir; no mide el sueño real.</p>
    </section>
  );
}
