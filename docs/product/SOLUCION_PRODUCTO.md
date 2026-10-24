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

### F. Mantener la interacción breve

Hacer una pregunta aclaratoria por vez, con un máximo de dos preguntas consecutivas por preparación o revisión. El registro básico del descanso no cuenta como aclaración. El límite es una decisión de experiencia del MVP, no un criterio clínico.

Si al llegar al límite sigue faltando un dato decisivo, mostrar qué falta y permitir guardar el avance, registrar el descanso sin nueva propuesta o retomarlo después. Ofrecer «No sé» y «Prefiero dejarlo para después» cuando corresponda. No inventar una recomendación para terminar el recorrido ni reiniciar el contador al recargar la página. Las respuestas disponibles deben conservarse al retomar.

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

### Hacer visible la adaptación

La revisión debe incluir una **tarjeta de evolución del experimento**, con tres elementos legibles sin recorrer el chat:

| Elemento | Ejemplo sintético |
| --- | --- |
| Qué probamos | Dejar anotados los pendientes antes de terminar la revisión voluntaria de tickets. |
| Qué ocurrió | Declaraste que cerraste antes, pero intentaste dormir a la misma hora y estimas que dormiste lo mismo. |
| Siguiente paso y motivo | Aclarar qué ocupó ese tiempo antes de cambiar de intervención. |

La tarjeta resume hechos declarados, incertidumbres y la decisión propuesta. Si todavía falta una respuesta, lo indica; no presenta una interpretación pendiente como un hecho ni una propuesta como aceptada.

Preparar un historial de tres descansos sintéticos con sus experimentos y restricciones. Al menos una restricción anterior debe cambiar una pregunta o descartar una propuesta inviable. Ejemplo: «En el registro anterior indicaste que esa franja estaba ocupada por una obligación familiar. ¿Sigue ocurriendo?». Mostrar la referencia al registro utilizado y permitir corregirla. La memoria conserva el contexto, pero vuelve a confirmar restricciones que pueden haber cambiado; no transforma una experiencia anterior en una regla permanente.

Al cambiar de turno, mostrar **qué cambió, qué parte del plan requiere revisión y qué dato falta confirmar**. Conservar el experimento anterior y sus observaciones en su contexto original. Una nueva propuesta necesita aceptación; cambiar el turno no reescribe el pasado ni desplaza automáticamente la acción acordada a otro horario.

### Guion y puerta de salida de la demo

Preparar un recorrido principal con un objetivo de tres a cuatro minutos, que se comprobará en ensayo:

1. Mostrar el contexto de Rodrigo y una restricción recuperada del historial sintético que influya en la propuesta.
2. Acordar una acción concreta compatible con el próximo descanso.
3. Avanzar explícitamente a un resultado simulado: realizó la acción, pero estima que durmió lo mismo.
4. Obtener una pregunta aclaratoria y mostrar la tarjeta de evolución.
5. Volver al mismo punto del escenario y cambiar la respuesta en vivo: intentó dormir a la misma hora frente a intentarlo antes y tardar en conciliar. La pregunta o acción siguiente y su motivo deben diferir de manera coherente.
6. Cambiar de turno y mostrar la revalidación del plan y de sus restricciones.

La demo está lista cuando el recorrido es repetible desde el mismo escenario, el cambio de respuesta modifica una decisión visible, el historial influye en al menos una decisión y el cambio de turno conserva la coherencia del plan. Ensayar también el recorrido con el proveedor caído. Medir la duración del recorrido y del registro básico; el objetivo de 30 segundos de la sección 4 se refiere al registro, separado de las aclaraciones posteriores.

Identificar siempre los datos y saltos temporales como sintéticos. Distinguir análisis generado en vivo, selección determinística y respuesta guardada. Si falla la generación, seguir con el plan y el registro disponibles e indicar qué parte de la demostración adaptativa no se pudo ejecutar.

## 8. Qué significa funcionar

| Nivel | Señal | Qué no demuestra |
| --- | --- | --- |
| Conducta | Realizó la acción acordada. | Que durmió más. |
| Oportunidad | Dispuso de más tiempo para intentar dormir. | Que durmió ese tiempo. |
| Resultado buscado | Declara haber dormido más respecto de una referencia comparable. | Medición objetiva ni efecto causal de la app. |

