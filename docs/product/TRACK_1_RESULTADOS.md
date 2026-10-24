# SnoozeOps — Track 1: Síntesis de investigación documental

**Estado:** investigación secundaria sintetizada; puerta de diseño recomendada.
**Alcance cubierto:** fuentes públicas; la auditoría interna de pantallas y transiciones queda pendiente.
**Investigación con personas:** no realizada y fuera del alcance de Track 1. No hubo entrevistas, encuestas, pruebas de usabilidad, diarios ni participantes `n=8`.
**Decisión recomendada:** avanzar a Track 2 como exploración de una hipótesis de diseño, sin declarar validación de usuarios ni impacto demostrado.

---

## 1. Resumen ejecutivo

Las fuentes revisadas hacen razonable que SnoozeOps explore cómo la recuperación del trabajo, el estrés de TI/on-call y la gestión de alertas se relacionan con la desconexión al terminar una guardia. Sin embargo, la evidencia encontrada es indirecta para el caso específico de SnoozeOps: no demuestra con qué frecuencia un operador revisa sistemas antes de dormir, que la incertidumbre de cobertura sea la causa principal, ni que un relevo bilateral reduzca la rumiación o mejore el sueño.

Las encuestas sectoriales aportan contexto sobre estrés y carga de alertas, pero difieren en población y propósito. El estudio de Object First aborda estrés relacionado con riesgos de seguridad en trabajadores de TI y seguridad de EE. UU.; el estudio de NeuBird aborda fiabilidad de producción, incidentes y alertas. Ninguno mide el problema de SnoozeOps directamente. Las guías de SRE sirven como orientación práctica y no como evidencia experimental del producto.

### Decisión de puerta

**Continuar a Track 2 como hipótesis de diseño, con alcance acotado.** Explorar primero cómo hacer explícitos y coherentes el estado de cobertura, la persona responsable, la ventana y la ruta de escalamiento. Mantener las reglas determinísticas y conservadoras del MVP.

Esta decisión se apoya en la coherencia entre la tesis y el producto existente, además de la pertinencia general de las fuentes. **No significa** que el problema esté validado con usuarios, que la interfaz se entienda sin ayuda, que el mecanismo sea aceptado por titulares y relevos, ni que el producto produzca más sueño.

---

## 2. Respuestas reformuladas a las preguntas de Track 1

### ¿La dificultad para desconectarse después de una guardia es frecuente en el público objetivo?

**No se puede determinar con la evidencia de este track.** La literatura sobre recuperación del trabajo incluye el desapego psicológico como una dimensión relevante, y estudios de estrés en TI muestran presiones laborales relacionadas con seguridad y operación. Pero las fuentes revisadas no miden la frecuencia con que operadores on-call revisan Slack, tickets o métricas antes de dormir, ni permiten estimar prevalencia para Chile.

**Conclusión:** la relevancia general del tema es plausible; la frecuencia específica para Rodrigo y el mercado objetivo queda **no evaluada**.

### ¿La causa principal es la falta de un relevo verificable?

**No está establecida.** La incertidumbre sobre responsable, pendientes y escalamiento es una hipótesis de producto plausible, pero las fuentes también muestran factores alternativos como carga de trabajo, equipos insuficientes, presión por disponibilidad, complejidad de herramientas y volumen de alertas.

**Conclusión:** SnoozeOps puede explorar la claridad de responsabilidad como una palanca, sin presentarla como causa raíz confirmada ni como explicación única.

### ¿El titular y el relevo consideran aceptable y útil el mecanismo propuesto?

**No evaluado.** Ninguna fuente pública revisada valida la aceptación del flujo específico de SnoozeOps ni la justicia de transferir una ventana de guardia. El pasaporte de relevo, el derecho a rechazar y la delimitación del alcance son decisiones de diseño que deberán seguir siendo explícitas y conservadoras.

**Conclusión:** la aceptabilidad del mecanismo permanece como hipótesis, no como hallazgo.

### ¿Las personas entienden sin ayuda la cobertura y las rutas de alertas?

