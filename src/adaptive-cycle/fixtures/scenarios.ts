import type { Barrier, ConfirmedShift, Constraint, NextRest, ShiftKind } from "@/adaptive-cycle/domain/types";

type ScenarioContext = {
  shift: ConfirmedShift;
  rest: NextRest;
  constraint: Constraint;
  barrier: Barrier;
};

const contexts: Record<ShiftKind, ScenarioContext> = {
  day: {
    shift: {
      id: "shift-synthetic-day-2026-10-27",
      source: "synthetic",
      kind: "day",
      startsAt: "2026-10-27T08:00:00-03:00",
      endsAt: "2026-10-27T17:00:00-03:00",
      timeZone: "America/Santiago",
      confirmedAt: "2026-10-26T18:00:00-03:00",
    },
    rest: {
      id: "rest-synthetic-day-2026-10-27",
      source: "synthetic",
      shiftId: "shift-synthetic-day-2026-10-27",
      startsAt: "2026-10-27T23:30:00-03:00",
      endsAt: "2026-10-28T06:30:00-03:00",
      confirmedAt: "2026-10-26T18:00:00-03:00",
      shiftTransition: null,
    },
    constraint: {
      id: "constraint-synthetic-day-on-call",
      source: "synthetic",
      restId: "rest-synthetic-day-2026-10-27",
      kind: "on_call",
      description: "Mantiene las alertas que la guardia exige atender durante esta franja.",
      isActive: true,
      confirmedAt: "2026-10-26T18:00:00-03:00",
    },
    barrier: {
      id: "barrier-synthetic-day-work-check",
      source: "synthetic",
      restId: "rest-synthetic-day-2026-10-27",
      kind: "work_check",
      interpretationSource: "deterministic",
      description: "Después de cerrar el notebook vuelve a revisar tickets voluntariamente.",
      reportedAt: "2026-10-26T18:01:00-03:00",
    },
  },
  evening: {
    shift: {
      id: "shift-synthetic-evening-2026-10-27",
      source: "synthetic",
      kind: "evening",
      startsAt: "2026-10-27T14:00:00-03:00",
      endsAt: "2026-10-27T23:00:00-03:00",
      timeZone: "America/Santiago",
      confirmedAt: "2026-10-26T18:00:00-03:00",
    },
    rest: {
      id: "rest-synthetic-evening-2026-10-27",
      source: "synthetic",
      shiftId: "shift-synthetic-evening-2026-10-27",
      startsAt: "2026-10-28T00:30:00-03:00",
      endsAt: "2026-10-28T08:00:00-03:00",
      confirmedAt: "2026-10-26T18:00:00-03:00",
      shiftTransition: { from: "day", to: "evening" },
    },
    constraint: {
      id: "constraint-synthetic-evening-on-call",
      source: "synthetic",
      restId: "rest-synthetic-evening-2026-10-27",
      kind: "on_call",
      description: "Mantiene las alertas que la guardia exige atender durante esta franja.",
      isActive: true,
      confirmedAt: "2026-10-26T18:00:00-03:00",
    },
    barrier: {
      id: "barrier-synthetic-evening-work-check",
      source: "synthetic",
      restId: "rest-synthetic-evening-2026-10-27",
      kind: "work_check",
      interpretationSource: "deterministic",
      description: "Después de cerrar el notebook vuelve a revisar tickets voluntariamente.",
      reportedAt: "2026-10-26T18:01:00-03:00",
    },
  },
  night: {
    shift: {
      id: "shift-synthetic-night-2026-10-27",
      source: "synthetic",
      kind: "night",
      startsAt: "2026-10-27T22:00:00-03:00",
      endsAt: "2026-10-28T07:00:00-03:00",
      timeZone: "America/Santiago",
      confirmedAt: "2026-10-26T18:00:00-03:00",
    },
    rest: {
      id: "rest-synthetic-night-2026-10-27",
      source: "synthetic",
      shiftId: "shift-synthetic-night-2026-10-27",
      startsAt: "2026-10-28T09:00:00-03:00",
      endsAt: "2026-10-28T15:00:00-03:00",
      confirmedAt: "2026-10-26T18:00:00-03:00",
      shiftTransition: { from: "evening", to: "night" },
    },
    constraint: {
      id: "constraint-synthetic-night-on-call",
      source: "synthetic",
      restId: "rest-synthetic-night-2026-10-27",
      kind: "on_call",
      description: "Mantiene las alertas que la guardia exige atender durante esta franja.",
      isActive: true,
      confirmedAt: "2026-10-26T18:00:00-03:00",
    },
    barrier: {
      id: "barrier-synthetic-night-work-check",
      source: "synthetic",
      restId: "rest-synthetic-night-2026-10-27",
      kind: "work_check",
      interpretationSource: "deterministic",
      description: "Después de cerrar el notebook vuelve a revisar tickets voluntariamente.",
      reportedAt: "2026-10-26T18:01:00-03:00",
    },
  },
};

export const shiftLabels: Record<ShiftKind, string> = {
  day: "Día",
  evening: "Tarde",
  night: "Noche",
};

export function getSyntheticScenario(shift: ShiftKind): ScenarioContext {
  return contexts[shift];
}
