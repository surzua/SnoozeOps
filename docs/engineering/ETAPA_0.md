# Etapa 0 — protección del MVP y contrato del ciclo adaptativo

## Referencia protegida

El MVP presentado en el checkpoint 2 queda fijado en el tag local `mvp-checkpoint-2-frozen`, que apunta al commit `f275038ea2b7fc5d9fc78612ae1b77d72c347d75`. La nueva línea se prepara en la rama corta `stage/0-adaptive-cycle`; antes de compartirla se deben publicar tanto la rama como el tag. Se puede ejecutar la referencia con:

```bash
git checkout mvp-checkpoint-2-frozen
npm ci
npm run dev
```

La ruta `/` continúa siendo exclusivamente la demo histórica de relevo. Esta etapa no cambia sus componentes, reducer, fixtures ni comportamiento.

## Límite entre las dos líneas

| Línea protegida | Nueva línea aislada |
| --- | --- |
| `src/domain/`, `src/data/`, `src/components/` y `src/hooks/use-demo-state.ts` | `src/adaptive-cycle/` |
| Estado local `snoozeops-demo-state-v1` | Reserva de almacenamiento `snoozeops-adaptive-cycle-v1` |
| Relevo, tickets e incidentes | Turno, próximo descanso, restricciones, traba, experimento y observación |

Al cierre de la Etapa 0, `src/adaptive-cycle/` no tenía ruta, componente, hook, reducer ni persistencia. La Etapa 1 lo conecta desde esta línea aislada; el MVP histórico sigue sin importarlo ni reescribirse.

## Contrato mínimo acordado

El contrato vive en `src/adaptive-cycle/domain/types.ts` y usa únicamente datos sintéticos. Incluye:

- Turno confirmado y próximo descanso, ambos con identificadores, horarios explícitos y confirmación.
- Restricción y traba vinculadas al próximo descanso.
- Experimento con identificador, versión y uno de los estados `draft`, `agreed`, `under_review`, `closed`, `paused` o `discarded`.
- Observación posterior vinculada al identificador y versión del experimento; una estimación desconocida se representa con `null`, no con cero.
- Decisión de revisión separada del estado del experimento.

El escenario inicial de `src/adaptive-cycle/fixtures/initial-scenario.ts` es una fixture sintética de validación del contrato. No contiene una recomendación acordada; la lógica determinística posterior se documenta en la Etapa 1.

## Comprobaciones de la etapa

```bash
npm run lint
npm run typecheck
npm test
npm run build
```
