# SnoozeOps — Diseño exploratorio: confianza visible, decisiones explicables e IA responsable

**Estado:** insumo de diseño, no fase secuencial ni compromiso de implementación. Después del Checkpoint 2, el orden canónico de evolución está en [`ROADMAP_POST_CHECKPOINT_2.md`](ROADMAP_POST_CHECKPOINT_2.md). Este documento aporta soluciones candidatas para el Track 2 (superficie de confianza) y Track 4 (copiloto responsable), sujetas a sus puertas de evidencia.

## 1. Propósito

Elevar la convicción de uso sin transformar SnoozeOps en un segundo sistema de tickets ni introducir una integración de IA apresurada. Esta fase hace visibles tres respuestas que Rodrigo y el jurado necesitan antes de confiar en una ventana protegida:

1. **¿La guardia está realmente cubierta, de manera completa, parcial o no disponible?**
2. **¿Por qué una alerta siguió esa ruta y quién es responsable ahora?**
3. **¿Cómo podría usar IA el producto sin permitir que una IA silencie una alerta crítica?**

La tesis se mantiene intacta: Rodrigo no necesita más información sobre su sueño; necesita una condición verificable para dejar de vigilar la operación antes de dormir. Estas propuestas harían esa condición más clara, auditable y creíble si la investigación y el piloto las priorizan.

> **Resultado esperado:** en menos de cinco segundos, Rodrigo puede responder “quién cubre, hasta cuándo, qué puede despertarme y por qué”. El jurado puede ver que la IA fue pensada como asistencia revisable, no como una caja negra con autoridad operacional.

## 2. Guardrails de producto

Estas restricciones son obligatorias. Previenen que las mejoras visuales cambien el contrato de seguridad u oculten el alcance real del MVP.

| Principio | Regla de implementación |
| --- | --- |
| La cobertura no se inventa | Sólo existe `Cobertura completa` cuando Andrea aceptó el relevo y Rodrigo activó `Sueño protegido` para esa ventana. |
| Sin relevo no hay falsa seguridad | Si Andrea rechaza o todavía no ha aceptado, se debe hablar de cobertura no disponible o pendiente; nunca de protección completa. El MVP no modela vencimiento/timeout de la solicitud de relevo: `pending` permanece pendiente hasta una respuesta simulada. |
| Explicar no es re-clasificar | La tarjeta de decisión muestra los datos y la regla que el motor determinístico ya usó. No modifica la severidad, el destinatario ni los tiempos. |
| La ambigüedad se trata con cautela | Severidad `Unknown`, confianza baja o impacto creciente nunca reducen una alerta; la ruta es conservadora. |
| IA separada del motor actual | Esta versión sigue siendo un motor local y determinístico. La sección de IA es una **visión de próxima iteración**, no una API, modelo ni automatización activa. |
| Humano con autoridad | En cualquier integración futura, la IA puede resumir o proponer; las reglas de seguridad y la confirmación humana conservan la autoridad sobre el enrutamiento. |
| Honestidad de medición | Nada de esta fase convierte los `+60 min reservados para descansar` en sueño real medido o en interrupciones evitadas. |
| Demo predecible | No se agregan llamadas de red, credenciales, temporizadores reales, chat libre ni dependencias que degraden el flujo de cinco minutos. |

## 3. Decisiones cerradas

| Tema | Decisión |
| --- | --- |
| Cobertura | Se deriva del estado existente de relevo y activación. No se persiste un segundo estado de “cobertura”, por lo que no puede desincronizarse. |
| Estados de cobertura | `No disponible`, `Pendiente de confirmación` y `Completa`. `Guardia filtrada` es un modo operativo, no un estado de cobertura. |
| Responsable del estado | El reducer continúa siendo la única fuente de verdad de `handoffStatus` y `activationMode`; un selector puro calcula el estado visual. |
| Dónde se ve | Una tarjeta compacta aparece en Plan y Cerrar guardia; una versión prominente aparece en Sueño protegido / Guardia filtrada. En Mañana se muestra el estado con el que terminó la ventana, sólo como contexto histórico de la demo. |
| Decisión de incidentes | El simulador usa una tarjeta estructurada: severidad, señales operacionales, regla determinística, destinatario, condición siguiente y estado de confirmación. |
| Señales | Se agregan señales sintéticas y versionadas a los fixtures de P3/P1. Son datos de escenario de demo, no evidencia obtenida desde una integración real. |
| Confianza | Se etiqueta como `Confianza de clasificación`, no como “confianza de IA”. En el MVP describe la certeza entregada por el fixture / clasificación determinística. |
| Vista IA | Se agrega un bloque expansible `Próxima iteración · IA con revisión humana` en Cerrar guardia. No llama a un modelo, no permite escribir prompts y no altera el resumen existente. |
| Pitch | La IA no entra en el recorrido principal. Se muestra sólo si el jurado pregunta “¿dónde está la IA?” o “¿cómo escala?”. |
| Persistencia | No se guarda información nueva salvo que sea estrictamente necesario para un control de UI. La cobertura se recalcula al hidratar y el bloque IA inicia cerrado después de un Hard Reset. |

