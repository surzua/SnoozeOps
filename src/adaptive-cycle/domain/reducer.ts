import { getCatalogAction, getDeterministicAction } from "@/adaptive-cycle/domain/catalog";
import { getSyntheticScenario } from "@/adaptive-cycle/fixtures/scenarios";
import { historicalRecords } from "@/adaptive-cycle/fixtures/historical-records";
import type {
  ActionCompletion,
  AdaptiveCycleState,
  AdaptiveCycleStore,
  Experiment,
  ExperimentReview,
  Observation,
  ObservationEvent,
  ReviewDecision,
  ReviewPath,
  ShiftKind,
  AdaptiveAnalysis,
  AnalysisStatus,
} from "@/adaptive-cycle/domain/types";

const timestamp = "2026-10-26T18:02:00-03:00";
const maxClarifications = 2;

export type CycleAction =
  | { type: "select_shift"; shift: ShiftKind }
  | { type: "create_proposal"; barrierDescription?: string }
  | { type: "adjust_proposal" }
  | { type: "accept_proposal" }
  | { type: "reject_proposal"; reason?: string }
  | { type: "open_review" }
  | {
      type: "record_observation";
      completion: ActionCompletion;
      sleepEstimateMinutes: number | null;
      event: ObservationEvent;
      reviewPath?: ReviewPath;
    }
  | { type: "answer_clarification"; question: string; response: string }
  | { type: "respond_to_analysis_question"; response: string }
  | { type: "review_analysis_action"; analysisId: string }
  | { type: "pause_review" }
  | { type: "resume_paused_experiment" }
  | { type: "set_analysis_status"; status: AnalysisStatus; message?: string }
  | { type: "receive_analysis"; analysis: AdaptiveAnalysis }
  | { type: "update_observation"; observationId: string; completion: ActionCompletion; sleepEstimateMinutes: number | null; event: ObservationEvent }
  | { type: "delete_observation"; observationId: string }
  | { type: "open_history" }
  | { type: "close_history" }
  | { type: "hydrate"; state: AdaptiveCycleState }
  | { type: "reset" };

function createStore(shift: ShiftKind = "day"): AdaptiveCycleStore {
  const context = getSyntheticScenario(shift);
  const history = historicalRecords();
  return {
    schemaVersion: 2,
    source: "synthetic",
    shifts: [...history.shifts, context.shift],
    rests: [...history.rests, context.rest],
    constraints: [...history.constraints, context.constraint],
    barriers: [...history.barriers, context.barrier],
    experiments: history.experiments,
    observations: history.observations,
    reviews: [],
    analyses: [],
  };
}

export function createInitialAdaptiveState(shift: ShiftKind = "day"): AdaptiveCycleState {
  const context = getSyntheticScenario(shift);
  return {
    store: createStore(shift),
    selectedShift: shift,
    currentRestId: context.rest.id,
    currentBarrierId: context.barrier.id,
    currentExperimentId: null,
    currentObservationId: null,
    screen: "prepare",
    clarificationCount: 0,
    lastMessage: null,
    analysisStatus: "idle",
    currentAnalysisId: null,
    historyReturnScreen: "prepare",
  };
}

export const initialAdaptiveState = createInitialAdaptiveState();

function currentExperiment(state: AdaptiveCycleState): Experiment | undefined {
  return state.currentExperimentId ? state.store.experiments.find((item) => item.id === state.currentExperimentId) : undefined;
}

function updateExperiment(state: AdaptiveCycleState, experiment: Experiment): AdaptiveCycleState {
  return {
    ...state,
    store: {
      ...state.store,
      experiments: state.store.experiments.map((item) => (item.id === experiment.id ? experiment : item)),
    },
  };
}

