import type { AdaptiveCycleStore, Observation, ShiftKind } from "@/adaptive-cycle/domain/types";

export type RestRecord = Observation & {
  shiftKind: ShiftKind;
  restWindow: string;
  constraintSignature: string;
  contextSignature: string;
  hasShiftTransition: boolean;
  action: string;
};

function clock(value: string) {
  return value.slice(11, 16);
}

function recordFor(store: AdaptiveCycleStore, observation: Observation): RestRecord | null {
  const experiment = store.experiments.find((item) => item.id === observation.experimentId);
  const rest = experiment && store.rests.find((item) => item.id === experiment.restId);
  const shift = rest && store.shifts.find((item) => item.id === rest.shiftId);
  const version = experiment?.versions.find((item) => item.version === observation.experimentVersion);
  const barrier = experiment && store.barriers.find((item) => item.id === experiment.barrierId);
  if (!experiment || !rest || !shift || !version || !barrier) return null;
  const activeConstraints = store.constraints.filter((item) => item.restId === rest.id && item.isActive);
  const constraintSignature = activeConstraints.map((item) => item.kind).sort().join(",") || "no-confirmed-constraint";
  const contextSignature = [...activeConstraints.map((item) => `${item.kind}:${item.description}`), `barrier:${barrier.kind}:${barrier.description}`].sort().join("|");
  return {
    ...observation,
    shiftKind: shift.kind,
    restWindow: `${clock(rest.startsAt)}–${clock(rest.endsAt)}`,
    constraintSignature,
    contextSignature,
    hasShiftTransition: rest.shiftTransition !== null,
    action: version.action,
  };
}

export function restRecords(store: AdaptiveCycleStore) {
  return store.observations.map((observation) => recordFor(store, observation)).filter((item): item is RestRecord => item !== null).sort((a, b) => b.recordedAt.localeCompare(a.recordedAt));
}

export function compareRestRecords(store: AdaptiveCycleStore) {
  const records = restRecords(store);
  const known = records.filter((item) => item.sleepEstimateMinutes !== null);
  const groups = new Map<string, RestRecord[]>();
  for (const item of known) {
    if (item.hasShiftTransition) continue;
    const key = `${item.shiftKind}:${item.restWindow}:${item.contextSignature}`;
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  const comparable = [...groups.values()].find((items) => items.length >= 2);
  if (!comparable) {
    return {
      records,
      comparable: null,
      message: "Aún no hay dos descansos comparables. Se requiere duración conocida, mismo turno y franja, sin transición de turno y con las mismas restricciones y traba confirmadas; los demás registros se muestran por separado.",
    };
  }
  const estimates = comparable.map((item) => item.sleepEstimateMinutes as number);
  const low = Math.min(...estimates);
  const high = Math.max(...estimates);
  return {
    records,
    comparable,
    message: `Hay ${comparable.length} descansos comparables (turno ${comparable[0].shiftKind}, franja ${comparable[0].restWindow}, restricciones: ${comparable[0].constraintSignature}; sin transición). Las estimaciones van de ${low} a ${high} minutos; esto no demuestra una causa ni un efecto de la aplicación.`,
  };
}
