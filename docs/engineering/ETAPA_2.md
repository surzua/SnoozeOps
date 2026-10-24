# Etapa 2 — IA acotada y revisión adaptativa

La demo conserva datos exclusivamente sintéticos. La revisión opcional se solicita desde `src/app/api/adaptive-analysis/route.ts`; `GEMINI_API_KEY` sólo se lee allí y la clave jamás llega al navegador.

## Contrato y controles

- El servidor manda el contexto mínimo: turno y descanso confirmados, restricción, traba, observación y una memoria de restricciones anteriores.
- La salida estructurada admite únicamente `action`, `clarification` o `abstain`. Una acción debe tener un identificador del catálogo aprobado; no se acepta texto libre.
- La aplicación valida de nuevo la estructura, los límites y que la referencia de contexto coincida con el experimento y versión actuales. Una respuesta tardía se marca obsoleta y no sustituye el plan.
- La tarjeta muestra por separado lo declarado, lo inferido provisionalmente y lo desconocido, junto con la referencia de contexto y hora de generación.
- Sin clave, caída de proveedor o salida inválida, no se inventa una respuesta: se informa “sin nuevo análisis” y permanecen disponibles el plan acordado y el registro manual.

## Memoria y demo

La fixture incluye tres descansos históricos sintéticos. Una obligación familiar de un descanso previo se incluye como memoria descriptiva para que el análisis deba confirmarla antes de tratarla como vigente. El cambio de turno pausa el experimento actual y requiere un contexto nuevo.

La configuración es opcional mediante `.env.example`. El modelo por defecto es `gemini-3.5-flash-lite`, configurable con `GEMINI_MODEL`. La llamada usa el endpoint REST `generateContent` y Structured Output JSON de Gemini.

## Validación de salida

- `npm run typecheck`
- `npm test` (contrato estructurado, catálogo y contexto)
- `npm run lint`
- `npm run build`

Con la configuración sin proveedor, `POST /api/adaptive-analysis` responde `503` y declara que no hubo nuevo análisis, que es el comportamiento seguro esperado.
