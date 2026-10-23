import type { CoverageSummary, DemoState, HandoffStatus, ShiftPlan } from "@/domain/types";

type CoverageInput = Pick<DemoState, "handoffStatus" | "activationMode">;

const base = (shift: ShiftPlan): Pick<CoverageSummary, "windowStart" | "windowEnd" | "reviewAt" | "groupedReviewOwner"> => ({
  windowStart: shift.startsAt,
  windowEnd: shift.endsAt,
  reviewAt: shift.endsAt,
  groupedReviewOwner: "Revisión al cierre",
});

function summary(
  shift: ShiftPlan,
  values: Omit<CoverageSummary, "windowStart" | "windowEnd" | "reviewAt" | "groupedReviewOwner">,
): CoverageSummary {
  return { ...base(shift), ...values };
}

export function getCoverageSummary(state: CoverageInput, shift: ShiftPlan): CoverageSummary {
  const { handoffStatus, activationMode } = state;

  if (handoffStatus === "accepted" && activationMode === "protected") {
    return summary(shift, {
      status: "complete",
      mode: "protected",
      label: "Cobertura completa para la ventana modelada",
      detail: "Andrea aceptó y Rodrigo activó el modo protegido. Esto no significa silencio total ni operación real.",
      currentOwner: "Andrea",
      interruptionRule: "P1, ambigua, de baja confianza o con impacto creciente escala primero a Andrea; el fallback simulado puede llegar a Rodrigo.",
      nextAction: "Revisar actividad sintética o simular la mañana",
      reason: "Relevo aceptado y modo protegido activado.",
    });
  }

  if (handoffStatus === "accepted" && activationMode === "none") {
    return summary(shift, {
      status: "accepted_pending_activation",
      mode: "none",
      label: "Relevo aceptado; activación pendiente",
      detail: "Andrea aceptó, pero Rodrigo conserva la responsabilidad hasta activar el modo protegido.",
      currentOwner: "Rodrigo",
      interruptionRule: "Sin activación, no se modifica el enrutamiento de la guardia.",
      nextAction: "Activar modo protegido",
      reason: "Andrea aceptó el relevo, pero la ventana aún no fue activada.",
    });
  }

  if (handoffStatus === "pending" && activationMode === "none") {
    return summary(shift, {
      status: "pending",
      mode: "none",
      label: "Solicitud pendiente",
      detail: "La solicitud sigue pendiente en esta simulación; no se modela vencimiento ni falta de respuesta.",
      currentOwner: "Rodrigo",
      interruptionRule: "Rodrigo conserva P1 y casos ambiguos hasta una aceptación y activación válidas.",
      nextAction: "Esperar una respuesta simulada o continuar con guardia filtrada",
      reason: "La solicitud fue enviada y todavía no tiene una respuesta modelada.",
    });
  }

  if ((handoffStatus === "pending" || handoffStatus === "declined") && activationMode === "filtered") {
    return summary(shift, {
      status: "filtered_uncovered",
      mode: "filtered",
      label: "Guardia filtrada sin cobertura",
      detail: "No hay relevo aceptado; sólo se agrupan casos permitidos por el motor.",
      currentOwner: "Rodrigo",
      interruptionRule: "P1, ambiguas, de baja confianza o con impacto creciente llegan a Rodrigo; P2/P3 estables quedan para revisión.",
      nextAction: "Revisar actividad sintética o simular la mañana",
      reason: handoffStatus === "declined"
        ? "El relevo fue rechazado y se activó la guardia filtrada."
        : "La solicitud sigue pendiente y se activó la guardia filtrada sin relevo aceptado.",
    });
  }

  if (handoffStatus === "not_requested" && activationMode === "none") {
    return summary(shift, {
      status: "unavailable",
      mode: "none",
      label: "Sin relevo disponible",
      detail: "Aún no hay relevo solicitado o aceptado para esta ventana.",
      currentOwner: "Rodrigo",
      interruptionRule: "Rodrigo mantiene P1 y casos ambiguos; no se promete cobertura.",
      nextAction: "Solicitar relevo a Andrea",
      reason: "No se ha solicitado un relevo para esta ventana.",
    });
  }

  if (handoffStatus === "declined" && activationMode === "none") {
    return summary(shift, {
      status: "unavailable",
      mode: "none",
      label: "Relevo no disponible",
      detail: "Andrea no aceptó esta ventana; no existe cobertura completa.",
      currentOwner: "Rodrigo",
      interruptionRule: "Rodrigo mantiene la guardia y recibe las rutas conservadoras.",
      nextAction: "Activar guardia filtrada o volver a solicitar relevo",
      reason: "El relevo fue rechazado y todavía no hay otro modo activo.",
    });
  }

    return summary(shift, {
    status: "invalid",
    mode: activationMode,
    label: "Estado de relevo inconsistente",
    detail: "La combinación actual no permite afirmar cobertura; se conserva la ruta manual segura.",
    currentOwner: "Rodrigo",
    interruptionRule: "No se aplica una promesa de cobertura; Rodrigo debe revisar manualmente.",
    nextAction: "Reiniciar la demo y revisar el estado",
    reason: `Combinación no válida: ${handoffStatus} + ${activationMode}.`,
  });
}

export function isCompleteCoverage(state: CoverageInput): boolean {
  return state.handoffStatus === ("accepted" satisfies HandoffStatus) && state.activationMode === "protected";
}
