# Track 2 — Implementación y puerta técnica

**Rama:** `post-mvp/trust-surface`  
**Base:** `c854302` (`post-mvp/foundation-validation`), con `checkpoint-2-mvp` (`83b7e3c`) como base congelada del MVP.  
**Fecha:** 23 de octubre de 2026  
**Alcance:** superficie local de confianza; datos sintéticos y rutas determinísticas.

## Auditoría previa

El baseline pasó `npm run lint`, `npm run typecheck`, `npm test` y `npm run build` antes de los cambios. Tenía una fuente de verdad adecuada en `DemoState` y el reducer ya reiniciaba relevo, activación y simulación al cambiar de turno. Se conservaron severidades, destinatarios, timeout simulado y reglas de `evaluateIncident`.

Se corrigieron únicamente derivación, contenido, presentación y accesibilidad: el copy que implicaba vencimiento, cobertura absoluta, sueño medido o ausencia total de alertas; la ausencia de un recibo factual; y el foco del diálogo de simulación.

## Entregables implementados

- `getCoverageSummary` deriva `unavailable`, `pending`, `accepted_pending_activation`, `complete`, `filtered_uncovered` e `invalid` sin agregar `coverage` al estado persistido.
- La tabla de cobertura está cubierta por pruebas unitarias, incluida la invariante de que `complete` requiere aceptación y activación protegida.
- El pasaporte reutilizable muestra estado factual, ventana, responsables, aceptación, revisión, regla, siguiente acción y marca `DEMO · DATOS SINTÉTICOS`.
- La activación protegida y la guardia filtrada muestran sus excepciones y fallback sintético sin prometer ausencia de interrupciones.
- El simulador presenta escenario, severidad, confianza, impacto, regla, estado y responsable derivados de `RoutingDecision`; los atajos de confirmación/timeout quedan identificados como demo.
- Mañana incluye un recibo histórico de activación y distingue minutos reservados de sueño real. Los incidentes agrupados se presentan como pendientes, no como resueltos o como “sin alertas”.
- El diálogo enfoca su título al abrirse, cierra con `Escape`, devuelve el foco al botón de apertura y anuncia sólo el estado breve de conectividad.

## Evidencia y límites

Se reutilizó la evidencia publicada ya documentada en `TRACK_2_PASAPORTE_RELEVO.md` (Google SRE, WCAG 2.2 y revisión de handoffs). No se realizó investigación primaria, no se usaron datos personales y no se incorporaron integraciones, notificaciones, vencimiento real ni IA. La implementación acredita consistencia y trazabilidad del artefacto; no acredita comprensión, aceptación, confianza, sueño ni eficacia operacional.

## Verificación y decisión

La puerta técnica queda aprobada para revisión interna cuando pasan los cuatro comandos de calidad y el diff permanece en esta rama. La decisión de producto es **conservar la hipótesis de superficie de confianza e iterar internamente**; no se habilita un piloto ni una integración real. La siguiente exploración debe pertenecer a Track 3 y resolver autorización, expiración, sustitución y operación real antes de ampliar las promesas.
