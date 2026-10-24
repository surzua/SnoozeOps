"use client";

import { useState, type FormEvent } from "react";
import { shiftLabels } from "@/adaptive-cycle/fixtures/scenarios";
import { useAdaptiveCycle } from "@/adaptive-cycle/hooks/use-adaptive-cycle";
import type {
  ActionCompletion,
  AdaptiveCycleState,
  Experiment,
  ObservationEvent,
  ReviewPath,
  ShiftKind,
} from "@/adaptive-cycle/domain/types";

const shiftKinds: ShiftKind[] = ["day", "evening", "night"];

function clock(value: string) {
  return value.slice(11, 16);
}

function restLabel(start: string, end: string) {
  return `${clock(start)}–${clock(end)}`;
}

function getExperiment(state: AdaptiveCycleState): Experiment | undefined {
  return state.currentExperimentId ? state.store.experiments.find((item) => item.id === state.currentExperimentId) : undefined;
}

function getCurrentVersion(experiment: Experiment | undefined) {
  return experiment?.versions.find((version) => version.version === experiment.currentVersion);
}

function getCurrentContext(state: AdaptiveCycleState) {
  return {
    shift: state.store.shifts.find((item) => item.kind === state.selectedShift && item.id.endsWith("2026-10-27")),
    rest: state.store.rests.find((item) => item.id === state.currentRestId),
    constraint: state.store.constraints.find((item) => item.restId === state.currentRestId && item.isActive),
    barrier: state.store.barriers.find((item) => item.id === state.currentBarrierId),
  };
}

function ContextCard({ state }: { state: AdaptiveCycleState }) {
  const { shift, rest, constraint, barrier } = getCurrentContext(state);
  if (!shift || !rest || !constraint || !barrier) return null;

  return (
    <div className="cycle-context">
      <p><span>Turno confirmado</span><strong>{shiftLabels[shift.kind]} · {clock(shift.startsAt)}–{clock(shift.endsAt)}</strong></p>
      <p><span>Próximo descanso</span><strong>{restLabel(rest.startsAt, rest.endsAt)}</strong></p>
      <p><span>Restricción</span><strong>{constraint.description}</strong></p>
      <p><span>Traba declarada</span><strong>{barrier.description}</strong></p>
    </div>
  );
}

function ShiftPicker({ state, onSelect }: { state: AdaptiveCycleState; onSelect: (shift: ShiftKind) => void }) {
  return (
    <div className="cycle-shifts" aria-label="Turno confirmado">
      {shiftKinds.map((shift) => (
        <button
          aria-pressed={state.selectedShift === shift}
          className={state.selectedShift === shift ? "cycle-shift cycle-shift--selected" : "cycle-shift"}
          key={shift}
          onClick={() => onSelect(shift)}
          type="button"
        >
          {shiftLabels[shift]}
        </button>
      ))}
    </div>
  );
}

function ProposalCard({ experiment }: { experiment: Experiment }) {
  const version = getCurrentVersion(experiment);
  if (!version) return null;
  return (
    <section className="cycle-card cycle-card--proposal" aria-label="Propuesta determinística">
      <p className="cycle-eyebrow">Propuesta · versión {version.version}</p>
      <h2>{version.action}</h2>
      <dl>
        <div><dt>Cuándo</dt><dd>{version.moment}</dd></div>
        <div><dt>Por qué ahora</dt><dd>{version.rationale}</dd></div>
        <div><dt>Qué observar</dt><dd>{version.observationPrompt}</dd></div>
      </dl>
    </section>
  );
}

function PrepareScreen({ state, dispatch }: { state: AdaptiveCycleState; dispatch: ReturnType<typeof useAdaptiveCycle>["dispatch"] }) {
  return (
    <section className="cycle-screen" aria-labelledby="prepare-title">
      <p className="cycle-kicker">1. Preparar el próximo descanso</p>
      <h1 id="prepare-title">Una acción viable, sin inventar disponibilidad.</h1>
      <p className="cycle-intro">Confirma el turno y parte desde la traba que la persona declaró. Todos los datos de esta demo son sintéticos.</p>
      <ShiftPicker state={state} onSelect={(shift) => dispatch({ type: "select_shift", shift })} />
      <ContextCard state={state} />
      {state.lastMessage && <p className="cycle-message" role="status">{state.lastMessage}</p>}
      <button className="button button--primary" onClick={() => dispatch({ type: "create_proposal" })} type="button">
        Ver una propuesta concreta <span aria-hidden="true">→</span>
      </button>
    </section>
  );
}

