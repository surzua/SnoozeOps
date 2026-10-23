# SnoozeOps — Fase 5: Evidencia, README y pitch

**Estado**: En planificación / Lista para ejecución

## 1. Propósito

Convertir el prototipo estable de las Fases 1–4 en una candidatura clara, defendible y fiel a lo que realmente funciona. Esta fase no agrega funcionalidad de producto: consolida la evidencia, el repositorio y el pitch de cinco minutos para que el jurado de Makana entienda tres cosas sin tener que inferirlas:

1. Entendimos por qué Rodrigo no logra dormir más, más allá de saber que duerme poco.
2. Construimos un mecanismo demostrable para reducir la incertidumbre antes de dormir.
3. No confundimos una simulación segura con evidencia de sueño real, una integración real o una garantía operacional.

La demo en vivo es la evidencia principal. El README, guion, Q&A y plan de contingencia existen para que esa evidencia sea comprensible, repetible y honesta.

## 2. Decisiones de comunicación cerradas

| Tema | Decisión obligatoria |
| --- | --- |
| Métrica `+60 min` | Siempre significa **`+60 min reservados para descansar`** frente a la ventana habitual del mismo turno. Es una oportunidad de sueño planificada y cubierta; no prueba que Rodrigo se durmió, durmió 60 minutos más ni que transcurrió sin interrupciones reales. |
| Noche habitual y prueba P1 | El P3 pertenece al escenario habitual. La caída P1 es una **prueba de seguridad · escenario sintético**, separada del resumen de la mañana. Nunca se usa para afirmar que Rodrigo fue despertado en la noche habitual. |
| Plazo de Andrea | La acción de la demo **simula el vencimiento** del plazo de 60 segundos; no espera 60 segundos reales. |
| Lenguaje de seguridad | Se dice que los casos críticos, ambiguos o sin confirmación se **escalan de forma conservadora**. No se promete infalibilidad, cobertura absoluta ni que Rodrigo “nunca quedará a ciegas”. |
| Estado actual de IA | El MVP entregado no ejecuta un LLM ni una API de IA. Su motor local es determinístico y funciona offline. No se debe presentar como una IA funcionando ni como un fallback de un proveedor inexistente. Una integración futura podrá resumir o proponer severidad, pero nunca tendrá autoridad única para silenciar alertas. |
| Relación con la evolución posterior | Esta fase cierra y prepara para entrega el MVP de la hackatón. La evolución canónica posterior está en `docs/product/ROADMAP_POST_CHECKPOINT_2.md`; no forma parte de lo que se evalúa o afirma como implementado en esta entrega. |
| Red | `Simular caída de internet` representa sólo un estado visual de la demo. No desconecta la red real ni modifica las decisiones del motor determinístico. |
| Datos | Rodrigo, Andrea, turnos, tickets e incidentes son fixtures sintéticos. No se cargan ni se usan datos personales o de salud reales. |
| Video de respaldo | El video es contingencia para recuperar la historia si falla el hardware; no reemplaza el requisito de demo en vivo. La ruta preferida de recuperación es abrir la demo local en un segundo dispositivo o navegador. |

## 3. Resultado demostrable

Al terminar la fase existirán cuatro entregables de comunicación, todos coherentes con la versión efectivamente ejecutable:

1. **`README.md` de una página:** explica problema, decisión, solución, límites y ejecución local sin convertirse en manual técnico.
2. **Pitch de 4:30 a 4:50:** guion ensayado donde la demo ocupa la mayor parte del tiempo y termina sin apuro.
3. **Kit de presentación versionado:** guion, Q&A, recorrido de demo y checklist de entrega en `docs/pitch/`.
4. **Auditoría de entrega:** evidencia de build limpio, ausencia de secretos/datos reales, trazabilidad del historial Git y planes de recuperación probados.

## 4. Alcance de la Fase 5

### 4.1. Estructura de artefactos

Crear o completar los siguientes documentos. El detalle vive fuera del README para preservar su requisito de una página:

```text
docs/
  pitch/
    PITCH.md             # Guion completo, minutaje y mensaje por escena
    QA.md                # Preguntas, respuesta corta y evidencia que la respalda
    DEMO-RUNBOOK.md      # Estado inicial, clics, reset y recuperaciones
    SUBMISSION.md        # Auditoría, preflight y checklist de entrega
README.md                # Una página para el repositorio
```

No se crean diapositivas como sustituto de la demo. Si se usan, sólo pueden apoyar la apertura y el cierre; la aplicación debe ocupar más tiempo que las láminas.

### 4.2. README de una página

