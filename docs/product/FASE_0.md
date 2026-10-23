# SnoozeOps - Fase 0 congelada

Documento de producto previo a programación. Define la historia, las seis pantallas, los textos visibles y los datos sintéticos de la demo.

## 1. Decisiones tomadas

- La demo principal usa un **turno de día**.
- El objetivo es **60 minutos adicionales de oportunidad de sueño protegida**; no se afirma que se midió sueño real.
- Un relevo aceptado es obligatorio para activar **Sueño protegido**.
- Sin relevo aceptado, SnoozeOps ofrece **Guardia filtrada**: las alertas críticas o ambiguas todavía pueden despertar a Rodrigo.
- La aceptación del relevo es bilateral; Rodrigo no puede confirmarla por la otra persona.
- El turno nocturno será una variación breve para demostrar que los horarios se recalculan.
- Todos los nombres, tickets, incidentes y resultados de la demo son sintéticos.

## 2. Promesa y barrera

### Promesa

> **Duerme una hora más. Si algo realmente crítico ocurre, la guardia sigue cubierta.**

### Barrera

> Rodrigo posterga el sueño revisando tickets porque no confía en que un incidente crítico será atendido si se desconecta.

### Definición exacta de `+60 min`

> Sesenta minutos más de tiempo reservado para dormir, con las alertas no críticas en espera y un relevo confirmado para atender las críticas. Se compara con la ventana habitual de Rodrigo para el mismo tipo de turno.

Esto describe una ventana planificada y cubierta; no garantiza que Rodrigo se duerma ni que duerma sin interrupciones. La aplicación siempre debe acompañar el resultado con la aclaración:

> **Sueño real no medido.**

## 3. Dirección visual

**Concepto:** centro de operaciones tranquilo.

- Azul nocturno: fondo y estado de descanso.
- Verde: cobertura confirmada.
- Ámbar: espera, ambigüedad o confirmación pendiente.
- Rojo: escalación crítica real; no usarlo como decoración.
- Una acción principal por pantalla.
- El estado siempre se comunica con texto e icono, no solamente con color.
- Interfaz móvil, legible a distancia durante el pitch.

---

## 4. Los seis wireframes

## Pantalla 1 - Próximo turno

**Objetivo:** hacer visible que esta noche existe una oportunidad concreta de recuperar una hora.

```text
+--------------------------------------+
| SnoozeOps                            |
|                                      |
| Buenas noches, Rodrigo               |
|                                      |
| TU PRÓXIMO TURNO                     |
| [ Día ]   [ Tarde ]   [ Noche ]      |
|                                      |
| Sábado 24                            |
| 08:00 - 17:00                        |
|                                      |
| +60 min                              |
| Esta noche puedes proteger           |
| una hora más.                        |
|                                      |
| Habitual       Propuesta             |
| 00:30-06:30    23:30-06:30           |
| 6 h            7 h                   |
|                                      |
| [ Preparar mi descanso ]             |
+--------------------------------------+
```

### Textos exactos

- Título: `Buenas noches, Rodrigo`
- Etiqueta: `Tu próximo turno`
- Mensaje principal: `Esta noche puedes proteger una hora más.`
- Comparación: `Habitual: 6 h` / `Propuesta: 7 h`
- CTA: `Preparar mi descanso`

### Comportamiento

- `Día` aparece seleccionado al iniciar la demo.
- Cambiar a `Noche` recalcula los horarios, pero no cambia el flujo.
- No se pide registro, calendario real ni permisos.

---

## Pantalla 2 - Plan de esta noche

**Objetivo:** traducir la hora adicional en un plan pequeño y comprensible.

```text
+--------------------------------------+
| <  Plan de esta noche                |
|                                      |
| OBJETIVO                             |
| Comenzar tu descanso 60 min antes.   |
|                                      |
| 23:30                         06:30   |
| [========== 7 h planificadas =====]  |
|                                      |
| ÚLTIMO CAFÉ SUGERIDO                 |
| 18:30                                |
| Hoy registramos uno a las 19:20.     |
|                                      |
| RELEVO PROPUESTO                     |
| Andrea Rojas                         |
| 23:30-06:30                          |
| Aún no confirmado                    |
|                                      |
| [ Revisar y cerrar mi guardia ]      |
+--------------------------------------+
```

### Textos exactos

- Título: `Plan de esta noche`
- Objetivo: `Comenzar tu descanso 60 min antes.`
- Ventana: `23:30-06:30 · 7 h planificadas`
- Café: `Último café sugerido: 18:30`
- Contexto: `Hoy registramos uno a las 19:20.`
- Estado de relevo: `Aún no confirmado`
- CTA: `Revisar y cerrar mi guardia`

