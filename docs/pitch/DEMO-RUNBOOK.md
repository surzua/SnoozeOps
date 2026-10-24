# Runbook de demo — ciclo adaptativo

## Preflight

1. Abrir la versión local y pulsar **Reiniciar escenario sintético** en Controles de demostración.
2. Confirmar: turno Día, pantalla «¿Qué te impidió descansar ayer?», sin propuesta activa y Registros cerrado.
3. Si se mostrará IA en vivo, configurar `GEMINI_API_KEY` sólo en `.env.local`; tener presente el recorrido sin proveedor.
4. Cerrar notificaciones y cualquier información personal. Usar sólo fixtures sintéticas.

## Recorrido principal

1. Mantener **Día** y seleccionar **Ver una propuesta concreta**.
2. Mostrar acción, motivo, límites de guardia y dato a observar; seleccionar **Aceptar esta acción**.
3. Seleccionar **Registrar después de despertar**.
4. Registrar: acción **Sí**, duración **360** estimada y «Cerré antes, pero intenté dormir a la misma hora».
5. Mostrar la tarjeta: lo registrado no prueba una causa.
6. Seleccionar **Solicitar revisión IA en vivo**. Si llega una aclaración, responderla, guardar y pedir una nueva revisión. Si llega una acción, usar **Revisar esta acción antes de acordarla** y confirmar desde la propuesta.
7. Abrir **Registros**, mostrar las condiciones de comparación y seleccionar **Volver al ciclo**. Debe volver a la evolución, no a una pantalla vacía.
8. Seleccionar **Guardar y retomar después**; desde Preparar, usar **Retomar el experimento guardado**.

## Recorridos de recuperación

| Situación | Acción | Mensaje |
| --- | --- | --- |
| Proveedor no disponible o salida inválida | Seguir con tarjeta, registro y aclaración determinística. | “No hubo una revisión nueva; el ciclo manual sigue disponible.” |
| Se abrió Registros en una propuesta o revisión | Seleccionar **Volver al ciclo**. | “La navegación conserva el punto del experimento.” |
| Revisión pausada | Seleccionar **Retomar el experimento guardado**. | “Retomamos el registro sin inventar una propuesta.” |
| Estado inesperado | Usar **Reiniciar escenario sintético**. | “Reinicio sólo los datos ficticios de esta demo.” |

## Ensayos obligatorios

Ejecutar tres veces desde reinicio:

1. Propuesta → aceptar → registro → revisión determinística.
2. Propuesta → aceptar → registro → IA pregunta → responder → nueva revisión.
3. Propuesta → aceptar → registro → IA propone acción → revisar → aceptación humana.

Comprobar también que un registro con transición de turno o franja distinta no aparece dentro de una comparación común.
