# Q&A — SnoozeOps

Cada respuesta está pensada para 20–30 segundos. La evidencia indica la pantalla o regla que se puede mostrar si se pide profundizar.

| Pregunta | Respuesta corta | Evidencia demostrable |
| --- | --- | --- |
| ¿Por qué Rodrigo usaría esto si abandonó su reloj? | El reloj le mostraba el problema después de ocurrir. SnoozeOps interviene antes de dormir sobre la causa inmediata: no sabe si puede dejar la guardia. El relevo visible convierte esa incertidumbre en una decisión concreta. | Plan y aceptación de Andrea. |
| ¿Cómo saben que dormirá una hora más? | No lo afirmamos. El MVP reserva 60 minutos de ventana protegida, no mide sueño real. Una validación posterior, con consentimiento y fuera de la hackatón, compararía hora declarada de acostarse, activación de relevo y descanso reportado contra la propia línea base por turno. | Pantalla de mañana: “+60 min reservados para descansar” y “Sueño real no medido”. |
| ¿Dónde está la IA? | Esta versión no ejecuta un LLM ni una API de IA. Priorizamos un motor local, offline y seguro para la decisión crítica. La Fase 6 de producto propone como evolución un resumen de pendientes, detección de información faltante y propuesta explicable de severidad, siempre con revisión humana y reglas determinísticas como autoridad de seguridad. | Intro del simulador para demostrar el motor actual; `docs/product/FASE_6.md` sólo como propuesta futura, no como funcionalidad de la demo. |
| ¿La IA podría silenciar una alerta crítica? | No en el diseño objetivo. Ninguna propuesta automática basta para silenciar; ante alerta crítica, ambigua, desconocida o de baja confianza, la regla es escalar. La demo enseña esa ruta conservadora sin depender de IA. | P1 sintético y regla de interrupción. |
| ¿Qué pasa si Andrea no puede cubrir? | SnoozeOps no promete Sueño protegido. Expone cobertura incompleta y permite Guardia filtrada: los incidentes críticos o ambiguos llegan directamente a Rodrigo. | Respuesta “No puedo cubrir” y pantalla Guardia filtrada. |
| ¿Por qué no integraron WhatsApp? | Primero validamos el mecanismo de comportamiento: cierre, aceptación y escalamiento claro. Una integración real añade privacidad, autenticación y riesgo técnico, sin demostrar mejor ese mecanismo en dos días. | Demo local sin credenciales; límites del README. |
| ¿Esto no es otro sistema de tickets? | El ticket es el gatillo, no el fin. El producto actúa al ir a dormir y durante la transferencia de responsabilidad; la métrica de producto es una ventana adicional reservada para descansar, no productividad de tickets. | Flujo de cierre y comparación de ventanas. |

## Respuestas de control

**¿El modo offline desconecta internet?** No. El switch sólo representa un estado visual de la demo; el motor ya es local y determinístico, y sus decisiones no cambian.

**¿Qué significa el plazo simulado de Andrea?** Los botones representan el resultado del plazo operacional de 60 segundos sin esperar un minuto real. Es un atajo de demo, no mensajería ni sincronización real.
