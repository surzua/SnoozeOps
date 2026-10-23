# SnoozeOps — Fase 1: esqueleto navegable

> Estado: **decisiones confirmadas; listo para implementar**.

## Decisiones confirmadas

- El alcance funcional de Fase 1 incluye únicamente los turnos **Día** y **Noche**. El turno `Tarde`, mencionado en una versión inicial del roadmap, no forma parte de esta fase porque no fue definido en Fase 0 ni es necesario para probar la propuesta de valor.
- La aceptación del relevo se representa con la **opción A: simulador integrado de Andrea**. Es una acción de demo controlada y claramente rotulada; no hay segunda pestaña ni sincronización entre ventanas en esta fase.
- La inicialización de Next.js y las herramientas de calidad se entregan en un **commit técnico independiente**. El flujo navegable comienza en un commit posterior.
- La implementación se realizará desde Antigravity IDE. Este repositorio conserva la especificación y no requiere configuración local adicional en esta sesión.

## 1. Propósito

Construir una demo local, móvil y navegable que haga visible la promesa de SnoozeOps antes de incorporar el motor de incidentes: Rodrigo puede preparar una ventana de descanso una hora más larga porque existe un relevo verificable.

Esta fase cubre solo el trayecto:

```text
Próximo turno → Plan de esta noche → Cerrar guardia → relevo aceptado → Activar sueño protegido
```

No implementa todavía el enrutamiento de incidentes, IA, notificaciones ni la pantalla de la mañana. La activación puede llevar a una vista temporal de confirmación; la pantalla completa de **Sueño protegido** queda para la siguiente fase.

## 2. Resultado demostrable

Al terminar, una persona debería poder abrir la aplicación y, sin explicación adicional:

1. Ver que Rodrigo tiene la oportunidad de proteger **+60 min**.
2. Elegir `Día` o `Noche` y ver que se actualizan los horarios relevantes.
3. Entender su ventana propuesta, el último café sugerido y quién cubrirá el relevo.
4. Revisar tres pendientes sintéticos y el resumen que recibirá Andrea.
5. Simular o abrir la aceptación de Andrea y comprobar que el CTA principal solo se habilita después de esa aceptación.
6. Activar el estado de sueño protegido y reiniciar la demo en pocos segundos.

La demo deberá funcionar sin conexión, sin cuenta, sin credenciales y sin API externa.

## 3. Alcance cerrado

### Incluido

- Inicialización de Next.js con TypeScript y Tailwind CSS.
- Diseño mobile-first, usable en escritorio para el pitch.
- Layout y navegación local para las tres pantallas de Rodrigo:
  - `Próximo turno`
  - `Plan de esta noche`
  - `Cerrar guardia`
- Fixture tipado y versionado de Rodrigo, Andrea, turnos y tickets.
- Cálculo determinista de la propuesta por turno.
- Resumen de relevo predeterminado (sin IA).
- Estado del relevo: pendiente, aceptado o rechazado.
- Acción de demo para aceptar/rechazar como Andrea.
- CTA de activación bloqueado sin una aceptación válida.
- Persistencia ligera en `localStorage` y acción visible `Reiniciar demo`.
- Controles básicos de accesibilidad: foco visible, etiquetas, contraste y mensajes de estado que no dependan solo del color.
- Verificaciones de tipos, lint, build y pruebas del cálculo/estado central.

### Excluido explícitamente

- Clasificación o inyección de incidentes.
- Temporizador de respuesta y escalamiento P1.
- Llamadas a modelos de IA, backend, autenticación o mensajería real.
- Cálculo de sueño real, notificaciones push y analítica.
- Persistir datos reales: todos los fixtures siguen siendo sintéticos.

## 4. Decisiones de implementación propuestas

| Área | Propuesta | Motivo |
| --- | --- | --- |
| Framework | Next.js App Router + TypeScript | Alineado con el roadmap y suficiente para demo/PWA futura. |
| Estilos | Tailwind CSS, tokens semánticos de color | Iteración rápida y coherencia con los estados de cobertura. |
| Estado | `useReducer` + contexto acotado | El flujo tiene estados explícitos y no justifica una librería adicional. |
| Persistencia | `localStorage`, hidratado solo en cliente | La demo sobrevive a un refresh sin introducir backend. |
| Datos | Fixtures TypeScript en `src/data` | Revisables, tipados y claramente sintéticos. |
| Navegación | Una ruta de demo y estado local; URL opcional más adelante | Evita complejidad prematura sin limitar el recorrido. |
| Relevo | Simulador controlado de respuesta de Andrea | Permite demostrar aceptación bilateral sin servicios externos. |
| Pruebas | Vitest para funciones puras y reducer | Protege cálculos y restricciones de seguridad desde el comienzo. |

## 5. Relevo de Andrea: decisión aplicada

La Fase 0 describe una aceptación desde una segunda pestaña. Para mantener la primera versión determinista y ligera, Fase 1 adopta la siguiente alternativa:

| Opción | Experiencia | Ventaja | Costo / riesgo |
| --- | --- | --- | --- |
| **A. Panel de simulación integrado (seleccionada)** | En `Cerrar guardia`, después de solicitar relevo aparece un bloque claramente rotulado `Demo: responder como Andrea`, con `Aceptar` y `No puedo cubrir`. | Todo funciona en una sola pestaña, es determinista y no requiere sincronización. | La escena bilateral es menos teatral. |
| B. Segunda pestaña de Andrea | Se abre una vista/URL de Andrea que acepta o rechaza. | Podrá evaluarse después de estabilizar el flujo, pero no es parte de Fase 1. | Requiere sincronización entre pestañas. |

