# SnoozeOps — pitch de checkpoint

> Borrador de trabajo. No es todavía el pitch final.

## La idea en una frase

SnoozeOps ayuda a una persona de soporte TI a cerrar su guardia con un relevo explícito, reservar una ventana concreta para descansar y conservar una ruta segura para los incidentes críticos.

## Qué hay que demostrar

En menos de cinco minutos, la audiencia debería entender tres cosas:

1. Rodrigo no necesita otro tracker: necesita dejar de vigilar producción sin perder control.
2. El descanso protegido depende de una cobertura aceptada, no de una promesa.
3. Lo crítico, ambiguo o sin confirmación no se oculta: escala de forma conservadora.

## Recorrido del MVP

Usar el navegador con la demo local. Partir desde el wordmark **SnoozeOps** para dejar el escenario limpio.

1. Seleccionar **Día** y pulsar **Preparar mi descanso**.
2. Mostrar la comparación: ventana habitual `00:30–06:30` frente a propuesta `23:30–06:30`.
3. Pulsar **Revisar y cerrar mi guardia**.
4. Mostrar los tres pendientes y el resumen para Andrea.
5. Pulsar **Solicitar relevo a Andrea**.
6. En **Demo controlada**, pulsar **Aceptar relevo**.
7. Pulsar **Activar sueño protegido**.
8. En **Ver actividad**, ejecutar primero **Simular cambio de contraseña · P3**.
9. Mostrar que el P3 queda agrupado para revisión y no se declara resuelto.
10. Ejecutar **Simular base de datos caída · P1**.
11. Pulsar **Simular que Andrea no responde** y mostrar que el P1 llega a Rodrigo.
12. Pulsar **Simular la mañana**.
13. Mostrar el P3 pendiente, la comparación de ventanas y **+60 min reservados para descansar**.

El orden importa: primero el caso habitual y después la prueba P1. La prueba P1 está rotulada como **escenario sintético** y no debe presentarse como parte de la noche habitual.

## Guion hablado — aproximadamente 4:45

### 0:00–0:35 — El problema

> “Rodrigo sabe que debería dormir. Lo que no sabe es quién vigila cuando él deja de hacerlo. Antes de acostarse vuelve a revisar tickets porque no tiene una condición creíble para soltar la guardia.”

Mostrar la pantalla inicial de SnoozeOps y el turno Día.

### 0:35–0:55 — La propuesta

> “SnoozeOps no es un tracker pasivo. Es un ritual de cierre: hace visible quién toma el relevo, durante qué ventana y qué situación volvería a interrumpir al titular.”

Pulsar **Preparar mi descanso** y mostrar la ventana habitual frente a la propuesta.

### 0:55–1:30 — La oportunidad concreta

> “La propuesta no dice que Rodrigo vaya a dormir una hora más. Reserva una hora adicional: empieza a las 23:30 en lugar de las 00:30, bajo una condición verificable: el relevo tiene que aceptar la ventana. Por eso la interfaz dice explícitamente: ‘Sueño real no medido’.”

Mostrar la pantalla de plan y el pasaporte de relevo.

### 1:30–2:10 — Entregar la responsabilidad

> “Aquí vemos los pendientes y el resumen que recibe Andrea. Rodrigo solicita el relevo; Andrea lo acepta; sólo entonces se habilita Sueño protegido. La cobertura no se declara: se deriva de una aceptación concreta para una ventana concreta.”

Solicitar el relevo, aceptar como Andrea y activar Sueño protegido.

### 2:10–3:15 — Probar la seguridad

> “Ahora abrimos la actividad de la ventana. Primero inyecto un P3 estable, una solicitud de cambio de contraseña. Se agrupa para revisión de la mañana: no se resuelve ni se descarta.”

Ejecutar el P3 y mostrar su tarjeta.

> “Después viene una prueba de seguridad sintética, separada del escenario habitual: una base de datos de producción sin responder, P1. Un crítico va primero a Andrea. El plazo de 60 segundos está simulado con este botón; no esperamos un minuto real.”

Ejecutar el P1 y pulsar **Simular que Andrea no responde**.

> “Como Andrea no confirma, la ruta conservadora escala a Rodrigo. El sistema no confundió ‘estoy durmiendo’ con ‘puedo ignorar un crítico’.”

Mostrar la alerta a Rodrigo.

### 3:15–3:45 — La mañana

> “En la mañana resumimos sólo el escenario habitual. El P3 sigue pendiente para revisión y la pantalla muestra los 60 minutos reservados. No estamos midiendo sueño ni afirmando que se evitó una interrupción real.”

Pulsar **Simular la mañana** y mostrar el resumen.

### 3:45–4:20 — La tesis

> “La tesis del MVP es simple: si la responsabilidad queda entregada, visible y con una condición de escalamiento, Rodrigo puede dejar de vigilar sin perder control sobre lo crítico. El valor no está en ocultar trabajo; está en hacer confiable el relevo.”

Dejar visible el recibo de activación y el resumen de la mañana.

### 4:20–4:45 — Cierre

> “Esta versión funciona localmente con fixtures sintéticos y reglas determinísticas. No finge WhatsApp, IA productiva ni sueño medido. Primero demostramos el mecanismo mínimo: un relevo verificable y una ruta segura. El siguiente paso es comprobar si ese mecanismo es deseable, seguro y repetible fuera de esta demo.”

## Qué está construido y qué no

### En el MVP

- Flujo de turno, plan de descanso, pendientes y solicitud de relevo.
- Aceptación o rechazo simulado de Andrea.
- Activación de **Sueño protegido** o **Guardia filtrada**.
- Motor local determinístico y offline para decidir qué se agrupa y qué escala.
- P3 habitual agrupado para revisión.
- P1 sintético escalado a Andrea y, si no confirma, a Rodrigo.
- Resumen matinal con ventana habitual, propuesta y minutos reservados.
- Datos sintéticos; sin credenciales ni servicios externos.