El objetivo final sigue siendo **una hora adicional de sueño**, no una hora reservada. No sumar minutos teóricos de varias recomendaciones ni asignar siempre +60.

Comparar descansos con turnos y condiciones relevantes similares. Separar las semanas de día, tarde y noche, e identificar las transiciones entre ellas. La ficha aporta referencias generales, no una serie histórica para atribuir cambios.

Para el MVP, una comparación requiere el mismo tipo de turno, ausencia de transición de turno en ambos descansos, la misma condición de guardia durante la franja y confirmación de que no cambiaron de forma relevante la franja prevista ni las restricciones que afectan al experimento. Si alguno de esos datos falta o difiere, mostrar los registros por separado y explicar el motivo; no incluirlos silenciosamente en un resumen común. Estas son reglas conservadoras de producto, no criterios clínicos validados.

Mostrar las duraciones estimadas, el número de observaciones y la realización declarada de la acción. Con menos de dos observaciones con duración conocida y contexto comparable, no calcular una diferencia de sueño. Los resultados desconocidos permanecen como desconocidos y no se convierten en cero. A partir de dos observaciones comparables se puede describir una diferencia, manteniendo explícito que no demuestra causalidad. Conservar visibles las ejecuciones parciales y las interrupciones para evitar presentar sólo resultados favorables.

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

### Estados y continuidad del experimento

| Estado | Entrada y siguiente paso permitido |
| --- | --- |
| Borrador | Se prepara una propuesta. Puede ajustarse, aceptarse o descartarse; todavía no es un compromiso. |
| Acordado | La persona acepta una acción y su contexto. Queda disponible para consultar y registrar el resultado del descanso asociado. |
| En revisión | Se guardó una observación, aunque el sueño sea desconocido. Se puede aclarar, mantener la propuesta para otro descanso o proponer un ajuste. |
| Cerrado | Se conserva el experimento y su resultado si existe, incluida la decisión de mantenerlo, adaptarlo o no continuar. Repetirlo crea un registro nuevo. |
| Pausado | Falta contexto o se debe revalidar el plan por un cambio de turno u obligación. Se conserva el avance y puede retomarse o cerrarse sin resultado. |
| Descartado | La propuesta no se aceptó. Se conserva el motivo si la persona lo aporta, sin registrar una acción incumplida. |

Como máximo puede existir un experimento acordado para el mismo próximo descanso. Cada experimento tiene identificador, versión y contexto confirmado; cada observación se vincula al experimento y versión correspondientes. Ajustar una acción aceptada exige confirmar una nueva versión, conservando la anterior. El estado pausado conserva el estado de origen para retomar de forma coherente.

Las decisiones de revisión se registran por separado del estado: mantener, aclarar, adaptar o reconocer un límite. Una respuesta de IA no acepta una acción en nombre de la persona. Reintentar una solicitud o recargar la pantalla no duplica experimentos ni observaciones; una respuesta tardía para un contexto anterior no reemplaza el plan vigente.

## 12. Roadmap de desarrollo de software

El desarrollo debe avanzar en cuatro etapas con una entrega y una puerta de salida por etapa. Cada etapa agrega una capacidad completa y demostrable. No se fijan duraciones: el tamaño real depende de lo que revele la implementación. El orden evita integrar IA antes de tener claro qué decisión debe tomar y cómo se reconoce una respuesta segura.

### Etapa 0 — Proteger el MVP y preparar la nueva línea

**Objetivo:** poder explorar el producto nuevo sin poner en riesgo la demo congelada.

- Conservar el estado presentado del MVP como referencia reproducible y trabajar el nuevo flujo en una rama o entorno aislado.
- Revisar el dominio actual (`src/domain/`), las fixtures y la navegación para reutilizar piezas neutrales; retirar o dejar fuera del nuevo flujo la lógica cuyo propósito sea relevo, tickets o incidentes.
- Acordar un contrato de datos mínimo para turno confirmado, próximo descanso, restricción, traba, experimento y observación posterior.
- Incluir identificadores, versiones y estados de la sección 11 en ese contrato. Separar el almacenamiento del nuevo flujo del utilizado por el MVP congelado para evitar interpretar datos antiguos como experimentos nuevos.
- Usar únicamente escenarios y perfiles sintéticos en esta etapa.

