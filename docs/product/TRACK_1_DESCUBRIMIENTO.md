# SnoozeOps — Track 1: Descubrimiento y validación

**Estado:** plan de investigación ejecutable para la rama `post-mvp/foundation-validation`.  
**Propósito:** decidir con evidencia de personas si el problema y el mecanismo central de SnoozeOps merecen evolucionar, qué debe cambiar y qué riesgos hay que resolver antes de construir más producto.  
**Límite:** este track no modifica el código ni amplía el MVP congelado.

---

## 1. Qué decisión debe habilitar este track

Al cerrar Track 1, el equipo debe poder responder:

1. ¿La dificultad para desconectarse después de una guardia ocurre de manera real y suficientemente frecuente en las personas objetivo?
2. ¿La causa principal es falta de un relevo verificable, o hay barreras más importantes que SnoozeOps no resuelve?
3. ¿El titular y quien recibe el relevo consideran aceptable y útil el mecanismo propuesto?
4. ¿Las personas entienden, sin ayuda, qué cubre el relevo, hasta cuándo y qué podría volver a alertar al titular?
5. ¿Qué cambio de producto sería el siguiente de mayor valor y menor riesgo?

La salida no es “validar SnoozeOps” en abstracto. La salida es una decisión concreta: **continuar con Track 2, ajustar la tesis/experiencia, investigar una pregunta pendiente o detener esta dirección**.

## 2. Tesis e hipótesis que vamos a poner a prueba

### Tesis actual

> Una persona de soporte TI que está de guardia puede tener dificultad para desconectarse al terminar su jornada porque no confía en que la responsabilidad quedó cubierta. Un relevo explícito y verificable, con dueño, ventana y ruta de escalamiento visibles, podría reducir esa incertidumbre y facilitar que deje de revisar la operación antes de dormir.

La tesis contiene una relación plausible, no un resultado demostrado. No afirmaremos que SnoozeOps aumenta sueño ni evita interrupciones hasta contar con evidencia apropiada.

### Hipótesis de investigación

| ID | Hipótesis | Qué la apoyaría | Qué la debilitaría |
| --- | --- | --- | --- |
| H1 | Parte de las personas de guardia revisa o rumia sobre la operación fuera de su turno, especialmente antes de dormir. | Relatos concretos y recientes de chequeos, demora en acostarse o dificultad para dejar de pensar en incidentes. | La conducta es rara, no les preocupa o se explica principalmente por otro problema. |
| H2 | La incertidumbre sobre pendientes, cobertura o escalamiento contribuye a esa conducta. | La persona describe información o responsabilidad sin dueño claro, y explica cómo eso cambia sus chequeos o descanso. | Los chequeos obedecen a políticas, carga de incidentes u otras causas que un relevo visible no modificaría. |
| H3 | Un relevo explícito puede resultar aceptable para titular y relevo si delimita alcance, plazo y autoridad. | Ambos roles pueden describir condiciones concretas para aceptar el traspaso; el relevo siente que puede rechazarlo. | El mecanismo se vive como presión, transferencia injusta de carga o falsa garantía. |
| H4 | Las personas interpretan correctamente los límites y rutas de SnoozeOps. | Explican de forma independiente quién cubre, hasta cuándo y qué situaciones escalan. | Creen que la cobertura garantiza cero alertas o que una alerta crítica puede quedar silenciada. |

No es necesario que todas las hipótesis se confirmen. Un hallazgo contrario es un resultado útil si cambia una decisión.

## 3. Alcance, método y tamaño de muestra

### Participantes

Entrevistar a **5–8 personas** con experiencia reciente en guardias o soporte operacional. Buscar voces de:

- **Titulares de guardia:** quienes deben estar disponibles o sienten responsabilidad fuera de turno.
- **Personas de relevo:** quienes reciben o podrían recibir la responsabilidad.
- **Responsable operacional:** quien define políticas, rotaciones o escalamiento.

Intentar incluir al menos dos perspectivas por rol cuando la disponibilidad lo permita. Una persona puede haber ejercido más de un rol. No presentar este grupo como representativo de toda la industria: es una muestra formativa para encontrar problemas, lenguaje y riesgos.

