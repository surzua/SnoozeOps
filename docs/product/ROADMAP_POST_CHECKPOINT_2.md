# SnoozeOps — Roadmap post-Checkpoint 2

> **Estado:** hoja de ruta canónica para evolucionar el producto después de presentar el MVP de las Fases 0–5. No autoriza cambios a la demo congelada ni describe capacidades ya implementadas.

## 1. El cambio de ambición

El MVP demuestra una tesis con honestidad: un relevo verificable puede reservar una ventana adicional para descansar sin ocultar un incidente crítico. El siguiente producto no debe ser “el mismo demo con más pantallas”. Debe probar, en este orden, que la intervención es deseable, segura y repetible con personas y operación reales.

La pregunta que guía cada decisión cambia de:

> “¿Podemos mostrarlo en cinco minutos?”

a:

> “¿Qué evidencia necesitaría Rodrigo para soltar la guardia sin que Andrea, el equipo o la operación paguen el costo?”

El resultado aspiracional es un **sistema de confianza operacional y cierre cognitivo**: antes de dormir, cada persona puede ver quién asumió qué, hasta cuándo, qué situación la volvería a interrumpir y por qué. No es un tracker de sueño, un sistema médico ni un bot que toma decisiones autónomas.

## 2. Qué se conserva y qué cambia

| Ya congelado en el MVP | Evolución post-Checkpoint 2 |
| --- | --- |
| Fixtures sintéticos, motor determinístico local y demo individual. | Evidencia de uso con operadores, relevo bilateral autenticado y trazabilidad de decisiones. |
| `+60 min reservados para descansar`; no se mide sueño. | Se valida la hipótesis con indicadores declarados, voluntarios y no clínicos; nunca se promete una hora efectivamente dormida sin evidencia. |
| P1/P3 simulados y rutas seguras visibles. | Políticas configurables, simulación antes de producción e integración progresiva de fuentes operacionales. |
| No hay IA activa. | Copiloto de asistencia en modo sombra, con abstención, revisión humana y reglas duras por encima de toda sugerencia. |
| Una historia de Rodrigo. | Un piloto acotado que demuestra valor para Rodrigo, Andrea y el responsable de operación sin convertir a nadie en objeto de vigilancia. |

La antigua `FASE_6.md` se mantiene como **diseño exploratorio útil**, no como la siguiente fase automática. Sus tres ideas —cobertura visible, decisión explicable e IA responsable— se absorben en los Tracks 2 y 4 de este roadmap. Sólo se implementan si pasan sus puertas de decisión.

## 3. Norte, principios y límites no negociables

### Norte del producto

> **Antes de dormir, Rodrigo puede entregar responsabilidad con evidencia; durante la ventana, el equipo puede responder con seguridad; a la mañana, todos pueden entender qué ocurrió sin fingir que el descanso fue medido.**

### Tres resultados que deben crecer juntos

| Para quién | Resultado buscado | Señal observable inicial |
| --- | --- | --- |
| Rodrigo | Menos rumiación y menos revisiones compulsivas antes de acostarse. | Declara que entiende el relevo, activa el ritual y reduce chequeos previos respecto de su propia línea base. |
| Andrea / equipo | Recibe un traspaso accionable, proporcional y justo. | Acepta/rechaza con información suficiente; no hereda pendientes ambiguos ni alertas irrelevantes. |
| Operación | Mantiene una ruta auditable para lo crítico. | Un crítico no queda agrupado por una recomendación; se ve dueño, política, confirmación y escalamiento. |

### Guardrails