## 4. Resultado demostrable

Al terminar la fase, el producto permite demostrar estos tres casos sin explicación adicional:

1. **Cobertura completa:** Andrea acepta, Rodrigo activa `Sueño protegido` y la pantalla declara: `Cobertura completa · Andrea cubre hasta las 06:30`. La única condición que puede alertar a Rodrigo es un caso crítico, ambiguo o sin confirmación según la ruta conservadora.
2. **Cobertura incompleta:** Andrea rechaza, o la solicitud sigue pendiente y Rodrigo elige `Guardia filtrada`. La pantalla declara: `Cobertura no disponible · Guardia filtrada activa`. No promete una noche sin alertas; los casos críticos o ambiguos llegan a Rodrigo. No se simula un timeout de la solicitud de relevo en esta fase.
3. **Decisión verificable:** al inyectar P3 o P1, cualquier persona puede leer qué señales se usaron, qué regla determinística se aplicó, quién debe actuar y qué ocurre si Andrea no confirma.

Y, fuera del recorrido principal, el jurado puede abrir una propuesta honesta de evolución:

> “En una siguiente iteración, la IA resumirá pendientes, detectará información faltante y propondrá una severidad explicable. No tendrá autoridad única para silenciar ni decidir el destino final de una alerta.”

## 5. Alcance

### Incluido

- Un selector de dominio puro para derivar la cobertura desde el estado actual.
- Componente reutilizable de tarjeta de cobertura, con versiones compacta, prominente e histórica.
- Copy y CTA específicos para cobertura pendiente, completa y no disponible.
- Datos sintéticos de `signals` para los incidentes de la demo.
- Refactor de `IncidentCard` a una tarjeta de decisión con estructura estable y accesible.
- Bloque expansible de visión de IA responsable, explícitamente rotulado como futuro.
- Pruebas unitarias de los selectores, reducer existente, componentes y recorridos manuales definidos más abajo.
- Ajustes de README, pitch y Q&A sólo después de que la UI exista y haya sido validada.

### Fuera de alcance explícitamente

- LLM, API de IA, claves, backend, streaming, embeddings, RAG, agentes, prompts libres o llamadas de red.
- Clasificación nueva, cambio de severidad, cambio de timeout o modificación del motor `evaluateIncident`.
- Integraciones reales con PagerDuty, Jira, Slack, Teams, WhatsApp o correo.
- Métricas de desempeño de Andrea, ranking entre personas o vigilancia de tiempos individuales.
- Datos personales, historiales laborales o datos de salud reales.
- Notificaciones push, autenticación, roles, sincronización multiusuario o persistencia entre dispositivos.
- Nueva pantalla de onboarding o flujos que obliguen a recorrer más pasos antes de activar la demo.

## 6. Diseño 1 — Cobertura verificable

### 6.1 Modelo de dominio derivado

No agregar `coverage` a `DemoState`. El estado es una consecuencia de información ya existente y almacenar ambas cosas produciría estados imposibles, por ejemplo “cobertura completa” con Andrea rechazada.

Agregar en `src/domain/coverage.ts`:

```ts
export type CoverageLevel = "unavailable" | "pending" | "complete";

export type CoverageSummary = {
  level: CoverageLevel;
  label: string;
  title: string;
  detail: string;
  owner: "Andrea" | "Rodrigo" | null;
  until: string | null;
  operationalMode: "protected" | "filtered" | "not_active";
  interruptionRule: string;
  nextAction: string;
};

export function getCoverageSummary(state: DemoState, shift: ShiftPlan): CoverageSummary;
```