**Entrevista experta complementaria:** una psicóloga o especialista en factores humanos puede revisar el ritual de cierre, la sensación de presión y la agencia de las personas. Esa opinión complementa, pero no sustituye, a operadores, relevos ni responsables de guardia.

### Actividades

1. Entrevista semiestructurada: 30–40 minutos por persona.
2. Prueba moderada del prototipo congelado: 15–20 minutos, en la misma sesión o en una sesión separada.
3. Diario voluntario y ligero: 5–7 días, sólo si la persona tiene una guardia o ventana relevante durante ese período. Si no ocurre una oportunidad real, no pedirle que invente registros.

El diario explora patrones declarados; no mide sueño ni prueba causalidad. Si el esfuerzo, la sensibilidad del contexto o el riesgo de privacidad resultan mayores que el valor esperado, se omite y se documenta por qué.

### No es parte del track

- Integrar fuentes reales, enviar alertas o probar el producto en producción.
- Recopilar tickets, nombres de clientes, pantallazos, logs, incidentes identificables ni credenciales.
- Pedir datos biométricos, diagnósticos, tratamientos o acceso a aplicaciones de salud.
- Clasificar o evaluar el desempeño de empleados o de quienes aceptan relevos.
- Cambiar reglas de seguridad del MVP a partir de una opinión aislada sin documentar la decisión.

## 4. Preparación antes de hablar con participantes

### 4.1 Definir equipo y materiales

Una persona facilita y otra toma notas si hay un segundo colaborador disponible. Si sólo hay una, facilitar y registrar notas inmediatamente después. Preparar:

- Este plan y una hoja de consentimiento breve.
- Guion de entrevista y hoja de notas por participante.
- Prototipo/demostración en su estado inicial limpio, sin información real.
- Tareas de comprensión y escenarios de prueba definidos en la sección 7.
- Registro de decisiones e hipótesis.
- Invitación con duración, propósito, voluntariedad y límites de privacidad.

No grabar audio/video por defecto. Si se propone grabar, explicar motivo, acceso, plazo de borrado y pedir consentimiento separado antes de empezar. La persona puede participar sin ser grabada. No usar grabaciones para entrenamiento de modelos.

### 4.2 Reclutamiento y relación de poder

- Invitar de forma voluntaria y explícita; no pedir a un supervisor que informe quién aceptó participar.
- Siempre que sea posible, no entrevistar a una persona a quien el facilitador supervise o evalúe.
- Si una organización recluta, dejar claro que participar, rechazar o retirarse no tiene efecto laboral.
- No compartir respuestas individuales con jefaturas ni sponsors. Entregar sólo síntesis agregada y anonimizadas.
- La persona puede saltarse preguntas, detener la sesión o retirar sus datos antes de la síntesis.

### 4.3 Consentimiento en lenguaje simple

Leer antes de empezar:

> “Estamos explorando cómo se vive el cierre de una guardia y probando una demo conceptual. Esto no es una evaluación de tu desempeño ni de tu sueño. Participar es voluntario; puedes saltarte cualquier pregunta o terminar cuando quieras. No necesitamos nombres de clientes, tickets, datos de producción ni información médica. Tomaremos notas anonimizadas y no compartiremos respuestas individuales con tu jefatura. ¿Te parece participar? ¿Aceptas que tome notas? La grabación, si se considera, se consulta aparte.”

Registrar sólo que el consentimiento fue otorgado, sin guardar más datos personales de los necesarios. Si no acepta notas, ofrecer conversación sin registro; no presionar.

### 4.4 Identificadores y resguardo

- Usar códigos `P01`, `P02`, etc.; guardar la llave de contacto separada de las notas, si es indispensable conservarla.
- En notas, omitir empresa, servicio, nombres, ubicación precisa y detalles que hagan identificable a una persona o incidente.
- Reformular o eliminar citas que puedan revelar identidad; no inventar citas textuales. Si la frase se parafrasea, etiquetarla como paráfrasis.
- Limitar el acceso a quienes preparan la síntesis. Definir antes de iniciar quién conserva los archivos y cuándo se borrarán; como valor inicial, borrar contactos y notas crudas a los 30 días de cerrar Track 1, salvo que la persona haya consentido un período distinto.
- No subir notas identificables a herramientas externas ni a un LLM. La síntesis se puede hacer con extractos anonimizados y revisados.

