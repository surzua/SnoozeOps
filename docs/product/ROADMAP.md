# SnoozeOps - Roadmap para ganar Hackatón Señales

> **Tesis:** Rodrigo no duerme poco por falta de información. Duerme poco porque no confía en que puede dejar de vigilar la guardia. SnoozeOps crea un relevo verificable que protege una hora adicional de sueño sin dejar incidentes críticos sin atender.

## 1. Norte del producto

### Promesa

**"Duerme una hora más. Si algo realmente crítico ocurre, la guardia sigue cubierta."**

### Usuario y momento de intervención

- Usuario: Rodrigo, 41 años, soporte TI y turnos rotativos.
- Momento crítico: los minutos antes de dormir, cuando revisa tickets para tranquilizarse.
- Barrera real: ansiedad de guardia y falta de un relevo confiable.
- Resultado esperado: pasar de 5-6 horas a una ventana protegida de 6-7 horas, según el turno.

### Mecanismo de cambio

1. Rodrigo selecciona o confirma su próximo turno.
2. SnoozeOps calcula una ventana de sueño realista.
3. Antes de acostarse, genera un resumen de pendientes y confirma un respaldo.
4. Durante la ventana protegida, las alertas no críticas esperan.
5. Las alertas críticas se escalan primero al respaldo.
6. Rodrigo solo es despertado si el incidente es crítico y el respaldo no responde.
7. Por la mañana ve una única medida: minutos de sueño protegidos frente a su línea base.

### Principio de seguridad

La IA puede resumir, explicar y proponer una severidad, pero nunca debe ser el único mecanismo que silencie una alerta. Una alerta ambigua se escala. El sistema debe fallar hacia la seguridad.

---

## 2. Estrategia para la pauta del jurado

| Criterio | Lo que debemos demostrar | Evidencia durante el pitch |
|---|---|---|
| Problema | Entendimos que la barrera no es la higiene del sueño, sino la imposibilidad percibida de desconectarse | Frase de Rodrigo, momento de caída y comparación con lo que ya intentó |
| Solución | Construimos una intervención adaptada al turno y al contexto de guardia | Demo completa: activar relevo, recibir dos incidentes y observar rutas distintas |
| Convicción | Es creíble que Rodrigo la use y consiga una hora adicional | Poca fricción, respaldo visible, resultado medible y respuesta clara a riesgos |

La pregunta que toda decisión debe superar es:

> **"¿Esto hace más creíble que Rodrigo duerma una hora más?"**

Si no mejora esa respuesta o la demo, queda fuera.

---

## 3. Alcance del MVP

### Flujo principal obligatorio

1. **Próximo turno**
   - Elegir turno de día, tarde o noche.
   - Mostrar hora sugerida de dormir y despertar.
   - Mostrar meta concreta: `+60 min`.

2. **Plan de esta noche**
   - Ventana de sueño propuesta.
   - Hora limite para el último café.
   - Respaldo asignado: persona ficticia.

3. **Cerrar guardia**
   - Tres tickets sintéticos pendientes.
   - Generacion de un resumen de relevo.
   - Confirmacion visual del respaldo.
   - Boton principal: `Activar sueño protegido`.

4. **Sueno protegido**
   - Estado grande y evidente: Rodrigo está protegido hasta cierta hora.
   - Minutos proyectados y/o ganados.
   - Simulador de incidentes accesible desde una vista de demo.

5. **Enrutamiento de incidentes**
   - Incidente no crítico: queda agrupado para la mañana.
   - Incidente crítico: llega al respaldo.
   - Incidente crítico sin confirmación: despierta a Rodrigo.
   - Cada decisión muestra una explicación comprensible.

6. **Resultado de la mañana**
   - Ventana protegida.
   - Comparacion con línea base.
   - Minutos reservados para descansar; no sueño medido ni contador de interrupciones evitadas.
   - Resultado factual del escenario habitual y P3 pendiente para revisión al cierre.
   - Mensaje de seguridad que recomienda consulta profesional por ronquido fuerte y fatiga, sin diagnosticar.

### Escena estrella de la demo

El jurado elige o escribe dos incidentes:

- `Solicitud de cambio de contraseña de un usuario` -> se guarda para la mañana.
- `Base de datos de producción sin responder` -> se escala al respaldo.

Despues se simula que el respaldo no confirma el segundo incidente y SnoozeOps despierta a Rodrigo. Esta es una prueba de seguridad sintética separada del resumen de la noche habitual. Esta escena debe ser lo más robusto y pulido del producto.

### Fuera de alcance deliberadamente

- Integracion real con WhatsApp.
- Uso de datos personales o datos de salud reales.
- Aplicacion multiempresa completa.
- Facturacion, autenticación o roles avanzados.
- Diagnóstico o tratamiento médico.
- Wearables, gráficos historicos y dashboards complejos.
- Optimizacion circadiana clínica.
- Notificaciones push reales si amenazan la estabilidad de la demo.
- Chat genérico de consejos.

---

## 4. Stack recomendado para un desarrollador solo

### Aplicacion

- **Next.js + TypeScript** para una PWA movil demostrable en navegador.
- **Tailwind CSS** para iterar rapidamente la interfaz.
- Estado local y `localStorage`; sin base de datos para el primer MVP.
- Datos sintéticos versionados en el repositorio.
- Pruebas del motor de enrutamiento con Vitest o el runner ya incluido por la plantilla.
- Despliegue en Vercel solo después de que la versión local sea estable.

### IA con fallback

Crear una interfaz única, por ejemplo `classifyIncident()`, con dos implementaciones:

1. **Proveedor real:** clasifica y explica el incidente mediante un modelo.
2. **Fallback determinístico:** reglas y ejemplos precargados que mantienen la demo funcionando sin red ni API.

El flujo de seguridad no depende del texto libre del modelo:

- Etiquetas operacionales conocidas y reglas duras tienen prioridad.
- Baja confianza o severidad desconocida implica escalar.
- La IA nunca descarta silenciosamente un incidente.

### Arquitectura minima

```text
UI movil
   |
   v
Maquina de estados de la demo
   |-- turno y ventana de sueño
   |-- cierre y relevo
   |-- modo protegido
   `-- mañana y resultado
   |
   v
Motor de incidentes
   |-- reglas de seguridad
   |-- clasificador IA opcional
   `-- fallback determinístico
   |
   v
Fixtures sintéticos + localStorage
```

---

## 5. Plan de ejecución

## Fase 0 - Congelar la historia

**Duracion:** 20-30 minutos  
**Objetivo:** evitar construir muchas funciones sin una tesis clara.

### Tareas

- Escribir la promesa del producto en una frase.
- Definir la barrera de Rodrigo en una frase.
- Dibujar las seis pantallas del flujo principal en papel o en un archivo simple.
- Elegir los dos incidentes de la escena estrella.
- Definir que significa `+60 min` dentro del prototipo.

### Terminado cuando

- La historia puede contarse en 30 segundos.
- Cada pantalla empuja a Rodrigo hacia una hora más de sueño.
- No quedan decisiones de producto esenciales abiertas.

---

## Fase 1 - Esqueleto navegable

**Objetivo:** llegar al Checkpoint 1 con el problema y la experiencia central visibles.

### Tareas

- Inicializar la aplicación y dejar un primer commit limpio.
- Construir layout movil y navegación entre estados.
- Crear los fixtures de Rodrigo, turnos, tickets e incidentes.
- Implementar las pantallas `Próximo turno`, `Plan` y `Cerrar guardia`.
- Preparar un modo `Reiniciar demo` siempre visible o facil de activar.
- Redactar el mensaje del Checkpoint 1.

### Terminado cuando

- Se puede navegar desde la seleccion de turno hasta `Activar sueño protegido`.
- No hay formularios ni dependencias externas bloqueando el flujo.
- La aplicación se entiende sin explicaciones largas.

### Mensaje para el Checkpoint 1

> Atacamos la ansiedad de guardia, no la falta de información. Rodrigo pierde sueño porque necesita comprobar que nada se caera. SnoozeOps crea un relevo verificable: protege una hora adicional y solo permite que incidentes críticos la interrumpan.

---

## Fase 2 - Motor de incidentes

