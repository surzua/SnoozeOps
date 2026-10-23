# SnoozeOps — Fase 2: Motor de incidentes

**Estado**: Especificación cerrada para implementación en Antigravity IDE.

## 1. Propósito
Construir el núcleo de valor de SnoozeOps: el motor de enrutamiento de incidentes y el simulador para la "escena estrella" de la demo. Esta fase demuestra empíricamente al jurado que Rodrigo puede dormir tranquilo porque el sistema diferencia una interrupción evitable de una crítica, fallando siempre hacia la seguridad.

## 2. Decisiones Tácticas (Acordadas)
- **Fallback Determinístico Primero**: Se implementará un motor de reglas estático sin conexión a internet para asegurar que la demo no falle. La API de IA queda fuera de esta fase; no se debe incorporar como dependencia opcional que pueda alterar el resultado de la demo.
- **UI del Simulador (Pantalla 5)**: Se construirá como un **Bottom Sheet** (modal inferior) que se despliega al presionar el botón `[ Ver actividad ]` en la pantalla de "Sueño Protegido". Esto mantiene la inmersión visual de la aplicación.
- **Manejo del Tiempo**: Se incluirá una acción de demo `[ Simular que Andrea no responde ]` que representa el vencimiento del plazo de 60 segundos sin esperar en tiempo real. También debe existir la acción `[ Simular que Andrea confirma ]` para demostrar el camino de resolución sin despertar a Rodrigo.
- **Relevo requerido**: El enrutamiento P1 hacia Andrea solo está disponible cuando el relevo fue aceptado, coherente con Fase 1. En modo `Guardia filtrada`, incidentes P1, desconocidos o ambiguos se muestran como enviados directamente a Rodrigo.
- **Escenario habitual y prueba de seguridad separados**: La prueba P1 es un escenario sintético independiente. No modifica el historial ni el resultado de la noche habitual que se presenta en la pantalla de mañana.

## 3. Resultado Demostrable
Al terminar esta fase, la vista de "Sueño Protegido" permitirá abrir el simulador e inyectar dos incidentes:
1. **Incidente no crítico (P3 - Cambio de contraseña)**: El sistema lo clasifica, lo deja pendiente para revisión al cierre de la ventana (06:30) y muestra que Rodrigo no fue interrumpido. Agrupar no significa resolver ni descartar el incidente.
2. **Incidente crítico (P1 - Base de datos caída)**: Con relevo aceptado, el sistema lo escala a Andrea. La simulación permite mostrar ambos resultados: Andrea confirma recepción y asume el incidente, o vence el plazo de 60 segundos y Rodrigo recibe una alerta directa.

La prueba crítica se rotula como **Prueba de seguridad · escenario sintético** y queda separada del escenario habitual. No se debe afirmar que Rodrigo fue despertado durante la noche habitual.

## 4. Estructura de Archivos a Crear/Modificar
```text
src/
  domain/
    types.ts              // (Actualizar) Añadir tipos de Incidentes, Severidad y Estados de enrutamiento
    incident-engine.ts    // (Nuevo) Lógica pura: evaluación de reglas (Fallback determinístico)
  components/
    simulation-panel.tsx  // (Nuevo) UI del Bottom Sheet / Modal de simulación
    incident-card.tsx     // (Nuevo) Componente para mostrar severidad, regla y estado
    sleep-window.tsx      // (Actualizar) Conectar el botón [ Ver actividad ] al panel
```

## 5. Pasos Exhaustivos de Implementación (Orden de Trabajo)

### Paso 1: Dominio y Tipos
- Actualizar `types.ts` con las interfaces: `Incident`, `SeverityLevel` (P1, P2, P3, Unknown), `RoutingStatus` y `SimulationState`.
- Modelar estados suficientes para el ciclo completo: `grouped_pending_review`, `escalated_waiting_for_ack`, `acknowledged_by_backup`, `alerted_to_primary` y `routed_directly_to_primary`.
- Mantener separados el escenario habitual y la prueba de seguridad, por ejemplo mediante `scenario: "night_simulation" | "security_test"`.