**Salida:** la demo anterior sigue ejecutándose desde su referencia protegida, y existe un espacio limpio para construir el ciclo adaptativo. No se amplía todavía la lógica de producto.

### Etapa 1 — Entregar el ciclo completo sin IA

**Objetivo:** comprobar que el producto se entiende y se puede recorrer antes de añadir generación.

Construir una experiencia vertical que permita preparar el próximo descanso, elegir una sola acción de un catálogo acotado, acordar qué observar y registrar al despertar si pudo realizarla, cuánto estima haber dormido y qué obstáculo ocurrió. Cubrir turnos de día, tarde y noche con horarios explícitos; el producto no inventa horarios faltantes.

La selección de acciones puede ser determinística. Debe soportar aceptar, ajustar y rechazar una sugerencia, resultado desconocido, acción parcial y cambio de turno. Persistir lo mínimo necesario para completar el recorrido en el mismo dispositivo; no añadir cuenta, sincronización o integración externa.

- Implementar los estados, transiciones y vínculos entre experimentos y observaciones de la sección 11, con recuperación del avance tras recargar.
- Incorporar la estructura de la tarjeta de evolución con decisiones determinísticas, y el límite de aclaraciones con las salidas de la sección 4.
- Preparar controles de demostración para cargar un escenario sintético, avanzar a un resultado simulado y reiniciar ese escenario. El reinicio afecta sólo a los datos de la nueva demo y exige una acción explícita del presentador.
- Conservar por separado las variantes de respuesta de la bifurcación, de modo que volver al mismo punto no mezcle resultados de recorridos alternativos.

**Puerta de salida:** una persona puede completar el ciclo con datos sintéticos sin quedar bloqueada por respuestas faltantes, y la interfaz distingue claramente entre acción realizada, oportunidad de dormir y sueño estimado. Recargar conserva el experimento correcto; rechazar no registra un incumplimiento; reiniciar permite repetir el escenario sin modificar el MVP protegido.

### Etapa 2 — Añadir IA acotada y revisión adaptativa

**Objetivo:** demostrar que la IA cambia el siguiente paso por una razón visible y segura.

- Integrar la IA sólo después de definir y validar el contrato de entrada/salida. El modelo recibe el contexto mínimo que necesita y devuelve una hipótesis provisional, una acción permitida o una pregunta aclaratoria, y su justificación.
- Limitar las acciones a un catálogo aprobado. Validar la salida estructurada y los límites en la aplicación; el modelo no altera horarios confirmados, obligaciones de guardia, políticas laborales ni decisiones de seguridad.
- Representar por separado lo dicho por la persona, lo inferido y lo todavía desconocido. Ante ambigüedad, datos contradictorios, respuesta inválida o falta de contexto, preguntar o abstenerse.
- Mantener el historial como contexto descriptivo, nunca como prueba causal. Una noche no basta para afirmar que una intervención funcionó.
- Incorporar en esta etapa el historial mínimo de tres descansos sintéticos y la memoria útil descritos en la sección 7. Reutilizar los registros separados de la Etapa 1; la Etapa 3 completa su gestión y comparación.
- Alimentar la tarjeta de evolución con la decisión validada y la referencia al contexto utilizado. Hacer visibles los efectos del cambio de respuesta y del cambio de turno.
- Evaluar desde esta etapa la matriz de escenarios indicada más abajo. Comprobar el comportamiento esperado además de la validez del formato de salida; no exigir que el modelo repita una redacción exacta.
- Conservar una ruta utilizable sin IA: mostrar la propuesta ya acordada, permitir registro manual y explicar que no hubo nuevo análisis.

La llamada al proveedor debe permanecer del lado servidor; no exponer credenciales en el navegador ni enviar información personal real durante la demo. Elegir proveedor y detalles de integración al implementar, consultando la documentación vigente de Next.js y del proveedor.

**Puerta de salida:** en escenarios sintéticos definidos, una diferencia relevante en la respuesta lleva a una pregunta o acción distinta y explicada; las salidas inválidas y los casos no contemplados no producen recomendaciones improvisadas. El historial influye en una decisión verificable y el cambio de turno exige confirmar el nuevo contexto. Superar también la puerta de salida de la demo de la sección 7, distinguiendo lo generado en vivo de lo precargado.

### Etapa 3 — Consolidar, evaluar y decidir si está listo para un piloto