## 5. Plan de trabajo sugerido

El calendario depende de reclutamiento. Una ejecución compacta puede tomar dos semanas; no sacrificar consentimiento, diversidad de roles o síntesis por cumplir una fecha.

| Paso | Actividad | Resultado |
| --- | --- | --- |
| 0 | Acordar hipótesis, roles, privacidad y preguntas de decisión. | Brief de investigación listo. |
| 1 | Reclutar y agendar 5–8 personas. | Cobertura razonable de titular, relevo y operación. |
| 2 | Realizar primeras 2 entrevistas y revisar el guion. | Preguntas comprensibles; corregir sesgos obvios antes de seguir. |
| 3 | Completar entrevistas individuales. | Notas anonimizadas y evidencia por hipótesis. |
| 4 | Probar prototipo con cada participante o con una submuestra equilibrada de al menos 5 personas. | Resultados de tareas sin ayuda, errores y lenguaje usado. |
| 5 | Invitar al diario de 5–7 días a quienes tengan una oportunidad pertinente. | Registros voluntarios; también documentar no participación o ausencia de oportunidad. |
| 6 | Codificar, comparar roles y mapear el recorrido. | Hallazgos, tensiones y oportunidades priorizadas. |
| 7 | Tomar una decisión de puerta y registrar razones. | Continuar, ajustar, investigar o detener con próximos pasos. |

Si la prueba de prototipo se hace con menos personas que las entrevistas, se reportan denominadores separados. No combinar entrevistas, tareas y diario como si fueran una única muestra.

## 6. Guion de entrevista semiestructurada

### Apertura (2 minutos)

- Leer consentimiento.
- Confirmar rol o experiencia general, sin pedir información de empleador si no es necesaria.
- Aclarar: “Me interesa cómo ocurrió la última vez, no una respuesta ideal.”

### A. Reconstruir un episodio reciente (8–10 minutos)

1. “Cuéntame la última ocasión en que terminaste una guardia o jornada y luego intentaste desconectarte.”
2. “¿Qué pasó desde que terminó tu responsabilidad formal hasta que intentaste dormir o dejar el trabajo?”
3. “¿Qué hiciste concretamente? ¿Abriste alguna herramienta, revisaste mensajes o pediste confirmación?”
4. “¿Qué fue lo último que te hizo volver a pensar en la operación?”
5. “¿Qué ocurrió al final?”

**Sondeos neutrales:** “¿Me puedes dar un ejemplo?”, “¿Qué pasó después?”, “¿Cómo lo supiste?”, “¿Qué hiciste tú?”. Evitar completar la respuesta o sugerir una emoción.

### B. Responsabilidad y traspaso (8 minutos; adaptar a rol)

Para titular:

- “¿Qué necesitas dejar resuelto o explicado antes de desconectarte?”
- “¿Qué te da confianza de que otra persona puede continuar?”
- “¿Qué te hace revisar de nuevo aunque el turno haya terminado?”
- “¿Qué riesgo te preocuparía al pasar la responsabilidad?”

Para relevo:

- “Cuéntame sobre la última vez que recibiste una guardia o un pendiente.”
- “¿Qué información te faltó para decidir si podías tomarlo?”
- “¿Qué te haría aceptar, pedir más contexto o rechazarlo?”
- “¿Has sentido presión para aceptar algo que no podías cubrir? ¿Qué debería permitir el proceso?”

Para responsable de operación:

- “¿Cómo se asigna hoy la responsabilidad fuera de horario?”
- “¿Quién puede cambiar el alcance o el canal de escalamiento?”
- “¿Qué ambigüedad actual representa más riesgo?”
- “¿Qué evidencia exigirías antes de probar un nuevo flujo?”

### C. Frecuencia, impacto y alternativas (5–7 minutos)