**Objetivo:** construir la parte que el jurado recordara.

### Tareas

- Definir tipos de incidentes y estados del relevo.
- Implementar reglas de seguridad antes de conectar IA.
- Crear una vista de simulación para inyectar incidentes.
- Mostrar en pantalla:
  - severidad propuesta;
  - nivel de confianza;
  - regla aplicada;
  - destinatario;
  - estado de confirmación.
- Implementar temporizador acelerado para simular falta de respuesta del respaldo.
- Agregar el proveedor de IA detras de una interfaz, si hay tiempo y credenciales.
- Mantener el fallback determinístico probado y listo.

### Terminado cuando

- Los dos incidentes estrella recorren caminos distintos.
- La demo completa funciona con internet desconectado.
- Una severidad desconocida se escala de manera segura.
- El sistema explica por qué tomo cada decisión.

---

## Fase 3 - Cerrar el ciclo de habito

**Objetivo:** demostrar cambio de comportamiento, no solo clasificación de tickets.

### Tareas

- Calcular la ventana de sueño según el turno.
- Mostrar la hora limite dinamica para el café.
- Implementar la pantalla de resultado matinal.
- Comparar línea base sintetica y ventana protegida.
- Mostrar minutos reservados para descansar y el resultado factual del escenario habitual.
- Incorporar una derivacion profesional prudente por ronquido fuerte y fatiga.
- Incluir una advertencia contra medicamentos prestados, sin prescribir ni diagnosticar.

### Metricas del prototipo

- **Principal:** minutos adicionales de sueño o de ventana protegida.
- **De mecanismo:** activacion del relevo antes de acostarse.
- **Operacionales:** alertas no críticas agrupadas, alertas críticas confirmadas por respaldo y alertas críticas entregadas a Rodrigo en la prueba de seguridad.
- **Secundaria:** cumplimiento del limite de café.

### Terminado cuando

- El final de la demo responde visualmente cuánto tiempo quedó reservado, sin afirmar que se midió sueño real.
- Se entiende la diferencia entre oportunidad de sueño y sueño efectivamente medido.
- No se hace ninguna afirmación medica no sustentada.

---

## Fase 4 - Pulido para Checkpoint 2

**Objetivo:** tener algo corriendo, estable y presentable antes de las 17:15.

### Prioridades visuales

- Una acción principal por pantalla.
- Texto grande y legible desde cierta distancia.
- Estados de alerta reconocibles sin depender solo del color.
- Transiciones cortas; ninguna animacion puede frenar la demo.
- Datos y nombres claramente sintéticos.
- Copia en espanol, breve y humana.

### Robustez

- Boton para reiniciar la historia en menos de cinco segundos.
- Datos iniciales deterministas.
- Sin pasos de login.
- Sin dependencia obligatoria de red.
- Sin secretos expuestos en el cliente.
- Manejo visible de errores del proveedor de IA.
- Una ruta manual para avanzar el reloj hasta la mañana.

### Terminado cuando

- Se realizan tres demos consecutivas sin errores.
- La escena estrella tarda menos de dos minutos.
- El flujo completo tarda menos de cuatro minutos.
- El proyecto corre desde un clon limpio siguiendo el README.

---

## Fase 5 - Evidencia, README y pitch

**Objetivo:** convertir un buen prototipo en una candidatura completa.

### README de una página

Debe contener solamente:

1. Problema decidido.
2. Por qué ese problema y no otro.
3. La tesis de SnoozeOps.
4. Como correr el proyecto.
5. Arquitectura minima.
6. Qué se construyó.
7. Qué se dejó fuera a propósito.
8. Seguridad, privacidad y uso de datos sintéticos.

### Pitch de cinco minutos

| Tiempo | Contenido |
|---|---|
| 0:00-0:40 | Rodrigo, su frase y el momento de caída |
| 0:40-1:00 | Insight: no necesita otro tracker; necesita confiar en el relevo |
| 1:00-1:40 | Seleccionar turno y activar la ventana de siete horas |
| 1:40-2:20 | Cerrar guardia y generar el relevo |
| 2:20-3:25 | Demo participativa de los dos incidentes |
| 3:25-4:00 | Simular la mañana y mostrar `+60 min` |
| 4:00-4:35 | Por qué Rodrigo si cambiaria con esto |
| 4:35-5:00 | Seguridad, limites y cierre |