**Objetivo:** hacer que el ciclo repetido sea confiable y determinar qué evidencia falta antes de probarlo con personas.

- Completar la gestión de los registros separados introducidos en las etapas anteriores, con fecha/contexto, acción acordada, realización declarada, sueño estimado y traba. Permitir corregir o eliminar registros; al hacerlo, actualizar los resúmenes y dejar de utilizar como vigentes sus conclusiones anteriores.
- Aplicar las reglas de comparabilidad de la sección 8; mostrar volumen, datos faltantes y límites. No producir un puntaje de salud ni atribuir cambios a la aplicación.
- Completar revisión de accesibilidad, estados de carga/error, recuperación de sesión, privacidad, minimización de datos y funcionamiento cuando el proveedor de IA no esté disponible.
- Mantener el almacenamiento local mientras alcance para validar el flujo. Añadir backend, cuentas, sincronización o instrumentación de uso sólo si una necesidad validada lo justifica y se define consentimiento, retención, acceso y eliminación.
- Completar la matriz de casos sintéticos iniciada en la Etapa 2 y la revisión de lenguaje de salud. Antes de un piloto con usuarios reales, definir consentimiento, protocolo, soporte y revisión profesional pertinente; la demo no constituye esa validación.

**Puerta de salida:** el equipo puede explicar qué hace el sistema, qué datos utiliza, cómo falla de forma segura y qué puede concluir de las observaciones. Sólo entonces se decide si avanzar a un piloto, ajustar el producto o detener una línea de intervención.

### Matriz mínima de escenarios y comportamiento esperado

Preparar las fixtures desde la Etapa 1, evaluar las decisiones de IA en la Etapa 2 y completar las comprobaciones de gestión e historial en la Etapa 3. Usar pares de escenarios que cambien una respuesta relevante y conserven el resto del contexto.

| Escenario sintético | Comportamiento esperado | Conclusión o acción que debe evitar |
| --- | --- | --- |
| Rechaza la propuesta por una restricción | Conservar el motivo y ajustar o guardar sin compromiso. | Registrar una acción incumplida o volver a imponer la misma propuesta. |
| Realiza la acción parcialmente o no puede realizarla | Aclarar la barrera de ejecución dentro del límite de preguntas. | Declarar ineficaz la intervención o culpar a la persona. |
| No sabe cuánto durmió | Guardar el resultado desconocido y conservar los demás datos. | Convertirlo en cero, calcular una mejora o bloquear el registro. |
| Cierra antes, pero intenta dormir a la misma hora | Preguntar qué ocupó el tiempo y revisar la oportunidad de descanso. | Atribuir el resultado al café o a una causa no declarada. |
| Cierra antes e intenta dormir antes, pero tarda en conciliar | Preguntar por contexto pertinente o reconocer información insuficiente. | Repetir la rama anterior o concluir una causa nueva con una observación. |
| Una restricción del historial vuelve inviable una propuesta | Recuperarla con referencia al registro y confirmar si sigue vigente. | Ignorarla o tratarla como permanente sin confirmación. |
| Cambia de turno u obligación de guardia | Pausar para revalidar y mostrar qué parte del plan cambia. | Reutilizar horarios anteriores o reescribir observaciones pasadas. |
| Las obligaciones no dejan margen individual | Reconocer la barrera organizacional y guardar el contexto. | Prometer cobertura o resolverla silenciando alertas. |
| Aparecen las señales de consulta o una petición de medicación descritas en los límites | Aplicar la orientación de consulta y los límites de las secciones 5 y 10. | Diagnosticar o prescribir. |
| Se agotan dos aclaraciones y falta un dato decisivo | Explicar qué falta y permitir guardar o retomar. | Abrir un bucle de preguntas o inventar el dato. |
| Falla el proveedor o devuelve una salida inválida | Conservar el plan válido y el registro manual, indicando que no hay nuevo análisis. | Presentar una respuesta guardada como generación en vivo. |
| Llega una respuesta de IA después de cambiar el contexto | Descartarla como propuesta vigente y conservar el contexto actual. | Sobrescribir el plan con una respuesta obsoleta. |
| Se recarga, reintenta o reinicia el escenario | Recuperar sin duplicados o restablecer la fixture elegida. | Mezclar ramas alternativas o modificar datos de la demo congelada. |
| Faltan condiciones comparables o se corrige/elimina un registro | Separar observaciones o recalcular el resumen con datos vigentes. | Mantener diferencias o explicaciones basadas en datos excluidos. |

