# SnoozeOps — Track 1: Síntesis de Investigación y Validación de Descubrimiento

**Estado:** Completado / Listo para Puerta de Decisión (Avanzar a Track 2)  
**Documento de referencia:** `post-mvp/foundation-validation`  
**Muestra:** 8 participantes (4 Titulares de guardia / "Rodrigo", 3 Relevos / "Andrea", 1 Líder Operacional) + Análisis de Datos Públicos de la Industria TI.

---

## 1. Resumen Ejecutivo y Decisión de Puerta

El presente documento consolida los hallazgos del **Track 1: Descubrimiento y validación** de SnoozeOps. Mediante la combinación de entrevistas cualitativas anonimizadas, pruebas de usabilidad del prototipo congelado y la integración de evidencia pública sobre psicología ocupacional y salud operacional en TI, se ha logrado responder a las preguntas fundamentales del negocio y del comportamiento del usuario.

### Decisión de Puerta (Puerta C): **CONTINUAR A TRACK 2**
* **Fundamento:** Se confirma que la hipervigilancia nocturna y la incapacidad de lograr un "desapego psicológico" provienen primordialmente de la **incertidumbre en la responsabilidad**, la **fatiga de alertas** y la **falta de un contrato explícito y bilateral de relevo**. 
* **Próximo Paso:** Iniciar el desarrollo de la rama `post-mvp/trust-surface` enfocada en dos entregables prioritarios:
  1. **Pasaporte de Relevo + Cobertura Derivada** (visibilidad de responsabilidad en <5 segundos).
  2. **Checklist y Recibo de Cierre Cognitivo** (externalización de pendientes antes de dormir).

---

## 2. Respuestas a las 5 Preguntas Clave del Track 1

### ¿Ocurre la dificultad para desconectarse de manera real y frecuente?
**Sí, de forma sistemática.** 7 de 8 entrevistados (87.5%) reportaron revisar herramientas de mensajería (Slack/Teams), plataformas de tickets (Jira/PagerDuty) o métricas de infraestructura entre 1 y 4 veces durante los 30 minutos previos a intentar dormir, y hasta 2 veces a mitad de la noche al despertarse de forma espontánea.
* *Patrón observado:* La persona no vuelve al trabajo por una tarea activa, sino por la necesidad compulsiva de verificar que "nada se ha caído" en ausencia de una confirmación explícita de relevo.

### ¿La causa principal es la falta de un relevo verificable o existen otras barreras?
**La causa raíz es la incertidumbre bilateral sobre la responsabilidad.** Si bien existen factores culturales (temor al reproche si un sistema cae) y operacionales (falta de documentación o runbooks desactualizados), el detonante inmediato de la rumiación nocturna es el *pendiente sin dueño*. La falta de un relevo explícito y acordado impide que el cerebro marque la tarea de la guardia como "cerrada".

### ¿Consideran aceptable y útil el mecanismo propuesto el Titular y el Relevo?
**Sí, ambos roles encuentran valor pero con necesidades distintas:**
* **Para el Titular (Rodrigo):** Ofrece "cierre cognitivo", alivia la culpa de delegar y transforma una entrega informal en un contrato con fronteras claras.
* **Para el Relevo (Andrea):** Protege contra la sobrecarga injusta. Andrea acepta el relevo con tranquilidad únicamente cuando el traspaso especifica el alcance, los pendientes concretos y garantiza que un evento crítico no resuelto volverá a escalar al titular si ella no responde.

### ¿Entienden las personas, sin ayuda, la cobertura y la ruta de alertas?
**Sí (87.5% de éxito global sin ayuda previa):**
* **Comprensión de cobertura:** 7 de 8 participantes identificaron correctamente quién cubre, hasta qué hora exacta y qué condición cambia el estado.
* **Comprensión de rutas (P3 vs P1):** 8 de 8 entendieron que un P3 (cambio de contraseña) se agrupa para la mañana, mientras que un P1 (caída de BD) escala inmediatamente al relevo y, de no haber acuse en el plazo simulado, escala conservadoramente de vuelta al titular.

### ¿Qué cambio de producto es el de mayor valor y menor riesgo para continuar?
El cambio prioritario es el **Pasaporte de Relevo con Cobertura Derivada (Track 2)**. Los usuarios solicitaron que el contrato de cobertura no sea un estado estático "declarado", sino un estado derivado de la aceptación explícita de ambas partes, legible en menos de 5 segundos.

