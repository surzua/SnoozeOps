# SnoozeOps — Fase 3: Cerrar el ciclo de hábito

**Estado**: Implementada localmente y validada con pruebas de dominio, tipos, lint, build y recorrido manual.

## 1. Propósito

Construir la pantalla matinal que cierra el ciclo de uso de SnoozeOps. La pantalla debe hacer visible la promesa central: Rodrigo tuvo **60 minutos más reservados para descansar** y, en el escenario habitual de la demo, no recibió alertas durante esa ventana.

La fase debe diferenciar con precisión entre:

- **Tiempo reservado para dormir**: la duración planificada de la ventana de descanso.
- **Sueño real**: tiempo, calidad, fases o cualquier medición fisiológica del sueño. SnoozeOps no lo mide en esta demo.
- **Sin alertas en el escenario habitual durante la ventana**: comportamiento observado del sistema para el escenario habitual simulado. No equivale a demostrar un contrafactual ni a contabilizar “interrupciones evitadas”.

La pantalla también incluye una sugerencia de salud general y prudente. No diagnostica, no infiere condiciones médicas ni atribuye síntomas a Rodrigo.

## 2. Decisiones de producto cerradas

| Tema | Decisión |
| --- | --- |
| Transición a la mañana | El Bottom Sheet de demo incorpora `[ Simular la mañana ]`. El presentador controla el avance temporal; no se espera tiempo real. |
| Beneficio mostrado | Se muestra `+60 min reservados para descansar`, calculado desde las ventanas del turno activo. No se muestra un contador de “interrupciones evitadas”. |
| Resultado operacional | Para el escenario habitual, se comunica `Sin alertas en el escenario habitual durante tu ventana protegida` cuando el modo es protegido. En guardia filtrada se habla de la ventana planificada. El P3 no se resuelve ni se marca como revisado. |
| P3 al cierre de la ventana | Permanece como `grouped_pending_review` y se presenta como disponible para revisión al cierre de la ventana: 06:30 para Día y 14:30 para Noche. No se afirma que Rodrigo o Andrea hayan leído o resuelto el ticket. |
| Prueba P1 | La prueba de seguridad sigue siendo un escenario sintético separado. Nunca alimenta los minutos reservados, el contador de alertas del escenario habitual ni el resumen de mañana. |
| Sugerencia de salud | Texto condicional y general: no se presenta como una detección ni un dato personal de Rodrigo. Incluye recomendación de consulta profesional y advertencia sobre automedicación. |
| Hard Reset | `[ Preparar mi próximo turno ]` restaura todo el estado de la demo, borra `localStorage`, cierra el Bottom Sheet y deja lista una nueva demostración desde Pantalla 1. |

## 3. Resultado demostrable

Al finalizar la fase, desde `Sueño protegido` el presentador podrá avanzar a la **Pantalla 6 — Mañana** y demostrar lo siguiente:

1. Rodrigo tuvo una ventana planificada de 7 horas frente a una habitual de 6 horas: **+60 min reservados para descansar**.
2. En el escenario habitual, un incidente P3 de cambio de contraseña quedó agrupado y no generó una alerta durante la ventana protegida.
3. El incidente P3 sigue pendiente de revisión; SnoozeOps no lo considera resuelto ni oculto.
4. El producto no afirma haber medido sueño real.
5. La recomendación de salud es prudente, condicional y no clínica.
6. La prueba P1 de seguridad, con confirmación o timeout de Andrea, no contamina ninguno de los resultados anteriores.
7. El ciclo completo puede reiniciarse para una nueva demo, sin datos persistidos de la anterior.

## 4. Contrato de datos y reglas de dominio

### 4.1 Ventanas y cálculo de minutos

La métrica principal se obtiene exclusivamente desde la propuesta de turno ya definida en Fase 1. La implementación debe calcular **duraciones**, no restar horas en formato de texto, porque una ventana puede cruzar medianoche.

| Turno | Ventana habitual | Ventana propuesta | Duración habitual | Duración propuesta | Diferencia |
| --- | --- | --- | ---: | ---: | ---: |
| Día | 00:30–06:30 | 23:30–06:30 | 6 h | 7 h | +60 min |
| Noche | 09:00–14:00 | 08:30–14:30 | 5 h | 6 h | +60 min |

Reglas obligatorias:

