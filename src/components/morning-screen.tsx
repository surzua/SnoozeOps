import { HealthDisclaimer } from "@/components/health-disclaimer";
import { NightSummary } from "@/components/night-summary";
import { SleepComparison } from "@/components/sleep-comparison";
import { healthSuggestion, rodrigo } from "@/data/fixtures";
import { getMorningMetrics } from "@/domain/metrics";
import { getNightSummary } from "@/domain/morning-summary";
import type { DemoState, ShiftPlan } from "@/domain/types";

export function MorningScreen({ state, shift, onReset }: { state: DemoState; shift: ShiftPlan; onReset: () => void }) {
  const metrics = getMorningMetrics(shift);
  const summary = getNightSummary(state.simulation.nightHistory);

  return (
    <section className="screen screen--morning" aria-labelledby="morning-title">
      <p className="kicker">Mañana simulada</p>
      <h1 id="morning-title">Buenos días, {rodrigo.firstName}</h1>
      <p className="morning-intro">Resumen del escenario habitual y de tu ventana planificada.</p>
      <SleepComparison metrics={metrics} />
      <NightSummary summary={summary} activationMode={state.activationMode} />
      <HealthDisclaimer suggestion={healthSuggestion} />
      <button className="button button--primary" type="button" onClick={onReset}>
        Preparar mi próximo turno <span aria-hidden="true">→</span>
      </button>
    </section>
  );
}
