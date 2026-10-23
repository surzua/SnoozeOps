import type { DemoAction, DemoState } from "@/domain/types";

export const initialDemoState: DemoState = {
  selectedShift: "day",
  screen: "shift",
  handoffStatus: "not_requested",
  activationMode: "none",
};

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "select_shift":
      if (action.shift === state.selectedShift) return state;

      // Una aceptación pertenece a una ventana concreta: al cambiar horario se invalida.
      return {
        ...state,
        selectedShift: action.shift,
        handoffStatus: "not_requested",
        activationMode: "none",
      };
    case "navigate":
      return { ...state, screen: action.screen };
    case "request_handoff":
      return state.handoffStatus === "not_requested" || state.handoffStatus === "declined"
        ? { ...state, handoffStatus: "pending", activationMode: "none" }
        : state;
    case "respond_handoff":
      return state.handoffStatus === "pending"
        ? { ...state, handoffStatus: action.response }
        : state;
    case "activate_protected":
      return state.handoffStatus === "accepted"
        ? { ...state, screen: "activation", activationMode: "protected" }
        : state;
    case "activate_filtered":
      return state.handoffStatus === "pending" || state.handoffStatus === "declined"
        ? { ...state, screen: "activation", activationMode: "filtered" }
        : state;
    case "hydrate":
      return action.state;
    case "reset":
      return initialDemoState;
  }
}