- Una hora final anterior o igual a la inicial representa una ventana que termina el día siguiente.
- `minutesReserved = duration(proposedWindow) - duration(usualWindow)`.
- La Fase 3 solo muestra la métrica si la diferencia es positiva. El fixture actual produce `60` minutos para Día y Noche.
- El componente visual recibe minutos ya calculados; no implementa cálculos de fechas u horarios.
- El mensaje de apoyo debe decir: `SnoozeOps muestra tiempo reservado para dormir; no mide el sueño real.`

### 4.2 Escenario habitual de la noche

La Pantalla 6 solo lee los incidentes con `scenario: "night_simulation"`.

Para el fixture habitual de la demo:

| Dato | Valor |
| --- | --- |
| Incidente | Cambio de contraseña |
| Severidad | P3 |
| Estado | `grouped_pending_review` |
| Acción de SnoozeOps | Agruparlo durante la ventana protegida |
| Resultado para Rodrigo | No recibe una alerta por este incidente durante su ventana |
| Estado posterior | Disponible para revisión al cierre de la ventana activa (06:30 Día; 14:30 Noche); no resuelto |

La UI debe comunicarlo con una formulación factual:

> **Sin alertas en el escenario habitual durante tu ventana protegida**
> 1 alerta de baja prioridad quedó agrupada para revisión al cierre de tu ventana.

Si el P3 no fue inyectado durante la demo, la pantalla no debe inventar una alerta ni mostrar un conteo de uno. En ese caso se puede mostrar:

> No se registraron incidentes agrupados en este escenario de demo.

No usar ninguna de estas formulaciones:

- “1 interrupción evitada”.
- “El incidente fue resuelto”.
- “Rodrigo o Andrea revisaron el ticket”.
- “La guardia estuvo 100% cubierta”.

### 4.3 Aislamiento de la prueba P1

Los resultados de `scenario: "security_test"` no se incorporan en `MorningMetrics` ni en el resumen habitual.

Esto aplica tanto si Andrea confirma como si vence el plazo de 60 segundos y Rodrigo recibe una alerta crítica. La prueba debe seguir etiquetada como:

> **Prueba de seguridad · escenario sintético**

La mañana no debe afirmar que Rodrigo fue despertado durante la noche habitual a causa de esa prueba. Si la UI necesita conservar alguna referencia visible, solo puede hacerlo fuera del resumen habitual y con la etiqueta anterior; no es necesario para el alcance de esta fase. La Fase 3 no modela una P1 del escenario habitual; si se agrega en una fase posterior, la mañana deberá comunicar la alerta recibida y no podrá usar la formulación `Sin alertas`.

### 4.4 Sugerencia de salud

La sugerencia no requiere datos biométricos, wearables, autodiagnóstico ni un formulario nuevo. Se presenta como contenido general y condicional:

> **Sugerencia de descanso**  
> Si presentas ronquidos frecuentes, pausas al respirar o fatiga persistente durante el día, consulta con un profesional de salud.  
> Evita automedicarte o usar medicamentos no recetados para dormir.

Reglas de texto:

- No decir que SnoozeOps detectó ronquidos, pausas respiratorias, fatiga ni trastornos de sueño.
- No usar lenguaje de diagnóstico, tratamiento o prescripción.
- Mantener la advertencia sobre automedicación dentro de la misma tarjeta para evitar ruido visual.

## 5. Alcance de la Fase 3

### Incluido

- **Pantalla 6 — Mañana:** resultado de la noche del escenario habitual.
- Comparación visual de ventana habitual versus planificada y cálculo de `+60 min`.
- Aviso explícito de que el sueño real no fue medido.
- Resumen del P3 agrupado, conservando su estado pendiente de revisión.
- Tarjeta de sugerencia de salud condicional y advertencia de medicamentos.
- Botón `[ Simular la mañana ]` en el Bottom Sheet del simulador.
- Botón `[ Preparar mi próximo turno ]` que ejecuta un reinicio completo y persistente.
- Manejo de estados vacíos cuando no se inyectó un incidente habitual.
- Verificación de que Fase 2 mantiene los escenarios habitual y de seguridad separados.

### Excluido explícitamente

