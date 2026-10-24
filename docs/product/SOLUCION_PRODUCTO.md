# SnoozeOps — definición acordada de la solución

**Fecha:** 24 de octubre de 2026, hora de Santiago.

**Estado:** definición del producto acordada después del feedback del checkpoint 2 y de revisar la ficha completa de Rodrigo. Es la única fuente vigente para el diseño y evolución del producto. No describe funcionalidades ya implementadas; el MVP presentado permanece congelado.

## 1. La solución en una frase

**SnoozeOps ayuda a trabajadores TI con turnos rotativos a descubrir y probar un cambio viable por vez para dormir más, teniendo en cuenta sus obligaciones de guardia y aprendiendo de lo que ocurre después de cada descanso.**

Es un acompañamiento breve para experimentar con hábitos. La IA ayuda a interpretar el contexto, formular una hipótesis y revisar la propuesta. El objetivo sigue siendo que Rodrigo duerma una hora más; una recomendación personalizada, una tarea completada o una ventana reservada no equivalen a lograrlo.

### Explicación de 30 segundos

> Rodrigo no necesita otro gráfico que le diga que durmió poco. Necesita encontrar qué puede hacer distinto con un turno que cambia y una guardia que le cuesta dejar de vigilar. SnoozeOps le propone una sola acción viable, acuerda qué observar y revisa lo ocurrido después de su descanso. Si el resultado no coincide con lo esperado, pregunta lo necesario antes de cambiar la propuesta. Si el obstáculo depende de la empresa o requiere atención profesional, reconoce ese límite.

## 2. El problema que resolvemos

Rodrigo normalizó dormir cinco o seis horas. Revisa tickets para tranquilizarse antes de acostarse, usa café para funcionar y conserva un teléfono que es guardia, despertador y distracción. Rota semanalmente entre día, tarde y noche. Ya abandonó soluciones que medían el problema o exigían desconectar un dispositivo que necesita.

La barrera de producto es que **no dispone de una manera sencilla de elegir un cambio compatible con su situación y comprobar si le ayuda a dormir más**.

Hay varios mecanismos posibles: comprobaciones laborales voluntarias, interrupciones efectivas de guardia, horarios del café, restricciones familiares o del turno, y dificultad para conciliar o mantener el sueño. No se presume una causa única ni se diagnostica a partir de la ficha.

### Hechos y supuestos

| Confirmado en la ficha | No se puede dar por hecho |
| --- | --- |
| Guardia por WhatsApp en un teléfono que también es personal. | Que SnoozeOps pueda leer, filtrar o silenciar ese grupo. |
| Turnos de día, tarde y noche, con rotación semanal. | Horarios exactos, calendario o desplazamientos no especificados. |
| Revisión de tickets antes de acostarse. | Que todas esas revisiones sean obligatorias o todas innecesarias. |
| Cinco horas en semana de noche y seis en semana de día, según el caso. | Una línea base del turno tarde o medidas instrumentales de sueño. |
| Ronquidos fuertes y cansancio. | Un diagnóstico de apnea u otra condición. |
| En su empresa no se habla de desconexión. | Una política clara, respaldo disponible o relevo llamado Andrea. |

## 3. Usuario, motivación y alcance inicial

El primer usuario es una persona de soporte u operación TI con turnos rotativos y responsabilidad fuera del horario habitual, que reconoce molestias prácticas aunque no se identifique como alguien con un problema de sueño.

La entrada no exige aceptar una etiqueta clínica. Parte de una frustración reconocible:

> «¿Qué te impidió terminar el día ayer?»

Para una persona que termina un turno nocturno, adaptar el lenguaje: «¿Qué dificultó tu último descanso?». El producto se organiza alrededor del **próximo descanso**, no presupone que siempre ocurre por la noche.

El valor inmediato es salir con una acción concreta y realizable. La hipótesis de adopción es que eso requiere menos esfuerzo que interpretar gráficos o seguir una lista de consejos. La reducción de cansancio y la vida familiar pueden resultar relevantes para Rodrigo, sin utilizar culpa o miedo como mecanismos de persuasión.

El mercado inicial se define por esta situación compartida, no por los nombres de la historia. No se generaliza todavía a cualquier ansiedad laboral. La empresa podría facilitar acuerdos o distribución en el futuro; el comprador y la disposición de pago siguen sin validarse.

## 4. Mecanismo central

**Identificar una traba → acordar una acción → observar el descanso → mantener, aclarar o adaptar.**

### A. Entender lo mínimo necesario

Recoger progresivamente:

- Turno actual y siguiente, con horarios confirmados por la persona.
- Franja en la que intenta descansar y restricciones que no puede mover.
- Si tiene guardia efectiva durante esa franja y qué obligaciones conoce.
- Traba que identifica en su último descanso.
- Experimento previo y resultado, cuando existan.

No exigir todas las respuestas en un onboarding largo. Preguntar sólo lo que pueda cambiar la propuesta. Si falta un dato decisivo, no completar el vacío con una suposición invisible.

### B. Formular una microhipótesis

La IA propone una explicación provisional vinculada con los datos aportados. Debe distinguir lo declarado, lo inferido y lo desconocido.

Ejemplo ilustrativo:

> «Dices que vuelves a revisar tickets después de cerrar el notebook. Es posible que esas comprobaciones estén retrasando el momento en que intentas dormir. Antes de probar un cierre más breve, necesitamos distinguir qué revisión exige tu guardia.»

La hipótesis no se convierte en diagnóstico ni en una promesa de minutos recuperados.

### C. Acordar una sola acción principal

La propuesta contiene:

| Campo | Contenido |
| --- | --- |
| Acción | Qué hará Rodrigo, expresado de forma concreta. |
| Momento | Cuándo, referido a su turno o descanso real. |
| Justificación | Qué información hace razonable probarla. |
| Restricciones | Qué obligación debe respetar y qué no está resuelto. |
| Observación | Qué dato permitirá revisar el resultado. |

Rodrigo puede aceptar, ajustar o rechazar. El rechazo revela una restricción o preferencia; no se registra como fracaso personal. Evitar apilar cambios que impidan saber qué se intentó.

### D. Observar después de despertar

Registro breve, con un objetivo de interacción de aproximadamente 30 segundos que deberá comprobarse en la demo:

1. Si pudo realizar la acción: sí, parcialmente o no.
2. Cuánto estima que durmió; puede indicar que no sabe.
3. Qué ocurrió: interrupción, acostarse tarde, dificultad para dormirse, otra traba o nada destacable.

Pedir hora de intento de sueño, despertar u otro detalle sólo cuando permita aclarar una diferencia relevante. Las duraciones son estimaciones declaradas y no deben presentarse con precisión instrumental.

### E. Elegir el siguiente paso

| Evidencia disponible | Respuesta de producto |
| --- | --- |
| Cambio viable y señal favorable en observaciones comparables. | Considerar mantenerlo; explicar que todavía no demuestra causalidad. |
| La acción no se pudo realizar. | Aclarar qué la hizo inviable y ajustar su ejecución. |
| La acción ocurrió, pero el resultado esperado no. | Hacer una pregunta que distinga explicaciones antes de cambiar de foco. |
| Cambio de turno o de obligaciones. | Revisar si el experimento sigue siendo apropiado. |
| Información insuficiente o contradictoria. | Mostrar la incertidumbre y preguntar o abstenerse. |
| La guardia o las obligaciones no dejan margen suficiente. | Reconocer una barrera organizacional; no prometer que un hábito individual la resolverá. |
| Aparecen señales que justifican atención profesional. | Recomendar consulta sin diagnosticar ni prescribir. |

Una sola noche no identifica una causa. El producto es adaptativo, pero no debe cambiar de explicación automáticamente con cada resultado. «Mantengamos la propuesta» y «todavía no sabemos» son respuestas válidas.

## 5. Catálogo inicial de intervenciones

| Familia | Ejemplo de acción posible | Condición |
| --- | --- | --- |
| Cierre de pendientes | Dejar anotado un pendiente y cuándo retomarlo antes de terminar la revisión. | Distinguir las comprobaciones voluntarias de las exigidas por la guardia. |
| Organización del descanso | Preparar antes una tarea desplazable que retrasa el momento de acostarse. | Confirmar que el cambio es viable y no desplaza una obligación a otra persona sin acuerdo. |
| Café y descanso | Probar un cambio acordado en el horario de un consumo respecto del descanso previsto. | Usar orientación revisada; no predecir metabolismo individual ni imponer el mismo horario a todos los turnos. |
| Responsabilidad de guardia | Hacer explícito qué atención exige la franja y qué acuerdo falta. | La aplicación no sustituye un acuerdo real ni garantiza cobertura. |

El cierre laboral es una intervención del catálogo, no el núcleo obligatorio. La primera versión puede implementar dos familias bien delimitadas; el diseño no exige construirlas todas para demostrar el ciclo.

No incorporar dosis de medicamentos, suplementación, restricción del sueño, planes de luz especializados o diagnóstico generado por IA. No confundir un acompañamiento de hábitos con un tratamiento clínico.