El selector debe ser puro: no despacha acciones, no lee `localStorage`, no usa fecha/hora del navegador y no muta el estado recibido.

### 6.2 Tabla de decisión completa

| `handoffStatus` | `activationMode` | Nivel | Estado mostrado | Dueño de críticos / ambiguos | Copy principal | CTA principal |
| --- | --- | --- | --- | --- | --- | --- |
| `not_requested` | `none` | `unavailable` | `Cobertura no disponible` | Rodrigo | `Aún no hay una persona que haya aceptado cubrir esta ventana.` | `Solicitar relevo a Andrea` |
| `pending` | `none` | `pending` | `Cobertura pendiente de confirmación` | Rodrigo hasta aceptación | `Andrea recibió la solicitud; la cobertura aún no está confirmada.` | `Responder como Andrea` en demo; en producto real sería esperar o elegir otro relevo. |
| `accepted` | `none` | `pending` | `Relevo aceptado · activación pendiente` | Rodrigo hasta activar | `Andrea aceptó cubrir. Activa Sueño protegido para iniciar esta ventana.` | `Activar sueño protegido` |
| `accepted` | `protected` | `complete` | `Cobertura completa` | Andrea primero; Rodrigo sólo bajo regla conservadora | `Andrea cubre hasta las {endsAt}. Los casos menores esperan; críticos, ambiguos o sin confirmación siguen una ruta de escalamiento.` | `Ver actividad` |
| `declined` | `none` | `unavailable` | `Cobertura no disponible` | Rodrigo | `Andrea no puede cubrir esta ventana. No activaremos una promesa de protección incompleta.` | `Activar guardia filtrada` o `Volver a solicitar relevo` |
| `pending` | `filtered` | `unavailable` | `Guardia filtrada · cobertura no confirmada` | Rodrigo | `No hay cobertura aceptada. Las alertas menores se agrupan; las críticas o ambiguas llegan a Rodrigo.` | `Ver actividad` |
| `declined` | `filtered` | `unavailable` | `Guardia filtrada · sin relevo` | Rodrigo | `Esta ventana no tiene respaldo aceptado. La ruta conservadora se mantiene activa.` | `Ver actividad` |

Reglas de texto:

- Nunca escribir `100% cubierto`, `garantizado`, `sin riesgo`, `todo está controlado` ni `no serás despertado`.
- En cobertura completa, nombrar siempre a Andrea, la hora de término y la condición de escalamiento.
- En cobertura no disponible, evitar tono de fracaso. El objetivo es dar información para elegir `Guardia filtrada`, no avergonzar a Rodrigo ni a Andrea.
- No usar “Andrea no respondió” mientras el estado sea `pending`; todavía no existe un vencimiento de aceptación real en el MVP.

### 6.3 Ubicación por pantalla

| Pantalla | Variante | Objetivo | Contenido obligatorio |
| --- | --- | --- | --- |
| Plan de esta noche | Compacta | Anticipar la condición que falta para proteger la ventana. | Etiqueta, responsable si existe, copy corto y siguiente acción. |
| Cerrar guardia | Estándar | Hacer visible el contrato de relevo antes del CTA de activación. | Nivel, responsable, hasta cuándo, regla de interrupción y CTA contextual. |
| Sueño protegido | Prominente | Reemplazar incertidumbre por una prueba simple de cobertura. | `Cobertura completa`, Andrea, hora, condición de despertar, icono + texto. |
| Guardia filtrada | Prominente de riesgo controlado | Declarar honestamente que no existe respaldo aceptado. | `Cobertura no disponible`, Rodrigo recibe críticos/ambiguos, alertas menores se agrupan. |
| Mañana | Histórica y no interactiva | Recordar bajo qué modo se presentó el resultado. | `Ventana demostrada con cobertura completa` o `Ventana demostrada con guardia filtrada`; no inferir sueño real. |

La tarjeta prominente en `Sueño protegido` reemplaza la frase genérica “Andrea está de relevo”; no debe duplicarla debajo. La información crítica se concentra una vez, con mejor jerarquía.

### 6.4 Estructura visual y accesibilidad

Crear `src/components/coverage-card.tsx` con la semántica:

```tsx
<section aria-labelledby="coverage-title" className="coverage-card coverage-card--complete">
  <div className="coverage-card__header">
    <span aria-hidden="true">✓</span>
    <p>Estado de cobertura</p>
  </div>
  <h2 id="coverage-title">Cobertura completa</h2>
  <p>Andrea cubre hasta las 06:30.</p>
  <p><strong>Solo una alerta crítica, ambigua o sin confirmación se escala a Rodrigo.</strong></p>
</section>
```

- No depende sólo de verde/ámbar/rojo: combina icono, encabezado y texto completo.
- `h2` sólo se usa en la variante prominente; las variantes compacta e histórica usan la jerarquía adecuada para no saltar niveles de encabezado.
- El estado no requiere `aria-live`: cambia como consecuencia de una acción que el usuario acaba de ejecutar. Si se usa una región viva en el futuro, será `polite` y sólo en el texto de cambio, no en toda la tarjeta.
- Tamaño mínimo: estado y responsable a `16px`; estado prominente a `20px` o más. Contraste suficiente contra el fondo nocturno.
- El componente no contiene lógica de negocio ni decide CTA. Recibe `summary` y, si corresponde, `children` o una acción declarada por el padre.

## 7. Diseño 2 — Decisiones de incidentes explicables

### 7.1 Objetivo de la tarjeta de decisión

La tarjeta no pretende explicar “cómo piensa una IA”. Explica de forma verificable cómo **el motor local determinístico** tomó una decisión. Esto elimina la sensación de que un P3 “desapareció” y permite al jurado auditar la ruta de un P1.

Nombre recomendado del componente visible: **`Decisión de enrutamiento`**. No usar “Diagnóstico”, “predicción”, “modelo” ni “veredicto de IA”.

### 7.2 Datos de incidente

Extender el tipo `Incident` con datos sintéticos de evidencia operacional:

```ts
export type IncidentSignal = {
  label: string;
  value: string;
};

export type Incident = {
  // propiedades actuales
  signals: IncidentSignal[];
};
```

Fixtures mínimos y congelados:

| Escenario | Señales sintéticas visibles | Severidad / confianza / impacto |
| --- | --- | --- |
| Cambio de contraseña | `Tipo: solicitud de acceso`; `Entorno: soporte de usuario`; `Impacto: estable` | `P3` / alta / estable |
| Base de datos de producción sin responder | `Servicio: base de datos de producción`; `Disponibilidad: sin respuesta`; `Impacto: creciendo` | `P1` / alta / creciendo |
| Caso ambiguo, sólo si ya existe fixture de prueba | `Severidad reportada: no confirmada`; `Impacto: por verificar` | `Unknown` o confianza baja / impacto según fixture |

No crear una tercera escena visible si no cabe limpiamente en el pitch. El caso ambiguo puede seguir cubierto por pruebas unitarias. No usar porcentajes de confianza que simulen una probabilidad real de un modelo.

### 7.3 Orden visual obligatorio

La tarjeta de incidente, dentro del simulador, muestra siempre estos bloques y en este orden:

1. **Identidad:** etiqueta P1/P2/P3 o `Ambiguo`, título y escenario (`Noche habitual` o `Prueba de seguridad sintética`).
2. **Señales consideradas:** lista de 2–3 pares `label: value`; no esconderla detrás de un tooltip.
3. **Clasificación de entrada:** `Severidad reportada`, `Confianza de clasificación` e `Impacto`.
4. **Regla aplicada:** texto actual del motor, precedido por `Regla determinística aplicada`.
5. **Decisión:** quién recibe primero la alerta o cuándo queda disponible para revisión.
6. **Estado y siguiente condición:** por ejemplo, `Esperando confirmación de Andrea · si no confirma en el plazo simulado, se escala a Rodrigo`.

La prioridad tipográfica corresponde a la decisión actual, no a las señales. Para el P1 el texto más dominante debe seguir siendo el estado de escalamiento; para el P3, `Pendiente de revisión a las 06:30`.

### 7.4 Mapeo de reglas a lenguaje de interfaz

