"use client";

import { useState, type FormEvent } from "react";
import { parseAnalysisPayload, type AnalysisRequest } from "@/adaptive-cycle/domain/analysis";
import { actionCatalog, getCatalogAction } from "@/adaptive-cycle/domain/catalog";
import { compareRestRecords, restRecords } from "@/adaptive-cycle/domain/summary";
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

function buildAnalysisRequest(state: AdaptiveCycleState, extraReviewResponse?: { question: string; response: string }): AnalysisRequest | null {
  const experiment = getExperiment(state);
  const observation = state.currentObservationId ? state.store.observations.find((item) => item.id === state.currentObservationId) : undefined;
  const { shift, rest, constraint, barrier } = getCurrentContext(state);
  if (!experiment || !observation || !shift || !rest || !constraint || !barrier) return null;
  const version = getCurrentVersion(experiment);
  if (!version) return null;
  const historicalFamilyConstraints = state.store.constraints.filter((item) => item.kind === "family" && item.restId !== rest.id).slice(-3);
  const reviewResponses = state.store.reviews
    .filter((review) => review.experimentId === experiment.id && review.experimentVersion === experiment.currentVersion && review.response)
    .map((review) => ({ question: review.question ?? state.store.analyses.find((analysis) => analysis.id === review.analysisId)?.question ?? "Pregunta previa no disponible.", response: review.response as string }));
  return {
    context: { restId: rest.id, experimentId: experiment.id, experimentVersion: experiment.currentVersion, shiftId: shift.id },
    shiftKind: shift.kind,
    restWindow: restLabel(rest.startsAt, rest.endsAt),
    declaredBarrier: barrier.description,
    activeConstraint: constraint.description,
    experiment: {
      action: version.action,
      moment: version.moment,
      hypothesis: version.rationale,
      observationPrompt: version.observationPrompt,
    },
    allowedActions: [...actionCatalog],
    observation: { completion: observation.completion, sleepEstimateMinutes: observation.sleepEstimateMinutes, event: observation.event, reviewPath: observation.reviewPath },
    memory: historicalFamilyConstraints.map((item) => ({ observationId: `constraint:${item.id}`, constraint: item.description, recordedAt: item.confirmedAt })),
    reviewResponses: extraReviewResponse ? [...reviewResponses, extraReviewResponse] : reviewResponses,
  };
}

