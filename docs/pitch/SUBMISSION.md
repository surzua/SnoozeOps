# Auditoría de entrega — SnoozeOps

**Versión auditada:** árbol de trabajo local, pendiente de congelación  
**Responsable:** verificación local automatizada  
**Fecha de la última verificación:** 2026-10-23

## Preflight de repositorio

| Control | Comando o revisión | Resultado | Fecha / responsable |
| --- | --- | --- | --- |
| Instalación reproducible | `npm ci` desde clon limpio con Node.js 22 | Bloqueada: el entorno no resolvió `registry.npmjs.org` | 2026-10-23 / verificación local |
| Linter | `npm run lint` | Pasa | 2026-10-23 / verificación local |
| Tipos | `npm run typecheck` | Pasa | 2026-10-23 / verificación local |
| Pruebas | `npm test` | Pasa: 6 archivos, 28 pruebas | 2026-10-23 / verificación local |
| Build de producción | `npm run build` | Pasa | 2026-10-23 / verificación local |
| Demo local | Abrir `npm run dev` y ejecutar los tres recorridos | Recorrido principal verificado: P3, P1 con timeout, mañana y Hard Reset | 2026-10-23 / verificación local |
| Versión desplegada | Abrir en segundo navegador o dispositivo | Pendiente / URL no configurada | — |
| Video de respaldo | Archivo local, rotulado como contingencia | Pendiente | — |

## Privacidad, seguridad y veracidad

- [x] No hay secretos, `.env`, tokens, llaves, logs, cachés ni archivos temporales en los archivos versionados auditados.
- [x] Fixtures y documentos versionados usan sólo datos sintéticos.
- [x] README, UI, pitch y Q&A hablan de **+60 min reservados para descansar**; no afirman sueño real medido ni interrupciones evitadas.
- [x] La caída P1 aparece como prueba sintética separada de la noche habitual.
- [x] No se presenta el motor determinístico como IA ni se promete una integración inexistente.
- [x] La demo local funciona sin credenciales, APIs externas ni conectividad.

## Trazabilidad y congelación

- [x] Revisar autor, correo y contenido de los commits recientes; no reescribir ni falsear atribución.
- [ ] Si participa más de una persona, comprobar que cada aporte es trazable a su propia cuenta GitHub.
- [ ] Registrar los resultados reales de los controles anteriores antes de etiquetar o entregar.
- [x] Ejecutar un Hard Reset final y confirmar el estado inicial de la demo.

## Registro de ensayos

| Fecha | Responsable | Noche habitual ×3 | P1 confirmado ×3 | P1 timeout ×3 | Hallazgos / acción |
| --- | --- | --- | --- | --- | --- |
| 2026-10-23 | verificación local | 1 recorrido principal | Pendiente | 1 timeout dentro del recorrido principal | Hard Reset devolvió la demo a Pantalla 1; repetir la matriz ×3 antes de congelar. |

> El video es sólo contingencia de hardware. No sustituye el requisito de demo en vivo.

> Nota de auditoría: Node.js 22.23.4 y npm 10.9.9 estuvieron disponibles. La verificación de secretos por nombres y patrones en archivos versionados no encontró credenciales; las coincidencias fueron texto documental, fixtures de cambio de contraseña y dependencias transitivas. Reintentar `npm ci` desde un clon limpio cuando haya acceso al registro antes de la entrega.