**No evaluado con personas.** Se puede inspeccionar que las reglas y el copy del producto sean coherentes entre pantallas y que no prometan silencio total. Esa revisión documental no demuestra que un usuario entienda la cobertura, el límite horario o la escalación sin explicación.

**Conclusión:** no reportar tasas de comprensión ni resultados de tareas en este Track 1.

### ¿Qué cambio de producto conviene explorar después?

Como decisión de diseño de bajo riesgo y alineada con el MVP, priorizar una **superficie de confianza** que derive el estado de cobertura desde hechos verificables y exponga responsable, ventana y condición de escalamiento. Una tarjeta de decisión puede explicar qué regla determinística se aplicó.

El checklist/recibo de cierre cognitivo puede mantenerse como hipótesis posterior. Las fuentes revisadas no prueban que externalizar pendientes o confirmar el relevo reduzca rumiación. Por ello, el orden recomendado es primero hacer auditable la responsabilidad y sus fallos; luego decidir si corresponde incorporar un ritual de cierre.

---

## 3. Síntesis de evidencia pública

| Tema | Qué respalda la fuente | Aplicabilidad a SnoozeOps | Límite que debe conservarse |
| --- | --- | --- | --- |
| **Recuperación y desapego psicológico** | Sonnentag y Fritz desarrollan y evalúan el *Recovery Experience Questionnaire*, distinguiendo desapego psicológico, relajación, experiencias de dominio y control del tiempo libre. El trabajo estudia asociaciones entre estas experiencias y medidas de bienestar, incluidas dificultades de sueño. | Da fundamento para tratar la desconexión del trabajo como un tema de recuperación que merece atención. | No estudia SnoozeOps, relevos de guardia ni prueba que un ritual bilateral mejore el sueño. Evitar la afirmación de que “metas inacabadas” son la causa probada en este caso. |
| **Estrés en TI y seguridad** | Object First reporta una encuesta encargada a Dynata de 500 trabajadores de TI y seguridad en EE. UU. En ese grupo, 84% declaró estrés incómodo asociado a riesgos de seguridad y 78% temor a ser culpado por incidentes. | Sugiere que algunos trabajadores de TI reportan presión y temor a la culpa en contextos de seguridad. | Es una encuesta encargada por un proveedor, en EE. UU. y centrada en seguridad/ransomware. No mide turnos nocturnos, chequeos antes de dormir ni el mercado chileno. |
| **Carga y fatiga de alertas** | El comunicado sobre el estudio 2026 de NeuBird informa una encuesta de 1.039 profesionales SRE, DevOps e IT Ops. Reporta que 77% de equipos on-call recibe al menos diez alertas diarias, 57% indica que menos de 30% de esas alertas son accionables y 83% ignora o descarta alertas al menos ocasionalmente. | Sirve como señal sectorial de ruido de alertas y riesgos para la atención. Apoya diseñar rutas explícitas y evitar silenciar eventos críticos. | Es un estudio sectorial publicado por NeuBird; no informa que “70%+ de las alertas nocturnas son falsos positivos o P3/P4”. No usar esa cifra ni atribuirle medición de sueño o conducta pre-sueño. |
| **Prácticas SRE para alertamiento** | La guía de FireHydrant describe fatiga de alertas, clasificación por severidad, ownership de servicios, runbooks y ajuste continuo de reglas. | Orientación para revisar cómo SnoozeOps muestra clasificación, reglas y próximos pasos. | Es una guía práctica de un proveedor, no un estudio que pruebe la eficacia de la solución SnoozeOps. No sustenta por sí sola un porcentaje de alertas no accionables. |

### Referencias

