# SnoozeOps

SnoozeOps es un prototipo local para personas de soporte TI que hacen guardias. Convierte el momento de acostarse en un cierre explícito de responsabilidad: un relevo verifica qué cubre, por cuánto tiempo y cuándo la alerta debe volver al titular.

## El problema que decidimos resolver

Rodrigo sabe que necesita descansar, pero antes de dormir vuelve a revisar tickets. No le falta un dato sobre su sueño: le falta una condición creíble para dejar de vigilar la guardia sin sentir que pierde control sobre producción. Esa incertidumbre al final del turno mantiene activa la atención, aumenta la fatiga de decisión y posterga el descanso.

Elegimos este problema y no otro porque un tracker sólo describe al día siguiente que alguien durmió mal. SnoozeOps interviene antes: hace visible un relevo, los pendientes y una ruta de escalamiento. La tesis es sencilla: si un relevo verificable cubre una ventana concreta y las alertas críticas conservan una ruta explícita, Rodrigo puede reservar una hora adicional para descansar. No afirmamos que se durmió, que descansó esa hora ni que se evitaron interrupciones reales.

## Qué construimos

La demo guía cinco pasos: elegir el turno de día o noche, preparar una ventana propuesta, revisar pendientes y solicitar el relevo, activar **Sueño protegido** cuando Andrea lo acepta —o **Guardia filtrada** cuando no hay cobertura— y revisar una mañana simulada.

En la ventana protegida, las incidencias estables P2/P3 se agrupan para revisión; un caso crítico, ambiguo, desconocido o de baja confianza toma una ruta conservadora. El simulador presenta dos escenarios deliberadamente distintos:

- El P3 de cambio de contraseña pertenece al escenario habitual. Queda pendiente de revisión y es el único incidente que aparece en el resumen de la mañana.
- La caída P1 es una **prueba de seguridad · escenario sintético**, separada de la noche habitual. Se escala primero a Andrea; los botones de confirmación y falta de respuesta simulan el vencimiento de su plazo de 60 segundos. Si no confirma, la alerta se escala a Rodrigo.

El resultado matinal compara la ventana habitual con la propuesta y muestra **+60 min reservados para descansar**. Es una oportunidad de sueño planificada y cubierta, no sueño medido. La interfaz lo indica explícitamente: “Sueño real no medido”.

## Cómo funciona

SnoozeOps es una interfaz móvil/PWA hecha con Next.js y TypeScript. Su estado se aísla en el navegador y puede persistir ligeramente en `localStorage` para retomar la demo; el wordmark reinicia el escenario completo. Los turnos, personas, tickets e incidentes son fixtures sintéticos. Un motor local determinístico evalúa cada incidente sin API, LLM ni proveedor externo, por lo que el recorrido funciona offline y sin credenciales.

El switch **Simular caída de internet** sólo cambia un estado visual de la demo. No desconecta la red real ni altera las decisiones del motor. El diseño no depende de que una automatización sea infalible: ante gravedad, ambigüedad o ausencia de confirmación, escala de forma conservadora.

## Ejecutar localmente

Se necesita Node.js 22 y npm 10. No hacen falta credenciales, variables de entorno ni conexión de red después de instalar las dependencias.

```bash
npm install
npm run dev
```

Abre la URL local que imprime Next.js, normalmente `http://localhost:3000`. Para una comprobación completa del repositorio, ejecuta `npm run lint`, `npm run typecheck`, `npm test` y `npm run build`.

Para evaluar la historia completa, empieza desde el wordmark para dejar el escenario limpio. Selecciona Día, cierra la guardia y acepta el relevo simulado de Andrea. En Sueño protegido, abre la actividad: primero inyecta el P3 habitual y después el P1 de seguridad. El primero se agrupa para la mañana; el segundo prueba que, sin confirmación del relevo, Rodrigo vuelve a recibir la alerta. El [runbook de demo](docs/pitch/DEMO-RUNBOOK.md) registra los clics, los ensayos obligatorios y la recuperación ante fallas.

## Límites deliberados

Este MVP no incluye backend, base de datos, autenticación, sincronización entre pestañas, mensajería real, WhatsApp, notificaciones push, LLM/API de IA, wearables ni diagnósticos de salud. Tampoco recoge datos personales o de salud reales: Rodrigo, Andrea, turnos, tickets e incidentes son ficticios.

No es un sistema clínico ni un sustituto de protocolos operacionales. Los casos ambiguos se escalan; el P1 sintético no se mezcla con el resultado de la noche habitual. Priorizamos demostrar un mecanismo de transferencia de responsabilidad claro y seguro antes de integrar servicios reales.

Para presentar o evaluar la demo, consulta el [kit de pitch](docs/pitch/PITCH.md), el [runbook](docs/pitch/DEMO-RUNBOOK.md), las [respuestas de Q&A](docs/pitch/QA.md) y la [auditoría de entrega](docs/pitch/SUBMISSION.md).
