# Runbook de demo — ciclo adaptativo

## Preflight

1. Ejecutar la versión local y pulsar **Reiniciar escenario sintético**.
2. Confirmar turno Día, pantalla “¿Qué dificultó tu último descanso?” y Registros cerrado.
3. Si habrá IA en vivo, poner `GEMINI_API_KEY` sólo en `.env.local`. Tener listo el camino sin proveedor.

## Recorrido central

1. Pulsar **Restaurar punto de bifurcación** y mostrar la acción acordable.
2. Pulsar **Aceptar esta acción** y luego **Registrar después de despertar**.
3. Para una bifurcación reproducible, reiniciar el punto y usar **Simular: misma hora**. Mostrar que pregunta qué ocupó el tiempo disponible.
4. Pulsar **Reiniciar escenario sintético**, restaurar el punto y usar **Simular: tardó en conciliar**. Mostrar que explora ese intervalo sin diagnosticar.
5. Pulsar **Solicitar revisión IA en vivo**. Si falla, decir: “No hubo revisión nueva; el plan y el registro manual siguen disponibles.”
6. Abrir **Registros** y volver con **Volver al ciclo**.

## Recuperaciones

- Para ruido externo: declarar “Hubo ruido de construcción”, confirmar **Otra traba fuera de estas dos acciones** y mostrar el reconocimiento de límite.
- Para reiniciar sólo la demo: **Reiniciar escenario sintético**.
- Si hubo una recarga durante carga: la interfaz indica que la revisión fue interrumpida y permite pedirla otra vez.