| Situación de dominio | Regla que debe verse | Decisión visible | Copy de condición siguiente |
| --- | --- | --- | --- |
| P2/P3 estable con relevo | `P2/P3 estable: puede agruparse hasta el cierre de la ventana.` | `Agrupado para revisión al cierre` | `Disponible para Rodrigo a las {reviewAt}. No está resuelto ni marcado como leído.` |
| P1 con relevo aceptado | `P1: se escala como incidente crítico.` | `Enviado primero a Andrea` | `Andrea debe confirmar. El atajo de demo simula el plazo de 60 segundos.` |
| P1 sin relevo aceptado | `P1: se escala como incidente crítico. Sin relevo aceptado, Rodrigo recibe la alerta directamente.` | `Alerta enviada a Rodrigo` | `No había cobertura aceptada para esta ventana.` |
| `Unknown` o confianza baja | `Caso ambiguo o de baja confianza: se escala de forma conservadora.` | `Alerta enviada a Andrea` o `Rodrigo`, según cobertura | `La ambigüedad no se agrupa ni se silencia.` |
| P2/P3 con impacto creciente | `Impacto creciente: se trata como incidente crítico.` | Ruta crítica según cobertura | `La tendencia de impacto impide agrupar la alerta.` |
| P1 confirmado por Andrea | Regla original, sin re-evaluación | `Andrea confirmó y asume el incidente` | `Rodrigo no recibe alerta por esta prueba sintética.` |
| P1 sin respuesta | Regla original, sin re-evaluación | `Alerta enviada a Rodrigo` | `El vencimiento fue simulado; no se esperaron 60 segundos reales.` |

### 7.5 Separación de escenarios

La nueva tarjeta debe reforzar, no erosionar, el aislamiento existente:

- Todo incidente de `night_simulation` se etiqueta `Noche habitual · escenario sintético` y sólo alimenta `nightHistory` y Mañana.
- Todo incidente de `security_test` se etiqueta `Prueba de seguridad · escenario sintético` y sólo alimenta `securityTest`.
- P1 jamás modifica el texto “Sin alertas en el escenario habitual” ni suma una interrupción a la mañana.
- La tarjeta debe mantener visible esta diferencia aun cuando ambas se vean simultáneamente en el Bottom Sheet.

## 8. Diseño 3 — Visión de IA responsable

### 8.1 Propósito de la vista

El valor de esta vista no es aparentar que existe IA productiva. Es probar que el equipo entendió dónde una IA aporta valor, dónde no debe intervenir y cómo se desplegaría de manera segura.

Ubicación: al final de `Cerrar guardia`, antes del CTA final de activación. Debe iniciar cerrada para preservar la rapidez de la demo.

Control:

```text
[ ✦ Ver cómo podría ayudar la IA, con revisión humana ]
```

Al expandirse, el encabezado inequívoco es:

```text
Próxima iteración · IA con revisión humana
Esta función no está activa en este MVP y no toma decisiones de enrutamiento.
```

No usar logos de proveedores ni nombres de modelos. No presentar outputs fabricados como si provinieran de un LLM.

### 8.2 Tres capacidades y sus límites

| Capacidad futura | Insumo | Salida propuesta | Revisión humana | Límite de seguridad |
| --- | --- | --- | --- | --- |
| Resumen de relevo | Tickets, cambios y notas autorizadas | Borrador con situación, impacto, responsable y siguiente acción | Rodrigo aprueba, corrige o descarta antes de entregar | No envía mensajes ni cambia tickets por cuenta propia. |
| Información faltante | Datos del ticket y runbook autorizado | Preguntas como “falta entorno afectado” o “no se informó impacto” | Rodrigo decide completar o continuar con ruta conservadora | La ausencia de datos aumenta cautela; no baja severidad. |
| Severidad explicable | Señales operacionales autorizadas | Propuesta de severidad, razones y nivel de confianza | Reglas duras y persona autorizada validan el destino | Nunca es autoridad única para agrupar, silenciar o cerrar una alerta. |

La vista debe incluir un bloque visual fijo:

> **Regla no negociable:** si la propuesta es ambigua, de baja confianza o contradice una regla crítica, SnoozeOps escala de forma conservadora.

### 8.3 Arquitectura futura, no implementada

Documentar el contrato objetivo, pero no crear un proveedor incompleto dentro del MVP:

```text
Datos operacionales autorizados
             │
             ▼
Asistente IA (resumen / propuesta / preguntas)
             │
             ▼
Salida explicable + confianza + evidencia
             │
     ┌───────┴────────┐
     ▼                ▼
Reglas duras      Revisión humana
     │                │
     └───────┬────────┘
             ▼
Motor de enrutamiento determinístico
```

