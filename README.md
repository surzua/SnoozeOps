# SnoozeOps

SnoozeOps explora un ciclo breve para personas TI con turnos rotativos: identificar una traba del próximo descanso, acordar una sola acción viable y revisar lo ocurrido después. Esta rama completa las **Etapas 2 y 3** del roadmap sobre el ciclo local y sintético de la Etapa 1.

## Qué se puede probar

- Turnos de día, tarde y noche con horarios explícitos y un próximo descanso confirmado.
- Una propuesta de catálogo que distingue la revisión voluntaria de tickets de las alertas que exige la guardia.
- Aceptar, ajustar o rechazar una propuesta; el rechazo no registra un incumplimiento.
- Registro de acción realizada, parcial o no realizada, sueño estimado o desconocido y una traba posterior.
- Tarjeta de evolución con una decisión determinística y una aclaración acotada.
- Cambio de turno que pausa el experimento anterior para revalidar el contexto.
- Revisión adaptativa opcional desde el servidor: una salida estructurada sólo puede pedir una aclaración, proponer una acción del catálogo o abstenerse. Sin proveedor, el registro manual sigue disponible y la UI lo declara explícitamente.
- Historial de tres descansos sintéticos, memoria de una restricción previa y gestión local para corregir o eliminar registros.
- Comparación conservadora: exige mismo turno, restricciones confirmadas y dos duraciones conocidas; nunca crea puntajes de salud ni atribuye una causa.

El estado se conserva sólo en el dispositivo bajo una clave distinta a la del MVP histórico. Los controles de demostración cargan fixtures sintéticas, simulan dos resultados alternativos y reinician sólo este flujo.

## Ejecutar localmente

Se necesita Node.js 22 y npm 10.

```bash
npm install
npm run dev
```

La revisión IA usa Gemini de forma opcional. Copia `.env.example` a `.env.local`, completa `GEMINI_API_KEY` localmente y reinicia el servidor; nunca uses una variable `NEXT_PUBLIC_` ni subas `.env.local`.

Abre la URL local indicada, normalmente `http://localhost:3000`. Para validar el proyecto completo:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Límites deliberados

La duración de descanso es declarada, no medida, y una observación no demuestra causalidad. La aplicación no diagnostica, prescribe ni modifica alertas, protocolos, calendarios, WhatsApp o tickets. No usa datos personales reales, cuentas ni sincronización. La integración opcional se configura sólo en el servidor mediante `.env` a partir de `.env.example`; nunca se entrega una clave al navegador.

## MVP histórico protegido

La demo de relevo presentada en el checkpoint 2 se conserva en el tag local `mvp-checkpoint-2-frozen`. Esta línea de desarrollo es independiente: consulta [la referencia de la Etapa 0](docs/engineering/ETAPA_0.md), [el alcance de la Etapa 1](docs/engineering/ETAPA_1.md), [la Etapa 2](docs/engineering/ETAPA_2.md) y [la Etapa 3](docs/engineering/ETAPA_3.md).