## 6. Papel de la IA

La IA tiene cuatro tareas:

1. Interpretar respuestas breves y relacionarlas con el turno, las restricciones y el historial disponible.
2. Proponer una hipótesis provisional y una acción del catálogo permitido.
3. Formular una pregunta aclaratoria cuando varias explicaciones siguen siendo posibles.
4. Explicar por qué mantiene o revisa la propuesta.

Las reglas de aplicación controlan consistencia de horarios, campos obligatorios, opciones permitidas y límites. El modelo no decide políticas de guardia ni inventa evidencia científica para justificar una recomendación.

El historial se usa como contexto, no como prueba de eficacia. No mostrar porcentajes de confianza o puntuaciones de salud sin una base validada.

Ante una caída del proveedor, ofrecer acceso al plan ya acordado y a un registro manual; indicar que no hubo un nuevo análisis. Una respuesta guardada debe conservar su fecha y contexto, sin presentarse como generación en vivo.

## 7. El efecto WOW que se quiere demostrar

**Que la IA revise una hipótesis con criterio y reconozca qué información le falta.**

Escena propuesta, completamente sintética:

1. Rodrigo está en semana de día y dice que sigue revisando tickets después de cerrar.
2. Se aclara que las revisiones consideradas en el experimento no son una obligación adicional de esa franja. El plan no modifica sus alertas ni su disponibilidad exigida.
3. La IA propone un cierre breve y explícito como una acción a probar.
4. Se avanza a un resultado simulado: cerró antes, pero estima que durmió lo mismo.
5. La IA pregunta: «¿Intentaste dormir antes o ese tiempo terminó ocupado por otra cosa?».
6. Si intentó dormir a la misma hora, se revisa cómo convertir el tiempo liberado en una oportunidad de descanso; no se culpa automáticamente al café.
7. Si intentó dormir antes y tardó en conciliar, se pregunta por información relevante antes de proponer otro experimento. No se concluye una causa nueva a partir de esa observación.
8. Cambiar la respuesta en vivo y mostrar que cambia el siguiente paso. Si cambia a turno tarde o noche, revalidar horarios y restricciones.

La variación no consiste sólo en redactar otra frase: deben cambiar la pregunta o la acción y su justificación. La IA real opera sobre datos ficticios; el resultado simulado no demuestra mejora del sueño de una persona real.

## 8. Qué significa funcionar

| Nivel | Señal | Qué no demuestra |
| --- | --- | --- |
| Conducta | Realizó la acción acordada. | Que durmió más. |
| Oportunidad | Dispuso de más tiempo para intentar dormir. | Que durmió ese tiempo. |
| Resultado buscado | Declara haber dormido más respecto de una referencia comparable. | Medición objetiva ni efecto causal de la app. |

El objetivo final sigue siendo **una hora adicional de sueño**, no una hora reservada. No sumar minutos teóricos de varias recomendaciones ni asignar siempre +60.

Comparar descansos con turnos y condiciones relevantes similares. Separar las semanas de día, tarde y noche, e identificar las transiciones entre ellas. La ficha aporta referencias generales, no una serie histórica para atribuir cambios.

Para la hackatón se puede demostrar la lógica de personalización y revisión. El impacto sobre sueño, adopción sostenida y disposición de pago requieren validación posterior. Esa validación no se convierte en entrevistas obligatorias durante el evento.

## 9. Diferenciación y posición en el mercado

La apuesta es un flujo breve que conecta obligaciones de soporte TI, turnos cambiantes y experimentación con una conducta realizable. No es una afirmación de exclusividad tecnológica ni una garantía de que ningún competidor lo cubra.

| Alternativa | Diferencia que SnoozeOps busca demostrar |
| --- | --- |
| Tracker | Ayudar a elegir y ejecutar un cambio antes del descanso, además de registrar resultados. |
| Planificador de turnos y sueño | Interpretar restricciones laborales y revisar el experimento según lo ocurrido. No competir inventando cálculos circadianos. |
| Gestor de incidentes | Trabajar sobre la transición al descanso; no crear otro sistema de alertas o tickets. |
| Chat general | Un catálogo delimitado, memoria estructurada del experimento, observaciones comparables y estados explícitos de revisión. |

Estas diferencias son criterios para evaluar el producto, no superioridad comercial ya probada. Si una herramienta existente satisface mejor la necesidad de un equipo, debe considerarse una integración u otro formato en vez de suponer que hace falta una aplicación separada.

## 10. Límites que forman parte de la solución

