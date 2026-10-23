import { shifts } from "@/data/fixtures";
import type { ShiftKind, ShiftPlan } from "@/domain/types";

export function getShiftPlan(shift: ShiftKind): ShiftPlan {
  return shifts[shift];
}

export function handoffSummary(shift: ShiftPlan): string {
  return `No hay incidentes críticos activos. Vigilar latencia de reportes; los otros pendientes pueden esperar hasta las ${shift.endsAt}.`;
}
