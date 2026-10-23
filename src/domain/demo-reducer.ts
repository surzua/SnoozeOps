import { evaluateIncident, resolveAcknowledgement } from "@/domain/incident-engine";
import type { DemoAction, DemoState } from "@/domain/types";

export const initialDemoState: DemoState = {
  selectedShift: "day",
  screen: "shift",
  handoffStatus: "not_requested",
  activationMode: "none",
  simulation: {
    isPanelOpen: false,
    nightHistory: [],
    securityTest: null,
  },
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
        simulation: initialDemoState.simulation,
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
    case "toggle_simulation":
      return state.screen === "activation"
        ? { ...state, simulation: { ...state.simulation, isPanelOpen: !state.simulation.isPanelOpen } }
        : state;
    case "inject_incident": {
      if (state.screen !== "activation") return state;

      if (
        action.incident.scenario === "night_simulation" &&
        state.simulation.nightHistory.some((decision) => decision.incident.id === action.incident.id)
      ) {
        return state;
      }

      const decision = evaluateIncident(action.incident, {
        hasAcceptedHandoff: state.handoffStatus === "accepted" && state.activationMode === "protected",
        reviewAt: state.selectedShift === "day" ? "06:30" : "14:30",
        acknowledgmentTimeoutSeconds: 60,
      });

      return action.incident.scenario === "night_simulation"
        ? { ...state, simulation: { ...state.simulation, nightHistory: [...state.simulation.nightHistory, decision] } }
        : { ...state, simulation: { ...state.simulation, securityTest: decision } };
    }
    case "resolve_security_test":
      return state.simulation.securityTest
        ? {
            ...state,
            simulation: {
              ...state.simulation,
              securityTest: resolveAcknowledgement(state.simulation.securityTest, action.outcome),
            },
          }
        : state;
    case "hydrate":
      return action.state;
    case "reset":
      return initialDemoState;
  }
}
