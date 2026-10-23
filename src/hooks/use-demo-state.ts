"use client";

import { useEffect, useReducer, useState } from "react";
import { demoReducer, initialDemoState } from "@/domain/demo-reducer";
import type { DemoState, SimulationState } from "@/domain/types";

const storageKey = "snoozeops-demo-state-v1";
const shifts = new Set(["day", "night"]);
const screens = new Set(["shift", "plan", "handoff", "activation", "morning"]);
const handoffs = new Set(["not_requested", "pending", "accepted", "declined"]);
const activations = new Set(["none", "protected", "filtered"]);

const initialSimulationState: SimulationState = {
  isPanelOpen: false,
  isNetworkMocked: false,
  nightHistory: [],
  securityTest: null,
};

function isDemoState(value: unknown): value is Omit<DemoState, "simulation" | "morning"> & {
  simulation?: Partial<SimulationState>;
  morning?: DemoState["morning"];
} {
  if (!value || typeof value !== "object") return false;
  const state = value as DemoState;
  return (
    shifts.has(state.selectedShift) &&
    screens.has(state.screen) &&
    handoffs.has(state.handoffStatus) &&
    activations.has(state.activationMode)
  );
}

export function hydrateDemoState(value: unknown): DemoState | null {
  if (!isDemoState(value)) return null;

  const simulation = value.simulation;
  const morning = value.morning;

  return {
    selectedShift: value.selectedShift,
    screen: value.screen,
    handoffStatus: value.handoffStatus,
    activationMode: value.activationMode,
    simulation: {
      isPanelOpen: simulation?.isPanelOpen === true,
      isNetworkMocked: simulation?.isNetworkMocked === true,
      nightHistory: Array.isArray(simulation?.nightHistory) ? simulation.nightHistory : initialSimulationState.nightHistory,
      securityTest: simulation?.securityTest ?? initialSimulationState.securityTest,
    },
    morning: {
      isSimulated: morning?.isSimulated === true || value.screen === "morning",
    },
  };
}

export function useDemoState() {
  const [state, dispatch] = useReducer(demoReducer, initialDemoState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        const hydrated = hydrateDemoState(parsed);
        if (hydrated) dispatch({ type: "hydrate", state: hydrated });
      }
    } catch {
      try {
        window.localStorage.removeItem(storageKey);
      } catch {
        // Si el navegador bloquea localStorage, la demo sigue funcionando en memoria.
      }
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // La persistencia es una mejora; nunca bloquea el recorrido de la demo.
    }
  }, [isHydrated, state]);

  const resetDemo = () => {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // La demo puede reiniciarse incluso cuando localStorage no está disponible.
    }
    dispatch({ type: "reset" });
  };

  return { state, dispatch, isHydrated, resetDemo };
}
