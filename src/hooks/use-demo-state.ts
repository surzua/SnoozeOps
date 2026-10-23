"use client";

import { useEffect, useReducer, useState } from "react";
import { demoReducer, initialDemoState } from "@/domain/demo-reducer";
import type { DemoState } from "@/domain/types";

const storageKey = "snoozeops-demo-state-v1";
const shifts = new Set(["day", "night"]);
const screens = new Set(["shift", "plan", "handoff", "activation"]);
const handoffs = new Set(["not_requested", "pending", "accepted", "declined"]);
const activations = new Set(["none", "protected", "filtered"]);

function isDemoState(value: unknown): value is DemoState {
  if (!value || typeof value !== "object") return false;
  const state = value as DemoState;
  return (
    shifts.has(state.selectedShift) &&
    screens.has(state.screen) &&
    handoffs.has(state.handoffStatus) &&
    activations.has(state.activationMode)
  );
}

export function useDemoState() {
  const [state, dispatch] = useReducer(demoReducer, initialDemoState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (isDemoState(parsed)) dispatch({ type: "hydrate", state: parsed });
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

  return { state, dispatch, isHydrated };
}