### Deliberadamente fuera del MVP

- Backend, cuentas, autenticación y sincronización entre personas.
- WhatsApp, mensajería real, push notifications o integración con tickets.
- IA/LLM tomando decisiones.
- Medición de sueño, wearables o diagnóstico de salud.
- Promesa de que nunca habrá interrupciones.

## Próximos pasos

La prioridad no es agregar funciones al azar. Es aumentar la evidencia sin romper la demo ni trasladar riesgo a una operación real.

### Versión breve para decir — 30–40 segundos

> “El roadmap tiene seis pasos. Primero congelamos y hacemos reproducible este MVP. Después hacemos discovery documental para separar evidencia de hipótesis. Luego construimos una superficie de confianza: un pasaporte de relevo y decisiones auditables. Con eso podemos hacer un piloto operacional pequeño, primero en sandbox o modo espejo. Sólo cuando exista trazabilidad comparamos una IA en modo sombra, para resumir o detectar información faltante, nunca para silenciar críticos. Finalmente medimos resultados, carga y seguridad para decidir si escalar, iterar o detenernos.”

El orden completo es: **base protegida → descubrimiento documental → superficie de confianza → piloto operacional → copiloto de IA responsable → resultado y escalamiento**.

### 1. Congelar la evidencia actual

- Ejecutar `npm run lint`, `npm run typecheck`, `npm test` y `npm run build`.
- Repetir tres veces cada recorrido: P3 habitual, P1 confirmado y P1 sin respuesta.
- Crear el tag `checkpoint-2-mvp` y mantener la demo presentada sin cambios.
- Preparar un video local sólo como contingencia de hardware.

### 2. Hacer discovery documental

Contrastar la tesis con fuentes públicas, revisar los límites del MVP y distinguir claramente qué es evidencia, qué es inferencia y qué todavía no ha sido validado con personas. No presentar esta etapa como investigación de usuarios.

### 3. Hacer visible y auditable el relevo

Primera evolución de producto: un pasaporte de relevo más explícito, con responsable, ventana, pendientes, política aplicada, confirmaciones y condición de escalamiento. La cobertura debe derivarse de estados verificables; ninguna pantalla debe declarar cobertura completa sin aceptación válida.

La primera puerta es interna: reglas, transiciones y copy coherentes en los casos normal, rechazo, P1 confirmado, P1 sin respuesta, ambiguo y baja confianza.

### 4. Validar la hipótesis antes de conectar producción

Después del checkpoint hay que comprobar si el ritual realmente reduce incertidumbre y si el relevo recibe información accionable. La primera validación debe ser acotada, con consentimiento, datos mínimos y sin usar métricas para vigilar desempeño individual.

Sólo después de esa evidencia tendría sentido avanzar hacia:

- piloto pequeño en sandbox o modo espejo;
- roles y autenticación mínimos;
- bitácora auditable de aceptación y escalamiento;
- integración read-only con una fuente operacional;
- políticas configurables por servicio.

### 5. IA, si la evidencia la justifica

La IA no es el siguiente titular del pitch. Si se incorpora, debe empezar en modo sombra para resumir, detectar información faltante o proponer una clasificación explicable. Nunca debe silenciar, cerrar o degradar un incidente crítico; las reglas y la revisión humana siguen teniendo autoridad.

### 6. Medir resultados y decidir escala

Cerrar el ciclo con un informe de piloto: valor para quien entrega la guardia, carga para quien recibe el relevo, seguridad operacional y límites. La decisión final debe ser explícita: escalar, iterar o detenerse; no confundir adopción puntual con impacto probado.

## Respuestas cortas para preguntas probables

**¿Cómo saben que Rodrigo dormirá una hora más?**

No lo afirmamos. El MVP reserva 60 minutos de ventana; no mide sueño real. La validación posterior tendría que medir señales voluntarias y no clínicas contra la propia línea base, con consentimiento.

**¿Dónde está la IA?**

No está en esta versión. Priorizamos un motor local, determinístico y auditable para demostrar primero la ruta segura. La IA futura sería asistencia en modo sombra, no autoridad de seguridad.

**¿Qué pasa si Andrea rechaza?**

No se habilita Sueño protegido. La persona puede continuar con Guardia filtrada; lo crítico o ambiguo vuelve directamente a Rodrigo.

**¿Qué pasa si se cae internet?**

La demo simula visualmente ese estado, pero el motor ya funciona localmente y las decisiones no cambian. No es una desconexión real de red.

**¿Por qué no integraron WhatsApp o un sistema de tickets?**

Porque primero había que demostrar el mecanismo de transferencia de responsabilidad. Una integración real agrega autenticación, privacidad y riesgo operacional; no prueba por sí sola que el ritual sea útil.

**¿Esto reemplaza un sistema de guardia?**

No. El MVP muestra un mecanismo de cierre y escalamiento; no reemplaza protocolos operacionales ni promete que una persona nunca será interrumpida.

## Frase para recordar

> “No le pedimos a Rodrigo que cuide mejor su sueño mientras sigue cuidando producción. Le damos un relevo en el que puede confiar.”

## Documentos de apoyo

- [Guion cronometrado original](docs/pitch/PITCH.md)
- [Runbook de demo](docs/pitch/DEMO-RUNBOOK.md)
- [Q&A](docs/pitch/QA.md)
- [Definición vigente de la solución](docs/product/SOLUCION_PRODUCTO.md)
- [README del proyecto](README.md)
