import { getDeterministicAction } from "@/adaptive-cycle/domain/catalog";
import { getSyntheticScenario } from "@/adaptive-cycle/fixtures/scenarios";
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
} from "@/adaptive-cycle/domain/types";

const timestamp = "2026-10-26T18:02:00-03:00";

export type CycleAction =
  | { type: "select_shift"; shift: ShiftKind }
  | { type: "create_proposal" }
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
  | { type: "answer_clarification"; path: ReviewPath }
  | { type: "pause_review" }
  | { type: "hydrate"; state: AdaptiveCycleState }
  | { type: "reset" };

function createStore(shift: ShiftKind = "day"): AdaptiveCycleStore {
  const context = getSyntheticScenario(shift);
  return {
    schemaVersion: 1,
    source: "synthetic",
    shifts: [context.shift],
    rests: [context.rest],
    constraints: [context.constraint],
    barriers: [context.barrier],
    experiments: [],
    observations: [],
    reviews: [],
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
        store: { ...state.store, experiments: [...state.store.experiments, experiment] },
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
        store: { ...reviewedState.store, observations: [...reviewedState.store.observations, observation] },
      };
    }
    case "answer_clarification": {
      const experiment = currentExperiment(state);
      if (!experiment || experiment.state !== "under_review" || state.clarificationCount >= 2) return state;
      const decision: ReviewDecision = action.path === "same_bedtime" ? "adapt" : "clarify";
      return {
        ...state,
        clarificationCount: state.clarificationCount + 1,
        lastMessage: action.path === "same_bedtime"
          ? "El tiempo liberado no se convirtió todavía en una oportunidad de descanso. Antes de cambiar de intervención, conviene aclarar qué lo ocupó."
          : action.path === "earlier_sleep_onset"
            ? "Intentar dormir antes y tardar en conciliar no identifica una causa. Falta contexto antes de cambiar la propuesta."
            : "Aún falta un dato decisivo. Puedes guardar el avance y retomarlo sin inventar una recomendación.",
        store: { ...state.store, reviews: [...state.store.reviews, createReview(experiment.id, experiment.currentVersion, decision)] },
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
    case "hydrate":
      return action.state;
    case "reset":
      return createInitialAdaptiveState();
  }
}