- “En las últimas cuatro semanas, ¿cuántas veces ocurrió algo parecido?”
- “¿Qué costo tuvo para ti o para el equipo, si tuvo alguno?”
- “¿Qué haces actualmente para manejarlo? ¿Qué parte sí funciona?”
- “¿Qué solución intentaste y por qué la mantuviste o dejaste de usarla?”
- “¿Hay ocasiones en que revisar fuera de turno es necesario o preferible?”

No presuponer que revisar es siempre compulsivo ni que una herramienta debe eliminarlo. Un chequeo puede ser apropiado según política y contexto.

### D. Cierre de entrevista (2 minutos)

- “¿Qué no te pregunté y debería entender?”
- “Si pudieras cambiar una sola parte del cierre de guardia, ¿cuál sería?”
- “¿Te interesaría probar un diario breve o revisar un resumen de hallazgos anonimizados?”

Agradecer sin prometer que el producto resolverá el problema. Ofrecer una forma de contacto sólo si la persona desea recibir seguimiento y consiente conservar ese contacto.

## 7. Prueba moderada del prototipo

### Reglas de moderación

- Usar el MVP congelado desde su inicio limpio; etiquetar todo escenario como ficticio/sintético.
- Pedir a la persona que piense en voz alta, pero no ayudarla a completar la tarea.
- No explicar la tarjeta antes de pedir interpretación.
- Si se atasca, anotar el punto y permitir que continúe; al final preguntar qué esperaba.
- No tratar una respuesta incorrecta como fallo de la persona: es evidencia de diseño o lenguaje.
- No confundir familiaridad con el prototipo con comprensión espontánea.

### Introducción

> “Te mostraré una demo conceptual. No estamos probando tu capacidad; estamos viendo si la interfaz explica bien un relevo. Los incidentes son inventados y nada se envía a sistemas reales.”

### Tareas y preguntas

**Tarea 1 — Entender la cobertura**

“Sin que yo te explique la pantalla, cuéntame qué significa el estado actual.”

Registrar si identifica:

- Quién aceptó o no aceptó el relevo.
- Si la cobertura está activa, pendiente o no disponible.
- Hora/límite de la ventana, cuando se muestra.
- Qué debe ocurrir para que el titular vuelva a ser alertado.

**Tarea 2 — Decidir antes de activar**

“¿Qué tendría que ocurrir para que tú, en el rol de titular, activaras o no esta ventana? ¿Qué información revisarías?”

Observar dudas, señales que busca, sentido de control, señales de presión y cualquier promesa percibida.

**Tarea 3 — Interpretar el incidente P3 habitual**

“¿Qué pasó con este incidente? ¿Está resuelto? ¿Quién debe revisarlo y cuándo?”

Respuesta esperada: queda pendiente/agrupado para revisión al cierre; no está resuelto ni marcado como leído.

**Tarea 4 — Interpretar el escenario P1 sintético**

“¿A quién llega primero? ¿Qué pasa si esa persona no confirma?”

Respuesta esperada: se escala primero a Andrea y, en la simulación de falta de respuesta, a Rodrigo. Aclarar que los 60 segundos son un atajo de demo si la interfaz no deja claro que el plazo es simulado.

**Tarea 5 — Explicar límites**

“¿La pantalla promete que nadie te despertará? ¿Qué información te hace pensar eso?”

Respuesta esperada: no; casos críticos, ambiguos o sin confirmación pueden escalar. Si la persona cree que hay garantía de cero interrupciones, registrar como fallo crítico de comprensión.

### Registro mínimo por tarea

- Completó sin ayuda: sí / parcial / no.
- Respuesta en palabras de la persona (anonimizada).
- Tiempo aproximado si es útil, sin presentarlo como métrica laboral.
- Punto de duda o interpretación alternativa.
- Severidad del problema: bloquea confianza/seguridad, confunde, menor.
- Observación separada de la interpretación del facilitador.

No usar datos de rapidez para comparar personas o juzgar desempeño.

## 8. Diario voluntario de 5–7 días

Invitar sólo a quien tenga un período relevante durante esos días. La persona registra como máximo una vez por cierre de guardia o intento de desconexión. Omitir fechas exactas si elevan la posibilidad de identificar su turno.

### Entrada diaria

