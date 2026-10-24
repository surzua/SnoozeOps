/**
 * Contrato aislado para el ciclo adaptativo de descanso.
 *
 * No comparte tipos, reducer ni almacenamiento con la demo de relevo
 * congelada. Las decisiones de la Etapa 1 son determinísticas y locales.
 */

export const adaptiveCycleStorageKey = "snoozeops-adaptive-cycle-v2";

export type SyntheticSource = "synthetic";

export type ShiftKind = "day" | "evening" | "night";

export type ExperimentState =
  | "draft"
  | "agreed"
  | "under_review"
  | "closed"
  | "paused"
  | "discarded";

export type ConstraintKind = "on_call" | "family" | "schedule" | "other";

export type BarrierKind =
  | "work_check"
  | "late_bedtime"
  | "sleep_onset"
  | "interruption"
  | "other";

export type ActionCompletion = "yes" | "partial" | "no";

export type ObservationEvent = "interruption" | "late_bedtime" | "sleep_onset" | "other" | "nothing_notable";

export type ReviewDecision = "maintain" | "clarify" | "adapt" | "acknowledge_limit";

export type ReviewPath = "same_bedtime" | "earlier_sleep_onset" | "not_sure";

export type CycleScreen = "prepare" | "proposal" | "agreed" | "review" | "evolution" | "history";
export type CycleReturnScreen = Exclude<CycleScreen, "history">;

export type AnalysisDecision = "action" | "clarification" | "abstain";

export type AnalysisStatus = "idle" | "loading" | "ready" | "unavailable" | "invalid" | "stale";

/** Identificador estable del catálogo: nunca se acepta texto libre del proveedor. */
export type AllowedActionId = "write-pending" | "prepare-displaceable-task";

export type AnalysisContextReference = {
  restId: string;
  experimentId: string;
  experimentVersion: number;
  shiftId: string;
};

export type AdaptiveAnalysis = {
  id: string;
  source: "live";
  status: AnalysisStatus;
  decision: AnalysisDecision;
  rationale: string;
  question: string | null;
  actionId: AllowedActionId | null;
  /** Separar declaración, inferencia e incertidumbre evita convertir una hipótesis en hecho. */
  personSaid: string[];
  inferred: string[];
  unknown: string[];
  context: AnalysisContextReference;
  createdAt: string;
};

export type ConfirmedShift = {
  id: string;
  source: SyntheticSource;
  kind: ShiftKind;
  startsAt: string;
  endsAt: string;
  timeZone: string;
  confirmedAt: string;
};

export type NextRest = {
  id: string;
  source: SyntheticSource;
  shiftId: ConfirmedShift["id"];
  startsAt: string;
  endsAt: string;
  confirmedAt: string;
  /** Un cambio de turno altera el contexto; null confirma que no hubo transición. */
  shiftTransition: { from: ShiftKind; to: ShiftKind } | null;
};

export type Constraint = {
  id: string;
  source: SyntheticSource;
  restId: NextRest["id"];
  kind: ConstraintKind;
  description: string;
  isActive: boolean;
  confirmedAt: string;
};

export type Barrier = {
  id: string;
  source: SyntheticSource;
  restId: NextRest["id"];
  kind: BarrierKind;
  description: string;
  reportedAt: string;
};

export type ExperimentVersion = {
  version: number;
  action: string;
  moment: string;
  rationale: string;
  constraintIds: Constraint["id"][];
  observationPrompt: string;
  createdAt: string;
};

export type Experiment = {
  id: string;
  source: SyntheticSource;
  restId: NextRest["id"];
  barrierId: Barrier["id"];
  state: ExperimentState;
  currentVersion: number;
  versions: ExperimentVersion[];
  pausedFrom?: Exclude<ExperimentState, "paused">;
  discardedReason?: string;
};

export type Observation = {
  id: string;
  source: SyntheticSource;
  experimentId: Experiment["id"];
  experimentVersion: ExperimentVersion["version"];
  completion: ActionCompletion;
  sleepEstimateMinutes: number | null;
  event: ObservationEvent;
  reviewPath?: ReviewPath;
  detail?: string;
  recordedAt: string;
};

export type ExperimentReview = {
  id: string;
  source: SyntheticSource;
  experimentId: Experiment["id"];
  experimentVersion: ExperimentVersion["version"];
  decision: ReviewDecision;
  question?: string;
  response?: string;
  analysisId?: AdaptiveAnalysis["id"];
  createdAt: string;
};

/** El futuro almacenamiento del nuevo flujo; nunca admite el estado del MVP. */
export type AdaptiveCycleStore = {
  schemaVersion: 2;
  source: SyntheticSource;
  shifts: ConfirmedShift[];
  rests: NextRest[];
  constraints: Constraint[];
  barriers: Barrier[];
  experiments: Experiment[];
  observations: Observation[];
  reviews: ExperimentReview[];
  analyses: AdaptiveAnalysis[];
};

export type AdaptiveCycleState = {
  store: AdaptiveCycleStore;
  selectedShift: ShiftKind;
  currentRestId: NextRest["id"];
  currentBarrierId: Barrier["id"];
  currentExperimentId: Experiment["id"] | null;
  currentObservationId: Observation["id"] | null;
  screen: CycleScreen;
  clarificationCount: number;
  lastMessage: string | null;
  analysisStatus: AnalysisStatus;
  currentAnalysisId: AdaptiveAnalysis["id"] | null;
  /** Pantalla exacta desde la que se abrió Registros. */
  historyReturnScreen: CycleReturnScreen;
};