### Nota de producto

El horario del café es una ayuda secundaria. No debe competir visualmente con el relevo ni convertirse en la tesis del producto.

---

## Pantalla 3 - Cerrar guardia

**Objetivo:** sacar los pendientes de la cabeza de Rodrigo y obtener una aceptación real del relevo.

```text
+--------------------------------------+
| <  Cerrar guardia                    |
|                                      |
| 3 pendientes resumidos               |
|                                      |
| P2  Reportes internos lentos         |
|     Estable desde las 22:40           |
|                                      |
| P3  Correos de recuperación tardan   |
|     Sin usuarios bloqueados           |
|                                      |
| P3  Renovar certificado mañana       |
|     Programado para las 10:00         |
|                                      |
| RESUMEN PARA ANDREA                   |
| No hay incidentes críticos activos.  |
| Vigilar latencia de reportes.         |
|                                      |
| Andrea debe aceptar antes de las      |
| 23:30.                               |
|                                      |
| [ Solicitar relevo a Andrea ]        |
+--------------------------------------+
```

### Textos exactos

- Título: `Cerrar guardia`
- Contador: `3 pendientes resumidos`
- Encabezado del resumen: `Resumen para Andrea`
- Resumen generado: `No hay incidentes críticos activos. Vigilar latencia de reportes; los otros pendientes pueden esperar hasta las 06:30.`
- Condición: `Andrea debe aceptar antes de las 23:30.`
- CTA inicial: `Solicitar relevo a Andrea`

### Vista secundaria de aceptación

Esta vista se abre en una segunda pestaña y representa a Andrea. No cuenta como una séptima pantalla del recorrido de Rodrigo.

```text
+--------------------------------------+
| SnoozeOps · Relevo                   |
|                                      |
| Rodrigo solicita cobertura           |
|                                      |
| Hoy · 23:30-06:30                    |
| 3 pendientes · 0 críticos activos    |
|                                      |
| Si aceptas, recibirás primero las     |
| alertas críticas de esta ventana.    |
|                                      |
| [ Aceptar relevo ]                   |
| [ No puedo cubrir ]                  |
+--------------------------------------+
```

### Estados posteriores en la pantalla de Rodrigo

Mientras Andrea no responde:

- Estado: `Esperando confirmación de Andrea`
- CTA deshabilitado: `Activar sueño protegido`
- Acción alternativa: `Continuar con guardia filtrada`

Después de la aceptación:

- Estado: `Andrea confirmó el relevo hasta las 06:30`
- CTA: `Activar sueño protegido`

Si Andrea rechaza:

- Estado: `El relevo no está cubierto`
- Explicación: `Puedes continuar con guardia filtrada. Las alertas críticas o ambiguas llegarán directamente a ti.`
- CTA: `Activar guardia filtrada`

---

## Pantalla 4 - Sueño protegido

**Objetivo:** permitir que Rodrigo deje de vigilar porque entiende quién está cubriendo y cuándo podría ser despertado.

```text
+--------------------------------------+
| SnoozeOps                            |
|                                      |
|          SUEÑO PROTEGIDO             |
|                 ✓                    |
|                                      |
| 23:30                         06:30   |
| [========== 7 h ==================]  |
|                                      |
| Andrea está de relevo.               |
|                                      |
| Las alertas menores esperarán.       |
| Solo te despertaremos si ocurre un   |
| incidente crítico y Andrea no        |
| responde.                            |
|                                      |
| +60 min frente a tu ventana habitual |
|                                      |
| [ Ver actividad ]                    |
+--------------------------------------+
```

### Textos exactos

- Estado: `Sueño protegido`
- Ventana: `23:30-06:30 · 7 h`
- Cobertura: `Andrea está de relevo.`
- Regla: `Las alertas menores esperarán. Solo te despertaremos si ocurre un incidente crítico y Andrea no responde.`
- Resultado proyectado: `+60 min frente a tu ventana habitual`
- CTA secundario: `Ver actividad`

### Estado alternativo: Guardia filtrada

Cuando no existe relevo, esta pantalla cambia explícitamente:

- Estado: `Guardia filtrada`
- Mensaje: `Las alertas menores esperarán. Las críticas o ambiguas llegarán directamente a ti.`
- No mostrar la palabra `protegido`.
- No afirmar que la ventana está cubierta por otra persona.

---

## Pantalla 5 - Simulador de incidentes