1. **Seguridad antes que conveniencia.** Crítico, ambiguo, desconocido, contradictorio o con señal insuficiente sigue una ruta conservadora.
2. **La cobertura se prueba, no se declara.** Sólo hay cobertura completa cuando una persona autorizada la aceptó para una ventana concreta.
3. **La persona conserva agencia.** Rodrigo puede cancelar, ajustar y revisar; Andrea puede rechazar sin penalización ni presión.
4. **No es vigilancia de desempeño.** No se rankea a quien responde más rápido ni se usan métricas individuales para evaluación laboral.
5. **No es salud clínica.** Ningún dato ni mensaje diagnostica, prescribe o prueba calidad de sueño.
6. **IA sin autoridad única.** Un modelo puede resumir, preguntar o proponer; no silencia, cierra, reasigna ni baja una alerta crítica por sí solo.
7. **Privacidad mínima y explícita.** Sólo se piden datos necesarios para el flujo acordado, con fuente, propósito, acceso y retención visibles.
8. **Degradación segura.** Si falla red, proveedor, integración o IA, se conoce el estado y se conserva una ruta determinística/operacional segura.

## 4. Cómo trabajar sin poner en riesgo lo que ya funciona

La rama de la demo es una evidencia histórica. No se usa como laboratorio.

```text
main / checkpoint-2-frozen
  └── tag: checkpoint-2-mvp
        ├── post-mvp/foundation-validation
        ├── post-mvp/trust-surface
        ├── post-mvp/operational-pilot
        └── post-mvp/ai-shadow
```

1. Antes de comenzar, ejecutar las cuatro verificaciones, crear un tag anotado del commit presentado y proteger `main`/la rama de entrega contra pushes directos.
2. Una hipótesis o capacidad por rama corta. Por ejemplo, `post-mvp/trust-surface`, no `phase-7-everything`.
3. Cada rama comienza desde el tag o desde la última versión de piloto estable, tiene criterios de aceptación y termina con pruebas, demo manual y commit pequeño.
4. Se integra por pull request hacia una rama de integración (`pilot`), nunca directamente a la demo. `main` sólo avanza cuando la experiencia es estable y el experimento tiene decisión documentada.
5. Si una idea no supera su puerta de decisión, se cierra con lo aprendido. No se acumula funcionalidad por orgullo de implementación.

Comandos sugeridos para el corte inicial:

```bash
npm run lint && npm run typecheck && npm test && npm run build
git tag -a checkpoint-2-mvp -m "MVP presentado en Checkpoint 2"
git switch -c post-mvp/foundation-validation checkpoint-2-mvp
```

No crear el tag si las verificaciones fallan; primero se corrige la base. Si el repositorio remoto permite reglas de protección, exigir pull request y checks verdes para `main`.

## 5. Secuencia de desarrollo: seis tracks con puertas de evidencia

Los tracks están ordenados por riesgo que reducen, no por deseo de tener más tecnología. La duración se estima en ciclos de una a dos semanas y se ajusta al tiempo disponible; una puerta puede requerir más de un ciclo.

| Orden | Track | Riesgo que elimina primero | Entregable memorable | Puerta para avanzar |
| --- | --- | --- | --- | --- |
| 0 | Base protegida | Romper la demo o perder la trazabilidad. | Release congelado y reproducible. | Build limpio, tag, runbook y baseline de métricas. |
| 1 | Descubrimiento documental | Apoyar la tesis en evidencia débil o confundir inferencia con validación. | Síntesis trazable de fuentes públicas, límites y una hipótesis de diseño priorizada. | Fuentes verificadas; avanzar sólo como hipótesis, sin declarar validación de usuarios. |
| 2 | Superficie de confianza | Que el producto muestre una cobertura o una decisión que sus reglas no respaldan. | Pasaporte de relevo y decisiones trazables en la demo aislada. | Invariantes de estado, pruebas automatizadas y revisión interna; comprensión y aceptación de usuarios quedan sin evaluar. |
| 3 | Piloto operacional | Que el flujo sea bonito pero no sobreviva a personas, turnos y datos reales. | Cobertura real con bitácora, políticas y sandbox de integración. | Piloto sin brechas críticas ni deuda ética relevante. |
| 4 | Copiloto responsable | Que la IA parezca magia, agregue ruido o aumente riesgo. | IA en modo sombra con tarjeta de evidencia y revisión humana. | Calidad, abstención y seguridad superiores a umbrales definidos. |
| 5 | Resultado y escalamiento | Confundir adopción puntual con impacto sustentable. | Informe de piloto: mecanismo, resultados, límites y decisión de escala. | Señal de valor repetible y operación lista para ampliar. |

