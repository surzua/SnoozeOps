# SnoozeOps

> **Duerme una hora más. Si algo realmente crítico ocurre, la guardia sigue cubierta.**

SnoozeOps es un prototipo para personas que trabajan en soporte TI y turnos de guardia. Ayuda a cerrar la jornada con un relevo verificable: agrupa alertas no críticas, escala las críticas a un respaldo y solo interrumpe al titular si el incidente es crítico y el respaldo no responde.

El proyecto nace para la Hackatón Señales 2026, en Santiago de Chile.

## El problema

Rodrigo, un profesional de soporte TI con turnos rotativos, no duerme poco por falta de información: duerme poco porque no puede dejar de vigilar la guardia. Antes de acostarse revisa tickets una y otra vez para asegurarse de que nada importante se caiga.

SnoozeOps transforma esa incertidumbre en un plan de relevo explícito y comprobable, con una meta clara: proteger hasta **60 minutos adicionales** de su ventana de sueño.

## Qué incluyen las Fases 1 y 2

- Seleccionar un turno de `Día` o `Noche` y recalcular una propuesta de descanso.
- Mostrar la comparación entre la ventana habitual y la ventana propuesta de `+60 min`.
- Preparar el plan de esta noche con el último café sugerido y Andrea Rojas como relevo.
- Revisar tres pendientes sintéticos y el resumen determinista que recibirá Andrea.
- Solicitar el relevo desde la misma pantalla y simular la respuesta de Andrea.
- Bloquear `Sueño protegido` hasta obtener una aceptación válida.
- Ofrecer `Guardia filtrada` cuando el relevo está pendiente o rechazado.
- Persistir el estado en `localStorage` y permitir reiniciar la demo en cualquier momento.
- Abrir un simulador inferior desde `Ver actividad`, sin salir de `Sueño protegido` ni `Guardia filtrada`.
- Aplicar un motor de enrutamiento determinístico y offline: los P2/P3 estables se agrupan para revisión y lo crítico, ambiguo o de baja confianza se escala de forma conservadora.
- Demostrar por separado un cambio de contraseña P3 y una caída P1 de base de datos, incluyendo confirmación y timeout simulado de Andrea.

La pantalla de mañana y las notificaciones pertenecen a fases posteriores.

## Principio de seguridad

La IA puede resumir, explicar y proponer una severidad, pero **nunca será el único mecanismo para silenciar una alerta**. Las reglas operacionales conocidas tienen prioridad; ante una alerta ambigua, una severidad desconocida o baja confianza, el sistema escala de forma conservadora.

SnoozeOps no entrega diagnósticos ni tratamientos médicos, ni sustituye los protocolos de incidentes de una organización.

## Escenario de demostración de Fase 2

| Incidente | Decisión esperada |
| --- | --- |
| Solicitud de cambio de contraseña | Se agrupa para la mañana |
| Base de datos de producción sin responder | Se escala al respaldo |
| Incidente crítico sin confirmación del respaldo | Se despierta a Rodrigo |

## Flujo implementado

```text
Próximo turno
  → Plan de esta noche
  → Cerrar guardia y confirmar relevo
  → Sueño protegido o guardia filtrada
      → Ver actividad
      → Simular incidentes y observar su ruta
```

La prueba P1 se rotula como escenario sintético y mantiene su historial separado de la noche habitual. Los atajos de confirmación representan explícitamente el plazo de 60 segundos; no hay segunda pestaña, sincronización entre ventanas ni backend.

## Stack actual

- Next.js App Router 16 y TypeScript
- Tailwind CSS 4 mediante PostCSS
- `useReducer` para las transiciones del flujo
- `localStorage` para persistencia ligera en el navegador
- Datos sintéticos tipados en `src/data/fixtures.ts`
- Vitest para cálculos y reglas del estado central
- ESLint y TypeScript para controles de calidad

## Arquitectura actual

```text
UI móvil
  │
  ▼
Máquina de estados de la demo
  ├── turno y ventana de sueño
  ├── cierre y relevo
  ├── modo protegido
  └── guardia filtrada
  │
  ▼
Motor de incidentes determinístico
  ├── agrupación para revisión al cierre
  └── escalamiento seguro al relevo o a Rodrigo
  │
  ▼
Fixtures sintéticos + localStorage
```

## Estado del proyecto

Las Fases 1 y 2 están implementadas como una demo local navegable. El recorrido y el motor de enrutamiento funcionan sin conexión, cuenta, credenciales ni servicios externos. Las reglas de seguridad están modeladas fuera de la UI para poder reemplazar el simulador por una integración posterior sin cambiar las decisiones de enrutamiento.

Consulta la [Fase 1](docs/product/FASE_1.md) y la [Fase 2](docs/product/FASE_2.md) para los criterios de aceptación, el [roadmap](docs/product/ROADMAP.md) para las fases siguientes y la [Fase 0](docs/product/FASE_0.md) para las decisiones, wireframes y datos sintéticos congelados.

## Puesta en marcha

El proyecto usa **Node.js 22** y `npm`. La versión mayor queda declarada en [`.nvmrc`](.nvmrc) y el lockfile fija las dependencias exactas. No se requieren credenciales, variables de entorno ni servicios externos.

```bash
npm install
npm run dev
```

Después, abre `http://localhost:3000` en tu navegador.

Para probar el recorrido manualmente, pulsa `Reiniciar demo` y verifica primero el camino de `Día`: plan, solicitud de relevo, aceptación de Andrea y activación de sueño protegido. Pulsa `Ver actividad`, inyecta el P3 y confirma que queda pendiente para las 06:30; luego inyecta el P1 y prueba las dos respuestas de Andrea. Después repite el camino de rechazo para comprobar que `Guardia filtrada` envía el P1 directamente a Rodrigo.

Antes de integrar cambios, ejecuta:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Las convenciones de estructura, seguridad y colaboración están en el [acuerdo de ingeniería](docs/engineering/CONVENTIONS.md).

## Alcance deliberadamente fuera del MVP

- Integraciones reales con mensajería o notificaciones push.
- Pantalla de mañana y métricas de interrupciones evitadas.
- IA, backend, autenticación y sincronización entre pestañas.
- Datos personales, datos de salud reales y autenticación empresarial.
- Facturación, roles avanzados y dashboards complejos.
- Wearables, diagnóstico clínico u optimización circadiana médica.

## Contribuir

1. Crea una rama para tu cambio.
2. Mantén la demo funcional sin conexión y sin credenciales externas.
3. Prioriza la seguridad: ante incertidumbre, escala la alerta.
4. Abre un pull request con una descripción breve y capturas si cambia la interfaz.

## Licencia

Por definir.