Principios para una Fase posterior de integración:

- Ejecutar primero en **modo sombra**: registrar propuesta y decisión humana sin permitir automatización.
- Evaluar falsos negativos críticos, sobre-escalamiento, tiempo de revisión y entendimiento del operador; no sólo exactitud agregada.
- Usar minimización de datos, permisos por fuente, retención limitada y trazabilidad de cada sugerencia.
- Conservar una ruta local determinística cuando la IA, la red o un proveedor externo no estén disponibles.
- No entrenar ni reutilizar conversaciones, tickets o datos de salud sin una política explícita y consentimiento válido.

### 8.4 Accesibilidad y comportamiento del expansible

- Implementar con `<button aria-expanded aria-controls>` y una región identificable; no con un `div` clickeable.
- El foco permanece en el botón al abrir/cerrar; no hacer scroll automático ni mover la pantalla.
- Contenido legible sin hover ni tooltip; todos los límites de seguridad están en texto plano.
- No se persiste la apertura. Tras recarga o Hard Reset empieza cerrado.
- El expansible no altera `DemoState`, `handoffStatus`, resumen de relevo ni habilitación del CTA principal. Puede ser estado local de `HandoffScreen` o un componente aislado.

## 9. Estructura de archivos y responsabilidades

```text
src/
  components/
    coverage-card.tsx             # Nuevo: representación accesible de CoverageSummary
    incident-card.tsx             # Actualizar: tarjeta de decisión con señales y bloques ordenados
    ai-roadmap-disclosure.tsx     # Nuevo: expansible de visión futura, sin llamadas externas
    demo-app.tsx                  # Actualizar: ubicar CoverageCard y AI roadmap; retirar copy duplicado
  data/
    fixtures.ts                   # Actualizar: señales sintéticas congeladas de P3 y P1
  domain/
    coverage.ts                   # Nuevo: CoverageLevel, CoverageSummary y selector puro
    coverage.test.ts              # Nuevo: tabla de verdad de cobertura
    types.ts                      # Actualizar: IncidentSignal y signals en Incident
    incident-engine.ts            # Sin cambio de reglas; sólo revisar que el contrato nuevo no la altere
    incident-engine.test.ts       # Actualizar constructores/fixtures por signals
    demo-reducer.test.ts          # Actualizar fixtures y verificar no regresión de estados
  app/
    globals.css                   # Nuevo estilo de tarjetas sin transiciones ni color como única señal
```

Responsabilidades que no se deben mezclar:

| Unidad | Hace | No hace |
| --- | --- | --- |
| `coverage.ts` | Deriva el estado de cobertura y copy desde estado + turno. | Cambiar el reducer, persistir, decidir incidentes o renderizar JSX. |
| `coverage-card.tsx` | Presenta un `CoverageSummary` accesible. | Inferir cobertura por su cuenta ni despachar acciones de negocio. |
| `incident-card.tsx` | Presenta señales, regla, decisión y siguiente condición. | Clasificar incidentes o mutar decisiones. |
| `ai-roadmap-disclosure.tsx` | Explica la futura IA responsable. | Llamar APIs, generar resultados o afirmar capacidad activa. |
| `demo-app.tsx` | Compone las pantallas y entrega callbacks existentes. | Duplicar reglas de cobertura o enrutamiento. |

## 10. Orden de implementación

1. **Congelar la base:** ejecutar `npm run lint`, `npm run typecheck`, `npm test` y `npm run build`. Si algo falla antes de probar cualquiera de estas propuestas, corregirlo antes de abrir una rama post-MVP.
2. **Modelo puro de cobertura:** implementar `coverage.ts` y su matriz de pruebas. No tocar UI hasta que todos los casos de la tabla de decisión pasen.
3. **Datos explícitos:** agregar `IncidentSignal` y completar todos los factories de test y fixtures. El compilador debe ayudar a localizar objetos `Incident` sin señales.
4. **Tarjeta de cobertura:** crear el componente en aislamiento, luego instalar variante compacta en Plan y estándar en Cerrar guardia.
5. **Pantalla de activación:** reemplazar el copy duplicado por la variante prominente. Verificar ambos caminos: protegido y filtrado.
6. **Decisión explicable:** actualizar `IncidentCard` sin modificar `incident-engine.ts`. Comparar los snapshots/expectativas de estado antes y después.
7. **Visión IA:** implementar el expansible aislado, cerrado por defecto, y validar que no interfiere con el CTA de aceptar, rechazar o activar.
8. **Estilos y accesibilidad:** revisar a 320 px y 544 px; teclado, foco, contraste y jerarquía. No añadir animaciones.
9. **Pruebas finales:** correr toda la suite, build y recorridos manuales. Sólo entonces actualizar documentación de pitch si el contenido entregado coincide con lo diseñado.