Las bases exigen que el README explique el problema atacado, por qué se eligió y qué se dejó fuera. SnoozeOps además necesita incluir la información mínima para ejecutar y evaluar el prototipo. La versión final debe tener como objetivo **700–800 palabras máximo**, excluyendo bloques de código, y evitar secciones que no apoyen la evaluación (guía manual larga, contribución, licencia provisional o changelog).

Debe contener, en este orden lógico:

1. **Problema decidido:** ansiedad de guardia e imposibilidad percibida de desconectarse antes de dormir.
2. **Por qué ese problema y no otro:** Rodrigo no necesita otro tracker que le diga al día siguiente que durmió mal; necesita una condición creíble para dejar de revisar tickets hoy.
3. **Tesis:** un relevo verificable reserva una hora adicional de ventana para descansar, mientras las alertas críticas siguen una ruta explícita de escalamiento. No afirmar sueño medido ni interrupciones evitadas.
4. **Qué se construyó:** preparación de turno, cierre bilateral de guardia, `Sueño protegido` o `Guardia filtrada`, simulador de P3/P1 y resultado de mañana.
5. **Arquitectura mínima:** interfaz móvil/PWA, estado local aislado, fixtures sintéticos y motor determinístico offline. Sólo describir componentes que existen.
6. **Cómo correrlo:** prerequisito Node.js 22, `npm install` y `npm run dev`, con la URL local resultante. Indicar que no requiere credenciales ni red.
7. **Qué se dejó fuera a propósito:** backend, base de datos, autenticación, sincronización entre pestañas, mensajería real, notificaciones push, LLM/API de IA, wearables y diagnósticos de salud.
8. **Seguridad, privacidad y datos:** fixtures ficticios; todo caso ambiguo se escala; la prueba P1 es sintética y separada; el prototipo no recoge datos personales o de salud.

Reglas editoriales:

- Usar `+60 min reservados para descansar`, nunca `+60 min logrados` ni `sueño protegido medido`.
- No llamar “IA” al motor determinístico ni insinuar una integración que no existe.
- No decir que el switch desconecta internet real.
- No incluir secretos, URLs privadas, nombres reales, logs ni capturas con información personal.

### 4.3. Guion del pitch: 4:45 objetivo

El pitch se ensaya para durar **4:45**, dejando 15 segundos de colchón dentro del máximo de cinco minutos. Se presenta como historia y demostración, no como exposición de arquitectura.

| Tiempo | Momento | Guion y evidencia visible |
| --- | --- | --- |
| 0:00–0:35 | Problema | “Rodrigo sabe que debería dormir. Lo que no sabe es quién vigila cuando él deja de hacerlo.” Explicar que posterga el sueño revisando tickets porque no confía en poder delegar. |
| 0:35–0:55 | Insight | No construimos un tracker pasivo; construimos un ritual de cierre cognitivo. El relevo visible y bilateral reduce la incertidumbre, la fatiga de decisión y la culpa de delegar. |
| 0:55–1:30 | Demo: preparar turno | Elegir el turno de día y mostrar ventana habitual versus propuesta. Decir: “No medimos sueño; reservamos 60 minutos adicionales para descansar.” |
| 1:30–2:10 | Demo: cerrar guardia | Mostrar pendientes, resumen para Andrea, solicitud y aceptación simulada. Activar `Sueño protegido` y señalar quién cubre, hasta cuándo y bajo qué condición Rodrigo vuelve a ser alertado. |
| 2:10–3:15 | Demo: escena estrella | Inyectar P3 y mostrar que queda agrupado para revisión, no resuelto ni descartado. Luego ejecutar la **prueba de seguridad sintética** P1: se escala a Andrea; usar el botón que simula el vencimiento del plazo y mostrar escalamiento a Rodrigo. Explicar: “ante gravedad, ambigüedad o falta de confirmación, la ruta se vuelve conservadora.” |
| 3:15–3:45 | Demo: mañana | Avanzar manualmente. Mostrar `+60 min reservados para descansar`, la diferencia entre ventana habitual y propuesta, y el P3 pendiente de revisión. Aclarar `Sueño real no medido.` |
| 3:45–4:20 | Convicción | “No le pedimos ignorar su trabajo. Le damos un mecanismo concreto para entregar responsabilidad sin perder control sobre lo realmente crítico.” Conectar relevo confirmado, bajo esfuerzo y reglas visibles con la probabilidad de acostarse antes. |
| 4:20–4:45 | Límite y cierre | “Esta versión funciona localmente con reglas determinísticas; no finge WhatsApp, IA productiva ni sueño medido. Diseñamos primero una ruta segura y demostrable.” Cerrar: “No le pedimos a Rodrigo que cuide mejor su sueño mientras sigue cuidando producción. Le damos un relevo en el que puede confiar.” |

