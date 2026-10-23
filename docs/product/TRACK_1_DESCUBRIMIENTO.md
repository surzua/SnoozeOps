# SnoozeOps — Track 1: Discovery documental

**Estado:** alcance ajustado para investigación secundaria.
**Rama de trabajo:** `post-mvp/foundation-validation`.
**Propósito:** contrastar la tesis de SnoozeOps con fuentes públicas, revisar la coherencia del MVP congelado frente a esa evidencia y decidir qué hipótesis de diseño merece explorarse después.
**Límite central:** Track 1 no incluye investigación con personas. No se harán entrevistas, pruebas de usabilidad, diarios, encuestas, reclutamiento ni observación de operadores. Tampoco se afirmará que una persona usuaria validó una necesidad o comprendió una pantalla.

## 1. Decisión que debe habilitar

Al cerrar este track se podrá decidir si la tesis tiene suficiente **respaldo documental y coherencia de producto** para continuar como hipótesis de diseño, qué riesgos debe atender la siguiente iteración y qué preguntas siguen sin respuesta.

La investigación documental puede responder:

1. ¿Qué dice la evidencia pública sobre recuperación del trabajo, desapego psicológico, estrés en TI/on-call y fatiga de alertas?
2. ¿Qué tan directamente aplica esa evidencia a una persona de guardia que intenta desconectarse después del turno?
3. ¿Qué factores alternativos aparecen en las fuentes y podrían explicar el problema?
4. ¿Qué principios de seguridad y transparencia debería cumplir SnoozeOps, según la evidencia disponible y el diseño actual?
5. ¿Qué cambio de producto es una hipótesis razonable de bajo riesgo para explorar después?

Este track **no puede determinar** la frecuencia del problema en el público objetivo, establecer una causa raíz para Rodrigo o Andrea, probar aceptación del relevo, medir comprensión de la interfaz ni demostrar efectos sobre conducta, descanso o sueño.

La salida es una decisión acotada: **avanzar con una hipótesis de diseño, ajustar la tesis, buscar mejor evidencia secundaria o detener esta línea**. “Avanzar” no equivale a “validar con usuarios”.

## 2. Tesis e hipótesis documentales

### Tesis de producto

> Un traspaso explícito que muestre responsable, ventana, pendientes y ruta de escalamiento podría hacer más visible la distribución de responsabilidad al cerrar una guardia. Esa claridad podría ayudar a reducir incertidumbre, pero su efecto en la desconexión de una persona aún no está comprobado.

La tesis es una explicación de diseño, no un hallazgo empírico de SnoozeOps. La evidencia publicada puede aportar plausibilidad y límites; no prueba que el producto produzca el resultado esperado.

### Preguntas de evidencia

| ID | Pregunta | Qué puede aportar la investigación secundaria | Qué queda sin demostrar |
| --- | --- | --- | --- |
| D1 | ¿Hay base para considerar relevante la recuperación y el desapego psicológico del trabajo? | Investigación revisada por pares sobre dimensiones de recuperación y asociaciones con bienestar/sueño. | Cuán frecuente es la dificultad en operadores on-call y qué la causa en SnoozeOps. |
| D2 | ¿Existen señales públicas de presión, estrés o ruido de alertas en TI/on-call? | Encuestas sectoriales y guías operacionales, con sus muestras y sesgos declarados. | Que esos datos describan a Rodrigo, a equipos chilenos o al momento previo a dormir. |
| D3 | ¿Un relevo bilateral resuelve el problema? | La literatura puede sugerir mecanismos relacionados con control, límites y responsabilidad. | Aceptación del mecanismo, justicia de la carga y efecto causal del relevo. |
| D4 | ¿La interfaz explica cobertura y escalamiento? | Inspección heurística del contenido, estados y reglas ya documentados. | Comprensión real sin ayuda por parte de usuarios. |
| D5 | ¿Qué se explora después? | Priorización por alineamiento con la tesis, reversibilidad y seguridad. | “Mayor valor para usuarios” hasta contar con evidencia directa de ellos. |

## 3. Alcance y exclusiones

### Incluye

- Búsqueda y revisión de fuentes públicas sobre recuperación del trabajo, desapego psicológico, on-call/SRE, estrés operacional y fatiga de alertas.
- Evaluación de calidad, fecha, población, metodología, patrocinio y aplicabilidad de cada fuente.
- Separación explícita entre evidencia científica, encuestas de proveedores, guías prácticas e inferencias del equipo.
- Revisión documental del MVP congelado y sus especificaciones para detectar promesas, estados o reglas que excedan lo que puede sostener la evidencia.
- Síntesis de hallazgos, límites, hipótesis de diseño y decisión de puerta.