### Frase de apertura

> Rodrigo sabe que deberia dormir. Lo que no sabe es quién vigila cuando el deja de hacerlo.

### Frase de cierre

> No le pedimos a Rodrigo que cuide mejor su sueño mientras sigue cuidando producción. Le damos un relevo en el que puede confiar.

### Terminado cuando

- El pitch dura entre 4:30 y 4:50 sin correr.
- La demo ocupa más tiempo que las laminas.
- Hay una respuesta preparada para cada riesgo principal.

---

## Fase 6 - Entrega y contingencia

**Objetivo:** no perder por un problema operativo.

### Antes del sabado a las 11:30

- Congelar funcionalidades.
- Ejecutar pruebas y build de producción.
- Revisar el repositorio desde cero.
- Confirmar que el README cabe en una página razonable.
- Confirmar historial de commits claro.
- Preparar URL desplegada y ejecución local.

### Antes de las 12:15

- Subir la versión final.
- Verificar el enlace desde otro navegador o telefono.
- Guardar capturas de las pantallas principales.
- Grabar un video corto de respaldo de la demo.
- Verificar que no se incluyeron llaves, datos personales ni archivos temporales.

### Antes de las 12:40

- Hacer la entrega definitiva.
- No agregar nuevas funciones.
- Ensayar preguntas y respuestas.

---

## 6. Cronograma sugerido

### Viernes 23

| Hora | Resultado esperado |
|---|---|
| 09:45-10:15 | Fase 0 cerrada: tesis, flujo y escena estrella |
| 10:15-11:40 | Esqueleto navegable con las primeras tres pantallas |
| 11:40-12:00 | Preparar y presentar Checkpoint 1 |
| 12:00-13:00 | Corregir el rumbo según preguntas del equipo de producto |
| 13:00-14:00 | Almuerzo y anotacion de feedback; no abrir alcance nuevo |
| 14:00-15:30 | Motor de incidentes y simulador |
| 15:30-16:15 | Resultado matinal y métricas |
| 16:15-16:50 | Pulido visual y manejo de errores |
| 16:50-17:15 | Tres ensayos del flujo para Checkpoint 2 |
| 17:15-18:00 | Checkpoint 2 y correcciones de alto impacto |
| 18:00-18:25 | Commit estable, lista de mañana y cierre seguro |

### Sabado 24

| Hora | Resultado esperado |
|---|---|
| 09:00-09:30 | Revalidar build y demo estable |
| 09:30-10:30 | Corregir solo problemas críticos y de comprension |
| 10:30-11:15 | README y repositorio limpio |
| 11:15-11:45 | Despliegue, pruebas en otro dispositivo y respaldo |
| 11:45-12:15 | Congelar código y subir entrega |
| 12:15-12:40 | Ensayar pitch y preguntas |
| 12:40-13:00 | Margen de seguridad; confirmar entrega |

---

## 7. Uso de Codex durante el desarrollo

Trabajar en unidades pequenas y verificables. Para cada tarea:

1. Dar a Codex un objetivo y un criterio de aceptacion concreto.
2. Pedir implementación y pruebas en la misma tarea.
3. Revisar el flujo en navegador antes de iniciar la siguiente función.
4. Hacer un commit pequeno cuando la unidad este estable.
5. Mantener siempre una versión demostrable.

### Orden recomendado de tareas para Codex

1. Inicializar la aplicación y crear la maquina de estados.
2. Construir las primeras tres pantallas con fixtures.
3. Implementar y probar el motor de reglas.
4. Construir el simulador de incidentes.
5. Conectar el clasificador IA con fallback.
6. Construir la pantalla matinal y las métricas.
7. Revisar accesibilidad y experiencia movil.
8. Endurecer el build y preparar despliegue.
9. Redactar el README a partir del producto terminado.

### Plantilla de prompt util

