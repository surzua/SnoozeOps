import type { ShiftPlan, Ticket } from "@/domain/types";

export const rodrigo = {
  name: "Rodrigo Salas",
  firstName: "Rodrigo",
  role: "Soporte TI",
  location: "Concepción",
} as const;

export const andrea = {
  name: "Andrea Rojas",
  firstName: "Andrea",
  role: "Soporte TI · relevo",
} as const;

export const shifts: Record<ShiftPlan["kind"], ShiftPlan> = {
  day: {
    kind: "day",
    label: "Día",
    workHours: "08:00–17:00",
    usualWindow: "00:30–06:30",
    usualDuration: "6 h",
    proposedWindow: "23:30–06:30",
    proposedDuration: "7 h",
    startsAt: "23:30",
    endsAt: "06:30",
    lastCoffeeAt: "18:30",
    coffeeContext: "Hoy registramos uno a las 19:20.",
  },
  night: {
    kind: "night",
    label: "Noche",
    workHours: "22:00–07:00",
    usualWindow: "09:00–14:00",
    usualDuration: "5 h",
    proposedWindow: "08:30–14:30",
    proposedDuration: "6 h",
    startsAt: "08:30",
    endsAt: "14:30",
    lastCoffeeAt: "03:30",
  },
};

export const tickets: Ticket[] = [
  {
    id: "OPS-2417",
    priority: "P2",
    title: "Reportes internos lentos",
    status: "Estable desde las 22:40",
  },
  {
    id: "OPS-2418",
    priority: "P3",
    title: "Correos de recuperación tardan",
    status: "Sin usuarios bloqueados",
  },
  {
    id: "OPS-2419",
    priority: "P3",
    title: "Renovar certificado",
    status: "Programado para las 10:00",
  },
];
