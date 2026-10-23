export type ShiftKind = "day" | "night";

export type Screen = "shift" | "plan" | "handoff" | "activation" | "morning";

export type HandoffStatus = "not_requested" | "pending" | "accepted" | "declined";

export type ActivationMode = "none" | "protected" | "filtered";

export type CoverageStatus =
  | "unavailable"
  | "pending"
  | "accepted_pending_activation"
  | "complete"
  | "filtered_uncovered"
  | "invalid";

export type CoverageSummary = {
  status: CoverageStatus;
  mode: ActivationMode;
  label: string;
  detail: string;
  currentOwner: "Rodrigo" | "Andrea";
  groupedReviewOwner: "Revisión al cierre";
  windowStart: string;
  windowEnd: string;
  reviewAt: string;
  interruptionRule: string;
  nextAction: string;
  reason: string;
};

export type SeverityLevel = "P1" | "P2" | "P3" | "Unknown";

export type RoutingStatus =
  | "grouped_pending_review"
  | "escalated_waiting_for_ack"
  | "acknowledged_by_backup"
  | "alerted_to_primary"
  | "routed_directly_to_primary";

export type IncidentScenario = "night_simulation" | "security_test";

export type Incident = {
  id: string;
  title: string;
  severity: SeverityLevel;
  confidence: "high" | "low";
  impact: "stable" | "growing";
  scenario: IncidentScenario;
};

export type RoutingDecision = {
  incident: Incident;
  status: RoutingStatus;
  rule: string;
  nextOwner: "Andrea" | "Rodrigo" | "Revisión al cierre";
  reviewAt?: string;
  timeoutSeconds?: number;
};

export type SimulationState = {
  isPanelOpen: boolean;
  isNetworkMocked: boolean;
  nightHistory: RoutingDecision[];
  securityTest: RoutingDecision | null;
};

export type MorningMetrics = {
  usualWindow: string;
  proposedWindow: string;
  usualDurationMinutes: number;
  proposedDurationMinutes: number;
  minutesReserved: number;
};

export type NightSummary = {
  groupedIncidents: RoutingDecision[];
  reviewAt: string | null;
};

export type HealthSuggestion = {
  title: string;
  guidance: string;
  medicationWarning: string;
};

export type ShiftPlan = {
  kind: ShiftKind;
  label: "Día" | "Noche";
  workHours: string;
  usualWindow: string;
  usualDuration: string;
  proposedWindow: string;
  proposedDuration: string;
  startsAt: string;
  endsAt: string;
  lastCoffeeAt: string;
  coffeeContext?: string;
};

export type Ticket = {
  id: string;
  priority: "P2" | "P3";
  title: string;
  status: string;
};

export type DemoState = {
  selectedShift: ShiftKind;
  screen: Screen;
  handoffStatus: HandoffStatus;
  activationMode: ActivationMode;
  simulation: SimulationState;
  morning: {
    isSimulated: boolean;
  };
};

export type DemoAction =
  | { type: "select_shift"; shift: ShiftKind }
  | { type: "navigate"; screen: Exclude<Screen, "activation" | "morning"> }
  | { type: "request_handoff" }
  | { type: "respond_handoff"; response: "accepted" | "declined" }
  | { type: "activate_protected" }
  | { type: "activate_filtered" }
  | { type: "toggle_simulation" }
  | { type: "toggle_network_mock" }
  | { type: "simulate_morning" }
  | { type: "inject_incident"; incident: Incident }
  | { type: "resolve_security_test"; outcome: "acknowledged" | "timed_out" }
  | { type: "hydrate"; state: DemoState }
  | { type: "reset" };