### Orden de prioridad y regla de corte

La prioridad es: **ciclo usable → decisión adaptativa explicable → repetición confiable → piloto evaluable**. No construir integraciones, dashboards, perfiles extensos ni automatizaciones antes de que la etapa previa supere su puerta de salida. Si falta tiempo, entregar el ciclo de la Etapa 1 con fixtures claros; no simular una IA o un impacto que no existe.

Dentro de la Etapa 2, priorizar **tarjeta de evolución → memoria útil → bifurcación en vivo y revalidación de turno**, hasta completar el recorrido de la sección 7. La preparación de una demo confiable forma parte de las etapas existentes; no agrega una etapa ni exige integraciones nuevas.

### Qué queda fuera de este roadmap

No incluye cambios al MVP congelado, diagnóstico o tratamiento clínico, monitorización pasiva, leer o silenciar WhatsApp, conexión a tickets, garantía de cobertura de guardia, wearables, optimización circadiana especializada ni lanzamiento comercial. Cualquiera de esas líneas requiere una decisión nueva basada en evidencia y límites propios.

## 13. Relación con el MVP y los materiales de presentación

El MVP de las fases 0–5 se conserva como evidencia de lo presentado en el checkpoint 2. Su código y sus materiales de demo/pitch describen esa versión congelada, no la dirección actual del producto. No se deben usar sus decisiones de producto como instrucciones para ampliar SnoozeOps.

Las antiguas especificaciones de fases, propuestas y roadmaps de `docs/product/` se retiran para evitar que compitan con esta definición. El roadmap de la sección 12 traduce el mecanismo, la demo y la experiencia mínima de las secciones 4, 7 y 11 en entregas incrementales. Este documento define el qué y los límites del producto; los detalles técnicos específicos se decidirán al implementar cada etapa.

Los documentos de `docs/pitch/` y el pitch raíz se mantienen como registro de la presentación del MVP. Toda referencia suya a un roadmap futuro debe leerse como histórica; la dirección vigente queda definida aquí.

## 14. Qué cambia respecto de los diseños anteriores

| Antes | Definición actual |
| --- | --- |
| Relevo como condición central del producto. | Una posible intervención, sólo si existe y está acordado. |
| +60 minutos como salida fija de la demo. | Objetivo a perseguir; resultado declarado y oportunidad se muestran separados. |
| IA que consolida información operacional. | IA que ayuda a elegir, aclarar y revisar un experimento de conducta. |
| Ruta P1/P3 como demostración principal. | Respuesta a un resultado inesperado como demostración principal. |
| Día y noche como variantes implementadas. | La solución debe contemplar día, tarde, noche y sus transiciones, con horarios confirmados. |
| Siguiente desarrollo centrado en un piloto de relevo. | Siguiente diseño centrado en el ciclo adaptativo y sus pruebas de coherencia. |

El código del MVP no cambia con este documento. Al implementar la nueva versión habrá que actualizar README, pitch y runbook para describir las capacidades reales.

## 15. Referencias y alcance de la evidencia

- Ficha completa de Rodrigo entregada por el usuario en esta conversación: fuente del caso y de sus restricciones, no investigación clínica de una persona real.
- [Timeshifter — Shift Work](https://www.timeshifter.com/shift-work-app): documenta planes adaptados al trabajo por turnos; evita presentar la adaptación de horario como novedad exclusiva.
- [RISE — horarios irregulares](https://help.risescience.com/hc/en-us/articles/40672537872663-Can-RISE-work-with-a-night-shift-or-irregular-schedule): otro ejemplo de soporte a horarios variables.
- [NHLBI — hábitos de sueño](https://www.nhlbi.nih.gov/health/sleep-deprivation/healthy-sleep-habits): orientación sobre cafeína y descanso; no permite calcular una ganancia individual de sueño.
- [NHLBI — apnea del sueño](https://www.nhlbi.nih.gov/es/salud/apnea-del-sueno): fundamento de la recomendación de consulta ante las señales descritas; no diagnóstico de Rodrigo.

La propuesta combina razonamiento de producto y evidencia documental. No es un protocolo clínico validado, un ensayo N-of-1 formal ni una demostración de que SnoozeOps produce una hora adicional de sueño.