**Objetivo:** demostrar en vivo que el sistema distingue una interrupción evitable de una crítica y que falla hacia la seguridad. El incidente crítico es una **prueba controlada de seguridad**, separada del resultado de la noche habitual.

```text
+--------------------------------------+
| Panel de demo · Datos sintéticos     |
|                                      |
| ENVIAR INCIDENTE                     |
|                                      |
| ( ) Cambio de contraseña             |
| ( ) Base de datos sin responder      |
|                                      |
| [ Enviar incidente ]                 |
|                                      |
| NOCHE DEMO · ESCENARIO HABITUAL      |
|                                      |
| 23:48  P3 · Cambio de contraseña     |
|        Agrupado para las 06:30       |
|        Rodrigo no fue interrumpido   |
|                                      |
| PRUEBA DE SEGURIDAD                  |
| [ Probar incidente crítico ]         |
|                                      |
| [ Simular que Andrea no responde ]   |
+--------------------------------------+
```

### Incidente 1: no crítico

- Entrada: `Usuario solicita restablecer su contraseña. Puede esperar hasta el inicio del turno.`
- Resultado: `P3 · Guardado para las 06:30`
- Explicación: `No afecta un servicio crítico y puede resolverse al iniciar el turno.`
- Confirmación: `Rodrigo no fue interrumpido.`

### Incidente 2: crítico

- Entrada: `La base de datos de producción no responde. Pagos rechazados durante 3 minutos.`
- Resultado inicial: `P1 · Escalado a Andrea`
- Explicación: `Hay una caída activa de producción con impacto en pagos.`
- Estado: `Esperando confirmación de Andrea`

Al seleccionar `Probar incidente crítico`, se abre el escenario sintético alternativo. No se agrega al resumen de la noche habitual.

Después de seleccionar `Simular que Andrea no responde` en esta prueba:

- Estado: `Andrea no respondió en 60 segundos.`
- Acción: `Rodrigo será alertado ahora.`
- Confirmación final: `Escalación crítica completada.`

### Regla visible durante la demo

> Una alerta ambigua nunca se silencia: se escala como si fuera crítica.

---

## Pantalla 6 - Mañana

**Objetivo:** cerrar el ciclo sin afirmar que se midió sueño real.

```text
+--------------------------------------+
| SnoozeOps                            |
|                                      |
| Buenos días, Rodrigo                 |
|                                      |
|              +60 min                 |
| de tiempo reservado para dormir      |
|                                      |
| Ventana habitual       6 h            |
| Ventana planificada    7 h            |
|                                      |
| 1 alerta no crítica agrupada          |
| Relevo confirmado para alertas P1     |
|                                      |
| Sueño real no medido.                 |
|                                      |
| SUGERENCIA                            |
| Por los ronquidos fuertes y el        |
| cansancio sostenido, considera        |
| consultar a un profesional.           |
|                                      |
| [ Preparar mi próximo turno ]         |
+--------------------------------------+
```

### Textos exactos

- Saludo: `Buenos días, Rodrigo`
- Resultado: `+60 min de tiempo reservado para dormir`
- Comparación: `Ventana habitual: 6 h` / `Ventana planificada: 7 h`
- Actividad: `1 alerta no crítica agrupada` / `Relevo confirmado para alertas P1`
- Límite de medición: `Sueño real no medido.`
- Sugerencia: `Por los ronquidos fuertes y el cansancio sostenido, considera consultar a un profesional.`
- CTA: `Preparar mi próximo turno`

### Nota sobre el resultado

El `+60 min` compara tiempo reservado en ventanas planificadas. La pantalla de mañana corresponde al escenario habitual, donde solo llegó la alerta no crítica. La prueba P1 es una simulación separada de seguridad. No se muestran horas efectivamente dormidas ni calidad de sueño.

---

## 5. Datos sintéticos congelados

### Personas

| Campo | Rodrigo | Andrea |
|---|---|---|
| Nombre | Rodrigo Salas | Andrea Rojas |
| Rol | Soporte TI | Soporte TI · relevo |
| Ubicación | Concepción | Concepción |
| Estado | Solicita cobertura | Disponible para aceptar o rechazar |

Los apellidos, la compañera y todos los registros son inventados para la demo.

### Turno principal

| Campo | Valor |
|---|---|
| Tipo | Día |
| Horario laboral | 08:00-17:00 |
| Ventana habitual | 00:30-06:30 |
| Oportunidad habitual | 6 h |
| Ventana propuesta | 23:30-06:30 |
| Oportunidad propuesta | 7 h |
| Diferencia | +60 min |
| Último café sugerido | 18:30 |
| Café sintético registrado | 19:20 |
| Relevo | Andrea Rojas |

