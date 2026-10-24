# SnoozeOps — Track 2: Pasaporte de relevo y superficie de confianza

**Estado:** investigación documental y auditoría del baseline completadas; especificación lista para implementar en una rama aislada.
**Fecha de cierre de investigación:** 23 de octubre de 2026.
**Rama prevista:** `post-mvp/trust-surface`, creada desde el tag `checkpoint-2-mvp` o desde el checkpoint post-MVP aprobado.
**Dependencias:** MVP de Fases 0–5 congelado; Track 1 habilita continuar sólo como hipótesis de diseño; revisar la auditoría documental de coherencia antes de tocar código.
**Propósito:** hacer visible y comprobable qué cobertura ofrece una ventana, quién responde y qué regla determinística se aplicó a una incidencia.
**Límite de investigación:** no incluye investigación primaria con personas durante la hackatón: no se harán entrevistas, encuestas propias, pruebas de usabilidad, observación, diarios ni reclutamiento. Sí se permite y se recomienda revisar estudios, encuestas y datos publicados en la web, priorizando investigaciones reales y fuentes trazables. No se atribuirá comprensión, aceptación o valor del producto a usuarios a partir de evidencia secundaria. La verificación del artefacto será automatizada y mediante una revisión interna del equipo.

---

## 1. Decisión que debe habilitar

Al finalizar Track 2 se debe poder decidir si la superficie de confianza es **coherente, segura, accesible y técnicamente verificable** como hipótesis de diseño, y si el producto está suficientemente preparado para que una etapa posterior evalúe operación real.

Track 2 responde desde el producto y sus reglas:

1. ¿El estado de cobertura se deriva de confirmaciones existentes y no puede contradecirlas?
2. ¿La ventana, el responsable, el límite y la ruta conservadora se muestran de forma consistente?
3. ¿Se puede reconstruir por qué una incidencia se agrupó o escaló?
4. ¿Los estados de rechazo, pendiente, error o falta de confirmación evitan una falsa promesa de cobertura?
5. ¿La implementación conserva las decisiones y restricciones del MVP congelado?

Los estudios publicados pueden respaldar la relevancia de conceptos generales —por ejemplo recuperación del trabajo, carga de alertas, traspasos o prácticas SRE— y ayudar a justificar restricciones de diseño. No responden si Rodrigo o Andrea entienden la pantalla sin ayuda, aceptan el mecanismo, lo prefieren a su proceso actual, se sienten más tranquilos o duermen más. Esas preguntas sobre SnoozeOps quedan **no evaluadas**; no se reemplazarán por resultados inventados ni por la opinión del equipo presentada como evidencia de usuarios.

### Resultado esperado

Una demo local, aislada del MVP congelado, que permita inspeccionar el pasaporte, recorrer los estados implementados y abrir una decisión de incidencia explicable. El resultado acredita consistencia del modelo y del producto; no acredita adopción ni eficacia conductual.

---

## 2. Tesis e hipótesis de diseño

> Si el estado de cobertura se deriva de confirmaciones explícitas y SnoozeOps muestra responsable, ventana y ruta de escalamiento junto a la decisión de incidencia, el mecanismo de relevo será más auditable y evitará afirmaciones de protección que las reglas no sostienen.

La hipótesis propone una propiedad comprobable del sistema: **consistencia y trazabilidad**. No postula que esta propiedad baste para producir confianza psicológica, desconexión o mejor sueño.

### Hipótesis concretas

| ID | Hipótesis | Evidencia que Track 2 sí puede producir | Lo que queda no evaluado |
| --- | --- | --- | --- |
| T2-H1 | La cobertura puede calcularse sin persistir un segundo estado duplicado. | Pruebas del selector para cada combinación válida de estado y modo. | Si una persona interpreta correctamente cada etiqueta. |
| T2-H2 | El pasaporte puede mostrar el contrato operativo en una vista compacta. | Inspección de contenido, accesibilidad y responsive; revisión interna. | Preferencia, comprensión o utilidad percibida. |
| T2-H3 | Cada decisión puede explicarse con las señales y reglas realmente usadas. | Trazabilidad entre fixture, motor determinístico y tarjeta de decisión. | Si la explicación basta para confiar o decidir en operación real. |
| T2-H4 | Los fallos de confirmación pueden representarse sin falsa cobertura. | Pruebas de estados `pending`, `declined`, modo `filtered` y rutas de escalamiento disponibles. | Aceptabilidad del reparto de carga. |

---

## 2.1 Investigación documental completada: evidencia que informa Track 2

La investigación cerró decisiones de implementación; no vuelve a abrir la tesis ni simula validación con usuarios. Se reutilizó el contexto sobre recuperación y carga de alertas de Track 1; las fuentes siguientes cubren los vacíos específicos de relevo, escalamiento, trazabilidad y accesibilidad de esta iteración.

