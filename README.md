# SnoozeOps

Demo local y sintética para que una persona TI con turnos rotativos identifique una traba, acuerde una acción viable y revise qué ocurrió. Su objetivo es aprender qué cambio podría abrir una oportunidad de descanso; no afirma que ya haya conseguido una hora adicional de sueño en personas reales.

## Qué demuestra

- Declaración original de la traba y confirmación manual de su categoría: no se infiere una causa con palabras sueltas.
- Dos familias de acciones verificables: cierre de revisión voluntaria y preparación de una tarea no urgente.
- Aceptar, ajustar, rechazar y reintentar sin duplicar experimentos; cada intento conserva su antecedente.
- Registro explícito de acción sí/parcial/no, duración estimada conocida o desconocida, cero declarado, interrupción y otra traba.
- Evolución que distingue mantener, aclarar, adaptar o reconocer un límite. Una misma acción nunca se presenta como adaptación.
- Corrección o eliminación que invalida análisis dependientes y devuelve a un punto seguro del ciclo.
- Persistencia local aislada bajo `snoozeops-adaptive-cycle-v3`. Una recarga durante análisis lo vuelve reintentable; jamás toca el almacenamiento del MVP histórico.

## Ejecutar

Requiere Node 22 y npm 10.

```bash
npm install
npm run dev
```

Abre la URL local mostrada por Next. Para validar:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Gemini es opcional y sólo se configura en el servidor con `GEMINI_API_KEY` en `.env.local`. La petición completa tiene un presupuesto de 12 segundos y un reintento transitorio. Sin proveedor, el plan y el registro manual siguen utilizables.

## Límites deliberados

Sólo hay fixtures sintéticas. Las duraciones son estimaciones declaradas; una observación o comparación no prueba causalidad. La demo no diagnostica, prescribe, cambia alertas, protocolos, turnos, WhatsApp, tickets ni inventa relevo o cobertura.
