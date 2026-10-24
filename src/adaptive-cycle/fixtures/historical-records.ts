import type { AdaptiveCycleStore, Barrier, ConfirmedShift, Constraint, Experiment, NextRest, Observation } from "@/adaptive-cycle/domain/types";

const source = "synthetic" as const;

const shifts: ConfirmedShift[] = [
  { id: "shift-history-day-1", source, kind: "day", startsAt: "2026-10-20T08:00:00-03:00", endsAt: "2026-10-20T17:00:00-03:00", timeZone: "America/Santiago", confirmedAt: "2026-10-19T18:00:00-03:00" },
  { id: "shift-history-day-2", source, kind: "day", startsAt: "2026-10-22T08:00:00-03:00", endsAt: "2026-10-22T17:00:00-03:00", timeZone: "America/Santiago", confirmedAt: "2026-10-21T18:00:00-03:00" },
  { id: "shift-history-evening", source, kind: "evening", startsAt: "2026-10-24T14:00:00-03:00", endsAt: "2026-10-24T23:00:00-03:00", timeZone: "America/Santiago", confirmedAt: "2026-10-23T18:00:00-03:00" },
];

const rests: NextRest[] = [
  { id: "rest-history-day-1", source, shiftId: shifts[0].id, startsAt: "2026-10-20T23:30:00-03:00", endsAt: "2026-10-21T06:30:00-03:00", confirmedAt: "2026-10-19T18:00:00-03:00", shiftTransition: null },
  { id: "rest-history-day-2", source, shiftId: shifts[1].id, startsAt: "2026-10-22T23:30:00-03:00", endsAt: "2026-10-23T06:30:00-03:00", confirmedAt: "2026-10-21T18:00:00-03:00", shiftTransition: null },
  { id: "rest-history-evening", source, shiftId: shifts[2].id, startsAt: "2026-10-25T00:30:00-03:00", endsAt: "2026-10-25T08:00:00-03:00", confirmedAt: "2026-10-23T18:00:00-03:00", shiftTransition: { from: "day", to: "evening" } },
];

const constraints: Constraint[] = [
  { id: "constraint-history-day-1-on-call", source, restId: rests[0].id, kind: "on_call", description: "Guardia vigente; las alertas exigidas se mantienen.", isActive: true, confirmedAt: "2026-10-19T18:00:00-03:00" },
  { id: "constraint-history-day-2-on-call", source, restId: rests[1].id, kind: "on_call", description: "Guardia vigente; las alertas exigidas se mantienen.", isActive: true, confirmedAt: "2026-10-21T18:00:00-03:00" },
  { id: "constraint-history-evening-on-call", source, restId: rests[2].id, kind: "on_call", description: "Guardia vigente; las alertas exigidas se mantienen.", isActive: true, confirmedAt: "2026-10-23T18:00:00-03:00" },
  { id: "constraint-history-evening-family", source, restId: rests[2].id, kind: "family", description: "La franja previa estuvo ocupada por una obligación familiar.", isActive: true, confirmedAt: "2026-10-23T18:00:00-03:00" },
];

const barriers: Barrier[] = rests.map((rest) => ({ id: `barrier-${rest.id}`, source, restId: rest.id, kind: "work_check", description: "Revisó tickets voluntariamente después de cerrar.", reportedAt: rest.confirmedAt }));

const action = "Anota un pendiente y cuándo retomarlo antes de terminar la revisión voluntaria.";
const experiments: Experiment[] = rests.map((rest, index) => ({
  id: `experiment-${rest.id}`,
  source,
  restId: rest.id,
  barrierId: barriers[index].id,
  state: "closed",
  currentVersion: 1,
  versions: [{ version: 1, action, moment: "Al cerrar el notebook, antes del próximo descanso confirmado.", rationale: "Registro sintético histórico.", constraintIds: constraints.filter((constraint) => constraint.restId === rest.id).map((constraint) => constraint.id), observationPrompt: "Registrar lo ocurrido.", createdAt: rest.confirmedAt }],
}));

const observations: Observation[] = [
  { id: "observation-history-day-1", source, experimentId: experiments[0].id, experimentVersion: 1, completion: "yes", sleepEstimateMinutes: 330, event: "late_bedtime", recordedAt: "2026-10-21T08:00:00-03:00" },
  { id: "observation-history-day-2", source, experimentId: experiments[1].id, experimentVersion: 1, completion: "partial", sleepEstimateMinutes: 345, event: "interruption", recordedAt: "2026-10-23T08:00:00-03:00" },
  { id: "observation-history-evening", source, experimentId: experiments[2].id, experimentVersion: 1, completion: "no", sleepEstimateMinutes: null, event: "other", recordedAt: "2026-10-25T09:00:00-03:00" },
];

export function historicalRecords(): Pick<AdaptiveCycleStore, "shifts" | "rests" | "constraints" | "barriers" | "experiments" | "observations"> {
  return { shifts: [...shifts], rests: [...rests], constraints: [...constraints], barriers: [...barriers], experiments: [...experiments], observations: [...observations] };
}