function ProposalScreen({ state, dispatch }: { state: AdaptiveCycleState; dispatch: ReturnType<typeof useAdaptiveCycle>["dispatch"] }) {
  const experiment = getExperiment(state);
  if (!experiment) return null;
  return (
    <section className="cycle-screen" aria-labelledby="proposal-title">
      <p className="cycle-kicker">2. Acordar el experimento</p>
      <h1 id="proposal-title">Esto es una propuesta, no un compromiso todavía.</h1>
      <ProposalCard experiment={experiment} />
      <div className="cycle-actions">
        <button className="button button--primary" onClick={() => dispatch({ type: "accept_proposal" })} type="button">Aceptar esta acción</button>
        <button className="button button--secondary" onClick={() => dispatch({ type: "adjust_proposal" })} type="button">Probar otra forma</button>
        <button className="text-button" onClick={() => dispatch({ type: "reject_proposal", reason: "La propuesta no resulta viable en este contexto." })} type="button">No me resulta viable</button>
      </div>
    </section>
  );
}

function AgreedScreen({ state, dispatch }: { state: AdaptiveCycleState; dispatch: ReturnType<typeof useAdaptiveCycle>["dispatch"] }) {
  const experiment = getExperiment(state);
  if (!experiment) return null;
  return (
    <section className="cycle-screen" aria-labelledby="agreed-title">
      <p className="cycle-kicker">Experimento acordado</p>
      <h1 id="agreed-title">Quédate con una sola acción.</h1>
      <ProposalCard experiment={experiment} />
      <p className="cycle-safe-note">La aplicación no cambia alertas, protocolos ni obligaciones de guardia.</p>
      <button className="button button--primary" onClick={() => dispatch({ type: "open_review" })} type="button">
        Registrar después de despertar <span aria-hidden="true">→</span>
      </button>
    </section>
  );
}

