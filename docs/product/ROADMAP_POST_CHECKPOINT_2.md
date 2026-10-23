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
| 1 | Descubrimiento y validación | Estar resolviendo una ansiedad inventada o mal formulada. | Mapa de “últimos 20 minutos antes de dormir” validado con operadores. | Problema, ritual y métricas confirmados por entrevistas/pruebas. |
| 2 | Superficie de confianza | Que la persona no entienda quién cubre ni por qué. | Pasaporte de relevo y decisiones legibles en menos de cinco segundos. | Pruebas de comprensión y de recorrido sin ayuda. |
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

### Track 1 — Descubrimiento que vuelve la tesis defendible

**Propósito:** reemplazar la persona sintética por evidencia cualitativa suficiente antes de automatizar una hipótesis equivocada.

**Preguntas que deben responderse**

- ¿Qué ocurre exactamente desde que termina el turno hasta que la persona intenta dormir?
- ¿Qué le impide delegar: falta de contexto, falta de capacidad, cultura, culpa, experiencias previas o un protocolo inexistente?
- ¿Qué haría que Andrea acepte/rechace un relevo con tranquilidad?
- ¿Cuándo un aviso puede esperar y cuándo sería irresponsable agruparlo?
- ¿Qué canales y políticas ya existen y quién tiene autoridad para modificarlos?

**Método mínimo defendible**

1. Entrevistas semiestructuradas con 5–8 personas: operadores on-call, posibles relevos y un líder de guardia. No pedir tickets sensibles; usar relatos anonimizados o escenarios.
2. Prueba de prototipo con tareas: interpretar cobertura, aceptar/rechazar, explicar la ruta de un P3/P1 y decir qué puede despertarlos.
3. Diario ligero de 5–7 días, voluntario: hora aproximada de cierre, cantidad de chequeos posteriores, confianza para desconectar (1–5) y si ocurrió una interrupción. No se recopilan diagnósticos ni datos biométricos.
4. Síntesis con mapa de viaje, oportunidades priorizadas y frases textuales anonimizadas; separar con precisión hallazgo, hipótesis e inferencia.

**Momentos de producto a diseñar**

| Momento | Necesidad psicológica | Respuesta de SnoozeOps |
| --- | --- | --- |
| Antes de cerrar | “No quiero olvidar algo importante.” | Checklist breve, pendiente con dueño y resumen que Rodrigo puede corregir. |
| Pedir relevo | “Delegar no puede sentirse como abandonar.” | Solicitud explícita, derecho a rechazar y alcance limitado de la cobertura. |
| Activar la ventana | “Necesito dejar de negociar conmigo mismo.” | Ritual de cierre: evidencia de cobertura + frase factual + una sola acción para salir. |
| Durante la noche | “¿Y si pasa algo?” | Regla visible de qué escala y qué espera; nunca una promesa de cero alertas. |
| Mañana | “¿Qué ocurrió mientras descansaba?” | Resumen factual, pendientes y aprendizaje del plan; no culpabilización ni score de sueño. |

**Puerta:** al menos 70% de participantes entiende sin ayuda quién cubre, hasta cuándo y qué los vuelve a alertar; hay evidencia de que el ritual reduce incertidumbre declarada o se redefine la tesis antes de seguir.

### Track 2 — Pasaporte de relevo: confianza visible y comprobable

**Propósito:** transformar el concepto de relevo en un objeto operacional que ambas personas pueden leer, corregir y auditar.

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

**Pruebas obligatorias**

- Matriz completa de cobertura y pruebas puras de la política.
- Pruebas de transición: rechazo, cancelación, vencimiento, conflicto de ventana, relevo que se revoca y vuelta a guardia filtrada.
- Test de comprensión con usuarios: explicar el estado y anticipar la ruta de cinco escenarios, incluidos ambiguo y baja confianza.
- Revisión de contenido para que “protegido” nunca signifique “no serás interrumpido”.

**Puerta:** 8 de cada 10 participantes interpretan correctamente la cobertura y la ruta P1/P3; no hay estado que diga cobertura completa sin aceptación verificable; las rutas de fallo siguen siendo conservadoras.

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

Después del Checkpoint 2, no se comienza implementando todo el Track 2. Se realiza el corte de rama y el Track 1 durante un ciclo corto. Con esos hallazgos se eligen exactamente dos entregables para la siguiente rama:

1. **Pasaporte de relevo + cobertura derivada**, si el problema dominante es no saber quién responde y bajo qué condición.
2. **Checklist/recibo de cierre**, si el problema dominante es rumiación por pendientes no externalizados.
3. **Política/replay de incidentes**, si el principal reparo es confianza operacional.

La IA, integraciones reales y datos de descanso esperan esa evidencia. Esa disciplina es lo que hace que el roadmap sea más ambicioso que una lista de funcionalidades: convierte cada etapa en una demostración de criterio de producto.
