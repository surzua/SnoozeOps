# Runbook de demo — ciclo adaptativo

## Preflight

1. Ejecutar la versión local y pulsar **Reiniciar escenario sintético**.
2. Confirmar turno Día, pantalla “¿Qué dificultó tu último descanso?” y Registros cerrado.
3. Si habrá IA en vivo, poner `GEMINI_API_KEY` sólo en `.env.local`. Tener listo el camino sin proveedor.

## Recorrido central

1. Pulsar **Restaurar punto de bifurcación** y mostrar la acción acordable.
2. Restaurar ya deja la acción aceptada. Para demostrar el formulario, pulsar **Registrar después de despertar →**; para usar una simulación, quedarse en el estado de acción acordada.
3. Para una bifurcación reproducible, pulsar **Restaurar punto de bifurcación** y luego **Simular: misma hora**. Mostrar que pregunta qué ocupó el tiempo disponible.
4. Pulsar **Restaurar punto de bifurcación** y luego **Simular: tardó en conciliar**. Mostrar que explora ese intervalo sin diagnosticar. Ambas preguntas son deterministas; no atribuirlas al modelo.
5. Pulsar **Solicitar revisión IA en vivo**. Si falla, decir: “No hubo revisión nueva; el plan y el registro manual siguen disponibles.”
6. Abrir **Registros** y volver con **Volver al ciclo**.

## Recorrido recomendado para el pitch final

Seguir [PITCH_CICLO_ADAPTATIVO_FINAL.md](PITCH_CICLO_ADAPTATIVO_FINAL.md). Como resumen: apertura breve → app → cierre breve. Preparar manualmente la categoría **Revisión voluntaria de tickets**, aceptar y registrar **Sí**, **360 minutos**, **Intenté dormir a la misma hora**. Guardar una aclaración concreta antes de solicitar la IA. Hacer una sola llamada en el pitch y describir su resultado real. Después restaurar y simular la dificultad para conciliar. Registros queda opcional según el tiempo.

Compartir la ventana completa del navegador. Llevar la vista arriba tras cambiar de pantalla si conserva el desplazamiento. Tener la versión local abierta como respaldo y probar la IA en producción antes de presentar. En la revisión local hubo una respuesta generada y otra solicitud rechazada por el proveedor con HTTP 503; no depender de una acción específica del modelo.

## Recuperaciones

- Para ruido externo: declarar “Hubo ruido de construcción”, confirmar **Otra traba fuera de estas dos acciones** y mostrar el reconocimiento de límite.
- Para reiniciar sólo la demo: **Reiniciar escenario sintético**.
- Si hubo una recarga durante carga: la interfaz indica que la revisión fue interrumpida y permite pedirla otra vez.