## 11. Pruebas automatizadas requeridas

### 11.1 `coverage.test.ts`

Probar, como mínimo:

- `not_requested + none` produce `unavailable`, dueño `Rodrigo`, sin hora de cobertura.
- `pending + none` produce `pending`, sin declarar protección completa.
- `accepted + none` mantiene activación pendiente, no cobertura completa.
- `accepted + protected` produce `complete`, dueño inicial `Andrea`, hora `shift.endsAt` y regla de escalamiento visible.
- `declined + none`, `pending + filtered` y `declined + filtered` producen `unavailable` y nunca mencionan a Andrea como cobertura activa.
- Día y Noche usan correctamente `06:30` y `14:30` como término de su plan correspondiente.
- El selector no muta `DemoState` ni `ShiftPlan` recibidos.

### 11.2 Dominio y reducer existentes

- Todas las pruebas se actualizan con `signals` sin alterar el resultado esperado de P1/P3.
- Un P3 de noche sigue en `nightHistory`; un P1 de prueba sigue sólo en `securityTest`.
- `toggle_network_mock` sigue sin modificar ninguna decisión de incidente.
- Hard Reset elimina los historiales, modo offline y cualquier estado visible de UI persistido; la tarjeta resultante vuelve a `Cobertura no disponible`.
- `simulate_morning` no cambia la cobertura derivada de la ventana que acaba de ocurrir ni mezcla P1 con el resumen habitual.

### 11.3 Componentes

Si el proyecto ya tiene un runner de componentes, agregar pruebas para:

- `CoverageCard` muestra icono, texto, dueño y condición de escalamiento para `complete`.
- En `unavailable`, no aparece la frase `Cobertura completa` ni una promesa de que Rodrigo no será alertado.
- `IncidentCard` presenta las señales y `Regla determinística aplicada` antes de la decisión / siguiente condición.
- `AiRoadmapDisclosure` parte con `aria-expanded="false"`, se abre con teclado y muestra el rótulo de función futura y la regla no negociable.

Si no hay infraestructura de pruebas de componentes, no agregar una dependencia sólo para esta fase. Cubrir el dominio automáticamente y dejar las verificaciones de UI en el recorrido manual.

## 12. Recorridos de validación manual

Todos comienzan desde Hard Reset. Ejecutar en 320 px y 544 px, y una vez con navegación por teclado.

| Recorrido | Pasos | Resultado que se debe observar |
| --- | --- | --- |
| 1. Cobertura completa | Día → solicitar → Andrea acepta → activar sueño protegido | La tarjeta dice `Cobertura completa`; nombra a Andrea, `06:30` y la condición conservadora. No hay promesa de cero alertas. |
| 2. Cobertura no disponible | Día → solicitar → Andrea rechaza → activar guardia filtrada | La tarjeta no simula respaldo. Declara que críticos o ambiguos llegan a Rodrigo y que los menores se agrupan. |
| 3. P3 explicado | Recorrido 1 → abrir actividad → inyectar cambio de contraseña | Se ven señales, clasificación, regla determinística, `Revisión al cierre` y hora. Mañana lo muestra pendiente, no resuelto. |
| 4. P1 con confirmación | Recorrido 1 → abrir actividad → inyectar P1 → confirmar Andrea | Se ven señales de producción, regla P1, Andrea como primera destinataria y estado final de confirmación. El P1 no afecta el resumen habitual. |
| 5. P1 sin confirmación | Recorrido 1 → abrir actividad → inyectar P1 → simular no respuesta | Se ve el escalamiento a Rodrigo y la aclaración de que el vencimiento es simulado. |
| 6. IA honesta | Llegar a Cerrar guardia → abrir/cerrar `IA con revisión humana` | El contenido dice que no está activo en el MVP, enumera tres capacidades y declara que no puede silenciar alertas. No cambia ningún CTA ni estado. |
| 7. Reset | Abrir IA, cambiar relevo, abrir actividad y activar red simulada → Hard Reset | Pantalla 1; IA cerrada; estado de cobertura inicial; panel cerrado; red simulada desactivada; sin decisiones previas. |