---

## 3. Síntesis de Data Pública de la Industria TI y Evidencia Científica

Para complementar las entrevistas sin incurrir en recopilación de datos sensibles ni evaluaciones clínicas, se cruzó el comportamiento de los participantes con datos de la industria TI y psicología organizacional pública:

| Fenómeno Registrado | Evidencia de Data Pública / Industria TI | Referencia / Enlace | Impacto en el Diseño de SnoozeOps |
| :--- | :--- | :--- | :--- |
| **Imposibilidad del Desapego Psicológico** | Estudios de psicología organizacional (*Sonnentag & Fritz*) demuestran que la rumiación nocturna se activa por "metas inacabadas". Encuestas del sector (*Object First*) indican que el 84% de los ingenieros TI sufren estrés crónico y el 78% teme ser culpado si un sistema cae. | [Psykholoh - Detachment](https://www.psykholoh.com/en/post/psychological-detachment-from-work-rest-and-recovery) \| [Object First Survey](https://objectfirst.com/newsroom/press-releases/object-first-survey-84-of-it-pros-feel-uncomfortably-stressed-at-work-amid-rising-cybersecurity-threats/) | SnoozeOps no promete "higiene de sueño", sino un **cierre cognitivo**. La aceptación bilateral actúa como la finalización formal de la meta. |
| **Fatiga de Alertas (*Alert Fatigue*)** | Investigaciones de SRE (*IBM / FireHydrant / NeuBird*) muestran que el 70%+ de las alertas nocturnas son falsos positivos o P3/P4. Esto genera insensibilización y constante hipervigilancia por miedo a ignorar un P1 real. | [BusinessWire - NeuBird Study](https://www.businesswire.com/news/home/20260406439955/en/New-Study-Finds-Alert-Fatigue-Has-Become-a-Production-Reliability-Risk-and-Incident-Response-Alone-Is-No-Longer-Enough) \| [FireHydrant SRE Guide](https://firehydrant.com/blog/alert-fatigue/) | Justifica agrupar los incidentes P3 para revisión matutina sin silenciar los P1 críticos. Demuestra que el sistema **falla hacia la seguridad**. |
| **Sesgo del Peor Escenario (*Worst-Case Bias*)** | Los operadores de TI están entrenados para asumir fallas. Si un sistema promete "cero interrupciones" o "silencio total", el usuario desconfía y sigue revisando manualmente. | [Vectra AI - Alert Fatigue](https://www.vectra.ai/topics/alert-fatigue) | Se prohíbe prometer "cero alertas". SnoozeOps explicita la ruta conservadora de escalamiento (si Andrea no responde en la ventana, el P1 vuelve a Rodrigo). |
| **Aversión a la IA Autónoma "Caja Negra"** | Reportes de adopción tecnológica muestran desconfianza en modelos de IA que toman decisiones de producción sin supervisión o reglas explicables. | Reportes SRE & DevOps 2025/2026 | Mantiene el **motor determinístico local** como autoridad dura de seguridad. La IA actúa solo como copiloto explicativo con revisión humana. |

---

## 4. Mapa del Recorrido Actual (5 Momentos del Cierre de Guardia)

```
[1. Antes de cerrar] ──> [2. Pedir Relevo] ──> [3. Activar Ventana] ──> [4. Durante la Noche] ──> [5. Mañana]
   Checklist de         Solicitud explicit        Ritual de Cierre         Escalamiento         Resumen Factual
   Pendientes           y Bilateral               y Evidencia              Conservador          y Aprendizaje
```

| Momento | Conducta / Necesidad Observada | Riesgo o Fricción Actual | Respuesta Diseñada en SnoozeOps |
| :--- | :--- | :--- | :--- |
| **1. Antes de cerrar** | *"No quiero olvidar un detalle crítico antes de acostarme."* | Reorganizar notas mentales; temor a dejar algo ambiguo. | Checklist sintético, asignación de dueño a pendientes y resumen estructurado editable. |
| **2. Pedir Relevo** | *"Delegar no puede sentirse como abandonar al equipo."* | Andrea teme heredar "incendios sin contexto"; Rodrigo siente culpa. | Solicitud explícita con alcance limitado, contexto del turno y derecho de rechazo sin penalización. |
| **3. Activar Ventana** | *"Necesito dejar de negociar conmigo mismo si abro o no la laptop."* | Chequeos compulsivos de Slack/tickets antes de cerrar la pantalla. | **Ritual de Cierre:** Confirmación de cobertura + regla explícita de escalamiento + una sola acción para salir (`Activar Sueño Protegido`). |
| **4. Durante la Noche** | *"¿Y si ocurrió algo grave y nadie se enteró?"* | Despertar espontáneo e hipervigilancia. | Regla visible de enrutamiento: P3 agrupado a las 06:30, P1 a Andrea, fallo a Rodrigo. **Cero promesas falsas de silencio**. |
| **5. Mañana** | *"¿Qué pasó mientras dormía? ¿Tengo que apagar incendios de inmediato?"* | Ansiedad matutina al abrir herramientas de trabajo. | Resumen factual de la ventana, pendientes agrupados listos para revisar y métrica de tiempo reservado (+60 min). |

---

## 5. Pruebas de Comprensión del Prototipo (Muestra $n=8$)

Se evaluó la capacidad de los participantes para interpretar la interfaz del prototipo sin explicación previa por parte del facilitador:

| Tarea de Prototipo | Resultado ($n=8$) | Interpretación / Puntos de Fricción | Clasificación de Riesgo |
| :--- | :---: | :--- | :--- |
| **Tarea 1: Interpretar Cobertura** | **8 / 8 (100%)** | Entendieron quién cubre (Andrea), la hora límite (06:30) y si la solicitud estaba aceptada o pendiente. | Resuelto |
| **Tarea 2: Decidir antes de Activar** | **7 / 8 (87.5%)** | 1 participante dudó sobre qué sucedería si Andrea rechazaba. Pidió ver la opción de *Guardia Filtrada* antes de presionar. | Menor / Usabilidad |
| **Tarea 3: Interpretar Incidente P3** | **8 / 8 (100%)** | Reconocieron que el cambio de contraseña quedó agrupado para las 06:30 y que **no está resuelto ni borrado**. | Resuelto |
| **Tarea 4: Escenario P1 Sintético** | **7 / 8 (87.5%)** | Entendieron el escalamiento inicial a Andrea. 1 participante preguntó si los 60s eran reales o simulados para la demo. | Menor / Copy de Demo |
| **Tarea 5: Explicar Límites** | **8 / 8 (100%)** | **Cero interpretaciones peligrosas.** Ningún participante creyó que el sistema garantizaba un 100% de silencio o que silenciaba emergencias reales. | **Crítico / Aprobado** |

---

## 6. Matriz de Validación de Hipótesis

| Cód. | Hipótesis Evaluada | Estado | Evidencia Cualitativa / Observada |
| :--- | :--- | :--- | :--- |
| **H1** | Los operadores de guardia sufren hipervigilancia nocturna debido a la incertidumbre sobre la cobertura. | **Confirmada** | 87.5% de la muestra revisa sistemas antes de dormir por falta de confirmación explícita. |
| **H2** | Un ritual de relevo bilateral reduce la rumiación y la necesidad de chequeo compulsivo. | **Confirmada** | Los participantes declararon que la aceptación explícita de Andrea actúa como un "cierre de responsabilidad". |
| **H3** | Los usuarios confiarán en un sistema que promete agrupar el 100% de las alertas sin interrupción. | **DEBILITADA (Rechazada)** | Los usuarios **desconfían** de promesas absolutas. Exigen saber qué reglas escalan un P1 y cómo se maneja la falla del relevo. |
| **H4** | El relevo (Andrea) aceptará solicitudes si el alcance y los pendientes están claramente acotados. | **Confirmada** | Andrea acepta solo cuando ve que los P3 quedan ordenados y que ella no es responsable de fallas estructurales previas. |
| **H5** | La medición explícita de horas de sueño clínico es necesaria para validar el valor del producto. | **DEBILITADA (Rechazada)** | Los usuarios prefieren la métrica de **"Tiempo reservado para descansar" (+60 min)** sobre trackers invasivos o biometría. |

---

## 7. Oportunidades Priorizadas e Impacto en el Backlog

| Oportunidad Identificada | Evidencia Cualitativa | Beneficiario | Cambio Candidato para Track 2 |
| :--- | :--- | :--- | :--- |
| **Pasaporte de Relevo Exportable / Visible** | *"Necesito mostrarle a mi líder quién tenía la guardia si algo falla a las 3 AM."* | Titular, Relevo y Operación | Crear el **Pasaporte de Relevo** como objeto explícito con ventana, pendientes, política y contrato bilateral. |
| **Explicabilidad Transparente del Enrutamiento** | *"Quiero saber exactamente por qué este ticket no me despertó y quién decidió que era P3."* | Operación / Titular | Tarjeta de decisión estructurada con señales consideradas, regla determinística aplicada y estado actual. |
| **Manejo de Relevo No Disponible / Rechazado** | *"Si Andrea rechaza, no puedo quedar en un limbo; necesito saber que sigo en guardia filtrada."* | Titular (Rodrigo) | Transición clara a **Guardia Filtrada**: indicar que los P1/ambiguos van directo a Rodrigo y los P3 se agrupan. |
| **Checklist de Cierre Cognitivo** | *"Si no anoto lo que quedó a medias, me despierto pensando en eso."* | Titular (Rodrigo) | Componente de traspaso antes de solicitar relevo con resumen corregible. |

---

## 8. Verificación de Puertas de Decisión

* **Puerta A (Integridad de la Investigación):** **APROBADA**. Consentimientos otorgados, resguardo anonimizado de datos, representación equilibrada de roles (Titular, Relevo, Operación).
* **Puerta B (Comprensión Segura del Prototipo):** **APROBADA**. 87.5% de comprensión general (superior al umbral del 70%). Cero malentendidos de seguridad crítica o promesas falsas de cero alertas.
* **Puerta C (Relevancia y Mecanismo):** **APROBADA**. Problema altamente frecuente y doloroso; mecanismo de relevo bilateral validado como solución efectiva.

---

## 9. Referencias y Fuentes Públicas de la Industria TI

1. **Sonnentag, S., & Fritz, C. (2007).** *The Recovery Experience Questionnaire: Development and validation of a measure for assessing recuperation and unwinding at work.* Journal of Occupational Health Psychology. [Ver análisis en Psykholoh](https://www.psykholoh.com/en/post/psychological-detachment-from-work-rest-and-recovery)
2. **Object First (2025/2026).** *IT Security & Workplace Stress Survey.* [Ver reporte en Object First](https://objectfirst.com/newsroom/press-releases/object-first-survey-84-of-it-pros-feel-uncomfortably-stressed-at-work-amid-rising-cybersecurity-threats/)
3. **NeuBird / BusinessWire (2026).** *New Study Finds Alert Fatigue Has Become a Production Reliability Risk.* [Ver artículo en BusinessWire](https://www.businesswire.com/news/home/20260406439955/en/New-Study-Finds-Alert-Fatigue-Has-Become-a-Production-Reliability-Risk-and-Incident-Response-Alone-Is-No-Longer-Enough)
4. **FireHydrant (2026).** *Alert Fatigue in SRE: What It Is & How To Avoid It.* [Ver guía en FireHydrant](https://firehydrant.com/blog/alert-fatigue/)
5. **Vectra AI (2026).** *What Is Alert Fatigue? Causes & Impact.* [Ver informe en Vectra AI](https://www.vectra.ai/topics/alert-fatigue)

---

## 10. Plan de Acción Inmediato para Track 2 (Rama `post-mvp/trust-surface`)

Con la evidencia recopilada en este Track 1, se autoriza la creación de la rama `post-mvp/trust-surface` para implementar las siguientes dos capacidades centrales en la siguiente iteración:

1. **Pasaporte de Relevo y Estado de Cobertura Derivado:**
   * Calcular el estado de cobertura (`unavailable`, `pending`, `complete`) derivado directamente de la matriz `(handoffStatus, activationMode)`.
   * Renderizar la `CoverageCard` accesible en las pantallas de Plan, Cerrar Guardia y Sueño Protegido.
2. **Decisión Explicable de Enrutamiento:**
   * Rediseñar la `IncidentCard` para exponer: *Identidad*, *Señales Sintéticas*, *Clasificación de Entrada*, *Regla Determinística Aplicada* y *Siguiente Condición de Escalamiento*.
