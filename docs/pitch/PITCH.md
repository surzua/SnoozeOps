# Pitch de escenario — SnoozeOps

Revisado el 24 de octubre de 2026 contra la interfaz local y el código vigente. Se recorrieron propuesta, aceptación, registro manual, aclaración, IA, historial, retorno y bifurcación. No se probó directamente la URL de producción; el usuario confirmó el último despliegue en Vercel. Todas las escenas y duraciones son sintéticas.

## Puesta en escena

PDF existente: **página 1 → página 2 → app → página 5**. Páginas 3–4 prescindibles; 6–11 para preguntas. Terminar a los 4:45, con 15 segundos de margen. Compartir la ventana completa del navegador para que el cambio de pestaña se vea. Las slides son opcionales; la demo en vivo es obligatoria.

Idea central: **Una acción hecha no equivale a dormir más. SnoozeOps usa lo que ocurrió para decidir qué merece probar Rodrigo después.**

## Guion literal y acciones

### 0:00–0:15 · PDF, página 1

> El turno termina. La cabeza sigue de guardia. Rodrigo trabaja en soporte TI, rota turnos y lleva más de un año durmiendo cinco o seis horas. La meta es concreta: que duerma una hora más.

Pausa después de la primera frase. Mirar al jurado.

### 0:15–0:45 · PDF, página 2

> Ya sabe que duerme poco. Elegimos una traba específica: las revisiones voluntarias de trabajo que se extienden hasta el descanso. Nuestra hipótesis es que necesita un cambio pequeño, compatible con su guardia, y una forma de saber qué hacer si ese cambio no alcanza. Eso construimos en SnoozeOps. Veámoslo.

Cambiar a la app. No explicar arquitectura ni recorrer slides de solución.

### 0:45–1:15 · App: preparar

**Hacer:** mantener **Día** y la frase precargada sobre revisar tickets voluntariamente. Seleccionar **Revisión voluntaria de tickets**. Señalar descanso y restricción. Pulsar **Ver una propuesta concreta →**.

> Estos datos son ficticios. Rodrigo confirma que esta revisión es voluntaria; las alertas que sí debe atender siguen vigentes. La app parte de su traba y le propone un cambio para ese contexto.

La categoría se confirma manualmente; no decir que la IA clasificó el texto. Los horarios son ejemplos, no un calendario conectado.

### 1:15–1:45 · App: propuesta y acuerdo

**Hacer:** señalar la acción sin leer toda la tarjeta. Pulsar **Aceptar esta acción** y **Registrar después de despertar →**.

> Antes de cerrar, deja anotado un pendiente y cuándo lo retomará; después cierra la pestaña de revisión voluntaria. Es una sola acción, con un momento concreto. Puede probar otra forma o rechazarla. Hoy la acepta. Avancemos al despertar simulado.

### 1:45–2:20 · App: registro

**Hacer:** **Sí** → **Tengo una estimación** → **360** minutos → **Intenté dormir a la misma hora** → **Guardar este registro**. Detalle opcional vacío.

> Rodrigo declara que realizó la acción y estima que durmió seis horas, pero intentó dormir a la misma hora. Haber hecho la acción no basta para decir que funcionó. Mira qué pregunta aparece: «¿Qué ocupó el tiempo disponible?».

Pausar para que el jurado la vea. No afirmar que durmió lo mismo que antes: no se estableció esa comparación.

### 2:20–3:05 · App: aclaración e IA

**Pegar:**

> Dejé de revisar tickets, pero me quedé preparando un informe no urgente para mañana. Podía dejarlo anotado y retomarlo al comenzar el turno.

**Hacer:** **Guardar aclaración** → **Solicitar revisión IA en vivo**. Una sola solicitud en el pitch.

> La primera propuesta y esta pregunta las controla la lógica de la app. Ahora sí pedimos una revisión de IA con lo que probó, lo que declaró y esta aclaración. Puede mantener la acción, pedir un dato, proponer otra del catálogo o reconocer un límite. Rodrigo conserva la decisión.

Adaptar la narración al resultado real:

- **Acción distinta:** pulsar **Revisar esta acción distinta**. Decir: «Aquí aparece una propuesta nueva para revisar. La IA no la acepta por Rodrigo». No hace falta aceptarla ni registrar otro descanso.
- **Aclaración:** leer la pregunta visible. Decir: «Todavía pide confirmar un dato antes de cambiar la propuesta». No prometer un cambio que no ocurrió. Si repite un dato ya aportado, reconocer que esa pregunta requiere afinarse.
- **Mantener o reconocer límite:** describir exactamente esa decisión.
- **Fallo:** «Esta solicitud no obtuvo una revisión nueva. El registro y el plan siguen disponibles». Continuar sin reintentar.

### 3:05–3:40 · App: contraste de resultados

**Hacer:** **Controles de demostración** → **Restaurar punto de bifurcación** → **Simular: tardó en conciliar**. Cerrar el panel y llevar la pregunta a la vista.

> Volvamos al mismo punto del escenario ficticio y cambiemos el resultado. Esta vez intentó dormir antes, pero tardó en conciliar.
>
> Ahora pregunta: «¿Qué ocurrió desde que intentaste dormir hasta conciliar?». La estimación sigue siendo de seis horas; lo que cambia es qué necesitamos entender. Acostarse a la misma hora y no conseguir dormirse antes requieren preguntas distintas.