| ID | Fuente, tipo, fecha y método/población | Hallazgo acotado y decisión concreta | Límite de transferencia |
| --- | --- | --- | --- |
| T2-S1 | [Google SRE Workbook — *Being On-Call*](https://sre.google/workbook/on-call/) (guía técnica de Google; consultada 2026-10-23). No es un estudio: no declara muestra ni método de investigación. | Describe responsabilidades explícitas, lectura del handoff al inicio y envío al término de cada turno; también recomienda alertas accionables. El pasaporte debe nombrar ventana, titular, relevo, pendientes y condición de escalamiento; una alerta agrupada sigue pendiente de revisión. | Es una práctica de Google, no un estudio experimental ni una medida de adopción, sueño o eficacia de SnoozeOps. |
| T2-S2 | [Google SRE Book — *Being On-Call*](https://sre.google/sre-book/being-on-call/) (guía técnica de Google; consultada 2026-10-23). No es un estudio: no declara muestra ni método de investigación. | Distingue roles primario/secundario, acuse y escalamiento; recomienda alertas accionables y regular alertas relacionadas a un incidente. La tarjeta muestra entrada, regla, estado, próximo responsable y condición siguiente; P1, baja confianza, `Unknown` e impacto creciente conservan ruta de escalamiento. | No define las severidades, timeout ni política de SnoozeOps; esos parámetros continúan siendo los del fixture y la demo local. |
| T2-S3 | [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) (estándar web, 2023; consultado 2026-10-23). No aplica población/muestra: es especificación técnica. | El criterio 4.1.3 exige estados determinables programáticamente sin mover el foco; 2.5.8 exige objetivos táctiles de al menos 24×24 CSS px, salvo excepciones. Estados de relevo, activación e incidencia usarán texto e identidad semántica; los controles tendrán foco visible y mínimo verificable. | Es un estándar de accesibilidad, no evidencia de comprensión de la política de cobertura ni de preferencia de usuarios. |
| T2-S4 | [W3C — Understanding Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages) (guía de implementación; consultada 2026-10-23). No aplica población/muestra: explica el criterio WCAG. | Advierte que regiones vivas excesivas pueden volver una aplicación demasiado verbosa para lectores de pantalla. Sólo se anuncia un resultado breve tras una acción; no la tarjeta completa ni cada cambio del simulador. | La frecuencia óptima de mensajes para usuarios de SnoozeOps sigue sin evaluarse; se aplica el mínimo conservador del estándar. |
| T2-S5 | [BMJ Quality & Safety 2025 — revisión sistemática de protocolos de handoff](https://pubmed.ncbi.nlm.nih.gov/40306923/) (revisión revisada por pares; publicada en 2025, consultada 2026-10-23). Revisó cuatro bases de datos y evidencia de handoffs dentro de unidades hospitalarias. | La evidencia revisada favorece algunos protocolos clínicos estructurados. El pasaporte se limita a un contrato breve y consistente —responsables, ventana, pendientes, regla y aceptación—, no a texto ambiguo ni un dashboard libre. | El dominio clínico es distinto de SRE. No se infiere que el pasaporte reduzca incidentes, mejore la coordinación o sea aceptado por equipos técnicos. |

### Síntesis de decisión

La evidencia es suficiente para endurecer la **estructura y trazabilidad** de la demo, no para ampliar sus promesas. Track 2 implementará un contrato de relevo visible, estados derivados y rutas explicables. No incorporará medición de sueño, afirmaciones de reducción de ansiedad, métricas de eficacia, expiración automática, notificaciones reales ni nuevas reglas de autorización.

### Criterios de aceptación derivados de la investigación

1. El pasaporte siempre contiene: estado factual, ventana, titular, relevo, alcance/pending sintético, regla de alertas, fallback y siguiente acción.
2. La interfaz nunca llama “resuelto”, “atendido” o “cobertura completa” a una situación que el reducer no sostiene.
3. Cada transición muestra un único resultado breve y accesible; el simulador no narra cambios redundantes mediante regiones vivas.
4. El diálogo del simulador lleva el foco a su título al abrirse, lo devuelve al botón que lo abrió al cerrarse y puede cerrarse con `Escape`; esta es una corrección de accesibilidad del artefacto, no una prueba de usabilidad.
5. El contenido de decisiones se deriva de `RoutingDecision`; no se reimplementa clasificación ni ownership en componentes de UI.

---

## 3. Alcance, exclusiones y límites

### Incluye

- Crear una rama de trabajo aislada y registrar el commit base.
- Revisar la evidencia pública ya recopilada en `TRACK_1_RESULTADOS.md` y consultar fuentes web adicionales sólo para vacíos concretos que afecten decisiones del Track 2.
- Relacionar hallazgos publicados con decisiones de diseño, conservando población, método, fecha, patrocinio y límites de transferencia.
- Auditar los tipos, reducer, fixtures, reglas, pantallas y persistencia existentes antes de diseñar cambios.
- Definir el selector derivado de cobertura y su tabla de verdad.
- Diseñar e implementar el pasaporte de relevo con información respaldada por el estado actual.
- Mejorar la explicación de decisiones de incidentes sin cambiar el motor ni sus destinos.
- Mostrar un recibo factual de activación y un resumen matinal que distinga simulación de operación real.
- Añadir pruebas de dominio, transiciones, integración de UI y accesibilidad automatizable.
- Revisar manualmente teclado, foco, lectura visual y tamaños móviles, sin participantes.
- Actualizar la documentación del producto para distinguir lo implementado, simulado y pendiente.

### Fuera de alcance

- **Investigación primaria con personas durante la hackatón:** entrevistas, encuestas propias, tests de comprensión/usabilidad, diarios, observación o reclutamiento. Esta exclusión aplica aunque la actividad se denomine “prueba”, “feedback” o “validación”. La revisión de investigaciones publicadas sí está permitida y no se considera reclutamiento ni evidencia directa del producto.
- Cambios al MVP protegido o a la rama/tag de presentación.
- Cambiar criterios de severidad, la función `evaluateIncident`, destinatarios o tiempos de timeout del motor actual.
- Inventar un estado persistido adicional de cobertura o una fuente de verdad paralela.
- Añadir vencimiento real de solicitudes, revocación de relevo, sustitución, conflictos de calendario o nuevas reglas de autorización: el MVP no modela esos eventos. Se documentan como límites para Track 3.
- Integraciones reales, notificaciones, backend, cuentas, autenticación, red o credenciales.
- LLM, IA, modelos, llamadas de API, resúmenes generados o clasificación automática.
- Compartir o transmitir el pasaporte a terceros. La vista imprimible/exportable será local, de datos sintéticos y marcada como demo.
- Datos reales de personas, tickets, salud, sueño o empresas.
- Métricas individuales, ranking, evaluación de desempeño, diagnóstico o promesas de “noche sin interrupciones”.

### Lo que se puede afirmar al cierre

- “El estado de cobertura se deriva de las condiciones modeladas y está cubierto por pruebas.”
- “La demo explica qué regla determinística aplicó a cada escenario sintético.”
- “La interfaz fue revisada internamente para consistencia, teclado y tamaños definidos.”

### Lo que no se puede afirmar

- “Los usuarios lo entendieron”, “Andrea lo aceptó”, “Rodrigo confía más” o “la solución reduce ansiedad”.
- “Se validó el problema”, “mejora el sueño” o “evita interrupciones”.
- “La cobertura está garantizada” o “la noche queda protegida de toda alerta”.

---

## 4. Fuente de verdad y modelo existente

Antes de implementar, confirmar en la rama de trabajo que los tipos siguen siendo los siguientes. La referencia actual está en `src/domain/types.ts` y `src/domain/demo-reducer.ts`:

- `handoffStatus`: `not_requested | pending | accepted | declined`.
- `activationMode`: `none | protected | filtered`.
- Turnos: `day | night`, con ventana proveniente de `shifts` en `src/data/fixtures.ts`.
- La cobertura aceptada sólo se activa mediante `activate_protected` cuando el relevo fue aceptado.
- `activate_filtered` está disponible cuando el estado es `pending` o `declined`.
- Al cambiar de turno se reinician relevo, activación y simulación porque la aceptación corresponde a una ventana concreta.
- El motor `evaluateIncident` agrupa P2/P3 estables con confianza alta; P1, ambiguos/desconocidos, baja confianza e impacto creciente siguen ruta conservadora.
- El reconocimiento de una incidencia crítica se simula; el timeout del MVP es de 60 segundos simulados, no un temporizador real.
- `morning.isSimulated` y los fixtures identifican una demo; no son datos de operación.

Si el código cambió desde este documento, primero actualizar el inventario y resolver discrepancias. El documento no autoriza a asumir que un comportamiento escrito aquí ya está implementado.

### Restricción de arquitectura

`DemoState` y el reducer continúan como fuente de verdad. La cobertura es un **selector puro** calculado a partir de estado, turno y reglas existentes. No agregar `coverage` a `DemoState`, `localStorage` ni a otro estado persistido. La tarjeta recibe el resultado del selector y no decide lógica operacional.

### Auditoría cerrada del baseline (sin modificar el MVP)

La auditoría revisó `src/domain/types.ts`, `demo-reducer.ts`, `incident-engine.ts`, `fixtures.ts`, `demo-app.tsx`, `incident-card.tsx`, `morning-summary.ts`, `night-summary.tsx`, `simulation-panel.tsx`, `globals.css` y sus pruebas de dominio. El baseline es consistente en sus rutas críticas, pero Track 2 debe corregir los siguientes puntos antes de declarar la nueva superficie honesta.

| Hallazgo verificable en el baseline | Riesgo si se conserva | Cambio obligatorio de Track 2 |
| --- | --- | --- |
| Sólo `accepted` + `protected` produce `hasAcceptedHandoff: true`; el cambio de turno reinicia relevo, activación y simulación. | Ninguno en el motor; es la invariante que la UI debe exponer. | Crear `getCoverageSummary(state, shift)` y probar que `complete` ocurre si y sólo si ambas condiciones se cumplen. |
| `accepted` + `none` es válido, pero el copy actual dice “La cobertura está lista para esta ventana”. | Puede interpretarse como cobertura activa antes de activar el modo protegido. | Etiqueta: “Relevo aceptado; activación pendiente”. Explicar que Rodrigo conserva la responsabilidad hasta activar. |
| El reducer no modela vencimiento de una solicitud; `pending` sólo cambia por la acción simulada de respuesta. Sin embargo, la UI actual dice “Andrea debe aceptar antes de…”. | Introduce una regla/timeout inexistente y puede transformar pendiente en culpa o rechazo implícito. | Sustituir por “La ventana comienza a las …; esta demo no modela vencimiento de la solicitud”, o eliminar la frase. Nunca inferir falta de respuesta. |
| En `protected`, el copy dice “Solo te despertaremos…”. La demo no notifica ni mide despertares. | Promesa operacional y conductual que no existe. | Usar “En esta simulación, P1/ambiguos se enrutan primero a Andrea; el fallback de 60 s se representa con un atajo de demo”. Mantener “sueño real no medido”. |
| `acknowledged_by_backup` dice “Rodrigo no será alertado” y `alerted_to_primary` presenta el timeout como si hubiera ocurrido en tiempo real. | Generaliza una sola prueba P1 sintética y oculta que no hay temporizador. | Restringir ambos textos a “esta prueba de seguridad sintética”; declarar el acuse/no acuse como resultado elegido en el atajo de demo. |
| La mañana, tras agrupar un P3, titula “Sin alertas…” aunque sí ocurrió una incidencia agrupada. | Puede confundirse “no escalada a Rodrigo” con “no hubo incidente”. | Decir “El P3 quedó agrupado; no se simuló escalamiento a Rodrigo en el escenario habitual”. Mantener el estado vacío cuando no se inyectó incidente. |
| `StatusCard` usa `aria-live="polite"`; el diálogo del simulador declara `role="dialog"` pero no administra foco ni `Escape`. | La semántica de cambios y la navegación del diálogo quedan incompletas. | Convertir el resultado breve en `role="status"`; no anunciar tarjetas completas. Implementar foco inicial, retorno de foco y cierre con `Escape`. |
| Los botones principales tienen altura mínima de 52 px y el icono de cierre 38.4 px; foco visible y `prefers-reduced-motion` ya existen. | La base está cerca del objetivo, pero falta una comprobación explícita de todos los controles y de los anchos acordados. | Verificar 24×24 px como mínimo, teclado, foco no oculto, 320/375/544 px y escritorio. Registrar resultados de la revisión interna. |
| La pantalla de mañana sólo deriva el resumen habitual desde `nightHistory` y excluye correctamente `securityTest`. | Hoy no reconstruye aceptación, modo, ventana y fallback de la activación. | Agregar un recibo histórico factual de activación, separado del resumen habitual y con marca `DEMO · DATOS SINTÉTICOS`. |

**Resultado de auditoría:** se puede avanzar. No se detectó una contradicción del motor que obligue a modificar reglas, severidades, destinatarios o timeout. Los cambios de Track 2 son de derivación, presentación, accesibilidad y pruebas; las promesas que exceden el estado actual se corrigen mediante copy y estructura, no mediante lógica nueva de operación.

---

## 5. Secuencia de ejecución

### Paso 0 — Asegurar aislamiento y punto de partida

1. Verificar que `checkpoint-2-mvp` existe y apunta a la versión presentada. Si no existe, identificar el commit congelado antes de comenzar; no crear un tag que aparente una entrega distinta.
2. Confirmar que las verificaciones del proyecto pasan en el commit base: `npm run lint`, `npm run typecheck`, `npm test` y `npm run build`.
3. Crear o cambiar a `post-mvp/trust-surface` desde el checkpoint aprobado. No trabajar desde `main` ni editar el tag.
4. Registrar SHA base, estado inicial de Git y salida de verificaciones en la nota de implementación/PR.
5. Si el árbol contiene cambios preexistentes, no descartarlos. Identificar su dueño y separarlos de este track antes de incorporarlos.

**Salida:** rama aislada, commit base identificable y MVP intacto.

### Paso 1 — Auditoría del producto y matriz de comportamiento

#### Revisión breve de evidencia publicada

Usar `TRACK_1_RESULTADOS.md` como punto de partida. No repetir una búsqueda amplia si las fuentes existentes bastan. Buscar evidencia adicional únicamente cuando una decisión de este track dependa de una pregunta no cubierta, por ejemplo legibilidad de alertas, diseño de traspasos, manejo de ambigüedad o accesibilidad.

Para cada fuente nueva registrar referencia/URL, fecha, tipo de evidencia, población y método, resultado que se usa, limitaciones y decisión de diseño a la que informa. Priorizar artículos revisados por pares, revisiones académicas y guías técnicas primarias; usar encuestas sectoriales sólo cuando publiquen metodología, muestra y patrocinio. Si un dato no se puede rastrear a una fuente verificable, no usarlo como fundamento.

Mantener explícita la diferencia entre:

- **Hallazgo publicado:** qué encontró esa investigación, para su población y método.
- **Aplicabilidad parcial:** por qué puede informar SnoozeOps y qué distancia existe entre el estudio y el producto.
- **Decisión de diseño:** inferencia prudente para la demo; no equivale a efecto probado.
- **No evaluado:** comprensión, aceptación o impacto de SnoozeOps en sus usuarios.

**Salida:** una tabla breve de evidencia→implicación→límite. Si no hace falta buscar fuentes nuevas, documentar que se reutilizó Track 1 y por qué.

#### Auditoría del comportamiento actual

Revisar `src/domain/types.ts`, reducer, motor de incidentes, fixtures, pantallas `plan`, `handoff`, `activation`, `morning`, estilos y pruebas existentes. Anotar:

- Qué información se puede afirmar en cada estado.
- Qué copy actual puede implicar cobertura completa, seguridad absoluta o sueño medido.
- Qué transición ya está implementada y cuál no existe.
- Dónde se muestra la hora de inicio/término para turno de día y noche.
- Qué datos pertenecen a fixtures de demo y cuáles se derivan del estado.
- Qué mensajes aparecen cuando el relevo no está disponible o la ventana cambia.

Crear una matriz de cobertura antes de tocar UI. Cualquier discrepancia entre el código y la matriz se resuelve como decisión de especificación primero, nunca con un parche de copy aislado.

**Salida:** tabla de evidencia con límites + inventario de estado actual + lista de cambios acotados.

### Paso 2 — Especificar estados derivados

Implementar un selector puro (nombre sugerido `getCoverageSummary`) con tipos explícitos y exhaustivos. El selector recibe `DemoState` y el `ShiftPlan`; devuelve al menos:

- estado de cobertura: `unavailable | pending | accepted_pending_activation | complete | filtered_uncovered | invalid`;
- modo operacional real: `none | protected | filtered`;
- etiqueta y texto breve;
- responsable actual de P1/ambiguos;
- responsable de revisión al cierre para P2/P3 agrupables;
- hora de término y hora de revisión si aplican;
- regla de interrupción y siguiente acción disponible;
- motivo factual del estado para la vista de historial.

No calcular tiempo con `Date.now()`, no introducir cronómetros y no asumir que `pending` significa “sin respuesta vencida”.

#### Tabla de decisión obligatoria

| Relevo | Activación | Resultado derivado | Afirmación permitida | Responsable/ruta que debe explicitarse |
| --- | --- | --- | --- | --- |
| `not_requested` | `none` | No disponible | Aún no hay relevo solicitado/aceptado. | Rodrigo mantiene P1 y casos ambiguos; no se promete cobertura. |
| `pending` | `none` | Pendiente | La solicitud sigue pendiente en la simulación; no se modela vencimiento. | Rodrigo conserva responsabilidad hasta aceptación. |
| `accepted` | `none` | Aceptado, activación pendiente | Andrea aceptó; la ventana protegida todavía no está activa. | Rodrigo mantiene responsabilidad hasta activar. |
| `accepted` | `protected` | Completa para la ventana modelada | Andrea aceptó esta ventana y Rodrigo activó el modo protegido. | Andrea primero para P1/ambiguos; fallback a Rodrigo según la regla de confirmación simulada. P2/P3 estables se revisan al cierre. |
| `pending` | `filtered` | Guardia filtrada sin cobertura | No hay relevo aceptado; sólo se agrupan casos permitidos por el motor. | Rodrigo recibe P1/ambiguos/impacto creciente; agrupados quedan pendientes de revisión. |
| `declined` | `none` | No disponible | Andrea no aceptó; no existe cobertura. | Rodrigo mantiene la guardia. |
| `declined` | `filtered` | Guardia filtrada sin cobertura | El modo filtrado está activo sin relevo aceptado. | Rodrigo recibe las rutas conservadoras. |
| Cualquier combinación imposible | Cualquiera | Estado `invalid` conservador | No presentar cobertura completa. | Mostrar mensaje de estado inconsistente y ruta manual segura; no corregir silenciosamente el estado. |

Al cambiar de turno, las reglas vigentes reinician aceptación y modo. El selector debe reflejar el estado después del reducer y no retener el responsable del turno anterior.

#### Invariantes de dominio

- `complete` si y sólo si `handoffStatus === accepted` y `activationMode === protected`.
- `filtered` jamás equivale a cobertura completa.
- `pending` nunca se transforma en rechazo o timeout sin evento implementado.
- No existe cobertura completa si el titular aún no activó la ventana.
- Un incidente ambiguo o de baja confianza no se agrupa por un resumen visual.
- El selector no modifica su entrada y debe ser determinista para la misma entrada.

**Salida:** selector, tabla y pruebas unitarias de todas las combinaciones válidas e inválidas.

### Paso 3 — Diseñar e implementar el pasaporte

Construir una tarjeta reutilizable que represente el acuerdo de la ventana. Priorizar lectura rápida y jerarquía; no convertirla en un dashboard.

#### Campos mínimos

1. **Estado:** no disponible, pendiente, aceptado/activación pendiente, completa, o guardia filtrada sin cobertura.
2. **Ventana:** turno seleccionado, inicio y término (obtenidos del plan actual).
3. **Personas/roles:** titular Rodrigo y relevo Andrea, indicando quién responde bajo el estado presente.
4. **Alcance:** servicio/escenario sintético y pendientes ya presentes en fixtures si se muestran. No inventar servicios reales.
5. **Regla de alertas:** qué se agrupa, qué escala y quién recibe primero.
6. **Confirmación:** solicitud pendiente, aceptación, rechazo o activación, con lenguaje que corresponda a eventos reales del reducer.
7. **Acción siguiente:** una CTA principal coherente con el estado y existente en el flujo.
8. **Contexto de demo:** marcar claramente las situaciones simuladas; cualquier exportación local debe preservar esta etiqueta.

#### Vista imprimible/exportable

- Incluir una versión imprimible simple del pasaporte si puede hacerse sin backend, cuenta, red ni dependencia nueva.
- La vista debe incluir estado, ventana, responsables, alcance, regla de alertas y la marca `DEMO · DATOS SINTÉTICOS`.
- No debe incluir información del navegador, nombre de usuario real, datos de empresa ni eventos fuera de los fixtures.
- Si la impresión no es viable dentro del ciclo, registrar la razón y dejar la exportación fuera del entregable; no sustituirla por compartir datos externamente.

#### Variantes por momento

| Momento | Variante | Información prioritaria |
| --- | --- | --- |
| Plan | Compacta | Estado actual y condición que falta para activar. |
| Cerrar guardia | Completa | Responsable, ventana, confirmación, alcance y regla de alertas antes de activar. |
| Activación protegida | Prominente | Andrea, hora de término y casos que todavía pueden escalar a Rodrigo. |
| Guardia filtrada | Prominente de cobertura incompleta | Indicar sin ambigüedad que no hay relevo; qué recibe Rodrigo y qué queda para revisión. |
| Mañana | Histórica, no editable | Modo final de la simulación y resumen de decisiones; no inferir sueño real. |

Evitar duplicar la misma tarjeta varias veces en una pantalla. El CTA debe ser definido por la pantalla/reducer y no por la tarjeta si eso replica lógica de negocio.

#### Reglas de contenido

- No usar: “100% cubierto”, “garantizado”, “sin riesgo”, “todo controlado”, “no te van a despertar” o equivalentes.
- “Cobertura completa” describe únicamente el contrato modelado para la ventana, no disponibilidad perfecta ni silencio total.
- Nombrar a Andrea, la hora de término y la condición de escalamiento en modo protegido.
- Si Andrea rechazó, decirlo con neutralidad y sin culpabilizar.
- Mientras `pending`, no decir que Andrea “no respondió” ni insinuar que venció la solicitud.
- Distinguir “agrupado para revisión” de “resuelto”, “descartado” o “leído”.
- Distinguir “minutos reservados” de sueño real y “alertas simuladas” de eventos operacionales.

**Salida:** tarjeta y variantes conectadas al selector, con contenido revisado contra las reglas anteriores.

### Paso 4 — Hacer explicable cada decisión de incidencia

La tarjeta de decisión presenta la salida real de `evaluateIncident`; no clasifica de nuevo ni determina destinatario.

#### Orden de información

1. Identidad de la incidencia y tipo de escenario (`night_simulation` o `security_test`).
2. Severidad, confianza e impacto recibidos por el motor.
3. Evidencia/`signals` visibles sólo si se añaden datos sintéticos explícitos al fixture; no presentarlos como telemetría real.
4. Regla determinística que devolvió el motor, con el texto exacto o paráfrasis fiel.
5. Estado actual: agrupada, esperando confirmación, reconocida por Andrea o escalada a Rodrigo.
6. Responsable siguiente y condición de transición.
7. Indicador de simulación y nota de que reconocimiento/timeout son atajos de demo si corresponde.

#### Cobertura mínima de escenarios

- P2 estable, confianza alta → agrupado para revisión al cierre, nunca resuelto.
- P3 estable, confianza alta → agrupado para revisión al cierre, nunca resuelto.
- P1 con relevo aceptado → escala primero a Andrea; el timeout del MVP puede simular fallback a Rodrigo.
- P1 sin relevo aceptado → ruta directa a Rodrigo.
- `Unknown` o confianza baja → no se agrupa; ruta conservadora.
- P2/P3 con impacto creciente → no se agrupa; ruta conservadora.
- Andrea reconoce el P1 de prueba → estado reconocido por respaldo.
- Andrea no reconoce dentro del atajo simulado → estado alertado a Rodrigo.

Si los fixtures no incluyen señales, no inventarlas en el UI. Si se agregan señales sintéticas, actualizar `Incident`, fixtures y pruebas y rotularlas como datos del escenario. Los porcentajes de confianza no son necesarios y no se deben fabricar.

**Salida:** tarjetas de decisión trazables a casos de prueba del motor, sin cambios semánticos al enrutamiento.

### Paso 5 — Recibo de activación y resumen matinal factual

El recibo es una síntesis del estado que se activó, no un mensaje terapéutico ni un contrato legal. Debe permitir comprobar:

- quién aceptó (o que nadie aceptó);
- qué modo se activó y para qué ventana;
- desde cuándo/hasta cuándo según el plan estático;
- qué clases de incidencia pueden interrumpir;
- cuál es el fallback simulado;
- qué queda pendiente de revisión;
- que toda la actividad mostrada es demo/simulación.

En Mañana mostrar el cierre factual: incidentes agrupados, prueba de seguridad, confirmaciones y minutos **reservados** según las ventanas. No atribuir descanso, interrupciones evitadas, reducción de ansiedad ni calidad de sueño al sistema.

**Salida:** recibo consistente con el selector y resumen que puede reconstruirse desde el estado final.

### Paso 6 — Accesibilidad, responsive y tono

- Operable completamente con teclado; orden de tabulación lógico y foco visible después de cada acción.
- Encabezados semánticos en orden; nombre accesible para botones; etiquetas no dependientes sólo de color o iconos.
- Contraste suficiente en tema nocturno, texto legible y estados indicados por icono + etiqueta + explicación.
- Validar anchos de 320, 375, 544 y escritorio; sin scroll horizontal ni botones truncados.
- No usar animaciones obligatorias, cuenta regresiva real, sonidos ni regiones vivas que reciten toda la pantalla.
- Mantener una acción primaria por bloque y describir consecuencias antes de acciones irreversibles dentro de la demo.
- Revisar copy neutral: el sistema no culpa al relevo ni empuja a aceptar la guardia.

La comprobación manual del equipo es revisión interna del artefacto, no prueba de usabilidad con participantes.

**Salida:** checklist documentado, defectos corregidos y capturas opcionales de los anchos revisados.

### Paso 7 — Pruebas y verificación

#### Pruebas automatizadas obligatorias

1. **Selector de cobertura:** tabla completa; invariante `complete`; estado filtrado; cambio de turno; combinaciones imposibles.
2. **Motor de incidentes:** regresión de P1/P2/P3/Unknown, confianza baja, impacto creciente y rutas con/sin relevo.
3. **Reducer:** solicitud, aceptar, rechazar, activar protegido, activar filtrado, cambio de turno, simulación matinal y reset. No añadir transiciones no soportadas.
4. **Integración/UI:** el contenido visible corresponde al estado derivado y la CTA no permite activar protección sin aceptación.
5. **Historial/resumen:** cada salida se puede relacionar con la simulación que la produjo; no se afirma que sea operación real.
6. **Accesibilidad automatizable:** lint/semántica, nombres accesibles básicos y ausencia de errores de consola durante recorridos principales, según herramientas disponibles.

#### Recorridos internos obligatorios

- Solicitar relevo → pendiente → Andrea acepta → activar protegido → inyectar P3 estable → P3 queda para revisión → inyectar P1 → reconocer y simular timeout por separado → revisar Mañana.
- Solicitar relevo → rechazar → comprobar no disponible → activar guardia filtrada → verificar P1/ambiguo hacia Rodrigo.
- Solicitar relevo → mantener pendiente → comprobar lenguaje pendiente y guardia filtrada disponible sin decir timeout.
- Cambiar turno luego de una aceptación → confirmar que la ventana anterior ya no aparece como cubierta.
- Hard Reset → confirmar estado inicial, tarjetas y bloqueos limpios.
- Probar modo móvil, teclado y navegación hacia atrás; verificar que no se habilita una CTA incoherente.

No se recopilan puntuaciones de usuarios ni se calcula porcentaje de comprensión.

#### Comandos de calidad

Ejecutar al inicio y al final, y cuando un cambio relevante lo justifique:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

No reemplazar fallos por una revisión visual. Si una suite falla, identificar si es regresión del track o problema preexistente, documentar la diferencia y no declarar puerta aprobada con tests rojos.

---

## 6. Orden sugerido de implementación en unidades revisables

1. **Auditoría y matriz de cobertura** (sin cambios de UI).
2. **Selector puro + pruebas** (sin persistencia ni componente).
3. **Tarjeta de cobertura** para Plan y Cerrar guardia, más vista imprimible local si pasa los límites de datos y tiempo definidos.
4. **Variante prominente** para protegido y filtrado.
5. **Explicación de decisiones** y escenarios sintéticos.
6. **Recibo de activación y resumen de Mañana**.
7. **Accesibilidad y responsive**.
8. **Pruebas de regresión, build y revisión documental**.

Después de cada unidad, dejar el estado ejecutable y verificar el flujo afectado. Mantener commits pequeños; no mezclar refactor general, branding, nueva arquitectura o funciones de Tracks 3–4.

---

## 7. Riesgos y mitigaciones

| Riesgo | Mitigación requerida |
| --- | --- |
| Una etiqueta visual implica más cobertura de la existente. | Derivar etiqueta del selector; probar la invariante de cobertura completa; revisar cada string. |
| La UI diverge del motor de incidentes. | Renderizar `RoutingDecision` y probar correspondencia con la salida del motor. |
| Se inventa expiración, revocación o cambio de responsable. | No agregar esos comportamientos en Track 2; registrar como limitación para Track 3. |
| “Pasaporte” se interpreta como documento operativo real. | Marcar fixtures, escenarios y recibos como sintéticos/demo hasta que exista piloto autorizado. |
| “Protegido” se entiende como noche sin alertas. | Mostrar siempre las excepciones y el fallback; evitar promesas absolutas. |
| Mejoras de interfaz se presentan como validación con usuarios. | Informar sólo cobertura de tests y revisión interna; dejar comprensión/aceptación no evaluadas. |
| Se mezcla con IA o integraciones para hacer la demo más vistosa. | Mantener todo el track local y determinístico; reservar IA para Track 4 y conectores para Track 3. |
| El equipo sobrecarga de información la tarjeta. | Jerarquía en capas y lenguaje conciso; no eliminar del contrato la regla de escalamiento. |
| Cambio de turno conserva un relevo vencido. | Cubrir reset de handoff/mode al seleccionar otro turno y pruebas del selector. |

---

## 8. Puertas de decisión

### Puerta A — Integridad del estado

**Aprobada** si:

- cobertura se calcula desde la fuente de verdad existente;
- no hay estado `complete` sin aceptación y activación;
- turno cambiado y reset no conservan cobertura antigua;
- estados pendientes, rechazados y filtrados están diferenciados;
- combinaciones inválidas fallan de forma conservadora.

### Puerta B — Trazabilidad de decisiones

**Aprobada** si:

- cada escenario principal tiene prueba automatizada;
- la UI presenta el resultado del motor y no lo recalcula;
- la regla, estado, destinatario y siguiente condición son consistentes;
- una incidencia agrupada nunca se presenta como resuelta o descartada;
- rutas críticas, ambiguas, de baja confianza y de impacto creciente nunca se agrupan.

### Puerta C — Interfaz honesta y usable internamente

**Aprobada para revisión interna** si:

- contenido distingue cobertura de ausencia de interrupciones;
- el responsable, la ventana y el fallback aparecen en el estado correspondiente;
- el flujo puede recorrerse con teclado y en tamaños acordados sin bloqueos;
- existe una única acción primaria coherente en cada estado;
- Mañana distingue minutos reservados de sueño real.

Esta puerta **no** equivale a comprensión o usabilidad validadas con usuarios.

### Puerta D — Preparación técnica

**Aprobada** si:

- lint, typecheck, pruebas y build pasan;
- no se alteró el tag/versión congelada;
- la rama y diff están acotados y documentados;
- el MVP sigue funcionando en su baseline;
- no entraron secretos ni datos personales/operativos.

**Decisión final:** conservar la hipótesis y preparar una propuesta de Track 3, iterar por defectos internos, o retirar componentes que no se puedan mantener honestos. Ninguna puerta permite afirmar valor demostrado o aceptación.

---

## 9. Definition of Done

- [ ] Se trabajó en `post-mvp/trust-surface` desde un checkpoint identificable.
- [ ] Existe una auditoría del comportamiento anterior a los cambios.
- [ ] El estado de cobertura es selector puro; no se persiste duplicado.
- [ ] La tabla cubre todos los estados y combinaciones imposibles relevantes.
- [ ] El pasaporte indica estado, ventana, responsable, regla y siguiente acción.
- [ ] Rechazo, pendiente y guardia filtrada no implican cobertura.
- [ ] La explicación refleja el motor determinístico y sus rutas actuales.
- [ ] P1, `Unknown`, baja confianza e impacto creciente no se agrupan.
- [ ] El recibo y la pantalla de Mañana distinguen demo, minutos reservados y sueño real.
- [ ] No se hizo investigación primaria con personas durante la hackatón ni se usan datos personales.
- [ ] La evidencia web usada tiene fuente rastreable, método/población y limitaciones; si no se añadieron fuentes nuevas, se explica por qué Track 1 bastó.
- [ ] Ningún hallazgo general publicado se presenta como comprensión, aceptación o impacto de SnoozeOps.
- [ ] Teclado, foco, contraste, jerarquía y responsive se revisaron internamente.
- [ ] Pasan `lint`, `typecheck`, `test` y `build`.
- [ ] Se comparó el resultado con el MVP congelado y se documentó cualquier diferencia esperada.
- [ ] README/documentación del roadmap no presentan funcionalidades futuras como activas.
- [ ] Hay una decisión escrita: conservar, iterar o retirar, más límites que siguen sin evaluar.

---

## 10. Entregables

1. Tabla breve de evidencia publicada y las decisiones de diseño que informa, o justificación de por qué Track 1 cubre las preguntas del Track 2.
2. Código de la superficie de confianza en la rama aislada.
3. Selector y tabla de cobertura con pruebas.
4. Tarjeta de pasaporte y tarjetas de decisión conectadas al modelo actual.
5. Recibo de activación y resumen matinal factual.
6. Checklist de revisión interna de accesibilidad/responsive.
7. Reporte de verificaciones y comparación con el checkpoint.
8. Decisión de puerta y propuesta de alcance para Track 3.

No crear un informe de entrevistas ni una matriz de respuestas de participantes: no forman parte de este track.

---

## 11. Cierre y comunicación

Redacción sugerida para comunicar el resultado:

> “Track 2 convirtió el relevo en una superficie verificable. Usamos evidencia publicada para orientar las decisiones de diseño, sin confundirla con validación del producto. La cobertura se deriva de aceptación y activación, las rutas se explican con reglas determinísticas y las pruebas comprueban los casos modelados. No hicimos investigación primaria con personas durante la hackatón, por lo que comprensión, aceptación e impacto de SnoozeOps siguen sin evaluarse.”

Track 2 termina con una interfaz y un modelo más auditables. No autoriza integrar sistemas reales ni iniciar un piloto operacional: eso requiere el alcance, las protecciones y la puerta propios de Track 3.
