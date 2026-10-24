# Pitch vigente — SnoozeOps

La demo vigente es el **ciclo adaptativo de descanso** con datos sintéticos. El guion cronometrado y el procedimiento de presentación viven en [docs/pitch/PITCH.md](docs/pitch/PITCH.md) y [docs/pitch/DEMO-RUNBOOK.md](docs/pitch/DEMO-RUNBOOK.md).

## Idea central

SnoozeOps ayuda a Rodrigo, una persona TI con turnos rotativos, a identificar una traba de su próximo descanso, acordar una sola acción viable y revisar lo ocurrido sin inventar disponibilidad, medir sueño ni afirmar causalidad.

La revisión IA es opcional y acotada: puede mantener explícitamente la acción vigente, pedir una aclaración, proponer una acción distinta del catálogo o abstenerse. Siempre separa lo declarado, lo inferido y lo desconocido. Rodrigo responde las aclaraciones y confirma cualquier acción propuesta.

## Límites para la demo

- Datos, historial y saltos temporales sintéticos.
- La duración es una estimación declarada, no una medición.
- Una observación no prueba que la intervención causó un cambio de sueño.
- La aplicación no modifica guardias, alertas, turnos, tickets ni políticas laborales.
- Las comparaciones exigen mismo turno y franja, sin transición de turno y con contexto confirmado equivalente.