Reglas de presentación:

- El P3 se inyecta antes del P1 para que el contraste de rutas sea inmediato.
- El P1 debe mostrarse como prueba sintética separada, nunca como resultado de la noche habitual.
- No se invita al jurado a escribir incidentes libres durante el pitch; se usan fixtures conocidos y ensayados para no perder el control del tiempo.
- Si el jurado pregunta por el modo offline, mostrar el switch sólo después del recorrido crítico o durante Q&A; no sacrificar la escena estrella por una función secundaria.

### 4.4. Preguntas y respuestas para tres minutos de Q&A

Cada respuesta debe poder decirse en 20–30 segundos. El documento `QA.md` debe asociar cada respuesta con la pantalla o regla que permite demostrarla.

| Pregunta probable | Respuesta precisa |
| --- | --- |
| ¿Por qué Rodrigo usaría esto si abandonó su reloj? | El reloj le mostraba el problema después de ocurrir. SnoozeOps interviene antes de dormir sobre la causa inmediata: no sabe si puede dejar la guardia. El relevo visible transforma incertidumbre en una decisión concreta. |
| ¿Cómo saben que dormirá una hora más? | No lo afirmamos todavía. El MVP reserva 60 minutos de ventana protegida, no mide sueño real. Una validación posterior, con consentimiento y fuera de la hackatón, compararía por turno la hora declarada de acostarse, la activación de relevo y el descanso reportado contra su propia línea base. |
| ¿Dónde está la IA? | Esta versión no ejecuta un LLM ni una API de IA. Priorizamos probar un motor local, offline y seguro para la decisión crítica. En una siguiente iteración, IA podría resumir pendientes o proponer severidad, pero las reglas determinísticas seguirían siendo la autoridad de seguridad. |
| ¿La IA podría silenciar una alerta crítica? | No en el diseño objetivo: ninguna propuesta automática sería suficiente para silenciar. Ante una alerta crítica, ambigua, desconocida o de baja confianza, la regla es escalar. La demo ya muestra esa decisión conservadora sin depender de IA. |
| ¿Qué pasa si Andrea no puede cubrir? | SnoozeOps no promete `Sueño protegido`. Expone la cobertura incompleta y ofrece `Guardia filtrada`: los incidentes críticos o ambiguos llegan directamente a Rodrigo. |
| ¿Por qué no integraron WhatsApp? | El MVP valida primero el mecanismo de comportamiento: cerrar guardia, aceptar relevo y escalar con claridad. Una integración real agregaría privacidad, autenticación y riesgo técnico sin demostrar mejor ese mecanismo en dos días. |
| ¿Esto no es otro sistema de tickets? | El ticket es sólo el gatillo. El producto interviene en el momento de ir a dormir y en la transferencia de responsabilidad; su métrica de producto es una ventana adicional reservada para descansar, no productividad de tickets. |

## 5. Plan de contingencia y ensayo

### 5.1. Preflight antes de cada ensayo o pitch

1. Abrir la URL desplegada y la versión local en un segundo navegador o dispositivo.
2. Verificar que el modo de red simulada está desactivado y ejecutar Hard Reset mediante el wordmark.
3. Confirmar turno Día, relevo no solicitado, panel cerrado e historiales vacíos.
4. Tener el video corto localmente disponible, sin depender de un enlace ni de conexión, pero no abrirlo salvo falla real.
5. Cerrar notificaciones, pestañas irrelevantes, terminales con logs y cualquier ventana que contenga datos personales.
6. Ensayar el recorrido completo con cronómetro y detenerse a los 4:45.

### 5.2. Recuperación durante la presentación

| Problema | Acción inmediata | Límite de comunicación |
| --- | --- | --- |
| Estado incorrecto o panel abierto | Presionar el wordmark para Hard Reset y retomar desde Pantalla 1. | Decir “reinicio el escenario sintético” y no improvisar una explicación técnica. |
| Navegador o URL falla | Abrir la versión local en el navegador/dispositivo de respaldo. | Mantener la demo en vivo como primera alternativa. |
| Ambos entornos no funcionan | Mostrar el video de respaldo y explicar el recorrido con el guion. | Declararlo explícitamente como contingencia; no presentarlo como sustituto de la demo en vivo. |
| Pregunta fuera de alcance | Volver a la tesis, declarar el límite y explicar la siguiente validación. | No inventar métricas, integraciones ni evidencia clínica. |

### 5.3. Recorridos de ensayo obligatorios