### Track 0 — Congelar, observar y preparar el laboratorio

**Propósito:** preservar la versión que el jurado vio y crear una base que permita aprender sin adivinar.

**Construir**

- Tag `checkpoint-2-mvp`, checklist reproducible y demo de respaldo; no nuevas capacidades.
- Analítica de eventos **sólo en entorno de prueba**, con diccionario versionado: `plan_viewed`, `handoff_requested`, `handoff_accepted`, `mode_activated`, `critical_escalated`, `morning_reviewed`, `feedback_submitted`.
- Un esquema de consentimiento para cualquier prueba con personas: qué se observa, por cuánto tiempo, quién accede y cómo se elimina.
- Feature flags por capacidad para aislar pruebas sin bifurcar el producto entero.
- Tablero de experimento, no de desempeño individual: hipótesis, cohorte, fecha, métrica, riesgo, resultado y decisión.

**No construir todavía:** login corporativo, notificaciones reales, modelos, wearables, dashboards de management o integración con producción.

**Puerta:** la demo sigue idéntica desde el tag; cada métrica tiene propósito, dueño y política de retención; nadie puede confundir telemetría de prueba con vigilancia laboral.

### Track 1 — Discovery documental

**Propósito:** contrastar la tesis de SnoozeOps con fuentes públicas, revisar la coherencia de la solución existente y priorizar una hipótesis de diseño sin atribuir hallazgos a usuarios.

**Límite explícito:** no se harán entrevistas, encuestas, pruebas de usabilidad, diarios, reclutamiento ni observación de personas. La guía [`TRACK_1_DESCUBRIMIENTO.md`](TRACK_1_DESCUBRIMIENTO.md) define el alcance documental, evaluación de fuentes, niveles de afirmación, puertas y entregables. No se modifica el código del MVP congelado.

**Preguntas documentales**

- ¿Qué evidencia publicada existe sobre recuperación del trabajo y desapego psicológico?
- ¿Qué señales públicas describen presión operacional, on-call o fatiga de alertas, y qué limitaciones tienen?
- ¿Qué otras explicaciones —carga, dotación, políticas, herramientas— podrían influir en el problema?
- ¿Qué implicaciones de transparencia y seguridad son coherentes con el producto actual?
- ¿Qué oportunidad puede explorarse como hipótesis de diseño y qué queda sin evaluar?

**Método**

1. Revisar literatura académica, encuestas sectoriales y guías técnicas; registrar población, método, fecha, patrocinio y límites.
2. Verificar cada cifra en su fuente y distinguir evidencia científica, encuesta de proveedor, orientación práctica e inferencia del equipo.
3. Inspeccionar documentalmente estados, reglas y promesas del MVP; no llamar a esta revisión una prueba de usabilidad.
4. Sintetizar evidencia y contraevidencia, marcar explícitamente como “no evaluadas” las preguntas que requieren usuarios u operación real, y priorizar el siguiente paso.

**Momentos de producto a diseñar**

| Momento | Pregunta/objetivo de diseño (no hallazgo de usuarios) | Respuesta que SnoozeOps puede explorar |
| --- | --- | --- |
| Antes de cerrar | ¿Cómo evitar pendientes sin dueño o contexto? | Checklist breve, pendiente con dueño y resumen editable. |
| Pedir relevo | ¿Se delimitan aceptación, rechazo y alcance de cobertura? | Solicitud explícita, derecho a rechazar y alcance limitado. |
| Activar la ventana | ¿El estado de cobertura deriva de confirmaciones verificables? | Estado visible, condición de escalamiento y acción primaria coherente. |
| Durante la noche | ¿Qué ocurre con una alerta crítica, ambigua o sin acuse? | Regla visible de qué escala y qué espera; nunca una promesa de cero alertas. |
| Mañana | ¿Qué quedó pendiente y qué ocurrió en la ventana? | Resumen factual y pendientes; no culpabilización ni score de sueño. |