- No asumir un relevo disponible ni conservar a Andrea como requisito universal.
- No silenciar WhatsApp, garantizar alertas críticas ni alterar protocolos empresariales desde este prototipo.
- No convertir los datos de descanso en evaluación de desempeño laboral.
- Reconocer los ronquidos fuertes y el cansancio de la ficha como motivos para recomendar evaluación profesional, sin diagnosticar apnea.
- No recomendar las pastillas ofrecidas por un amigo ni indicar tratamientos.
- Evitar castigos, culpa, pérdida de rachas o puntuaciones que presionen a dormir.
- No presentar una prueba de reacción como medición de sueño ni prueba de aptitud para trabajar o conducir.
- Usar sólo perfiles y resultados sintéticos durante la hackatón, incluidos los datos de salud y las simulaciones de varios descansos.

## 11. Experiencia mínima a construir

Tres momentos funcionales, reutilizando la interfaz existente donde aporte valor:

1. **Preparar el próximo descanso:** contexto mínimo y traba principal.
2. **Acordar el experimento:** una acción, su motivo y qué observar.
3. **Revisar después de despertar:** resultado declarado y decisión explicada de mantener, aclarar o adaptar.

Mostrar claramente qué es conocido, qué se propone y qué falta confirmar. No añadir pantallas para aparentar profundidad ni convertir la revisión en un chat interminable.

La demo prioriza una bifurcación de resultados y una adaptación al cambio de turno. Integración con calendarios, WhatsApp, wearables, tickets y cobertura productiva quedan fuera del núcleo inicial.

## 12. Relación con el MVP y los materiales de presentación

El MVP de las fases 0–5 se conserva como evidencia de lo presentado en el checkpoint 2. Su código y sus materiales de demo/pitch describen esa versión congelada, no la dirección actual del producto. No se deben usar sus decisiones de producto como instrucciones para ampliar SnoozeOps.

Las antiguas especificaciones de fases, propuestas y roadmaps de `docs/product/` se retiran para evitar que compitan con esta definición. Para desarrollar la siguiente versión, primero se debe convertir las secciones 4, 7 y 11 de este documento en un alcance implementable y comprobarlo contra el MVP protegido. Este documento define el qué y los límites del producto; los detalles técnicos de implementación se decidirán al preparar ese trabajo.

Los documentos de `docs/pitch/` y el pitch raíz se mantienen como registro de la presentación del MVP. Toda referencia suya a un roadmap futuro debe leerse como histórica; la dirección vigente queda definida aquí.

## 13. Qué cambia respecto de los diseños anteriores

| Antes | Definición actual |
| --- | --- |
| Relevo como condición central del producto. | Una posible intervención, sólo si existe y está acordado. |
| +60 minutos como salida fija de la demo. | Objetivo a perseguir; resultado declarado y oportunidad se muestran separados. |
| IA que consolida información operacional. | IA que ayuda a elegir, aclarar y revisar un experimento de conducta. |
| Ruta P1/P3 como demostración principal. | Respuesta a un resultado inesperado como demostración principal. |
| Día y noche como variantes implementadas. | La solución debe contemplar día, tarde, noche y sus transiciones, con horarios confirmados. |
| Siguiente desarrollo centrado en un piloto de relevo. | Siguiente diseño centrado en el ciclo adaptativo y sus pruebas de coherencia. |

El código del MVP no cambia con este documento. Al implementar la nueva versión habrá que actualizar README, pitch y runbook para describir las capacidades reales.

## 14. Referencias y alcance de la evidencia

- Ficha completa de Rodrigo entregada por el usuario en esta conversación: fuente del caso y de sus restricciones, no investigación clínica de una persona real.
- [Timeshifter — Shift Work](https://www.timeshifter.com/shift-work-app): documenta planes adaptados al trabajo por turnos; evita presentar la adaptación de horario como novedad exclusiva.
- [RISE — horarios irregulares](https://help.risescience.com/hc/en-us/articles/40672537872663-Can-RISE-work-with-a-night-shift-or-irregular-schedule): otro ejemplo de soporte a horarios variables.
- [NHLBI — hábitos de sueño](https://www.nhlbi.nih.gov/health/sleep-deprivation/healthy-sleep-habits): orientación sobre cafeína y descanso; no permite calcular una ganancia individual de sueño.
- [NHLBI — apnea del sueño](https://www.nhlbi.nih.gov/es/salud/apnea-del-sueno): fundamento de la recomendación de consulta ante las señales descritas; no diagnóstico de Rodrigo.

La propuesta combina razonamiento de producto y evidencia documental. No es un protocolo clínico validado, un ensayo N-of-1 formal ni una demostración de que SnoozeOps produce una hora adicional de sueño.