- Marcar, asignar, resolver o comentar el ticket P3.
- Historiales de sueño, gráficos clínicos, wearables, medición fisiológica o cálculo de ciclos de sueño.
- Inferir o registrar síntomas médicos de Rodrigo.
- Notificaciones, alarmas, backend, autenticación o comunicaciones reales.
- Modificar la lógica de escalamiento P1 definida en Fase 2.
- Mostrar resultados de la prueba P1 como parte de la noche habitual.

## 6. Modelo mínimo de estado

Extender el estado existente sin mezclar escenarios:

```text
demo
├── selectedShift: day | night
├── screen: shift | plan | handoff | activation | morning
├── handoffStatus: not_requested | pending | accepted | declined
├── activationMode: none | protected | filtered
├── simulation
│   ├── panelOpen: boolean
│   ├── nightIncidents: Incident[]          // solo scenario: night_simulation
│   └── securityTestIncidents: Incident[]   // solo scenario: security_test
└── morning
    └── isSimulated: boolean
```

Acciones nuevas o actualizadas:

| Evento | Precondición | Resultado |
| --- | --- | --- |
| Simular la mañana | Flujo en `protected` o `filtered`; la acción se ejecuta desde el simulador | `screen` pasa a `morning`; no muta incidentes ni mezcla escenarios. |
| Reiniciar demo / Preparar mi próximo turno | Cualquiera | Ejecuta `RESET_DEMO`, restaura el estado inicial y persiste ese estado limpio. |

El reducer es la fuente de verdad de estas transiciones. Los componentes no deben limpiar individualmente fragmentos de estado.

## 7. Estructura de archivos a crear o modificar

```text
src/
  domain/
    types.ts                // Actualizar: tipos para MorningMetrics, NightSummary y HealthSuggestion
    metrics.ts              // Nuevo: funciones puras para duración de ventanas y minutos reservados
    morning-summary.ts      // Nuevo: construye el resumen solo desde night_simulation
    demo-reducer.ts         // Actualizar: transición a morning y acción RESET_DEMO
  data/
    fixtures.ts             // Actualizar: contenido sintético de resumen y sugerencia de salud
  components/
    morning-screen.tsx      // Nuevo: Pantalla 6 y CTA de reinicio
    sleep-comparison.tsx    // Nuevo: presentación de ambas ventanas y diferencia calculada
    night-summary.tsx       // Nuevo: estado factual del P3 o estado vacío
    health-disclaimer.tsx   // Nuevo: sugerencia condicional y límite de responsabilidad
    simulation-panel.tsx    // Actualizar: acción [ Simular la mañana ]
  hooks/
    use-demo-state.ts       // Actualizar: persistencia, transición a mañana y reset completo
```

Responsabilidades:

| Unidad | Responsabilidad |
| --- | --- |
| `metrics.ts` | Recibir ventanas de dominio y devolver duraciones y diferencia en minutos. Sin React ni `localStorage`. |
| `morning-summary.ts` | Filtrar por `night_simulation`, derivar los incidentes agrupados pendientes y excluir todo `security_test`. Sin JSX. |
| `demo-reducer.ts` | Validar transiciones, centralizar `RESET_DEMO` y crear estado inicial nuevo. |
| `use-demo-state.ts` | Hidratación y persistencia segura de estado local; al reset, eliminar la clave y persistir el estado inicial. |
| Componentes | Presentar datos tipados, estados vacíos y acciones; no calcular horarios ni decidir enrutamiento. |

## 8. Orden de implementación

1. **Tipos y dominio:** definir `MorningMetrics`, `NightSummary` y las funciones puras de duración de ventana.
2. **Pruebas de dominio:** cubrir Día, Noche y cruces de medianoche antes de construir UI.
3. **Resumen matinal:** implementar el selector que toma solo `night_simulation` y preserva `grouped_pending_review`.
4. **Estado y persistencia:** añadir transición a mañana y `RESET_DEMO` en reducer/hook.
5. **Componentes pequeños:** crear comparación de ventanas, resumen nocturno y tarjeta de salud.
6. **Pantalla 6:** ensamblar la pantalla y conectar `[ Preparar mi próximo turno ]`.
7. **Simulador:** añadir `[ Simular la mañana ]` y comprobar que no altera incidentes.
8. **Validación integral:** recorrer Día, Noche, escenario P3, prueba P1 y hard reset en móvil y escritorio.

## 9. Criterios de aceptación (DoD Fase 3)