### Fuera de alcance

- Entrevistas, encuestas, grupos focales, sesiones con psicólogos u otros expertos, observación contextual y pruebas moderadas o no moderadas con personas.
- Diarios de guardia, registros de comportamiento, métricas de sueño, biometría o seguimiento de hábitos.
- Uso de datos privados, tickets, logs, conversaciones, incidentes internos o información de una empresa.
- Afirmar que se validó la frecuencia, el lenguaje, la aceptación, la comprensión o el impacto de SnoozeOps en personas.
- Cambiar el código o las reglas del MVP congelado.

La exclusión de investigación con personas es una decisión de alcance, no una brecha que deba compensarse inventando resultados. Las preguntas que sólo podrían resolverse con usuarios quedarán registradas como **no evaluadas**.

## 4. Método de investigación documental

### 4.1 Búsqueda y selección

Priorizar en este orden:

1. Artículos revisados por pares y publicaciones académicas originales.
2. Revisiones sistemáticas o metaanálisis, cuando existan para la pregunta concreta.
3. Encuestas sectoriales que publiquen tamaño de muestra, población y fecha.
4. Guías técnicas de organizaciones SRE/on-call, usadas como orientación práctica, no como prueba científica.

Registrar por fuente: referencia completa, enlace, fecha de publicación, tipo de fuente, patrocinador, población/muestra, método conocido, hallazgo literal relevante, limitaciones, aplicabilidad a SnoozeOps y fecha de consulta.

Excluir o marcar como débiles las fuentes sin metodología verificable, sin población definida, basadas sólo en marketing, o que repitan cifras sin enlazar al estudio original. No inferir que “noche”, “guardia” o “sueño” fueron medidos cuando el estudio sólo pregunta por estrés o alertas en general.

### 4.2 Niveles de afirmación

Etiquetar cada conclusión de la síntesis como una de estas categorías:

- **Hallazgo de fuente:** resultado expresado por una fuente identificada, limitado a su población y método.
- **Aplicabilidad parcial:** posible relación con SnoozeOps, indicando la distancia entre la población estudiada y el caso objetivo.
- **Inferencia de diseño:** decisión propuesta por el equipo a partir de hallazgos y del funcionamiento del MVP.
- **No evaluado:** pregunta que requiere datos directos de usuarios u operación y que este track excluye.

No convertir porcentajes de encuestas comerciales en tasas de mercado para Chile ni en prevalencia de hipervigilancia nocturna.

### 4.3 Inspección documental del producto

Revisar las pantallas y reglas ya definidas en las Fases 0–5, sin modificar el MVP. Para cada estado o mensaje anotar:

- Qué hecho observable afirma.
- Qué regla determinística lo produce.
- Qué podría interpretar una persona, sin afirmar que esa interpretación fue probada.
- Si el texto promete más que la cobertura realmente modelada.
- Qué caso ambiguo o fallo mantiene una ruta conservadora.

Esta inspección es una revisión interna de consistencia, no una prueba de usabilidad.

## 5. Plan de trabajo

| Paso | Actividad | Resultado |
| --- | --- | --- |
| 0 | Congelar preguntas, tesis y exclusiones del track. | Brief documental sin tareas con participantes. |
| 1 | Buscar fuentes académicas y sectoriales pertinentes. | Registro de fuentes con calidad y aplicabilidad. |
| 2 | Verificar afirmaciones y cifras contra las fuentes originales. | Libro de afirmaciones con enlace y límites. |
| 3 | Sintetizar evidencia y explicaciones alternativas. | Matriz de evidencia, incertidumbre y vacíos. |
| 4 | Inspeccionar consistencia del producto y de sus promesas. | Lista de decisiones de diseño y riesgos; sin cambios al MVP. |
| 5 | Priorizar una hipótesis de siguiente paso y decidir la puerta. | Síntesis final y alcance recomendado para Track 2. |

## 6. Plantilla del registro de fuentes y afirmaciones