function ReviewScreen({ state, dispatch }: { state: AdaptiveCycleState; dispatch: ReturnType<typeof useAdaptiveCycle>["dispatch"] }) {
  const [completion, setCompletion] = useState<ActionCompletion>("yes");
  const [sleepKnown, setSleepKnown] = useState(true);
  const [sleepEstimate, setSleepEstimate] = useState("360");
  const [path, setPath] = useState<ReviewPath>("same_bedtime");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = Number(sleepEstimate);
    const eventType: ObservationEvent = path === "same_bedtime" ? "late_bedtime" : path === "earlier_sleep_onset" ? "sleep_onset" : "other";
    dispatch({
      type: "record_observation",
      completion,
      sleepEstimateMinutes: sleepKnown && Number.isFinite(value) && value > 0 ? value : null,
      event: eventType,
      reviewPath: path,
    });
  };

  return (
    <section className="cycle-screen" aria-labelledby="review-title">
      <p className="cycle-kicker">3. Revisar después de despertar</p>
      <h1 id="review-title">¿Qué ocurrió con este descanso?</h1>
      <p className="cycle-intro">El registro básico es breve. La duración es una estimación declarada, no una medición instrumental.</p>
      <form className="cycle-form" onSubmit={submit}>
        <fieldset>
          <legend>¿Pudiste realizar la acción?</legend>
          {(["yes", "partial", "no"] as ActionCompletion[]).map((value) => (
            <label key={value}><input checked={completion === value} name="completion" onChange={() => setCompletion(value)} type="radio" value={value} />
              {value === "yes" ? "Sí" : value === "partial" ? "Parcialmente" : "No"}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>¿Cuánto estimas que dormiste?</legend>
          <label className="cycle-number"><input disabled={!sleepKnown} inputMode="numeric" min="1" onChange={(event) => setSleepEstimate(event.target.value)} type="number" value={sleepEstimate} /> minutos estimados</label>
          <label><input checked={!sleepKnown} onChange={() => setSleepKnown(!sleepKnown)} type="checkbox" /> No sé cuánto dormí</label>
        </fieldset>
        <fieldset>
          <legend>¿Qué describe mejor lo que pasó?</legend>
          <label><input checked={path === "same_bedtime"} name="path" onChange={() => setPath("same_bedtime")} type="radio" /> Cerré antes, pero intenté dormir a la misma hora</label>
          <label><input checked={path === "earlier_sleep_onset"} name="path" onChange={() => setPath("earlier_sleep_onset")} type="radio" /> Intenté dormir antes y tardé en conciliar</label>
          <label><input checked={path === "not_sure"} name="path" onChange={() => setPath("not_sure")} type="radio" /> No sé / ocurrió otra traba</label>
        </fieldset>
        <button className="button button--primary" type="submit">Guardar este registro</button>
      </form>
    </section>
  );
}

function EvolutionScreen({ state, dispatch }: { state: AdaptiveCycleState; dispatch: ReturnType<typeof useAdaptiveCycle>["dispatch"] }) {
  const experiment = getExperiment(state);
  const observation = state.currentObservationId ? state.store.observations.find((item) => item.id === state.currentObservationId) : undefined;
  const version = getCurrentVersion(experiment);
  if (!experiment || !observation || !version) return null;
  const hasAnswer = state.store.reviews.some((review) => review.experimentId === experiment.id && review.experimentVersion === experiment.currentVersion);
  const question = observation.reviewPath === "same_bedtime"
    ? "¿Intentaste dormir antes o ese tiempo terminó ocupado por otra cosa?"
    : observation.reviewPath === "earlier_sleep_onset"
      ? "¿Hay algún contexto relevante que convenga aclarar antes de cambiar la propuesta?"
      : "¿Qué dato faltaría para decidir el siguiente paso?";
  const outcome = observation.sleepEstimateMinutes === null ? "No sabes cuánto dormiste." : `Estimas que dormiste ${observation.sleepEstimateMinutes} minutos.`;

  return (
    <section className="cycle-screen" aria-labelledby="evolution-title">
      <p className="cycle-kicker">Evolución del experimento</p>
      <h1 id="evolution-title">Lo registrado no prueba una causa.</h1>
      <section className="cycle-evolution">
        <div><span>Qué probamos</span><strong>{version.action}</strong></div>
        <div><span>Qué ocurrió</span><strong>{observation.completion === "yes" ? "Declaraste que realizaste la acción." : observation.completion === "partial" ? "Declaraste que la realizaste parcialmente." : "Declaraste que no pudiste realizarla."} {outcome}</strong></div>
        <div><span>Siguiente paso y motivo</span><strong>{hasAnswer ? state.lastMessage : question}</strong></div>
      </section>
      {!hasAnswer && (
        <div className="cycle-actions">
          <button className="button button--primary" onClick={() => dispatch({ type: "answer_clarification", path: observation.reviewPath ?? "not_sure" })} type="button">Responder esta aclaración</button>
          <button className="button button--secondary" onClick={() => dispatch({ type: "answer_clarification", path: "not_sure" })} type="button">No sé todavía</button>
        </div>
      )}
      {hasAnswer && <p className="cycle-message" role="status">Decisión determinística guardada. No se cambió automáticamente de intervención.</p>}
      <button className="text-button" onClick={() => dispatch({ type: "pause_review" })} type="button">Guardar y retomar después</button>
    </section>
  );
}

function DemoControls({ state, dispatch, onReset }: { state: AdaptiveCycleState; dispatch: ReturnType<typeof useAdaptiveCycle>["dispatch"]; onReset: () => void }) {
  const canSimulate = getExperiment(state)?.state === "agreed";
  return (
    <details className="cycle-controls">
      <summary>Controles de demostración</summary>
      <p>Cargan y reinician sólo datos sintéticos del ciclo adaptativo.</p>
      <div className="cycle-controls__buttons">
        {shiftKinds.map((shift) => (
          <button key={shift} onClick={() => dispatch({ type: "select_shift", shift })} type="button">Cargar escenario: {shiftLabels[shift]}</button>
        ))}
        <button disabled={!canSimulate} onClick={() => dispatch({ type: "record_observation", completion: "yes", sleepEstimateMinutes: 360, event: "late_bedtime", reviewPath: "same_bedtime" })} type="button">Simular: misma hora</button>
        <button disabled={!canSimulate} onClick={() => dispatch({ type: "record_observation", completion: "yes", sleepEstimateMinutes: 360, event: "sleep_onset", reviewPath: "earlier_sleep_onset" })} type="button">Simular: tardó en conciliar</button>
        <button className="cycle-controls__reset" onClick={onReset} type="button">Reiniciar escenario sintético</button>
      </div>
    </details>
  );
}

export function AdaptiveCycleApp() {
  const { state, dispatch, isHydrated, reset } = useAdaptiveCycle();
  const screen = state.screen === "prepare"
    ? <PrepareScreen dispatch={dispatch} state={state} />
    : state.screen === "proposal"
      ? <ProposalScreen dispatch={dispatch} state={state} />
      : state.screen === "agreed"
        ? <AgreedScreen dispatch={dispatch} state={state} />
        : state.screen === "review"
          ? <ReviewScreen dispatch={dispatch} state={state} />
          : <EvolutionScreen dispatch={dispatch} state={state} />;

  return (
    <main className={isHydrated ? "cycle-app" : "cycle-app cycle-app--loading"}>
      <header className="cycle-header">
        <div><strong>Snooze<span>Ops</span></strong><p>Demo de ciclo adaptativo · datos sintéticos</p></div>
        <span className="cycle-stage">Etapa 1 · sin IA</span>
      </header>
      {screen}
      <DemoControls dispatch={dispatch} onReset={reset} state={state} />
    </main>
  );
}