**Puerta:** las fuentes y afirmaciones son trazables, la inspección interna confirma coherencia entre estados y reglas, y cualquier avance se describe como hipótesis de diseño. No se reporta comprensión, aceptación, frecuencia ni impacto en usuarios.

### Track 2 — Pasaporte de relevo: confianza visible y comprobable

La especificación ejecutable está en [`TRACK_2_PASAPORTE_RELEVO.md`](TRACK_2_PASAPORTE_RELEVO.md). Durante la hackatón no se hará investigación primaria con personas: no habrá entrevistas, encuestas propias, pruebas de usabilidad/comprensión, diarios, observación ni reclutamiento. Sí se permite revisar estudios y datos publicados en la web, partiendo de Track 1 y registrando método, población y límites. La comprobación del artefacto se limita a reglas, pruebas automatizadas y revisión interna. No se reportará que usuarios entienden o aceptan el mecanismo.

**Propósito:** transformar el concepto de relevo en un objeto operacional que ambas personas pueden consultar y auditar.

Este track absorbe lo valioso de la antigua Fase 6, pero añade el producto que le da sentido: no sólo una tarjeta bonita, sino un contrato de responsabilidad humano y verificable.

**Capacidades, en este orden**

1. **Estado de cobertura derivado:** no se guarda como un campo duplicado. Muestra `no disponible`, `pendiente`, `aceptada / activación pendiente`, `completa` o `guardia filtrada`, con dueño, límite y condición de escalamiento.
2. **Pasaporte de relevo:** una vista compacta y exportable con ventana, responsable titular/relevo, servicios, pendientes, riesgos, runbook enlazado, confirmaciones y política aplicada.
3. **Decisión explicable:** cada incidente enseña señales autorizadas, severidad de entrada, regla determinística, destinatario, estado y siguiente condición; P1 de seguridad siempre separado de la noche habitual.
4. **Recibo de cierre:** al activar, Rodrigo obtiene una confirmación factual: “Andrea aceptó esta ventana; críticos/ambiguos siguen esta ruta”. No es una afirmación emocional ni una garantía.
5. **Resumen de mañana:** qué se agrupó, quién confirmó, qué debe revisarse y qué parte fue sólo simulación/prueba.
6. **Accesibilidad y calma:** teclado, foco, 320–544 px, icono+texto+color, una CTA primaria, sin animaciones que impidan salir del ritual.

**La demo WOW de este track**

En menos de 30 segundos, un jurado ve el pasaporte de relevo, la aceptación de Andrea y una alerta con su evidencia/regla. Entiende qué se entregó, quién responde y por qué el sistema no escondió un P1. No hay que confiar en una caja negra.

**Verificaciones obligatorias**

- Matriz completa de cobertura y pruebas puras de la política.
- Pruebas de transición soportadas por el MVP: solicitud, pendiente, aceptación/rechazo, activación protegida/filtrada, cambio de turno y reset. El MVP no simula vencimiento, revocación ni conflicto de ventana; no presentar esos casos como implementados.
- Revisión interna de contenido y recorrido para comprobar que estado, responsable, límite y ruta se mantienen consistentes en cinco escenarios, incluidos ambiguo y baja confianza. No se interpreta como test de comprensión de usuarios.
- Revisión de contenido para que “protegido” nunca signifique “no serás interrumpido”.

**Puerta:** todas las invariantes de cobertura y rutas conservadoras pasan sus pruebas; la revisión interna no encuentra contradicciones entre estado, responsable y copy; no hay estado que declare cobertura completa sin aceptación verificable. La comprensión y aceptación de usuarios siguen sin evaluar.

### Track 3 — Piloto operacional: de simulación a coordinación segura

**Propósito:** demostrar que el mecanismo funciona entre personas reales sin conectarlo irresponsablemente a producción.

**Capa de producto**