function addContext(state: AdaptiveCycleState, shift: ShiftKind): AdaptiveCycleState {
  const context = getSyntheticScenario(shift);
  const exists = <T extends { id: string }>(items: T[], item: T) => items.some((candidate) => candidate.id === item.id) ? items : [...items, item];
  const agreed = currentExperiment(state);
  const paused = agreed?.state === "agreed"
    ? { ...agreed, state: "paused" as const, pausedFrom: "agreed" as const }
    : null;

  return {
    ...state,
    selectedShift: shift,
    currentRestId: context.rest.id,
    currentBarrierId: context.barrier.id,
    currentExperimentId: null,
    currentObservationId: null,
    screen: "prepare",
    clarificationCount: 0,
    analysisStatus: "idle",
    currentAnalysisId: null,
    historyReturnScreen: "prepare",
    lastMessage: paused
      ? "El experimento anterior quedó pausado: el turno cambió y el nuevo descanso requiere confirmación."
      : "El turno cambió. Confirma el contexto del próximo descanso antes de proponer una acción.",
    store: {
      ...state.store,
      shifts: exists(state.store.shifts, context.shift),
      rests: exists(state.store.rests, context.rest),
      constraints: exists(state.store.constraints, context.constraint),
      barriers: exists(state.store.barriers, context.barrier),
      experiments: paused
        ? state.store.experiments.map((item) => (item.id === paused.id ? paused : item))
        : state.store.experiments,
    },
  };
}

function createReview(experimentId: string, version: number, decision: ReviewDecision): ExperimentReview {
  return {
    id: `review-${experimentId}-${version}-${decision}`,
    source: "synthetic",
    experimentId,
    experimentVersion: version,
    decision,
    createdAt: timestamp,
  };
}

