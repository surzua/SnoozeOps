export type ShiftKind = "day" | "night";

export type Screen = "shift" | "plan" | "handoff" | "activation";

export type HandoffStatus = "not_requested" | "pending" | "accepted" | "declined";

export type ActivationMode = "none" | "protected" | "filtered";

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
};

export type DemoAction =
  | { type: "select_shift"; shift: ShiftKind }
  | { type: "navigate"; screen: Exclude<Screen, "activation"> }
  | { type: "request_handoff" }
  | { type: "respond_handoff"; response: "accepted" | "declined" }
  | { type: "activate_protected" }
  | { type: "activate_filtered" }
  | { type: "hydrate"; state: DemoState }
  | { type: "reset" };
