import type { AdaptiveCycleStore, Observation } from "@/adaptive-cycle/domain/types";

export type RestRecord = Observation & { shiftKind: string; constraintSignature: string; action: string };

function recordFor(store: AdaptiveCycleStore, observation: Observation): RestRecord | null {
  const experiment = store.experiments.find((item) => item.id === observation.experimentId);
  const rest = experiment && store.rests.find((item) => item.id === experiment.restId);
  const shift = rest && store.shifts.find((item) => item.id === rest.shiftId);
  const version = experiment?.versions.find((item) => item.version === observation.experimentVersion);
  if (!experiment || !rest || !shift || !version) return null;
  const constraintSignature = store.constraints.filter((item) => item.restId === rest.id && item.isActive).map((item) => item.kind).sort().join(",") || "no-confirmed-constraint";
  return { ...observation, shiftKind: shift.kind, constraintSignature, action: version.action };
}

export function restRecords(store: AdaptiveCycleStore) {
  return store.observations.map((observation) => recordFor(store, observation)).filter((item): item is RestRecord => item !== null).sort((a, b) => b.recordedAt.localeCompare(a.recordedAt));
}

export function compareRestRecords(store: AdaptiveCycleStore) {
  const records = restRecords(store);
  const known = records.filter((item) => item.sleepEstimateMinutes !== null);
  const groups = new Map<string, RestRecord[]>();
  for (const item of known) {
    const key = `${item.shiftKind}:${item.constraintSignature}`;
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  const comparable = [...groups.values()].find((items) => items.length >= 2);
  if (!comparable) return { records, comparable: null, message: "Aún no hay dos descansos con duración conocida, mismo turno y mismas restricciones confirmadas. Se muestran por separado." };
  const estimates = comparable.map((item) => item.sleepEstimateMinutes as number);
  const low = Math.min(...estimates);
  const high = Math.max(...estimates);
  return {
    records,
    comparable,
    message: `Hay ${comparable.length} descansos comparables (${comparable[0].shiftKind}, restricciones: ${comparable[0].constraintSignature}). Las estimaciones van de ${low} a ${high} minutos; esto no demuestra una causa ni un efecto de la aplicación.`,
  };
}