## 13. Ajuste de guion y Q&A después de implementar

No cambiar `PITCH.md` ni `QA.md` antes de tener una versión estable. Cuando la fase esté completa, incorporar sólo estas referencias:

- En el tramo de activación: “No sólo dice que Andrea está de relevo: muestra cobertura, plazo y condición de escalamiento.”
- Durante P3/P1: “Cada ruta expone las señales y la regla determinística aplicada; nada se oculta ni depende de una caja negra.”
- Si preguntan por IA: abrir el expansible y responder: “No afirmamos IA activa. Diseñamos el lugar donde aporta —resumen, datos faltantes y propuesta explicable— y el límite: no puede silenciar alertas ni reemplazar la regla conservadora.”

Evitar expresiones como “la IA decide”, “IA que detecta incidentes”, “IA offline”, “precisión del modelo” o “automatización autónoma”, porque ninguna corresponde al MVP entregado.

## 14. Criterios de aceptación si estas propuestas se seleccionan

### Cobertura verificable

- [ ] `CoverageSummary` se deriva exclusivamente desde el estado actual y el turno; no existe un estado persistido duplicado de cobertura.
- [ ] La tabla completa de combinaciones de relevo y activación tiene pruebas unitarias.
- [ ] `Cobertura completa` sólo aparece con relevo aceptado y `Sueño protegido` activo.
- [ ] Toda cobertura completa muestra responsable, hora límite y condición de escalamiento en texto visible.
- [ ] `Guardia filtrada` comunica cobertura no disponible sin tono de culpa ni promesa de protección completa.
- [ ] Hard Reset vuelve a la variante inicial de cobertura y no deja texto/historial heredado.

### Decisiones explicables

- [ ] Cada fixture de incidente usado por la demo incluye señales sintéticas explícitas.
- [ ] La tarjeta presenta identidad, señales, clasificación, regla, decisión y siguiente condición en ese orden.
- [ ] La UI llama al mecanismo actual `motor local determinístico` / `regla determinística`; no lo presenta como IA.
- [ ] P3 y P1 siguen aislados en sus escenarios; la prueba P1 no altera Mañana.
- [ ] Casos ambiguos, de baja confianza o impacto creciente continúan escalando de forma conservadora.
- [ ] No se modifican las reglas, timeout ni resultados de `incident-engine.ts` como efecto de esta fase.

### Visión de IA responsable

- [ ] Existe un expansible accesible, cerrado por defecto, rotulado como `Próxima iteración` y `no activa en este MVP`.
- [ ] Explica resumen de relevo, detección de información faltante y propuesta de severidad explicable.
- [ ] Declara claramente aprobación humana, reglas duras y escalamiento conservador como límites obligatorios.
- [ ] No hay API, token, credencial, llamada de red, output fabricado ni copy que sugiera IA activa.
- [ ] Abrir/cerrar la vista no modifica el flujo ni el estado de la demo, y Hard Reset la devuelve cerrada.

### Calidad y demo

- [ ] `npm run lint`, `npm run typecheck`, `npm test` y `npm run build` pasan tras la implementación.
- [ ] La interfaz funciona a 320 px y 544 px sin recortes, superposición o pérdida de CTA.
- [ ] Todos los estados decisivos combinan texto, icono y color; ningún estado se distingue únicamente por color.
- [ ] Los siete recorridos manuales se completan tres veces desde Hard Reset sin arrastre de estado.
- [ ] El recorrido principal de pitch sigue durando 4:45 o menos y la IA sólo aparece bajo pregunta o durante Q&A.

## 15. Regla de corte

Si una parte de esta fase obliga a cambiar el motor de incidentes, requiere red, reduce la claridad del flujo principal o pone en riesgo la estabilidad de la demo, se detiene y queda documentada como Fase posterior. La prioridad es que la confianza sea más visible, no que el prototipo parezca más complejo.
