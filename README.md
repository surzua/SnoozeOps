# SnoozeOps

> **Duerme una hora más. Si algo realmente crítico ocurre, la guardia sigue cubierta.**

SnoozeOps es un prototipo para personas que trabajan en soporte TI y turnos de guardia. Ayuda a cerrar la jornada con un relevo verificable: agrupa alertas no críticas, escala las críticas a un respaldo y solo interrumpe al titular si el incidente es crítico y el respaldo no responde.

El proyecto nace para la Hackatón Señales 2026, en Santiago de Chile.

## El problema

Rodrigo, un profesional de soporte TI con turnos rotativos, no duerme poco por falta de información: duerme poco porque no puede dejar de vigilar la guardia. Antes de acostarse revisa tickets una y otra vez para asegurarse de que nada importante se caiga.

SnoozeOps transforma esa incertidumbre en un plan de relevo explícito y comprobable, con una meta clara: proteger hasta **60 minutos adicionales** de su ventana de sueño.

## Qué hará el MVP

- Configurar el próximo turno y proponer una ventana realista de sueño.
- Preparar un plan nocturno con pendientes, resumen de relevo y respaldo asignado.
- Activar un modo de sueño protegido.
- Enrutar incidentes de forma segura:
  - los no críticos se agrupan para la mañana;
  - los críticos se escalan primero al respaldo;
  - si el respaldo no confirma, se despierta al titular de la guardia.
- Mostrar al día siguiente los minutos de ventana protegida y las interrupciones evitadas.

## Principio de seguridad

La IA puede resumir, explicar y proponer una severidad, pero **nunca será el único mecanismo para silenciar una alerta**. Las reglas operacionales conocidas tienen prioridad; ante una alerta ambigua, una severidad desconocida o baja confianza, el sistema escala de forma conservadora.

SnoozeOps no entrega diagnósticos ni tratamientos médicos, ni sustituye los protocolos de incidentes de una organización.

## Escenario de demostración

| Incidente | Decisión esperada |
| --- | --- |
| Solicitud de cambio de contraseña | Se agrupa para la mañana |
| Base de datos de producción sin responder | Se escala al respaldo |
| Incidente crítico sin confirmación del respaldo | Se despierta a Rodrigo |

## Flujo de la experiencia

```text
Próximo turno
  → Plan de esta noche
  → Cerrar guardia y confirmar relevo
  → Activar sueño protegido
  → Enrutar incidentes de forma segura
  → Resultado de la mañana
```

## Stack propuesto

- Next.js y TypeScript
- Tailwind CSS
- Estado local y `localStorage` para el MVP
- Datos sintéticos versionados en el repositorio
- Vitest para probar el motor de enrutamiento
- Clasificación opcional con IA, siempre con fallback determinístico

## Arquitectura prevista

```text
UI móvil
  │
  ▼
Máquina de estados de la demo
  ├── turno y ventana de sueño
  ├── cierre y relevo
  ├── modo protegido
  └── resultado matinal
  │
  ▼
Motor de incidentes
  ├── reglas de seguridad
  ├── clasificador IA opcional
  └── fallback determinístico
  │
  ▼
Fixtures sintéticos + localStorage
```

## Estado del proyecto

El repositorio está en fase de inicio. El objetivo inmediato es construir un flujo navegable desde la selección de turno hasta la activación del sueño protegido, antes de integrar servicios externos.

Consulta el [roadmap](docs/product/ROADMAP.md) para el alcance, las reglas de seguridad y el plan de implementación completo, y la [Fase 0](docs/product/FASE_0.md) para las decisiones, wireframes y datos sintéticos aprobados antes de programar.

## Puesta en marcha

La aplicación aún no ha sido inicializada. Cuando se cree el proyecto con Next.js, la ejecución local seguirá este flujo:

```bash
npm install
npm run dev
```

Después, abre `http://localhost:3000` en tu navegador.

## Alcance deliberadamente fuera del MVP

- Integraciones reales con mensajería o notificaciones push.
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