- Cuentas, roles mínimos y permisos: titular, relevo y responsable de guardia. La autorización corresponde al rol, no a un modelo.
- Programación de ventanas y disponibilidad declarada, con rechazo, sustitución y conflicto visibles.
- Bitácora inmutable de solicitud, aceptación, cambio de alcance, escalamiento y reconocimiento; toda modificación deja actor, hora y motivo.
- Políticas versionadas por servicio: severidades, destinatarios, plazo y criterio de escalamiento. Primero en modo lectura/sandbox.
- Notificaciones con confirmación explícita y fallback aprobado por el equipo; preferencias de canal sólo dentro de la política.
- Conector de entrada **read-only** para un sistema de tickets/alertas elegido por el piloto. El primer conector ingiere eventos a un sandbox; no crea, cierra ni modifica tickets.
- Entorno de simulación/replay para probar una política con incidentes históricos anonimizados antes de activarla.

**Arquitectura incremental**

```text
Cliente móvil/PWA
      │
API de aplicación ── identidad, roles y auditoría
      │
Motor determinístico versionado ── políticas y escalamiento
      │
Adaptadores read-only ── sandbox / fuente operacional autorizada
      │
Datos mínimos cifrados + retención definida
```

Cada adaptador debe declarar: fuente, campos permitidos, propósito, propietario, retención, error/fallback y si puede escribir. La respuesta inicial debe ser siempre **sólo lectura**.

**Experimento de piloto**

- Una célula de 4–8 personas, una ventana/servicio de bajo riesgo y un sponsor operacional.
- Dos semanas de modo “espejo”: SnoozeOps registra qué habría hecho sin notificar ni cambiar la operación.
- Luego, dos semanas con coordinación real sólo para casos y canales aprobados; se conserva el protocolo existente como respaldo.
- Retrospectiva semanal sin rankings individuales: fricción, claridad, carga para el relevo, falsos positivos, casi-incidentes y cambios necesarios.

**Puerta:** no existe pérdida de incidente crítico atribuible al producto; la ruta manual sigue disponible; participantes consideran el traspaso más claro que su alternativa actual y el responsable operacional aprueba ampliar sólo el alcance que funcionó.

### Track 4 — Copiloto de IA responsable: primero sombra, después asistencia

**Propósito:** obtener valor de IA en preparación y comprensión, sin transferirle autoridad de seguridad.

La IA aparece cuando ya existen políticas, trazabilidad y una decisión humana con la cual compararla. No antes.

**Escalera de capacidad**

| Nivel | Capacidad | Puede hacer | No puede hacer |
| --- | --- | --- | --- |
| 4.1 | Resumen de relevo | Proponer un borrador con contexto, impacto, dueño y siguiente paso, citando las fuentes autorizadas. | Enviar, modificar un ticket o inventar evidencia. |
| 4.2 | Preguntas de completitud | Marcar ausencia de entorno, impacto, responsable o runbook y preguntar antes de la entrega. | Inferir que un dato ausente vuelve un incidente menos grave. |
| 4.3 | Propuesta de severidad | Sugerir severidad, confianza, razones y señales; declarar abstención cuando corresponde. | Decidir destino, agrupar, silenciar, cerrar o cambiar una política. |
| 4.4 | Búsqueda de runbook | Recuperar fragmentos autorizados y con citación para que el humano los revise. | Ejecutar acciones, usar fuentes no autorizadas o exponer secretos. |

**Contrato de cada sugerencia**

Una sugerencia no se presenta como una respuesta. Contiene entrada/fuentes, salida estructurada, evidencia citada, incertidumbre, límites, política que prevalece, decisión humana y resultado final. Sin estos campos, no se muestra como asistencia confiable.

**Modo sombra y evaluación**

1. Reproducir corpus autorizado y anonimizado contra la decisión histórica o de una mesa experta; nunca usar producción en vivo como laboratorio sin aprobación.
2. Guardar propuesta, abstención y decisión humana sin ejecutar nada.
3. Revisar por severidad: falsos negativos críticos, sobre-escalamiento, cobertura de abstención, exactitud del resumen, evidencia inválida, latencia y carga de revisión.
4. Red-team con mensajes incompletos, contradictorios, datos sensibles, instrucciones maliciosas y cambios de política.
5. Sólo habilitar asistencia de redacción/revisión cuando la persona conserve `aprobar`, `editar` y `descartar`, y las reglas duras no puedan ser sorteadas.