1. Sonnentag, S. y Fritz, C. (2007). *The Recovery Experience Questionnaire: Development and Validation of a Measure for Assessing Recuperation and Unwinding From Work.* Journal of Occupational Health Psychology, 12(3), 204–221. [PubMed](https://pubmed.ncbi.nlm.nih.gov/17638488/) · [Texto completo alojado por Universität Konstanz](https://kops.uni-konstanz.de/bitstreams/98ac710b-0e57-4fb7-a281-e7a2aa0618ef/download).
2. Object First. *The Human Impact of Ransomware: IT Professionals Are Being Pushed to the Limit.* [Artículo y metodología de la encuesta](https://objectfirst.com/blog/the-human-impact-of-ransomware-it-professionals-are-being-pushed-to-the-limit/).
3. NeuBird AI / Business Wire (6 de abril de 2026). *New Study Finds Alert Fatigue Has Become a Production Reliability Risk and Incident Response Alone Is No Longer Enough.* [Comunicado y metodología](https://www.businesswire.com/news/home/20260406439955/en/New-Study-Finds-Alert-Fatigue-Has-Become-a-Production-Reliability-Risk-and-Incident-Response-Alone-Is-No-Longer-Enough).
4. FireHydrant (1 de marzo de 2022). *Alert Fatigue in SRE: What It Is & How To Avoid It.* [Guía](https://firehydrant.com/blog/alert-fatigue/).

---

## 4. Lectura de producto: implicaciones y límites

### Implicaciones que sí se pueden derivar

- Mostrar quién tiene la responsabilidad, qué ventana cubre y qué condición reactiva una escalación.
- Mantener visible el estado de aceptación; no representar la cobertura como completa si falta una confirmación requerida.
- No describir una alerta agrupada como resuelta, descartada o atendida.
- Mantener una ruta explícita para incidentes críticos, ambiguos o sin confirmación.
- Presentar la IA, si aparece en fases futuras, como apoyo explicable sujeto a reglas y control humano; no como autoridad para silenciar alertas.
- Describir `+60 min` como tiempo reservado en ventanas planificadas, no como sueño observado ni beneficio de salud medido.

Estas son implicaciones de diseño y seguridad coherentes con el producto; no son preferencias declaradas por usuarios de SnoozeOps.

### Afirmaciones que este informe no sostiene

- Que 7 de 8 operadores revisan sistemas antes de dormir.
- Que titulares y relevos aceptaron el pasaporte o el ritual de cierre.
- Que 87,5% o 100% entendió la interfaz o las rutas P1/P3.
- Que se probaron tareas de prototipo con participantes.
- Que el relevo bilateral reduce rumiación, evita interrupciones o aumenta el sueño.
- Que el 70% o más de las alertas nocturnas son falsos positivos o incidentes P3/P4.

---

## 5. Hipótesis y estado de evidencia

| ID | Hipótesis | Estado tras investigación documental | Evidencia/limitación |
| --- | --- | --- | --- |
| H1 | Las personas de guardia tienen dificultad frecuente para desconectarse por la noche debido a incertidumbre de cobertura. | **No evaluada para el público objetivo; plausibilidad general.** | Literatura sobre recuperación y encuestas de presión TI aportan contexto, pero no miden frecuencia ni causa en operadores on-call de Chile. |
| H2 | Un relevo explícito reduce rumiación y chequeos posteriores. | **Hipótesis de mecanismo, no probada.** | Ninguna fuente revisada evalúa el flujo de relevo de SnoozeOps ni su efecto conductual. |
| H3 | La gente confiará si el sistema agrupa alertas con reglas explicables y promete una noche silenciosa. | **Reformular; la promesa absoluta no es aceptable como principio de diseño.** | Fatiga de alertas es un riesgo reconocido en fuentes sectoriales, pero no se evaluó confianza de usuarios. El producto debe evitar prometer silencio total por seguridad y honestidad. |
| H4 | Los relevos aceptarán si el alcance está delimitado y pueden rechazar. | **No evaluada.** | No hay evidencia directa de aceptación ni de justicia de carga. Mantener derecho a rechazar como resguardo de diseño, sin llamarlo preferencia validada. |
| H5 | Medir sueño clínico es necesario para demostrar valor. | **No evaluada como preferencia de usuarios; innecesaria para el MVP actual.** | El MVP puede reportar tiempo reservado según ventanas planificadas y declarar claramente que no mide sueño. No afirmar que participantes prefirieron esa métrica. |

---

## 6. Recorrido de producto como hipótesis

Este recorrido expresa una **respuesta de diseño propuesta**, no necesidades observadas en entrevistas:

| Momento | Riesgo o pregunta de diseño | Respuesta que SnoozeOps podría ofrecer |
| --- | --- | --- |
| Antes de cerrar | ¿Quedaron pendientes sin dueño o contexto? | Checklist y resumen editable, con responsable explícito. |
| Pedir relevo | ¿Está claro qué se transfiere y quién puede aceptar? | Solicitud acotada, con aceptación o rechazo explícitos. |
| Activar ventana | ¿Está derivado el estado de cobertura de confirmaciones reales? | Estado visible, condición de escalamiento y acción primaria coherente. |
| Durante la ventana | ¿Qué ocurre con alerta crítica, ambigua o sin acuse? | Regla determinística y ruta conservadora explicada; no promesa de cero interrupciones. |
| Revisión posterior | ¿Qué quedó pendiente y qué ocurrió en la simulación? | Resumen factual que distingue pendiente, escalado, resuelto y escenario simulado. |

---

## 7. Oportunidades priorizadas para Track 2

| Prioridad | Oportunidad | Razón documental/de producto | Límite de la afirmación |
| --- | --- | --- | --- |
| 1 | **Estado de cobertura derivado y pasaporte de relevo** | Hace visible la responsabilidad, ventana, aceptación y condición de escalamiento; se alinea directamente con el mecanismo ya presente en el MVP. | Es la hipótesis de diseño mejor alineada, no la necesidad de mayor valor validada con usuarios. |
| 2 | **Decisión explicable de enrutamiento** | La evidencia sectorial sobre ruido de alertas refuerza la conveniencia de mostrar clasificación, regla aplicada y próximo paso. | La explicación no demuestra que una alerta se haya clasificado correctamente en un entorno real. |
| 3 | **Checklist/recibo de cierre cognitivo** | Puede estructurar pendientes y dejar constancia de la cobertura antes de cerrar. | El supuesto de que reduce rumiación es teórico y no está probado para SnoozeOps; mantenerlo acotado y no clínico. |

---

## 8. Verificación de puertas

- **Puerta A — Integridad documental:** **Aprobada para las fuentes incluidas.** Las cifras y afirmaciones se limitan a su población y tipo de fuente; no se atribuyen resultados a participantes. El registro completo de fuentes y afirmaciones sigue siendo entregable del track.
- **Puerta B — Coherencia del producto:** **Pendiente de completar la inspección documental prevista en `TRACK_1_DESCUBRIMIENTO.md`.** Los principios de revisión están definidos, pero este informe no declara que todas las pantallas y transiciones del MVP hayan sido auditadas. Aun aprobada, esta puerta no demostraría comprensión de usuarios.
- **Puerta C — Relevancia documental:** **Aprobada para avanzar como hipótesis.** La evidencia pública justifica explorar recuperación, carga de alertas y claridad de cobertura; no confirma que SnoozeOps resuelva un problema frecuente ni que el mecanismo sea aceptado o efectivo.

---

## 9. Plan inmediato recomendado

1. Mantener el MVP congelado y el trabajo posterior aislado en `post-mvp/trust-surface`.
2. En Track 2, definir estados derivados de cobertura y su tabla de transiciones antes de modificar pantallas.
3. Implementar primero el pasaporte de relevo y la explicación de enrutamiento, con casos de rechazo, pendiente, falta de acuse, alerta ambigua y fallo de conexión.
4. Revisar internamente que cada mensaje se derive de un estado verificable y no prometa resultados no medidos.
5. Mantener checklist/recibo cognitivo como hipótesis opcional; no presentarlo como intervención psicológicamente probada.

### Lenguaje recomendado para presentar el resultado

> “La investigación documental encontró evidencia general sobre recuperación del trabajo y sobre presiones relacionadas con TI y la fatiga de alertas. Esa evidencia hace plausible que la claridad de responsabilidad sea una línea de diseño útil, pero no valida la frecuencia del problema ni el efecto de SnoozeOps. Por eso el siguiente paso es fortalecer la trazabilidad del relevo y su ruta de escalamiento, manteniendo explícito qué falta comprobar.”