**Restaurar ya deja la acción aceptada.** No volver a buscar el botón de aceptar. El control reemplaza el escenario sintético para comparar; no es un paso que deba realizar Rodrigo. Las dos preguntas contrastadas proceden de reglas, no del modelo.

### 3:40–4:00 · App: razón para volver

Mantener visible la pregunta. Sólo si sobra tiempo: **Registros** → **Volver al ciclo**. No leer cifras, corregir ni eliminar.

> Ahí está la razón para volver: su respuesta sirve para decidir el próximo intento. Empieza con una traba reconocible, elige una sola acción y al despertar revisa qué ocurrió. Si no pudo hacerla, la app primero busca entender el obstáculo.

### 4:00–4:45 · PDF, página 5

> Creemos que Rodrigo podría sostenerlo porque el paso es pequeño, puede rechazarlo y lo que cuenta se usa en la siguiente revisión. Esa es nuestra hipótesis de adopción.
>
> La meta sigue siendo una hora más de sueño. Esta demo demuestra el ciclo funcionando; el siguiente paso es un piloto que mida si vuelve, si puede realizar la acción y si aumenta su descanso en contextos comparables.
>
> SnoozeOps convierte lo que pasó en una decisión concreta para el próximo descanso.

Terminar mirando al jurado. No cerrar con arquitectura ni una lista de límites.

## Si sólo quedan 30 segundos

Saltar Registros y volver a página 5:

> Rodrigo empieza con una sola acción que puede aceptar. Vuelve porque su experiencia cambia la siguiente revisión. La meta es una hora más; hoy mostramos el mecanismo funcionando y el siguiente paso es medirlo en un piloto.

## Preguntas difíciles

| Pregunta | Respuesta defendible |
| --- | --- |
| ¿Por qué usaría otra app? | Es la hipótesis principal por validar. Reducimos la decisión a una traba y una acción; el retorno permite revisar su intento sin reconstruir el contexto. No hemos demostrado adopción. |
| ¿Por qué no ChatGPT? | Un chat puede dar consejos similares. Aquí construimos el flujo: acción aceptada, ejecución declarada, observación, revisión y confirmación humana. Esa continuidad es el producto a validar. |
| ¿Dónde está la IA? | En la revisión solicitada explícitamente. La propuesta inicial y las dos preguntas contrastadas salen de reglas; no las presentamos como generación en vivo. |
| ¿Eso basta para una hora adicional? | No lo sabemos. Atacamos una barrera modificable; el éxito exige medir el sueño, no contar acciones realizadas. |
| ¿Y la guardia obligatoria? | Esta acción no la resuelve. La demo conserva la obligación y reconoce el límite; una solución organizacional exige acuerdos reales. |
| ¿Sólo dos acciones? | Sí: cierre de revisión voluntaria y preparación de tarea no urgente. Acotamos el catálogo para demostrar el ciclo antes de ampliar intervenciones. |
| ¿Cómo validarían? | Fuera del evento: piloto consentido, línea base, seguimiento de retornos, viabilidad de acciones y duración de sueño, comparando turnos y contextos equivalentes. |
| ¿Y ronquidos o cansancio persistente? | La herramienta no evalúa causas médicas. La derivación profesional debe incorporarse al avanzar el producto; la pantalla actual no implementa ese flujo. |

## Hallazgos y hotfixes sugeridos

1. **Prioridad de demo: fiabilidad de IA.** En local respondió una vez con una aclaración y después rechazó otra solicitud con HTTP 503 del proveedor. Esto no prueba un fallo de Vercel. Ensayar una llamada en producción con el texto elegido. La ruta ya tiene reintento transitorio y presupuesto total de 12 segundos; no añadir reintentos ilimitados ni presentar una respuesta guardada como generación en vivo.
2. **Claridad al guardar aclaraciones:** la respuesta se limpia y puede reaparecer la misma pregunta. Mostrar la respuesta guardada y el estado «Aclaración guardada; solicitar revisión» haría evidente el avance. Es sugerencia: no se cambió código de producto.
3. **Corrección documental aplicada:** el runbook anterior sugería aceptar después de restaurar; restaurar ya acuerda la acción.

No se observó bloqueo en el recorrido manual probado. Pasaron los 42 tests existentes. No se certificaron todas las rutas ni se probó directamente producción.

### Actualización tras depurar la IA

Se corrigieron localmente el reintento ante timeout, la comparación de contexto dependiente del orden JSON y el esquema que dejaba opcionales dos referencias requeridas por el validador. La captura también mostró una salida `maintain` con `actionId` no nulo: se explicitó en el prompt el contrato de campos para cada decisión, conservando la validación estricta. Se aclaró que las respuestas posteriores pueden actualizar la traba inicial para reducir preguntas redundantes.

En el ensayo real final, Gemini propuso preparar la tarea no urgente tras recibir la aclaración del informe; **Revisar esta acción distinta** abrió una propuesta versión 2. Pasaron 52 tests, lint y build. El éxito de ese ensayo no garantiza disponibilidad del proveedor ni supone que los cambios ya estén desplegados en Vercel.