**Umbrales antes de activar una ayuda visible**

- Cero casos en evaluación donde una sugerencia baje o silencie un escenario crítico/ambiguo contra la política.
- Tasa de abstención aceptable y explicada; la IA debe preferir “no sé, escalo” a una falsa seguridad.
- La persona identifica fuente y límite de la sugerencia en una prueba de comprensión.
- Revisión de privacidad, retención, acceso y proveedor aprobada por quien corresponda.

**Puerta:** la IA reduce tiempo de preparar/comprender sin empeorar los guardrails ni aumentar la carga cognitiva; si no, queda en modo sombra o se retira.

### Track 5 — Validar impacto y preparar escala responsable

**Propósito:** responder al jurado y a un potencial cliente con evidencia real, no con una gráfica decorativa.

**Modelo de medición por capas**

| Capa | Métrica | Cómo leerla | Lo que no permite afirmar |
| --- | --- | --- | --- |
| Adopción | % de ventanas con relevo solicitado, aceptado y activado. | Si el ritual cabe en el trabajo real. | Que mejoró el descanso. |
| Comprensión | % que identifica dueño, límite y regla crítica sin ayuda. | Si la confianza es inteligible. | Que no habrá errores. |
| Cierre cognitivo | Confianza para desconectar y número declarado de chequeos pre-sueño, versus línea base propia. | Señal temprana del mecanismo psicológico. | Efecto clínico o causal definitivo. |
| Seguridad | Críticos con ruta/confirmación, tiempo hasta acuse, simulaciones fallidas y escalamiento conservador. | Si la intervención preserva la respuesta. | SLO corporativo completo sin muestra suficiente. |
| Resultado voluntario | Hora declarada de cierre y descanso percibido por turno. | Hipótesis de beneficio a validar. | Sueño medido, diagnóstico ni `+60` logrado. |
| Equidad/carga | Aceptaciones, rechazos, sustituciones y fricción reportada por el relevo. | Si el beneficio de Rodrigo no descarga trabajo injusto sobre Andrea. | Productividad individual. |

**Diseño de estudio inicial**

- Línea base de 1–2 semanas y piloto de 3–4 semanas; comparar a cada participante consigo mismo y por tipo de turno.
- Separar días sin guardia, guardia sin relevo y guardia con relevo; reportar n, faltantes y sesgos de selección.
- Combinar eventos del producto con encuesta breve voluntaria y retrospectiva cualitativa.
- Publicar un one-pager de resultados: qué se observó, qué no se puede concluir, incidentes/casi-incidentes, cambios realizados y próxima decisión.

**Preparación para escalar, sólo si el piloto lo merece**

- Multi-tenant y segregación por organización; RBAC, SSO, auditoría, cifrado, retención/borrado y exportación de datos.
- Observabilidad, respaldo, pruebas de recuperación, límites de rate, gestión de incidentes del propio producto y revisión de dependencias.
- Catálogo de integraciones con permisos mínimos, contratos versionados y pruebas de sandbox por proveedor.
- Administración de políticas con simulación, aprobación y rollback; nunca edición directa que afecte una guardia activa sin trazabilidad.
- Revisión legal, de seguridad y laboral previa a expandir datos, notificaciones o IA.

**Puerta final:** hay una señal repetible de valor para ambos roles, no hay degradación de seguridad, la carga se distribuye de manera aceptable y existe una decisión explícita entre escalar, iterar o detener.

## 6. Backlog de alto impacto, ordenado por ahora / después / nunca por defecto