### Paso 2: Motor de Incidentes (Lógica Pura)
- Crear `incident-engine.ts`.
- Implementar una función pura `evaluateIncident(incident, context): RoutingDecision`. El incidente de entrada ya trae severidad normalizada; en esta fase no se interpreta texto libre ni se integra IA.
- Codificar las reglas duras:
  - Regla 1: P2 o P3 sin impacto creciente -> agrupar para revisión al cierre de la ventana, a las 06:30 en el turno Día de la demo. No marcar como resuelto.
  - Regla 2: P2 o P3 con impacto creciente -> escalar de forma conservadora; si hay relevo aceptado, enviar a Andrea y esperar confirmación; si no, alertar directamente a Rodrigo. No agrupar.
  - Regla 3: P1 con relevo aceptado -> escalar a Andrea y esperar su confirmación.
  - Regla 4: P1 sin relevo aceptado -> alertar directamente a Rodrigo.
  - Regla 5: `Unknown`, ambigüedad o baja confianza -> tratar como crítico. Enviar a Andrea solo con relevo aceptado; si no, alertar a Rodrigo.
  - Regla 6: Si Andrea confirma antes del timeout, registrar `acknowledged_by_backup` y no alertar a Rodrigo. Si no confirma dentro del plazo de 60 segundos, pasar a `alerted_to_primary`.
- El fin de ventana (06:30) indica cuándo presentar los incidentes agrupados para revisión; el inicio del turno (08:00) y cualquier resolución posterior quedan fuera de esta fase.

### Paso 3: Componentes de UI Básicos
- Crear `incident-card.tsx` que reciba una decisión y renderice:
  - Etiqueta de severidad (rojo solo para escalación crítica activa; ámbar para espera/ambigüedad; texto e icono además del color).
  - Explicación de la regla aplicada.
  - Estado actual y siguiente responsable (por ejemplo, "Esperando confirmación de Andrea", "Pendiente de revisión a las 06:30", "Andrea confirmó; Rodrigo no será alertado" o "Alerta enviada a Rodrigo").

### Paso 4: Construcción del Panel de Simulación (Bottom Sheet)
- Crear `simulation-panel.tsx`.
- Diseñar la cabecera del panel.
- Implementar los dos botones de inyección de incidentes sintéticos (P3 y P1).
- Para el P1 escalado a Andrea, mostrar dos acciones de resultado mutuamente excluyentes: `[ Simular que Andrea confirma ]` y `[ Simular que Andrea no responde ]`. Ambas representan el mismo plazo de 60 segundos; son atajos explícitos de demo, no mediciones de respuesta reales.
- Tras la confirmación, mostrar que Andrea asume el incidente y que Rodrigo no recibe alerta. Tras la falta de respuesta, mostrar que Rodrigo recibe la alerta crítica.
- Conectar el panel al estado local de la demo para ir apilando las tarjetas de incidentes generadas.
- Mantener los resultados de `night_simulation` y `security_test` en historiales separados; la prueba de seguridad no debe cambiar los contadores ni el resumen matinal del escenario habitual.

### Paso 5: Integración en la Pantalla de Sueño Protegido
- Modificar la pantalla activa de Sueño Protegido (construida en Fase 1).
- Hacer que el botón `[ Ver actividad ]` alterne la visibilidad del `simulation-panel.tsx`.
- Si el modo activo es `Guardia filtrada`, adaptar la explicación y el destino de enrutamiento: toda alerta crítica o ambigua llega directamente a Rodrigo; no mostrar que Andrea está cubriendo.

## 6. Criterios de Aceptación (DoD Fase 2)
- [ ] El botón `[ Ver actividad ]` abre el simulador sin salir de la pantalla de "Sueño Protegido".
- [ ] El incidente P3 (Contraseña) se muestra como pendiente de revisión a las 06:30; queda explícito que está agrupado, no resuelto, y Rodrigo no es interrumpido.
- [ ] Un P2/P3 con impacto creciente no se agrupa; se escala conservadoramente.
- [ ] Un P1 con relevo aceptado entra en `escalated_waiting_for_ack` y muestra que Andrea debe confirmar.
- [ ] `[ Simular que Andrea confirma ]` cambia el estado a `acknowledged_by_backup`; Andrea asume el incidente y Rodrigo no recibe alerta.
- [ ] `[ Simular que Andrea no responde ]` cambia el estado a `alerted_to_primary` y comunica que Rodrigo recibe una alerta crítica ahora.
- [ ] Un P1 sin relevo aceptado, o un incidente desconocido/ambiguo, nunca se silencia y se enruta de forma conservadora; sin relevo aceptado, llega directamente a Rodrigo.
- [ ] La prueba P1 está rotulada como escenario sintético separado y no altera el escenario habitual ni su resultado matinal.
- [ ] Todo el flujo funciona offline y las decisiones son deterministas para los mismos datos de entrada.
- [ ] La UI no promete cobertura absoluta (por ejemplo, no afirma "100% cubierta"); comunica el relevo confirmado y la regla de escalamiento sin garantías ilimitadas.
- [ ] El código mantiene la separación: reglas de negocio en `domain`, visualización en `components`.