El estado del relevo debe quedar separado de la UI. Así, en una fase posterior se puede reemplazar el simulador por una segunda pestaña sincronizada sin alterar reglas ni pantallas de Rodrigo.

Independiente de la opción, la regla no cambia: Rodrigo nunca puede activar `Sueño protegido` mientras el relevo está pendiente o rechazado.

## 6. Modelo mínimo de estado

```text
demo
├── selectedShift: day | night
├── screen: shift | plan | handoff | activation
├── handoffStatus: not_requested | pending | accepted | declined
└── activationMode: none | protected | filtered
```

Transiciones permitidas:

| Evento | Precondición | Resultado |
| --- | --- | --- |
| Cambiar turno | Cualquiera | Recalcula propuesta y conserva la navegación actual. |
| Preparar descanso | Pantalla de turno | Abre el plan. |
| Revisar/cerrar guardia | Pantalla de plan | Abre pendientes y relevo. |
| Solicitar relevo | `not_requested` o `declined` | Cambia a `pending`. |
| Andrea acepta | `pending` | Cambia a `accepted`. |
| Andrea rechaza | `pending` | Cambia a `declined`. |
| Activar sueño protegido | `accepted` | Cambia a `protected`; muestra confirmación temporal. |
| Activar guardia filtrada | `declined` o `pending` | Cambia a `filtered`; muestra confirmación temporal. |
| Reiniciar demo | Cualquiera | Restaura `Día`, relevo no solicitado y primera pantalla. |

La activación de `Guardia filtrada` es útil para respetar la Fase 0, pero debe ser visualmente secundaria y nunca utilizar el texto `Sueño protegido`.

## 7. Estructura inicial sugerida

```text
src/
  app/
    page.tsx
    layout.tsx
    globals.css
  components/
    app-shell.tsx
    shift-selector.tsx
    sleep-window.tsx
    handoff-status.tsx
    ticket-list.tsx
    demo-reset.tsx
  data/
    fixtures.ts
  domain/
    shifts.ts
    demo-reducer.ts
    types.ts
  hooks/
    use-demo-state.ts
```

Los nombres son orientativos; la regla importante es mantener los cálculos, transiciones y fixtures fuera de los componentes visuales.

## 8. Orden de trabajo

1. **Base técnica:** inicializar proyecto, scripts de calidad, estructura y tokens visuales.
2. **Dominio y fixtures:** tipos, tres turnos, tres tickets, cálculo de ventana y reducer con sus pruebas.
3. **Shell móvil:** cabecera, área de contenido y acción de reinicio accesible.
4. **Pantalla 1:** selección de turno y comparación `habitual` versus `propuesta`.
5. **Pantalla 2:** ventana, café y relevo propuesto.
6. **Pantalla 3:** tickets, resumen y estados de aceptación.
7. **Activación y persistencia:** confirmación temporal, guardia filtrada, `localStorage` y reinicio.
8. **Cierre de fase:** prueba manual del recorrido, revisión móvil y mensaje de Checkpoint 1.

Tras cada bloque, la aplicación debe mantenerse navegable. No se inicia Fase 2 hasta que este recorrido sea estable.

## 9. Criterios de aceptación

- [ ] `npm run dev` abre una experiencia funcional sin configurar variables de entorno.
- [ ] `Día` inicia seleccionado y muestra `00:30–06:30` habitual frente a `23:30–06:30` propuesta.
- [ ] Cambiar a `Noche` muestra `09:00–14:00` habitual frente a `08:30–14:30` propuesta.
- [ ] Las tres pantallas respetan los textos y datos sintéticos congelados en `FASE_0.md`.
- [ ] Los tres tickets y el resumen de relevo son legibles sin scroll horizontal en una vista móvil.
- [ ] `Activar sueño protegido` está deshabilitado mientras Andrea no acepte.
- [ ] Una aceptación permite activar la confirmación de protección; un rechazo ofrece solamente `Guardia filtrada`.
- [ ] El reinicio restaura el estado inicial aunque se haya actualizado la página.
- [ ] No se usa rojo salvo para un estado de riesgo real; cobertura y espera tienen texto, icono y color.
- [ ] Tipos, lint, pruebas y build pasan antes de dar la fase por cerrada.

## 10. Riesgos de Fase 1 y límites

| Riesgo | Prevención |
| --- | --- |
| Convertir el prototipo en un formulario largo | Una acción principal por pantalla y datos precargados. |
| Dar una falsa sensación de cobertura | Bloquear el modo protegido hasta la aceptación explícita. |
| Construir backend antes de validar el flujo | Estado local, fixtures y simulador determinista. |
| Perder tiempo con IA tempranamente | Resumen fijo; IA solo se considera en Fase 2, detrás de reglas. |
| Confundir ventana protegida con sueño medido | Mantener el lenguaje de `tiempo reservado para dormir`; no mostrar métricas clínicas. |

## 11. Checkpoint 1

> Atacamos la ansiedad de guardia, no la falta de información. Rodrigo pierde sueño porque necesita comprobar que nada se caerá. SnoozeOps crea un relevo verificable: protege una hora adicional y solo permite que incidentes críticos la interrumpan.

**Demostración sugerida (45–60 segundos):** elegir `Día`, contrastar 6 h con 7 h, revisar el plan, mostrar los tres pendientes, solicitar y aceptar el relevo simulado, y activar el estado protegido.

## 12. Handoff para implementación

La Fase 1 está cerrada. Quien la implemente debe seguir, en este orden, las secciones 8 y 9 de este documento y mantener las decisiones de esta sección como restricciones de alcance.

Antes de avanzar a Fase 2, se debe comprobar manualmente el recorrido completo en móvil y escritorio y ejecutar tipos, lint, pruebas y build.
