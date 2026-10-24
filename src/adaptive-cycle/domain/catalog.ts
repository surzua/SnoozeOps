import type { AllowedActionId, Barrier, ExperimentVersion } from "@/adaptive-cycle/domain/types";

export type CatalogAction = Pick<ExperimentVersion, "action" | "moment" | "rationale" | "observationPrompt"> & { id: AllowedActionId };

const closePending: CatalogAction = {
  id: "write-pending",
  action: "Antes de cerrar el notebook, anota un pendiente concreto y cuándo lo retomarás; después cierra la pestaña de tickets voluntarios.",
  moment: "Al terminar la revisión voluntaria y antes del próximo descanso confirmado.",
  rationale: "La traba declarada es volver a revisar tickets después de cerrar. La acción no modifica las alertas ni la disponibilidad exigida.",
  observationPrompt: "Al despertar, registra si pudiste hacerlo, cuánto estimas que dormiste y qué ocurrió.",
};

const prepareTask: CatalogAction = {
  id: "prepare-displaceable-task",
  action: "Antes de terminar el turno, deja escrita la primera tarea no urgente de mañana: qué es, dónde está y cuál es el primer paso. No la resuelvas ahora.",
  moment: "En los últimos 10 minutos del turno, antes de la franja del próximo descanso confirmado.",
  rationale: "Busca evitar que una tarea no urgente retrase el momento de acostarse, sin desplazar una obligación a otra persona.",
  observationPrompt: "Al despertar, registra si pudiste hacerlo, cuánto estimas que dormiste y qué ocurrió.",
};

export const actionCatalog = [closePending, prepareTask] as const;

export function getCatalogAction(id: AllowedActionId) {
  return actionCatalog.find((action) => action.id === id);
}

export function getDeterministicAction(barrier: Barrier, alternative = false): CatalogAction {
  if (alternative || barrier.kind === "late_bedtime") return prepareTask;
  return closePending;
}