| Campo | Contenido requerido |
| --- | --- |
| ID | Código estable, por ejemplo `SRC-01`. |
| Referencia y URL | Autor/organización, título, año y enlace directo. |
| Tipo y patrocinio | Artículo científico, encuesta comercial, guía técnica, etc. Indicar quién financia/publica. |
| Población y método | País, perfil, tamaño de muestra, fecha y método si están disponibles. |
| Hallazgo que se usa | Paráfrasis específica; no ampliar el alcance del resultado. |
| Limitaciones | Sesgo, población distinta, falta de metodología u otros límites. |
| Aplicabilidad | Alta, parcial o baja, con justificación. |
| Afirmación del producto | Qué decisión podría informar. |
| Nivel | Hallazgo de fuente, aplicabilidad parcial, inferencia de diseño o no evaluado. |

## 7. Principios de síntesis

- No reportar porcentajes de participantes porque no se reclutan participantes.
- Conservar denominadores y población exacta en cifras tomadas de encuestas.
- Diferenciar estrés laboral general, fatiga de alertas, dificultad para desconectarse y sueño; son constructos relacionados, no equivalentes.
- No tratar “desapego psicológico” como diagnóstico clínico ni como sinónimo de dormir bien.
- No afirmar que una aceptación bilateral “cierra” una meta mental o reduce rumiación: describirlo como mecanismo hipotético.
- Incluir evidencia que limite o contradiga la tesis, además de la que la haga plausible.
- No usar una fuente promocional para justificar por sí sola una regla de seguridad.

## 8. Puertas de decisión

### Puerta A — Integridad documental

**Aprobada** si las cifras importantes se pueden rastrear a su fuente, la metodología se describe con honestidad y las afirmaciones no exceden la población ni la pregunta estudiada. Si no, corregir o retirar la afirmación.

### Puerta B — Coherencia de producto

**Aprobada para exploración interna** si la inspección documental confirma que los estados y mensajes del MVP describen reglas presentes, hacen visible la ruta conservadora y no prometen silencio total ni sueño medido. Esta puerta no mide comprensión de usuarios.

### Puerta C — Relevancia documental

Se puede avanzar a una siguiente iteración de diseño si:

- La literatura hace razonable considerar recuperación/desapego como un problema relevante, sin afirmar prevalencia específica para on-call.
- Las fuentes sectoriales dan contexto a las presiones de incidentes o alertas y se reportan con sus límites.
- El relevo verificable es una hipótesis de diseño coherente con la tesis y con el MVP, no una solución validada.
- La siguiente etapa mantiene conservador el enrutamiento y evita promesas clínicas u operacionales absolutas.

Si la evidencia es demasiado indirecta, se avanza sólo con mejoras de trazabilidad interna o se deja la decisión como inconclusa; no se presenta como validación de usuarios.

## 9. Entregables de cierre

Guardar en `docs/product/` o ubicación acordada:

1. **Registro de fuentes:** enlaces, método, población, patrocinio y limitaciones.
2. **Libro de afirmaciones:** texto del resultado, respaldo directo y nivel de inferencia.
3. **Matriz de evidencia:** qué apoya, qué limita y qué queda no evaluado.
4. **Revisión documental del MVP:** promesas y reglas verificadas contra las fases existentes.
5. **Decisión de puerta:** continuar como hipótesis, ajustar, ampliar búsqueda o detener.
6. **Brief de Track 2:** objetivo, exclusiones, estados, criterios de aceptación y riesgos derivados de la evidencia disponible.

No crear archivos de participantes ni datos crudos, porque no forman parte del método.

## 10. Definition of Done

- [ ] El alcance declara explícitamente que no hay investigación con personas.
- [ ] Cada cifra tiene enlace directo, fecha, población y denominador cuando estén disponibles.
- [ ] Las fuentes están clasificadas por tipo, patrocinio y calidad metodológica.
- [ ] Se distingue evidencia sobre recuperación, estrés TI, fatiga de alertas y sueño.
- [ ] Ninguna conclusión atribuye frecuencia, causa, aceptación o comprensión a usuarios de SnoozeOps.
- [ ] Se documentan explicaciones alternativas y límites de transferencia al contexto chileno/on-call.
- [ ] La inspección de producto se identifica como revisión interna, no como usabilidad validada.
- [ ] El MVP congelado no se modifica durante este track.
- [ ] La decisión indica qué permite hacer la evidencia y qué sigue sin respuesta.

## 11. Primer paso

Completar el registro de afirmaciones y fuentes del documento `TRACK_1_RESULTADOS.md`: retirar resultados no observados, corregir estadísticas que no correspondan a sus fuentes y reformular la decisión como avance de una hipótesis de diseño. Después, revisar la consistencia entre esa síntesis, el roadmap post-checkpoint y el alcance inicial de Track 2.