### Variación nocturna

| Campo | Valor |
|---|---|
| Tipo | Noche |
| Horario laboral | 22:00-07:00 |
| Ventana habitual | 09:00-14:00 |
| Oportunidad habitual | 5 h |
| Ventana propuesta | 08:30-14:30 |
| Oportunidad propuesta | 6 h |
| Diferencia | +60 min |
| Último café sugerido | 03:30 |
| Relevo | Andrea Rojas |

### Tickets iniciales

| ID | Severidad | Título | Estado |
|---|---|---|---|
| OPS-2417 | P2 | Reportes internos lentos | Estable desde las 22:40 |
| OPS-2418 | P3 | Correos de recuperación tardan | Sin usuarios bloqueados |
| OPS-2419 | P3 | Renovar certificado | Programado para las 10:00 |

### Incidentes de la demo

| ID | Hora | Entrada | Resultado |
|---|---|---|---|
| INC-3021 | 23:48 | Cambio de contraseña | P3 · Agrupar hasta las 06:30 |
| INC-3022 | 02:13 | Base de datos de producción sin responder | P1 · Escalar a Andrea; luego a Rodrigo si no confirma |

### Reglas de seguridad

1. P2 y P3 sin impacto creciente se agrupan hasta el final de la ventana.
2. P1 se envía al relevo confirmado.
3. Si el relevo no confirma un P1 en 60 segundos de demo, se alerta a Rodrigo.
4. Una severidad desconocida o de baja confianza se trata como crítica.
5. La explicación de la decisión siempre queda visible.

---

## 6. Relato de 30 segundos

> Rodrigo trabaja en soporte con turnos rotativos. Se acuesta tarde revisando tickets porque teme que algo crítico ocurra cuando se desconecte. SnoozeOps convierte esa incertidumbre en un relevo verificable: las alertas menores esperan, las críticas van al relevo y Rodrigo solo despierta si nadie responde. Así reserva una hora más para dormir, sin fingir que la guardia dejó de existir.

## 7. Secuencia exacta de la demo

1. Seleccionar `Día` y mostrar `+60 min`.
2. Revisar la ventana propuesta y el café de las 19:20.
3. Mostrar los tres pendientes y solicitar relevo.
4. Aceptar como Andrea desde la segunda pestaña.
5. Activar `Sueño protegido`.
6. Enviar el cambio de contraseña y mostrar que Rodrigo no fue interrumpido.
7. Avanzar a la mañana y mostrar `+60 min de tiempo reservado`, junto con `Sueño real no medido`.
8. Volver al panel y abrir `Prueba de seguridad`.
9. Enviar la caída de base de datos, mostrar el escalamiento a Andrea y simular que no responde; Rodrigo recibe la alerta.
10. Cambiar brevemente a `Noche` para demostrar el recálculo del horario.

La narración debe marcar claramente el cambio: `Ya vimos una noche habitual. Ahora probemos qué ocurre si aparece una caída crítica.` Así no se atribuye una interrupción de la prueba de seguridad al resultado matinal.

## 8. Criterio para aprobar la Fase 0

La Fase 0 queda aprobada si podemos responder `sí` a todo:

- [ ] La promesa se entiende sin explicar la tecnología.
- [ ] Está claro que `+60 min` es tiempo reservado para dormir y no sueño medido.
- [ ] `Sueño protegido` solo aparece después de una aceptación bilateral.
- [ ] La aplicación sigue ofreciendo valor cuando no hay relevo.
- [ ] El incidente ambiguo o crítico nunca queda silenciado.
- [ ] El turno nocturno reutiliza el mismo mecanismo sin abrir otro producto.
- [ ] El recorrido principal y la prueba crítica separada caben en una demo de menos de cuatro minutos.
- [ ] Todos los datos están marcados o entendidos como sintéticos.

## 9. Decisiones confirmadas para construir

1. **Andrea Rojas** es el relevo ficticio y acepta desde una segunda pestaña.
2. La métrica se llama **tiempo reservado para dormir**: `+60 min` frente a la ventana habitual del mismo turno, con relevo confirmado y alertas no críticas en espera. No equivale a sueño medido ni garantiza descanso ininterrumpido.
3. El resultado matinal representa el escenario habitual con la alerta no crítica agrupada. El P1 y el fallo de confirmación se muestran en una prueba de seguridad separada, claramente rotulada.
4. La pantalla de mañana incluye una sugerencia profesional breve por ronquidos fuertes y cansancio sostenido. Se muestra durante unos segundos como señal de cuidado, sin diagnóstico ni explicación clínica extensa.
