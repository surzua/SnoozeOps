import type { AdaptiveCycleStore } from "@/adaptive-cycle/domain/types";

/**
 * Escenario semilla exclusivamente sintético para validar el contrato.
 * No se carga en la demo congelada ni representa datos de una persona real.
 */
export const initialAdaptiveScenario = {
  schemaVersion: 2,
  source: "synthetic",
  shifts: [
    {
      id: "shift-synthetic-day-2026-10-27",
      source: "synthetic",
      kind: "day",
      startsAt: "2026-10-27T08:00:00-03:00",
      endsAt: "2026-10-27T17:00:00-03:00",
      timeZone: "America/Santiago",
      confirmedAt: "2026-10-26T18:00:00-03:00",
    },
  ],
  rests: [
    {
      id: "rest-synthetic-day-2026-10-27",
      source: "synthetic",
      shiftId: "shift-synthetic-day-2026-10-27",
      startsAt: "2026-10-27T23:30:00-03:00",
      endsAt: "2026-10-28T06:30:00-03:00",
      confirmedAt: "2026-10-26T18:00:00-03:00",
    },
  ],
  constraints: [
    {
      id: "constraint-synthetic-on-call",
      source: "synthetic",
      restId: "rest-synthetic-day-2026-10-27",
      kind: "on_call",
      description: "La persona conserva las alertas que su guardia exige atender.",
      isActive: true,
      confirmedAt: "2026-10-26T18:00:00-03:00",
    },
  ],
  barriers: [
    {
      id: "barrier-synthetic-work-check",
      source: "synthetic",
      restId: "rest-synthetic-day-2026-10-27",
      kind: "work_check",
      description: "La persona declara que vuelve a revisar tickets después de cerrar el notebook.",
      reportedAt: "2026-10-26T18:01:00-03:00",
    },
  ],
  experiments: [],
  observations: [],
  reviews: [],
  analyses: [],
} satisfies AdaptiveCycleStore;
