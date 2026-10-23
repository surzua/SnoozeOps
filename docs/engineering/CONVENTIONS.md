# Acuerdo de ingeniería

Estas reglas mantienen la demo navegable, segura y fácil de continuar durante la hackatón.

## Entorno reproducible

- Usamos Node.js 22, fijado en [`.nvmrc`](../../.nvmrc). El gestor de paquetes es `npm`; se versiona `package-lock.json`.
- No se suben dependencias, artefactos de compilación, cobertura, archivos `.env` ni datos reales. Las excepciones están documentadas en [`.gitignore`](../../.gitignore).
- La aplicación debe arrancar sin credenciales ni conectividad externa. Las variables de entorno nuevas requieren una entrada en `.env.example` y una justificación en el PR.

## Diseño y dominio

- El código de interfaz vive en `src/components` y las reglas puras, tipos y transiciones viven fuera de los componentes (`src/domain`).
- Los fixtures son sintéticos, tipados y versionados. Nunca usar nombres, tickets o datos de salud reales.
- Las transiciones de la demo se modelan de forma explícita y se prueban. La UI no debe saltarse una precondición de seguridad.
- `Sueño protegido` exige relevo aceptado. Ante estado ambiguo, error o baja confianza, se conserva una ruta segura y visible para Rodrigo.

## Calidad y accesibilidad

- Una acción principal por pantalla; el estado se expresa con texto e icono además de color.
- Usar elementos HTML semánticos y controles nativos. Todo control debe ser utilizable con teclado y tener foco visible.
- Antes de integrar: `npm run lint`, `npm run typecheck`, `npm test` y `npm run build`.
- Añadir pruebas para los cálculos, las reglas de seguridad y cada transición nueva del reducer; revisar manualmente el recorrido móvil.

## Flujo de colaboración

- Trabajar en ramas cortas con cambios acotados. No mezclar refactors ajenos con una funcionalidad.
- Los commits usan Conventional Commits: `feat:`, `fix:`, `docs:`, `test:`, `chore:` o `refactor:`.
- Un cambio de producto debe mantener actualizados sus textos/fixtures y el documento de fase si altera una decisión confirmada.
- No se inicia Fase 2 mientras el recorrido de Fase 1 no pase sus criterios de aceptación.
