# Runbook de demo — SnoozeOps

## Estado inicial y preflight

1. Abrir la versión local en el navegador principal y en un navegador o dispositivo de respaldo.
2. Pulsar el wordmark **SnoozeOps** para ejecutar Hard Reset.
3. Confirmar: turno Día, Pantalla 1, relevo no solicitado, simulador cerrado, red simulada desactivada e historiales vacíos.
4. Cerrar notificaciones, terminales, pestañas irrelevantes y cualquier ventana con información personal.
5. Tener el video corto local disponible sólo como contingencia, sin abrirlo. Ensayar el recorrido con cronómetro y detenerse a los 4:45.

## Recorrido principal del pitch

1. En **Tu próximo turno**, mantener Día y seleccionar **Preparar mi descanso**.
2. En el plan, seleccionar **Revisar y cerrar mi guardia**.
3. Mostrar pendientes y resumen; seleccionar **Solicitar relevo a Andrea**.
4. En Demo controlada, seleccionar **Aceptar relevo**; luego **Activar sueño protegido**.
5. Seleccionar **Ver actividad**.
6. Bajo **Escenario habitual**, seleccionar **Simular cambio de contraseña · P3**. Señalar que se agrupa para revisión.
7. Bajo **Prueba de seguridad · escenario sintético**, seleccionar **Simular base de datos caída · P1**.
8. Seleccionar **Simular que Andrea no responde**. Aclarar que representa el plazo de 60 segundos y mostrar que se alerta a Rodrigo.
9. Seleccionar **Simular la mañana**. Mostrar sólo el P3 del escenario habitual y la ventana con **+60 min reservados para descansar**.

## Ensayos obligatorios

Ejecutar cada recorrido tres veces seguidas, empezando con Hard Reset y comprobando que no queda estado heredado.

| Recorrido | Pasos | Resultado esperado |
| --- | --- | --- |
| Noche habitual | Aceptar relevo → Sueño protegido → P3 → mañana. | P3 agrupado y pendiente de revisión; mañana no incorpora P1. |
| Prueba confirmada | Aceptar relevo → Sueño protegido → P1 → Andrea confirma. | Andrea asume el P1; Rodrigo no recibe alerta por la prueba. |
| Escalamiento conservador | Aceptar relevo → Sueño protegido → P1 → Andrea no responde. | Rodrigo recibe alerta crítica simulada; la prueba no se mezcla con el escenario habitual. |

## Recuperación

| Problema | Acción inmediata | Qué decir |
| --- | --- | --- |
| Estado incorrecto o simulador abierto | Pulsar wordmark y retomar Pantalla 1. | “Reinicio el escenario sintético.” |
| Navegador o URL falla | Abrir la versión local en el entorno de respaldo. | Mantener la demo en vivo como primera alternativa. |
| Ambos entornos fallan | Reproducir el video local y narrar el guion. | “Este es el respaldo; la demo en vivo fue la ruta prevista.” |
| Pregunta fuera de alcance | Volver a tesis, límite y siguiente validación. | No inventar métricas, integración ni evidencia clínica. |