- Código participante:
- Día relativo: 1–7 (no fecha exacta, salvo consentimiento y necesidad):
- ¿Terminó una guardia/jornada hoy? Sí / no.
- ¿Intentó desconectarse o dormir después? Sí / no / prefiero no responder.
- Después del cierre, ¿volvió a revisar algo relacionado con la operación? 0 / 1 / 2 o más veces / no recuerda.
- ¿Qué lo motivó principalmente? Pendiente sin dueño / duda sobre cobertura / hábito / alerta o política / preocupación distinta / otro (opcional, sin detalles sensibles).
- Confianza para desconectarse en ese momento: 1–5 / no aplica.
- ¿Hubo una interrupción relacionada con la operación? Sí / no / no sabe / prefiero no responder.
- Comentario opcional, sin nombres, tickets, clientes ni detalles de producción.

El diario no pide horas precisas de sueño, calidad de sueño, síntomas, diagnósticos ni biometría. La escala 1–5 es percepción declarada, no instrumento clínico.

### Cuidado del participante

- Recordar que puede saltarse una entrada o dejar el diario en cualquier momento.
- No enviar recordatorios insistentes; máximo un recordatorio neutral si fue acordado.
- No pedir que cambie su conducta o ignore alertas por el bien de la investigación.
- Si no aparece una situación relevante, registrar “sin oportunidad durante el período”; no tratarlo como falta de adherencia.

## 9. Cómo analizar sin exagerar la evidencia

### 9.1 Codificación

Después de cada sesión, separar las notas en:

- **Observación:** lo que la persona hizo o dijo, con cita anonimizada o paráfrasis claramente marcada.
- **Interpretación:** explicación posible del equipo.
- **Hipótesis actualizada:** afirmación que aún requiere prueba.
- **Implicación de producto:** cambio potencial; todavía no es decisión.
- **Riesgo/contraejemplo:** evidencia que contradice la tesis o señala daño.

Usar etiquetas iniciales: cierre de turno, chequeo posterior, cobertura, dueño del pendiente, escalamiento, confianza, presión para aceptar, política, canal, carga de relevo, excepción, privacidad.

### 9.2 Comparar por rol y por excepción

No combinar enseguida titulares y relevos. Revisar dónde sus incentivos chocan. Buscar casos que contradigan el patrón: turnos en que revisar tranquiliza, relevos que prefieren el canal actual, situaciones en que dormir o no dormir no depende de la guardia.

Mapear el recorrido observado en cinco momentos:

1. Antes de cerrar.
2. Solicitud/aceptación del relevo.
3. Activación o salida del turno.
4. Noche o período de disponibilidad.
5. Revisión posterior.

Para cada momento, registrar conducta actual, incertidumbre, workaround, actor afectado, riesgo, oportunidad y evidencia.

### 9.3 Conteos

Con 5–8 participantes, contar sirve para transparencia (“4 de 6 entrevistados mencionaron...”), no para estimar prevalencias de una población ni probar causalidad. Mantener siempre denominador y rol. No convertir “70%” en afirmación de mercado.

## 10. Puertas de decisión

### Puerta A — Integridad de la investigación

No avanzar a una decisión de producto si:

- No se obtuvo consentimiento claro.
- La muestra sólo representa a un rol y se pretende hablar por los demás.
- Se recopilaron datos sensibles o identificables sin necesidad.
- Las sesiones se convirtieron en una demostración persuasiva, en vez de una prueba abierta.

En esos casos, corregir el método o limitar la conclusión.

### Puerta B — Comprensión segura del prototipo

Medir en participantes que completan las tareas, con denominador explícito. Criterio inicial del roadmap: **al menos 70% entiende sin ayuda quién cubre, hasta cuándo y qué puede volver a alertar al titular**. Para muestras pequeñas, reportar el conteo exacto; por ejemplo, 4/5, 5/7 o 6/8. Es una señal formativa, no una prueba estadística.

Además:

- **Cero interpretaciones peligrosas sin resolver:** nadie debe salir creyendo que SnoozeOps garantiza una noche sin alertas o que el P1 puede quedar silenciado.
- Si una sola persona interpreta una garantía de seguridad, detener la progresión de esa pantalla/idea, revisar copy y volver a probar. No promediar un malentendido de alto riesgo con respuestas correctas.