### Flujo y presentación

- [x] `[ Simular la mañana ]` lleva a la Pantalla 6 sin usar un temporizador real.
- [x] La Pantalla 6 muestra la ventana habitual, la planificada y `+60 min reservados para descansar` para el turno Día.
- [x] El turno Noche muestra correctamente `09:00–14:00` versus `08:30–14:30`, también con `+60 min`.
- [x] El cálculo de `23:30–06:30` reconoce una duración de 7 horas; no genera duración negativa ni una fecha inválida.
- [x] La pantalla incluye: `SnoozeOps muestra tiempo reservado para dormir; no mide el sueño real.`

### Incidentes y seguridad

- [x] Después de inyectar el P3 habitual, la mañana comunica que no hubo alertas en el escenario habitual durante la ventana y que existe 1 P3 pendiente de revisión al cierre de la ventana activa.
- [x] El P3 se conserva como `grouped_pending_review`; no aparece como resuelto, revisado ni asignado a Rodrigo o Andrea.
- [x] Si no se inyectó el P3, la pantalla muestra un estado vacío y no inventa alertas agrupadas.
- [x] Inyectar el P3 más de una vez no duplica indebidamente el resumen ni cambia los minutos reservados.
- [x] Ejecutar una prueba P1, con confirmación o timeout, no modifica las métricas ni el contenido del resumen habitual de la mañana.
- [x] La prueba P1 conserva la etiqueta `Prueba de seguridad · escenario sintético` y no permite inferir que ocurrió durante la noche habitual.

### Salud, accesibilidad y reinicio

- [x] La tarjeta de salud usa el texto condicional acordado, recomienda consultar a un profesional y advierte contra automedicarse.
- [x] La tarjeta no atribuye síntomas, detecciones ni diagnósticos a Rodrigo.
- [x] Estados de pendiente, ausencia de alertas y advertencia se entienden con texto e icono, además del color.
- [x] `[ Preparar mi próximo turno ]` restaura Día, Pantalla 1, relevo no solicitado, modo de activación vacío e historiales de incidentes vacíos.
- [x] El Hard Reset cierra el Bottom Sheet, elimina los datos persistidos anteriores y mantiene el estado inicial después de refrescar la página.
- [x] Tipos, lint, pruebas y build pasan antes de cerrar la fase.

## 10. Riesgos y límites

| Riesgo | Prevención |
| --- | --- |
| Confundir oportunidad de descanso con sueño medido | Etiqueta explícita, métricas calculadas solo desde ventanas y ausencia de métricas clínicas. |
| Prometer una interrupción “evitada” sin evidencia contrafactual | Comunicar la ausencia observada de alertas durante la ventana. |
| Dar por resuelto el P3 | Mantenerlo pendiente de revisión y excluir acciones de resolución del alcance. |
| Contaminar la noche habitual con la prueba P1 | Filtrado estricto por `scenario` en dominio y pruebas dedicadas. |
| Arrastrar datos entre jurados o demostraciones | Una única acción `RESET_DEMO`, limpieza de persistencia y verificación tras refresh. |
| Sugerir un diagnóstico médico | Texto condicional, general y sin inferencia de síntomas. |

## 11. Checkpoint 3

> SnoozeOps no promete sueño medido ni elimina la responsabilidad operativa. Hace verificable una ventana de descanso más larga: el relevo fue confirmado, las alertas críticas mantienen una ruta de escalamiento y los eventos de baja prioridad quedan disponibles para revisión al terminar la ventana.

**Demostración sugerida (45–60 segundos):** desde `Sueño protegido`, inyectar el P3 de cambio de contraseña, mostrar que queda agrupado, ejecutar una prueba P1 etiquetada como sintética si se desea demostrar seguridad, simular la mañana, contrastar 6 h frente a 7 h, leer el estado pendiente del P3 y cerrar con `[ Preparar mi próximo turno ]`.

## 12. Handoff para implementación

Implementar en el orden de la sección 8 y tratar las reglas de las secciones 2, 4 y 6 como restricciones de producto.

Antes de cerrar la fase, verificar manualmente los recorridos de Día y Noche, el estado vacío, el P3 agrupado, ambos resultados de la prueba P1, el Hard Reset y un refresh posterior al reset. Luego ejecutar tipos, lint, pruebas y build.
