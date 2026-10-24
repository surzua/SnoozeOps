"use client";

import { useEffect, useReducer, useState } from "react";
import { adaptiveCycleReducer, initialAdaptiveState } from "@/adaptive-cycle/domain/reducer";
import { adaptiveCycleStorageKey, type AdaptiveCycleState } from "@/adaptive-cycle/domain/types";

function isAdaptiveCycleState(value: unknown): value is AdaptiveCycleState {
  if (!value || typeof value !== "object") return false;
  const state = value as Partial<AdaptiveCycleState>;
  return (
    state.store?.schemaVersion === 1 &&
    state.store.source === "synthetic" &&
    Array.isArray(state.store.experiments) &&
    Array.isArray(state.store.observations) &&
    typeof state.currentRestId === "string" &&
    typeof state.currentBarrierId === "string" &&
    typeof state.selectedShift === "string"
  );
}

export function useAdaptiveCycle() {
  const [state, dispatch] = useReducer(adaptiveCycleReducer, initialAdaptiveState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(adaptiveCycleStorageKey);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (isAdaptiveCycleState(parsed)) dispatch({ type: "hydrate", state: parsed });
      }
    } catch {
      try {
        window.localStorage.removeItem(adaptiveCycleStorageKey);
      } catch {
        // La demo sigue disponible en memoria si el navegador bloquea el almacenamiento.
      }
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(adaptiveCycleStorageKey, JSON.stringify(state));
    } catch {
      // Persistir es una ayuda para la demo; nunca bloquea el ciclo.
    }
  }, [isHydrated, state]);

  const reset = () => {
    try {
      window.localStorage.removeItem(adaptiveCycleStorageKey);
    } catch {
      // El reducer restablece el escenario aun sin acceso a localStorage.
    }
    dispatch({ type: "reset" });
  };

  return { state, dispatch, isHydrated, reset };
}