export function adaptiveCycleReducer(state: AdaptiveCycleState, action: CycleAction): AdaptiveCycleState {
  switch (action.type) {
    case "select_shift":
      return action.shift === state.selectedShift ? state : addContext(state, action.shift);
    case "create_proposal": {
      if (currentExperiment(state)) return state;
      const barrier = state.store.barriers.find((item) => item.id === state.currentBarrierId);
      const constraint = state.store.constraints.find((item) => item.restId === state.currentRestId && item.isActive);
      if (!barrier) return state;
      const description = action.barrierDescription?.trim();
      const updatedBarrier = description && description.length <= 280 ? { ...barrier, description } : barrier;
      const suggestion = getDeterministicAction(barrier);
      const experiment: Experiment = {
        id: `experiment-${state.currentRestId}`,
        source: "synthetic",
        restId: state.currentRestId,
        barrierId: barrier.id,
        state: "draft",
        currentVersion: 1,
        versions: [{ version: 1, ...suggestion, constraintIds: constraint ? [constraint.id] : [], createdAt: timestamp }],
      };
      return {
        ...state,
        currentExperimentId: experiment.id,
        screen: "proposal",
        lastMessage: null,
        analysisStatus: "idle",
        currentAnalysisId: null,
        store: {
          ...state.store,
          barriers: state.store.barriers.map((item) => item.id === barrier.id ? updatedBarrier : item),
          experiments: [...state.store.experiments, experiment],
        },
      };
    }
    case "adjust_proposal": {
      const experiment = currentExperiment(state);
      const barrier = state.store.barriers.find((item) => item.id === state.currentBarrierId);
      if (!experiment || experiment.state !== "draft" || !barrier) return state;
      const nextVersion = experiment.currentVersion + 1;
      const constraint = state.store.constraints.find((item) => item.restId === state.currentRestId && item.isActive);
      const suggestion = getDeterministicAction(barrier, true);
      return updateExperiment(state, {
        ...experiment,
        currentVersion: nextVersion,
        versions: [...experiment.versions, { version: nextVersion, ...suggestion, constraintIds: constraint ? [constraint.id] : [], createdAt: timestamp }],
      });
    }
    case "accept_proposal": {
      const experiment = currentExperiment(state);
      if (!experiment || experiment.state !== "draft") return state;
      return {
        ...updateExperiment(state, { ...experiment, state: "agreed" }),
        screen: "agreed",
        lastMessage: "Acción acordada para este descanso sintético.",
        analysisStatus: "idle",
        currentAnalysisId: null,
      };
    }
    case "reject_proposal": {
      const experiment = currentExperiment(state);
      if (!experiment || experiment.state !== "draft") return state;
      return {
        ...updateExperiment(state, { ...experiment, state: "discarded", discardedReason: action.reason ?? "No resulta viable." }),
        currentExperimentId: null,
        screen: "prepare",
        lastMessage: "La propuesta se descartó; no se registró como una acción incumplida.",
      };
    }
    case "open_review": {
      const experiment = currentExperiment(state);
      return experiment?.state === "agreed" ? { ...state, screen: "review", lastMessage: null } : state;
    }
    case "record_observation": {
      const experiment = currentExperiment(state);
      if (!experiment || experiment.state !== "agreed") return state;
      const observation: Observation = {
        id: `observation-${experiment.id}-${experiment.currentVersion}`,
        source: "synthetic",
        experimentId: experiment.id,
        experimentVersion: experiment.currentVersion,
        completion: action.completion,
        sleepEstimateMinutes: action.sleepEstimateMinutes,
        event: action.event,
        reviewPath: action.reviewPath,
        recordedAt: timestamp,
      };
      const reviewedState = updateExperiment(state, { ...experiment, state: "under_review" });
      return {
        ...reviewedState,
        currentObservationId: observation.id,
        screen: "evolution",
        clarificationCount: 0,
        lastMessage: null,
        analysisStatus: "idle",
        currentAnalysisId: null,
        store: { ...reviewedState.store, observations: [...reviewedState.store.observations, observation] },
      };
    }
    case "answer_clarification": {
      const experiment = currentExperiment(state);
      const response = action.response.trim();
      const question = action.question.trim();
      if (!experiment || experiment.state !== "under_review" || state.clarificationCount >= maxClarifications || !response || !question || response.length > 280 || question.length > 280) return state;
      return {
        ...state,
        clarificationCount: state.clarificationCount + 1,
        lastMessage: "Tu respuesta quedó registrada para fundamentar el siguiente paso; aún no se cambió la acción.",
        store: {
          ...state.store,
          reviews: [...state.store.reviews, { ...createReview(experiment.id, experiment.currentVersion, "clarify"), id: `review-${experiment.id}-${experiment.currentVersion}-manual-${state.clarificationCount + 1}`, question, response }],
        },
      };
    }
    case "respond_to_analysis_question": {
      const experiment = currentExperiment(state);
      const analysis = state.currentAnalysisId ? state.store.analyses.find((item) => item.id === state.currentAnalysisId) : undefined;
      const response = action.response.trim();
      if (!experiment || experiment.state !== "under_review" || state.clarificationCount >= maxClarifications || !analysis || analysis.decision !== "clarification" || !response || response.length > 280) return state;
      return {
        ...state,
        clarificationCount: state.clarificationCount + 1,
        lastMessage: "Tu respuesta quedó guardada. Puedes pedir una nueva revisión para elegir el siguiente paso.",
        store: {
          ...state.store,
          reviews: [...state.store.reviews, { ...createReview(experiment.id, experiment.currentVersion, "clarify"), id: `review-${experiment.id}-${experiment.currentVersion}-analysis-${analysis.id}`, question: analysis.question ?? undefined, response, analysisId: analysis.id }],
        },
      };
    }
    case "review_analysis_action": {
      const experiment = currentExperiment(state);
      const analysis = state.store.analyses.find((item) => item.id === action.analysisId);
      const catalogAction = analysis?.decision === "action" && analysis.actionId ? getCatalogAction(analysis.actionId) : undefined;
      if (!experiment || experiment.state !== "under_review" || !analysis || !catalogAction) return state;
      const nextVersion = experiment.currentVersion + 1;
      const previousVersion = experiment.versions.find((item) => item.version === experiment.currentVersion);
      return {
        ...updateExperiment(state, {
          ...experiment,
          state: "draft",
          currentVersion: nextVersion,
          versions: [...experiment.versions, { version: nextVersion, ...catalogAction, constraintIds: previousVersion?.constraintIds ?? [], createdAt: timestamp }],
        }),
        screen: "proposal",
        lastMessage: "Revisa la acción sugerida antes de acordarla. La IA no la aceptó por ti.",
      };
    }
    case "pause_review": {
      const experiment = currentExperiment(state);
      if (!experiment || experiment.state !== "under_review") return state;
      return {
        ...updateExperiment(state, { ...experiment, state: "paused", pausedFrom: "under_review" }),
        screen: "prepare",
        lastMessage: "El avance quedó guardado sin una nueva propuesta.",
      };
    }
    case "resume_paused_experiment": {
      const experiment = currentExperiment(state);
      if (!experiment || experiment.state !== "paused" || experiment.pausedFrom !== "under_review" || !state.currentObservationId) return state;
      return {
        ...updateExperiment(state, { ...experiment, state: "under_review" }),
        screen: "evolution",
        lastMessage: "Retomaste la revisión guardada. El registro y sus límites siguen visibles.",
      };
    }
    case "set_analysis_status":
      return { ...state, analysisStatus: action.status, lastMessage: action.message ?? state.lastMessage };
    case "receive_analysis": {
      const experiment = currentExperiment(state);
      const currentShift = state.store.rests.find((rest) => rest.id === state.currentRestId)?.shiftId;
      const matchesCurrent = experiment && currentShift && action.analysis.context.experimentId === experiment.id && action.analysis.context.experimentVersion === experiment.currentVersion && action.analysis.context.restId === state.currentRestId && action.analysis.context.shiftId === currentShift;
      if (!matchesCurrent) return { ...state, analysisStatus: "stale", lastMessage: "El análisis llegó para un contexto anterior y no reemplazó el plan vigente." };
      if (action.analysis.decision === "clarification" && state.clarificationCount >= maxClarifications) {
        return { ...state, analysisStatus: "invalid", lastMessage: "Ya se recogieron dos aclaraciones; SnoozeOps no abrirá otra pregunta sin revisar el contexto." };
      }
      return {
        ...state,
        analysisStatus: "ready",
        currentAnalysisId: action.analysis.id,
        lastMessage: action.analysis.decision === "clarification" ? action.analysis.question : action.analysis.rationale,
        store: { ...state.store, analyses: [...state.store.analyses.filter((item) => item.id !== action.analysis.id), action.analysis] },
      };
    }
    case "update_observation": {
      const observation = state.store.observations.find((item) => item.id === action.observationId);
      if (!observation) return state;
      return {
        ...state,
        currentAnalysisId: state.currentObservationId === action.observationId ? null : state.currentAnalysisId,
        analysisStatus: state.currentObservationId === action.observationId ? "idle" : state.analysisStatus,
        lastMessage: "Registro corregido. Sus análisis y resúmenes anteriores ya no se usan como vigentes.",
        store: {
          ...state.store,
          observations: state.store.observations.map((item) => item.id === action.observationId ? { ...item, completion: action.completion, sleepEstimateMinutes: action.sleepEstimateMinutes, event: action.event } : item),
          reviews: state.store.reviews.filter((item) => item.experimentId !== observation.experimentId || item.experimentVersion !== observation.experimentVersion),
          analyses: state.store.analyses.filter((item) => item.context.experimentId !== observation.experimentId || item.context.experimentVersion !== observation.experimentVersion),
        },
      };
    }
    case "delete_observation": {
      const observation = state.store.observations.find((item) => item.id === action.observationId);
      if (!observation) return state;
      const isCurrent = state.currentObservationId === action.observationId;
      const experiment = state.store.experiments.find((item) => item.id === observation.experimentId);
      const restoredExperiment = isCurrent && experiment?.state === "under_review" ? { ...experiment, state: "agreed" as const } : experiment;
      return {
        ...state,
        currentObservationId: isCurrent ? null : state.currentObservationId,
        currentAnalysisId: isCurrent ? null : state.currentAnalysisId,
        analysisStatus: isCurrent ? "idle" : state.analysisStatus,
        historyReturnScreen: isCurrent ? "agreed" : state.historyReturnScreen,
        lastMessage: "Registro eliminado. Los resúmenes se recalcularon sin ese dato.",
        store: {
          ...state.store,
          observations: state.store.observations.filter((item) => item.id !== action.observationId),
          experiments: restoredExperiment ? state.store.experiments.map((item) => item.id === restoredExperiment.id ? restoredExperiment : item) : state.store.experiments,
          reviews: state.store.reviews.filter((item) => item.experimentId !== observation.experimentId || item.experimentVersion !== observation.experimentVersion),
          analyses: state.store.analyses.filter((item) => item.context.experimentId !== observation.experimentId || item.context.experimentVersion !== observation.experimentVersion),
        },
      };
    }
    case "open_history":
      return { ...state, historyReturnScreen: state.screen === "history" ? state.historyReturnScreen : state.screen, screen: "history" };
    case "close_history":
      return { ...state, screen: state.historyReturnScreen };
    case "hydrate":
      return { ...action.state, historyReturnScreen: action.state.historyReturnScreen ?? (action.state.screen === "history" ? "prepare" : action.state.screen) };
    case "reset":
      return createInitialAdaptiveState();
  }
}