| Ahora, si el track lo habilita | Después de evidencia | Nunca por defecto |
| --- | --- | --- |
| Pasaporte de relevo, matriz de cobertura, recibo de cierre y explicabilidad de rutas. | Calendario/rotación, sustitución de relevo, notificaciones reales y un primer conector read-only. | Ranking de personas, métricas para jefatura individual, nudges culpabilizantes o gamificación del sueño. |
| Investigación, diario voluntario, test de comprensión y diccionario de eventos. | Replay de políticas, recomendaciones de capacidad y segundo conector tras aprobar el primero. | “IA autónoma” que envíe, silencie, cierre o reasigne alertas. |
| IA de resumen en modo sombra con fuente y revisión humana. | Búsqueda de runbooks autorizados, propuesta de completitud y severidad asistida. | Diagnóstico de sueño, scoring de salud, prescripción o inferencias clínicas. |
| Roles mínimos, auditoría y sandbox. | SSO, gestión de políticas, multi-tenant y catálogo de integraciones. | Importar datos personales/biométricos porque “podrían servir”. |

## 7. Ritual de priorización y Definition of Done

Antes de iniciar una capacidad, asignar 1–5 a estas cinco preguntas:

1. ¿Reduce una incertidumbre real de Rodrigo, Andrea o el responsable operacional?
2. ¿Aumenta la seguridad o la comprensión sin ampliar innecesariamente el alcance?
3. ¿Produce evidencia que cambia una decisión de producto?
4. ¿Puede probarse con datos sintéticos, sandbox o un piloto de bajo riesgo?
5. ¿Respeta privacidad, agencia y carga equitativa?

Una idea con menos de 18/25 no entra al ciclo sin una justificación escrita. “Se vería impresionante” no es suficiente.

Toda capacidad terminada debe tener:

- Hipótesis, usuario, riesgo y métrica de éxito/fallo por escrito.
- Política de datos, fallback y dueño operativo si toca fuentes reales.
- Pruebas de dominio/transición y recorrido manual móvil + teclado.
- Texto de interfaz que no sobreprometa y documentación actualizada.
- Decisión de experimento: conservar, iterar, escalar o retirar.

## 8. La narrativa para el jurado al final

La sorpresa no vendrá de decir “también agregamos IA”. Vendrá de que el roadmap demuestra criterio: cada inversión aumenta confianza sin poner en riesgo a la persona ni a la operación.

Un cierre de 45–60 segundos, después de la demo del MVP, puede ser:

> “Hoy no les mostramos una IA que finge administrar producción ni una app que promete medir sueño. Les mostramos el mecanismo mínimo: un relevo verificable y una ruta segura. Lo siguiente no es sumar features al azar. Primero validamos que este ritual reduce la incertidumbre de quienes están de guardia; luego lo convertimos en un pasaporte de relevo auditable y lo pilotamos con datos operacionales en sandbox. Sólo cuando exista trazabilidad y una decisión humana para comparar incorporamos IA en modo sombra: para resumir y detectar información faltante, nunca para silenciar una alerta. Así SnoozeOps puede crecer de una demo honesta a una infraestructura de confianza para equipos on-call.”

La diapositiva asociada debe mostrar los seis tracks, sus puertas de evidencia y tres palabras que el jurado recuerde: **confianza verificable, seguridad conservadora, descanso sostenible**.

## 9. Decisión inmediata recomendada

Después del Checkpoint 2, no se comienza implementando todo el Track 2. Se realiza el corte de rama y el Track 1 documental durante un ciclo corto. Con la evidencia pública, los límites identificados y la coherencia del MVP se priorizan entregables de exploración para la siguiente rama, sin presentarlos como necesidades validadas con usuarios:

1. **Pasaporte de relevo + cobertura derivada**, como hipótesis alineada con la necesidad de mostrar responsabilidad, ventana y escalamiento.
2. **Explicabilidad/replay de incidentes**, para hacer inspeccionables las reglas y rutas conservadoras.
3. **Checklist/recibo de cierre**, como hipótesis de diseño posterior; no se asumirá que reduce rumiación hasta contar con evidencia apropiada.

La IA, integraciones reales y datos de descanso esperan esa evidencia. Esa disciplina es lo que hace que el roadmap sea más ambicioso que una lista de funcionalidades: convierte cada etapa en una demostración de criterio de producto.