function clarificationQuestion(observation: ObservationEvent, path?: ReviewPath) {
  if (path === "same_bedtime" || observation === "late_bedtime") return "¿Qué ocupó el tiempo que liberaste al cerrar antes?";
  if (path === "earlier_sleep_onset" || observation === "sleep_onset") return "¿Qué ocurrió desde que intentaste dormir hasta que conciliaste?";
  return "¿Qué dato de ese descanso ayudaría a decidir el siguiente paso?";
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
  const barrier = state.store.barriers.find((item) => item.id === state.currentBarrierId);
  const [barrierDescription, setBarrierDescription] = useState(barrier?.description ?? "");
  const pausedReview = getExperiment(state)?.state === "paused" && getExperiment(state)?.pausedFrom === "under_review";
  return (
    <section className="cycle-screen" aria-labelledby="prepare-title">
      <p className="cycle-kicker">1. Preparar el próximo descanso</p>
      <h1 id="prepare-title">¿Qué te impidió descansar ayer?</h1>
      <p className="cycle-intro">Confirma el turno y describe la traba con tus palabras. La acción será una propuesta; esta demo no inventa disponibilidad ni mide el descanso.</p>
      <ShiftPicker state={state} onSelect={(shift) => dispatch({ type: "select_shift", shift })} />
      <label className="cycle-open-response" htmlFor="barrier-description">
        <span>La traba que quieres trabajar</span>
        <textarea id="barrier-description" maxLength={280} onChange={(event) => setBarrierDescription(event.target.value)} value={barrierDescription} />
      </label>
      <ContextCard state={state} />
      {state.lastMessage && <p className="cycle-message" role="status">{state.lastMessage}</p>}
      {pausedReview ? (
        <button className="button button--primary" onClick={() => dispatch({ type: "resume_paused_experiment" })} type="button">
          Retomar el experimento guardado <span aria-hidden="true">→</span>
        </button>
      ) : (
        <button className="button button--primary" disabled={!barrierDescription.trim()} onClick={() => dispatch({ type: "create_proposal", barrierDescription })} type="button">
          Ver una propuesta concreta <span aria-hidden="true">→</span>
        </button>
      )}
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
  const [response, setResponse] = useState("");
  const experiment = getExperiment(state);
  const observation = state.currentObservationId ? state.store.observations.find((item) => item.id === state.currentObservationId) : undefined;
  const version = getCurrentVersion(experiment);
  if (!experiment || !observation || !version) return null;
  const manualQuestion = clarificationQuestion(observation.event, observation.reviewPath);
  const outcome = observation.sleepEstimateMinutes === null ? "No sabes cuánto dormiste." : `Estimas que dormiste ${observation.sleepEstimateMinutes} minutos.`;
  const analysis = state.currentAnalysisId ? state.store.analyses.find((item) => item.id === state.currentAnalysisId) : undefined;
  const hasAnsweredAnalysis = Boolean(analysis && state.store.reviews.some((review) => review.analysisId === analysis.id && review.response));
  const hasManualResponse = state.store.reviews.some((review) => review.experimentId === experiment.id && review.experimentVersion === experiment.currentVersion && !review.analysisId && review.response);
  const displayedQuestion = analysis?.decision === "clarification" ? analysis.question ?? manualQuestion : manualQuestion;
  const canAnswer = state.clarificationCount < 2 && (!analysis || analysis.decision === "clarification") && (analysis?.decision === "clarification" ? !hasAnsweredAnalysis : !hasManualResponse);
  const canRetryAnalysis = state.analysisStatus !== "loading" && state.clarificationCount > 0 && (!analysis || (analysis.decision === "clarification" && hasAnsweredAnalysis));
  const requestAnalysis = async (extraReviewResponse?: { question: string; response: string }) => {
    const request = buildAnalysisRequest(state, extraReviewResponse);
    if (!request) return;
    dispatch({ type: "set_analysis_status", status: "loading", message: "Solicitando una revisión en vivo para este contexto sintético…" });
    try {
      const response = await fetch("/api/adaptive-analysis", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(request) });
      const body: unknown = await response.json();
      if (!response.ok || !body || typeof body !== "object" || !("analysis" in body)) {
        const message = body && typeof body === "object" && "message" in body && typeof body.message === "string" ? body.message : "No hubo un nuevo análisis. El plan y el registro manual siguen disponibles.";
        dispatch({ type: "set_analysis_status", status: "unavailable", message });
        return;
      }
      const result = body as { analysis: unknown; generatedAt?: unknown };
      const parsed = parseAnalysisPayload(result.analysis);
      if (!parsed || typeof result.generatedAt !== "string") {
        dispatch({ type: "set_analysis_status", status: "invalid", message: "La salida no pasó la validación; no se creó una recomendación." });
        return;
      }
      dispatch({ type: "receive_analysis", analysis: { ...parsed, id: `analysis-${experiment.id}-${experiment.currentVersion}-${result.generatedAt}`, source: "live", status: "ready", createdAt: result.generatedAt } });
    } catch {
      dispatch({ type: "set_analysis_status", status: "unavailable", message: "No hubo un nuevo análisis. El plan y el registro manual siguen disponibles." });
    }
  };

  const submitResponse = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const answer = response.trim();
    if (!answer) return;
    const question = displayedQuestion;
    if (analysis?.decision === "clarification") {
      dispatch({ type: "respond_to_analysis_question", response: answer });
    } else {
      dispatch({ type: "answer_clarification", question, response: answer });
    }
    setResponse("");
    void requestAnalysis({ question, response: answer });
  };

  const nextStep = state.analysisStatus === "loading"
    ? "Estamos revisando tu respuesta junto con la acción y el contexto confirmados."
    : analysis?.decision === "action"
      ? `Revisa una nueva acción: ${getCatalogAction(analysis.actionId ?? "write-pending")?.action ?? "acción no disponible"}. ${analysis.rationale}`
      : analysis?.decision === "abstain"
        ? `Mantén el plan actual por ahora. ${analysis.rationale}`
        : analysis?.decision === "clarification" && !hasAnsweredAnalysis
          ? analysis.question ?? manualQuestion
          : hasManualResponse || hasAnsweredAnalysis
            ? "Tu respuesta quedó en el contexto de la revisión. No se cambió la acción automáticamente."
            : state.clarificationCount >= 2
              ? "Ya recogimos dos aclaraciones. Conserva este contexto para revisarlo sin inventar una nueva acción."
              : manualQuestion;

  return (
    <section className="cycle-screen" aria-labelledby="evolution-title">
      <p className="cycle-kicker">Evolución del experimento</p>
      <h1 id="evolution-title">Cerrar antes todavía no adelantó el descanso.</h1>
      <p className="cycle-intro">Es un aprendizaje de este registro, no una causa probada: la duración sigue siendo una estimación declarada.</p>
      <section className="cycle-evolution">
        <div><span>Qué probamos</span><strong>{version.action}</strong></div>
        <div><span>Qué ocurrió</span><strong>{observation.completion === "yes" ? "Declaraste que realizaste la acción." : observation.completion === "partial" ? "Declaraste que la realizaste parcialmente." : "Declaraste que no pudiste realizarla."} {outcome}</strong></div>
        <div><span>Siguiente paso y motivo</span><strong>{nextStep}</strong></div>
      </section>
      {canAnswer && (
        <form className="cycle-ai__response" onSubmit={submitResponse}>
          <label htmlFor="clarification-response">{displayedQuestion}</label>
          <textarea id="clarification-response" maxLength={280} onChange={(event) => setResponse(event.target.value)} placeholder="Describe sólo lo que recuerdes; no hace falta completar una respuesta perfecta." value={response} />
          <button className="button button--primary" disabled={!response.trim() || state.analysisStatus === "loading"} type="submit">Guardar respuesta y revisar el siguiente paso</button>
        </form>
      )}
      {state.analysisStatus === "loading" && <p className="cycle-message" role="status">Analizando la acción acordada, lo que ocurrió y tu respuesta…</p>}
      <section className="cycle-ai" aria-labelledby="ai-title">
        <div><p className="cycle-eyebrow">Revisión adaptativa</p><h2 id="ai-title">{analysis ? "Fundamento del siguiente paso" : "Disponible después de la aclaración"}</h2></div>
        {!analysis && <p>La revisión recibe la acción acordada, su momento, la hipótesis y el catálogo completo de alternativas permitidas. Si no está disponible, no se inventa una recomendación.</p>}
        {state.analysisStatus === "unavailable" && <p className="cycle-ai__warning" role="status">{state.lastMessage}</p>}
        {state.analysisStatus === "invalid" && <p className="cycle-ai__warning" role="status">{state.lastMessage}</p>}
        {analysis && (
          <div className="cycle-ai__result">
            <p><span>Decisión</span><strong>{analysis.decision === "clarification" ? "Necesita una aclaración" : analysis.decision === "action" ? "Propone una acción para tu revisión" : "Se abstiene de proponer"}</strong></p>
            {analysis.decision === "clarification" && <p><span>Pregunta</span><strong>{analysis.question}</strong></p>}
            {analysis.decision === "action" && <p><span>Acción propuesta</span><strong>{analysis.actionId ? getCatalogAction(analysis.actionId)?.action : "Acción no disponible."}</strong></p>}
            <p><span>Motivo</span><strong>{analysis.rationale}</strong></p>
            <p><span>Dijiste</span><strong>{analysis.personSaid.join(" ") || "Sin declaración adicional."}</strong></p>
            <p><span>Inferido provisionalmente</span><strong>{analysis.inferred.join(" ") || "Nada."}</strong></p>
            <p><span>Falta confirmar</span><strong>{analysis.unknown.join(" ") || "Nada adicional."}</strong></p>
            <p className="cycle-ai__context">Contexto usado: experimento {analysis.context.experimentId}, versión {analysis.context.experimentVersion}. Generado: {analysis.createdAt.slice(0, 16).replace("T", " ")}.</p>
          </div>
        )}
      </section>
      {analysis?.decision === "action" && analysis.actionId && <button className="button button--primary" onClick={() => dispatch({ type: "review_analysis_action", analysisId: analysis.id })} type="button">Revisar esta acción antes de acordarla</button>}
      {canRetryAnalysis && <button className="button button--secondary" onClick={() => void requestAnalysis()} type="button">Reintentar la revisión con esta respuesta</button>}
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

function HistoryScreen({ state, dispatch }: { state: AdaptiveCycleState; dispatch: ReturnType<typeof useAdaptiveCycle>["dispatch"] }) {
  const [editing, setEditing] = useState<string | null>(null);
  const records = restRecords(state.store);
  const comparison = compareRestRecords(state.store);
  const record = records.find((item) => item.id === editing);
  const [minutes, setMinutes] = useState("");
  const [completion, setCompletion] = useState<ActionCompletion>("yes");
  const openEdit = (item: typeof records[number]) => {
    setEditing(item.id);
    setMinutes(item.sleepEstimateMinutes === null ? "" : String(item.sleepEstimateMinutes));
    setCompletion(item.completion);
  };
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!record) return;
    const estimate = Number(minutes);
    dispatch({ type: "update_observation", observationId: record.id, completion, sleepEstimateMinutes: minutes.trim() && Number.isFinite(estimate) && estimate > 0 ? estimate : null, event: record.event });
    setEditing(null);
  };
  return (
    <section className="cycle-screen" aria-labelledby="history-title">
      <p className="cycle-kicker">Etapa 3 · gestión local</p>
      <h1 id="history-title">Registros y límites de comparación.</h1>
      <p className="cycle-intro">{comparison.message}</p>
      <section className="cycle-summary" aria-label="Resumen de registros">
        <strong>{records.length} registros vigentes</strong>
        <span>{records.filter((item) => item.sleepEstimateMinutes === null).length} con sueño desconocido · {records.filter((item) => item.completion === "partial").length} acciones parciales · {records.filter((item) => item.event === "interruption").length} interrupciones</span>
      </section>
      <div className="cycle-records">
        {records.map((item) => (
          <article className="cycle-record" key={item.id}>
            <p className="cycle-eyebrow">{item.recordedAt.slice(0, 10)} · turno {shiftLabels[item.shiftKind as ShiftKind]}</p>
            <strong>{item.action}</strong>
            <p>{item.completion === "yes" ? "Acción realizada" : item.completion === "partial" ? "Acción parcial" : "No pudo realizarla"} · {item.sleepEstimateMinutes === null ? "duración desconocida" : `${item.sleepEstimateMinutes} min estimados`} · franja: {item.restWindow} · restricción: {item.constraintSignature} · {item.hasShiftTransition ? "hubo transición de turno" : "sin transición de turno"}</p>
            <div className="cycle-record__actions"><button onClick={() => openEdit(item)} type="button">Corregir</button><button className="cycle-record__delete" onClick={() => dispatch({ type: "delete_observation", observationId: item.id })} type="button">Eliminar</button></div>
          </article>
        ))}
      </div>
      {record && (
        <form className="cycle-form" onSubmit={save}>
          <fieldset><legend>Corregir registro del {record.recordedAt.slice(0, 10)}</legend>
            <label>Realización <select onChange={(event) => setCompletion(event.target.value as ActionCompletion)} value={completion}><option value="yes">Sí</option><option value="partial">Parcialmente</option><option value="no">No</option></select></label>
            <label className="cycle-number">Minutos estimados (déjalo vacío si no se sabe)<input inputMode="numeric" min="1" onChange={(event) => setMinutes(event.target.value)} type="number" value={minutes} /></label>
          </fieldset>
          <button className="button button--primary" type="submit">Guardar corrección</button>
          <button className="text-button" onClick={() => setEditing(null)} type="button">Cancelar</button>
        </form>
      )}
      <p className="cycle-safe-note">Estos datos son locales y sintéticos. No hay puntuación de salud; una diferencia entre registros no prueba que la aplicación la causó.</p>
      <button className="button button--secondary" onClick={() => dispatch({ type: "close_history" })} type="button">Volver al ciclo</button>
    </section>
  );
}

export function AdaptiveCycleApp() {
  const { state, dispatch, isHydrated, reset } = useAdaptiveCycle();
  const screen = state.screen === "history"
    ? <HistoryScreen dispatch={dispatch} state={state} />
    : state.screen === "prepare"
    ? <PrepareScreen dispatch={dispatch} key={state.currentRestId} state={state} />
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
        <div className="cycle-header__actions"><button className="cycle-history-button" onClick={() => dispatch({ type: "open_history" })} type="button">Registros</button><span className="cycle-stage">Etapas 2 + 3</span></div>
      </header>
      {screen}
      <DemoControls dispatch={dispatch} onReset={reset} state={state} />
    </main>
  );
}
