import type { MorningMetrics, ShiftPlan } from "@/domain/types";

type TimeWindow = Pick<ShiftPlan, "usualWindow" | "proposedWindow">;

function minutesFromTime(value: string): number {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) throw new Error(`Hora inválida: ${value}`);

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) throw new Error(`Hora inválida: ${value}`);

  return hours * 60 + minutes;
}

export function durationInMinutes(window: string): number {
  const [start, end, ...rest] = window.split("–");
  if (!start || !end || rest.length > 0) throw new Error(`Ventana inválida: ${window}`);

  const startMinutes = minutesFromTime(start);
  const endMinutes = minutesFromTime(end);
  return endMinutes <= startMinutes ? endMinutes + 24 * 60 - startMinutes : endMinutes - startMinutes;
}

export function getMorningMetrics({ usualWindow, proposedWindow }: TimeWindow): MorningMetrics {
  const usualDurationMinutes = durationInMinutes(usualWindow);
  const proposedDurationMinutes = durationInMinutes(proposedWindow);

  return {
    usualWindow,
    proposedWindow,
    usualDurationMinutes,
    proposedDurationMinutes,
    minutesReserved: proposedDurationMinutes - usualDurationMinutes,
  };
}