```text
Implementa [unidad pequena] para SnoozeOps.

Contexto del producto:
[dos o tres frases relevantes]

Criterios de aceptacion:
- [comportamiento observable 1]
- [comportamiento observable 2]
- [caso de error]

Restricciones:
- Usa datos sintéticos.
- No agregues autenticación ni backend.
- Mantiene funcionando el modo demo sin red.
- Agrega o actualiza pruebas.
- No cambies componentes fuera de este alcance salvo que sea necesario.

Al terminar, ejecuta las verificaciones pertinentes y resume los archivos modificados.
```

---

## 8. Riesgos y respuestas

| Riesgo | Mitigacion |
|---|---|
| La API de IA falla durante la demo | Fallback determinístico automático y datos precargados |
| El jurado pregunta por WhatsApp | Explicar que el MVP demuestra el mecanismo; una versión empresarial se integraria con canales administrados o sistemas de incidentes |
| La IA clasifica mal un P1 | Reglas duras, umbral de confianza y escalamiento de cualquier caso ambiguo |
| No existe una persona de respaldo | El producto hace visible esa brecha; ningun software puede inventar cobertura. Sin respaldo confirmado no promete sueño protegido |
| Parece otro tracker | Abrir el pitch con la ansiedad de guardia y demostrar una acción antes de dormir |
| No se puede probar una hora real en dos días | Mostrar una hipótesis medible, una línea base sintética y un plan de validación; no afirmar evidencia causal inexistente |
| Se interpreta como producto médico | Presentarlo como coordinación de guardia y cambio de hábito, con derivación profesional y sin diagnósticos |
| Se pierde tiempo en infraestructura | Estado local, fixtures y cero autenticación en el MVP |

---

## 9. Preguntas probables del jurado

### ¿Por qué Rodrigo usaria esto si abandono su reloj?

Porque el reloj solo le mostraba el problema después de ocurrir. SnoozeOps actua antes de dormir y resuelve la causa que le impide desconectarse.

### ¿Como evitan silenciar una alerta crítica?

La IA no tiene la última palabra. Hay reglas operacionales, umbral de confianza y escalamiento automático de todo caso ambiguo. El sistema falla hacia la seguridad.

### ¿Por qué no integrar WhatsApp ahora?

Porque la prueba de valor es el mecanismo de relevo y escalamiento. Una integración apresurada agregaría riesgo técnico y de privacidad sin demostrar mejor el cambio de hábito.

### ¿Qué ocurre si no hay respaldo?

SnoozeOps no activa una promesa falsa. Muestra que la cobertura no está confirmada y ayuda a resolverla antes de acostarse.

### ¿Como saben que dormira una hora más?

En el evento demostramos que se reserva una hora adicional y que las alertas siguen rutas explícitas de seguridad. No afirmamos haber eliminado interrupciones ni haber medido sueño real. Una validación posterior compararía minutos dormidos contra la línea base por tipo de turno, junto con activación del relevo e interrupciones observadas.

### ¿Dónde está la inteligencia artificial?

Resume el estado de la guardia, propone severidad y explica el enrutamiento de incidentes en lenguaje natural. El diseño mantiene controles deterministas para decisiones de seguridad.

---

## 10. Definition of Done final

El proyecto está listo para competir solo si:

- [ ] El flujo completo se puede demostrar en menos de cuatro minutos.
- [ ] El pitch completo dura menos de cinco minutos.
- [ ] Dos incidentes toman rutas diferentes y comprensibles.
- [ ] La demo funciona sin depender de internet.
- [ ] Hay una salida segura para alertas ambiguas.
- [ ] La pantalla final muestra claramente `+60 min`.
- [ ] Se usan exclusivamente datos sintéticos.
- [ ] No hay diagnosticos ni promesas medicas.
- [ ] El README explica problema, decisión y exclusiones.
- [ ] El repositorio no contiene secretos ni archivos temporales.
- [ ] El build de producción pasa.
- [ ] La URL desplegada funciona desde otro dispositivo.
- [ ] Existe respaldo local y video corto de la demo.
- [ ] La entrega se hizo antes de las 13:00 del sabado.

## Regla final

**Despues del Checkpoint 2 no se agregan funciones que no mejoren directamente la demo, la estabilidad o una respuesta al jurado.**