1. **Noche habitual:** relevo aceptado → `Sueño protegido` → P3 agrupado → mañana con P3 pendiente y `+60 min reservados`.
2. **Prueba de seguridad confirmada:** relevo aceptado → P1 sintético → Andrea confirma → Rodrigo no recibe alerta por la prueba.
3. **Escalamiento conservador:** relevo aceptado → P1 sintético → simular vencimiento del plazo → alerta enviada a Rodrigo.

Los tres recorridos se ejecutan desde Hard Reset y deben completarse tres veces seguidas sin estado heredado.

## 6. Auditoría de entrega

La auditoría se registra en `docs/pitch/SUBMISSION.md` antes de congelar la versión. Es el checklist operativo de cierre del MVP; no es una fase de producto ni reemplaza la evolución posterior. El trabajo post-Checkpoint 2 sólo comienza después de congelar y presentar esta versión, siguiendo sus puertas de evidencia.

### 6.1. Repositorio y atribución

- Confirmar que el historial Git refleja el trabajo realizado durante el evento.
- Si hay más de una persona, verificar que cada integrante usó su propia cuenta GitHub y que sus aportes son trazables en los commits.
- Revisar autor, correo y contenido de los últimos commits; no reescribir ni falsear atribución.
- Mantener cambios pequeños, descriptivos y coherentes con la versión que se demuestra.

### 6.2. Seguridad y privacidad

- Buscar y eliminar de la entrega secretos, `.env`, tokens, llaves, logs, cachés y archivos temporales.
- Confirmar que fixtures, capturas, video y README sólo contienen datos ficticios.
- Verificar que no se afirma haber detectado, almacenado o diagnosticado un síntoma de Rodrigo.
- Confirmar que la demo funciona sin credenciales, APIs externas ni conectividad.

### 6.3. Reproducibilidad

Desde un clon limpio y con Node.js 22, ejecutar:

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

Luego iniciar `npm run dev`, recorrer la demo y verificar que la versión desplegada abre en otro navegador o dispositivo. Registrar fecha, responsable y resultado de cada verificación en el checklist.

## 7. Criterios de aceptación (DoD Fase 5)

### README y veracidad

- [ ] El README final cabe razonablemente en una página (objetivo: 700–800 palabras, sin contar código) y contiene problema, por qué se eligió, solución, ejecución y exclusiones.
- [ ] Todo texto usa `+60 min reservados para descansar`; no afirma sueño medido, una hora efectivamente dormida ni interrupciones evitadas.
- [ ] No se atribuye IA funcional al motor determinístico ni se insinúan integraciones inexistentes.
- [ ] README, guion, UI y Q&A describen el P1 como prueba de seguridad sintética separada de la noche habitual.

### Pitch, demo y Q&A

- [ ] El pitch completo dura entre 4:30 y 4:50 con cronómetro, sin hablar rápido.
- [ ] La demo en vivo ocupa más tiempo que cualquier lámina y muestra P3 agrupado, P1 escalado y mañana.
- [ ] El equipo puede explicar en una frase qué significa el plazo simulado de Andrea y por qué se usa.
- [ ] Las siete preguntas del Q&A están ensayadas, incluidas validación de la hipótesis, IA, seguridad, ausencia de relevo y WhatsApp.
- [ ] Ninguna respuesta promete garantías operacionales, evidencia causal o salud medida que el MVP no posee.

### Entrega y contingencia

- [ ] Existen `PITCH.md`, `QA.md`, `DEMO-RUNBOOK.md` y `SUBMISSION.md` bajo `docs/pitch/` con la versión final del mensaje.
- [ ] Se realizaron tres recorridos consecutivos desde Hard Reset sin arrastre de estado.
- [ ] La ruta local, la URL desplegada y el video corto de contingencia fueron verificados; el video se rotula como respaldo, no como demo en vivo.
- [ ] `npm ci`, lint, typecheck, test y build pasan desde un clon limpio.
- [ ] El repositorio no contiene secretos, datos reales, logs, cachés ni archivos residuales.
- [ ] El historial Git y la atribución de los integrantes fueron revisados antes de congelar la entrega.

## 8. Regla de cierre

Después de congelar esta fase, no se incorporan funcionalidades nuevas a la entrega de la hackatón. Sólo se aceptan correcciones que mejoren directamente la claridad de la demo, su estabilidad, la honestidad de una afirmación o una respuesta concreta del jurado. Las ideas de evolución posteriores pertenecen a `docs/product/ROADMAP_POST_CHECKPOINT_2.md` y no deben mezclarse con el MVP entregado.