### Puerta C — Relevancia del problema y del mecanismo

**Continuar con Track 2** si:

- Hay relatos recientes y concretos de dificultad de cierre en más de un rol relevante.
- La incertidumbre sobre responsabilidad/cobertura aparece como contribuyente plausible, no sólo como una idea sugerida por el entrevistador.
- Titular y relevo pueden describir condiciones que harían justo y aceptable el traspaso.
- No aparece una barrera operacional, cultural o de seguridad que invalide el mecanismo propuesto.
- La prueba de comprensión supera la señal inicial o deja cambios acotados que Track 2 puede abordar.

**Ajustar la tesis o el alcance** si:

- El problema existe, pero la causa principal es otra (por ejemplo, falta de personal, política de escalamiento o volumen de alertas).
- El relevo beneficia al titular trasladando carga injustamente.
- Hay valor sólo en un tipo de turno, equipo o ventana.
- “Sueño protegido” provoca una promesa más fuerte de lo que el proceso puede cumplir.

**Investigar antes de programar más** si:

- Faltan voces de un rol clave.
- La política real de guardia sigue siendo desconocida.
- Las personas no han vivido una oportunidad pertinente en el período del diario.
- Hay señales contradictorias que pueden cambiar la seguridad o el valor.

**Detener esta dirección** si la necesidad es poco frecuente o no se relaciona con el mecanismo; si no hay forma justa de asignar cobertura; o si el producto crea falsa seguridad sin una mitigación viable.

## 11. Entregables de cierre

Guardar en `docs/research/track-1/` o ubicación acordada (sólo artefactos anonimizados):

1. **Brief final:** pregunta, alcance, fechas, método, número y rol de participantes.
2. **Mapa del recorrido actual:** los cinco momentos y evidencia por rol.
3. **Matriz de hipótesis:** apoyada / debilitada / inconclusa, con observaciones y contraejemplos.
4. **Resultados de tareas:** conteo por tarea y rol; lista de interpretaciones peligrosas o confusas.
5. **Síntesis del diario:** sólo si se ejecutó, con límites y datos agregados.
6. **Oportunidades priorizadas:** necesidad, evidencia, beneficiario, riesgo, cambio candidato.
7. **Decisión de puerta:** continuar, ajustar, investigar o detener; quién decide y por qué.
8. **Preguntas para Track 2:** alcance recomendado, exclusiones y criterios de aceptación derivados de evidencia.

No guardar datos crudos de participantes junto a documentos del producto o en el repositorio. El repositorio recibe guías, plantillas vacías y la síntesis anonimizadas; los datos crudos se resguardan aparte según el consentimiento y el plazo definido.

## 12. Definition of Done

- [ ] Se entrevistó a 5–8 personas o se documentó por qué la muestra fue menor.
- [ ] Se escuchó a titulares y relevos; se incluyó perspectiva operacional o se declaró como brecha.
- [ ] Cada participante pudo aceptar, saltar preguntas o retirarse sin presión.
- [ ] Las notas están anonimizadas y no contienen datos de producción, salud ni evaluación laboral.
- [ ] Se probaron las tareas de comprensión sin explicar primero la interfaz.
- [ ] Se reportaron conteos con denominadores y roles; no se hicieron generalizaciones estadísticas.
- [ ] Se revisaron hallazgos contrarios y riesgos de transferencia injusta de carga.
- [ ] La comprensión de cobertura y rutas cumple la puerta o hay un plan de corrección y nueva prueba.
- [ ] La decisión final indica qué evidencia la respalda y qué sigue abierto.
- [ ] No se cambió el código del MVP congelado durante la investigación.

## 13. Primer paso para empezar

Preparar una hoja de invitación y una hoja de consentimiento usando este plan; después, reclutar primero a dos personas con roles distintos (un titular y un relevo). Hacer esas dos sesiones piloto, corregir preguntas sesgadas o confusas y recién entonces completar el resto de la muestra. La primera conversación no debe comenzar con el pitch de SnoozeOps: primero hay que entender cómo ocurre hoy el cierre de guardia.
