# Etapa 1 — ciclo completo sin IA

La rama `stage/0-adaptive-cycle` entrega un recorrido local y determinístico para probar el ciclo de producto con datos sintéticos. No llama a proveedores ni usa credenciales.

## Recorrido disponible

1. Confirmar un turno de día, tarde o noche y ver el próximo descanso con horarios explícitos.
2. Partir de una traba declarada y una restricción de guardia, recibir una propuesta del catálogo y aceptarla, ajustarla o descartarla.
3. Registrar al despertar la realización de la acción, una duración estimada o desconocida y una traba posterior.
4. Consultar la tarjeta de evolución y responder una aclaración determinística antes de adaptar, mantener o guardar el avance.

El cambio de turno pausa un experimento acordado y conserva el registro anterior; nunca traslada automáticamente sus horarios al turno nuevo. Rechazar una propuesta guarda el motivo sin crear una observación de incumplimiento. La duración desconocida se conserva como `null`.

## Persistencia y demo

El estado se guarda sólo en el navegador bajo `snoozeops-adaptive-cycle-v1`, separado del almacenamiento del MVP de relevo. Al recargar, se recupera el experimento y la observación existentes. Un mismo experimento acordado no admite dos observaciones del mismo registro.

Los controles de demostración permiten cargar un escenario sintético, simular las dos ramas de resultado y reiniciar explícitamente los datos de esta nueva demo. Una vez registrada una rama, no se puede registrar la alternativa sin reiniciar, evitando mezclar resultados.

## Límites de esta entrega

- Las propuestas proceden de un catálogo local y determinístico; no hay IA.
- La tarjeta no atribuye el resultado a la intervención ni calcula una mejora de sueño.
- La aplicación no lee ni modifica alertas, turnos, tickets, calendarios ni datos reales.
- La interfaz permite como máximo dos aclaraciones en el reducer y siempre ofrece guardar y retomar, sin bucles de preguntas.
