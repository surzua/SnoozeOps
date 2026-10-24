"use client";

import { useEffect, useReducer, useState } from "react";
import { adaptiveCycleReducer, createInitialAdaptiveState, initialAdaptiveState } from "@/adaptive-cycle/domain/reducer";
import { adaptiveCycleStorageKey, type AdaptiveCycleState } from "@/adaptive-cycle/domain/types";

const shifts = new Set(["day", "evening", "night"]); const screens = new Set(["prepare", "proposal", "agreed", "review", "evolution", "history"]); const states = new Set(["draft", "agreed", "under_review", "closed", "paused", "discarded"]);
/** Valida referencias que usa la UI; ante ambigüedad se prioriza un escenario sintético recuperable. */
export function isAdaptiveCycleState(value: unknown): value is AdaptiveCycleState {
  if (!value || typeof value !== "object") return false; const state = value as Partial<AdaptiveCycleState>; const store = state.store;
  if (!store || store.schemaVersion !== 3 || store.source !== "synthetic" || !Array.isArray(store.shifts) || !Array.isArray(store.rests) || !Array.isArray(store.constraints) || !Array.isArray(store.barriers) || !Array.isArray(store.experiments) || !Array.isArray(store.observations) || !Array.isArray(store.reviews) || !Array.isArray(store.analyses) || !shifts.has(state.selectedShift as string) || !screens.has(state.screen as string) || typeof state.idSequence !== "number" || !Number.isInteger(state.reviewRevision)) return false;
  const unique = (items: Array<{ id: string }>) => new Set(items.map((item) => item.id)).size === items.length && items.every((item) => typeof item.id === "string" && item.id.length > 0);
  if (![store.shifts, store.rests, store.constraints, store.barriers, store.experiments, store.observations, store.reviews, store.analyses].every(unique)) return false;
  const shiftIds = new Set(store.shifts.map((item) => item.id)); const restIds = new Set(store.rests.map((item) => item.id)); const barrierIds = new Set(store.barriers.map((item) => item.id)); const experimentIds = new Set(store.experiments.map((item) => item.id)); const observationIds = new Set(store.observations.map((item) => item.id));
  if (!store.shifts.every((item) => item.source === "synthetic" && shifts.has(item.kind)) || !store.rests.every((item) => item.source === "synthetic" && shiftIds.has(item.shiftId)) || !store.constraints.every((item) => item.source === "synthetic" && restIds.has(item.restId)) || !store.barriers.every((item) => item.source === "synthetic" && restIds.has(item.restId)) || !store.experiments.every((item) => item.source === "synthetic" && restIds.has(item.restId) && barrierIds.has(item.barrierId) && states.has(item.state) && item.versions.some((version) => version.version === item.currentVersion && typeof version.actionId === "string"))) return false;
  if (!store.observations.every((item) => item.source === "synthetic" && experimentIds.has(item.experimentId) && Number.isFinite(item.sleepEstimateMinutes ?? 0) && (item.sleepEstimateMinutes === null || (item.sleepEstimateMinutes >= 0 && item.sleepEstimateMinutes <= 1440)))) return false;
  if (typeof state.currentRestId !== "string" || typeof state.currentBarrierId !== "string" || !restIds.has(state.currentRestId) || !barrierIds.has(state.currentBarrierId) || (state.currentExperimentId !== null && (typeof state.currentExperimentId !== "string" || !experimentIds.has(state.currentExperimentId))) || (state.currentObservationId !== null && (typeof state.currentObservationId !== "string" || !observationIds.has(state.currentObservationId)))) return false;
  const experiment = state.currentExperimentId ? store.experiments.find((item) => item.id === state.currentExperimentId) : undefined; const observation = state.currentObservationId ? store.observations.find((item) => item.id === state.currentObservationId) : undefined;
  return !(state.screen === "evolution" && (!experiment || !observation || observation.experimentId !== experiment.id || experiment.state !== "under_review")) && !(state.screen === "review" && (!experiment || experiment.state !== "agreed"));
}

export function useAdaptiveCycle() {
  const [state, dispatch] = useReducer(adaptiveCycleReducer, initialAdaptiveState); const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => { try { const raw = window.localStorage.getItem(adaptiveCycleStorageKey); if (raw) { const parsed: unknown = JSON.parse(raw); dispatch(isAdaptiveCycleState(parsed) ? { type: "hydrate", state: parsed } : { type: "hydrate", state: createInitialAdaptiveState("day", "El estado guardado era antiguo o inconsistente; restauramos el escenario sintético. El almacenamiento del MVP no se modificó.") }); } } catch { dispatch({ type: "hydrate", state: createInitialAdaptiveState("day", "No pudimos recuperar el estado local; restauramos el escenario sintético.") }); } finally { setIsHydrated(true); } }, []);
  useEffect(() => { if (!isHydrated) return; try { window.localStorage.setItem(adaptiveCycleStorageKey, JSON.stringify(state)); } catch { /* Persistir nunca bloquea la demo. */ } }, [isHydrated, state]);
  const reset = () => { try { window.localStorage.removeItem(adaptiveCycleStorageKey); } catch { /* el reducer aún restaura el escenario */ } dispatch({ type: "reset" }); };
  return { state, dispatch, isHydrated, reset };
}
