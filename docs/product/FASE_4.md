# SnoozeOps — Fase 4: Pulido para Checkpoint 2

**Estado**: Lista para implementación en Antigravity IDE.

## 1. Propósito

Convertir el prototipo funcional en una experiencia presentable, estable y controlable para el pitch de 5 minutos frente al jurado de Makana. Esta fase prioriza la recuperación instantánea ante un error de presentación, la legibilidad de los estados decisivos y la demostración honesta de que el motor de reglas sigue operando sin conectividad.

No añade automatización real, conectividad ni nuevas reglas de negocio. Hace más clara, confiable y rápida de presentar la experiencia que ya construyeron las Fases 1–3.

## 2. Decisiones de producto cerradas

| Tema | Decisión |
| --- | --- |
| Hard Reset | El wordmark `SnoozeOps` de la cabecera ejecuta un reinicio inmediato, sin diálogo de confirmación. Es una herramienta reservada al presentador: deja la demo lista desde Pantalla 1. |
| Accesibilidad del wordmark | El wordmark será un `<button>`, no un enlace. Conserva el estilo visual de logo, foco visible y `aria-label="Reiniciar demo y volver al inicio"`. |
| Fuente única de reset | Todos los CTAs de reinicio existentes y el wordmark invocan la misma función `resetDemo` / acción `reset`. Ningún componente limpia fragmentos de estado por su cuenta. |
| Navegación | Se eliminan animaciones de entrada, de Bottom Sheet y transiciones que puedan retrasar o distraer. La interacción no depende de `setTimeout`, temporizadores reales ni esperas visuales. |
| Caída de red | El switch representa una condición simulada de conectividad y solo cambia el estado y la explicación visual de la demo. No desconecta realmente el navegador, no consulta `navigator.onLine` y no hace llamadas externas. |
| Fallback | El motor de incidentes ya es local y determinístico. Con o sin red simulada, recibe los mismos datos y devuelve las mismas decisiones. El valor demostrado es continuidad operativa, no un cambio de algoritmo. |
| Persistencia | El modo offline simulado se persiste junto con el resto de la demo. Un Hard Reset lo devuelve a su valor inicial (`false`) y elimina el estado previo de `localStorage`. |
| Lenguaje de confianza | La UI debe hablar de `motor local activo` y `rutas determinísticas`, sin prometer infalibilidad, cobertura absoluta ni que una conexión real fue desconectada. |

## 3. Resultado demostrable

Al terminar esta fase, la aplicación se sentirá como un producto final optimizado para presentaciones:

1. **Demo fluida y recuperable:** el flujo completo se puede recorrer en menos de 4 minutos y volver al punto inicial en cualquier momento.
2. **UI legible a distancia:** los estados críticos, responsables y próximos pasos son distinguibles sin depender únicamente del color.
3. **Resiliencia evidenciable:** el presentador puede activar `Simular caída de internet` y demostrar que los mismos P3 y P1 siguen siendo resueltos por el motor local determinístico.
4. **Demo repetible:** se pueden ejecutar tres recorridos completos consecutivos sin arrastre de incidentes, estado de red, relevo o datos persistidos del caso anterior.

## 4. Alcance de la Fase 4

### Incluido

- Convertir el wordmark de `SnoozeOps` de la cabecera en el disparador accesible de Hard Reset.
- Reutilizar la función existente de reset para restaurar de forma atómica todo el estado de la demo.
- Retirar el botón textual redundante `Reiniciar demo` de la cabecera, ya que el wordmark cumple esa misma función discreta.
- Eliminar las animaciones y transiciones de interfaz que no aportan información durante el pitch.
- Refinar tipografías, contrastes, jerarquía y señalización visual de `incident-card.tsx`.
- Añadir un switch `Simular caída de internet` al Bottom Sheet del simulador, junto con el estado visible del fallback local.
- Mantener el modo de red simulado dentro del estado persistido y reiniciarlo correctamente.
- Añadir pruebas de dominio y de recorrido para reset, modo offline y consistencia de las decisiones.
- Limpieza final de código, remoción de `console.log` y revisión de datos sintéticos y textos de demo.

### Excluido explícitamente

- Nuevas funcionalidades ajenas al flujo crítico de la demo.
- Conexión a APIs externas reales, health checks, Service Workers, detección real de conectividad o bases de datos.
- Cambiar las reglas de clasificación, escalamiento, timeout o separación de escenarios definidas en Fase 2.
- Afirmar que una red real fue desconectada o que SnoozeOps garantiza cobertura absoluta.

## 5. Contrato de estado y comportamiento

### 5.1 Estado de conectividad simulada

Extender el estado existente sin alterar la lógica de incidentes:

```text
demo
├── selectedShift: day | night
├── screen: shift | plan | handoff | activation | morning
├── handoffStatus: not_requested | pending | accepted | declined
├── activationMode: none | protected | filtered
├── simulation
│   ├── isPanelOpen: boolean
│   ├── isNetworkMocked: boolean
│   ├── nightHistory: RoutingDecision[]
│   └── securityTest: RoutingDecision | null
└── morning
    └── isSimulated: boolean
```

Reglas obligatorias:

- `isNetworkMocked` inicia en `false`.
- El switch solo puede alterarse con una acción explícita del reducer, por ejemplo `toggle_network_mock`.
- Su valor se persiste como parte de `DemoState` y se hidrata con `false` para estados antiguos que no lo contengan.
- Su valor no modifica `evaluateIncident`, `resolveAcknowledgement`, los fixtures, la severidad, el relevo, los tiempos de revisión ni el aislamiento entre `night_simulation` y `security_test`.
- `RESET_DEMO` crea un estado inicial nuevo con `isNetworkMocked: false`, Bottom Sheet cerrado, historiales vacíos y mañana no simulada.

### 5.2 Contrato visual del modo offline

El switch se muestra dentro del Bottom Sheet, cerca de la explicación del simulador, con una etiqueta y texto inequívocos:

| Estado | Etiqueta del control | Mensaje visible de apoyo |
| --- | --- | --- |
| `false` | `Simular caída de internet` desactivado | `Conexión simulada disponible · Motor local listo` |
| `true` | `Simular caída de internet` activado | `Conexión simulada no disponible · Motor local activo` |

Reglas de presentación:

- Implementar el control con un `<input type="checkbox">` o un botón con `role="switch"` y `aria-checked`; no usar un `div` clickeable.
- El mensaje debe ser textual y acompañado por un icono de estado; no depende únicamente del color.
- Mantener visible la frase `Rutas determinísticas y offline` o una formulación equivalente.
- Al activar o desactivar el switch, los incidentes ya inyectados permanecen intactos y no se reinicia la demo.
- Durante el modo offline, la inyección del P3 y del P1, la confirmación de Andrea, el timeout simulado y el paso a la mañana se comportan exactamente igual que en modo normal.

### 5.3 Hard Reset

El Hard Reset está disponible desde cualquier pantalla mediante el wordmark de la cabecera. No pide confirmación: su propósito es recuperar el control durante el pitch.

Al ejecutarse debe, en una sola transición:

1. Eliminar la clave de persistencia de `localStorage` cuando esté disponible.
2. Ejecutar la acción central `reset` / `RESET_DEMO`.
3. Restaurar una nueva instancia del estado inicial: turno Día, Pantalla 1 (`shift`), relevo `not_requested`, modo de activación `none`, simulador cerrado, `isNetworkMocked: false`, historiales vacíos y mañana no simulada.
4. Permitir que el mecanismo normal de persistencia guarde ese estado limpio sin mostrar error si `localStorage` está bloqueado.
5. Mantener el foco en el botón wordmark después de la acción; no hacer scroll ni navegación por ancla.

El CTA `Preparar otro turno` de la pantalla de activación y `Preparar mi próximo turno` de la mañana deben llamar a esta misma operación.

## 6. Criterios visuales y de rendimiento

### 6.1 Navegación inmediata

- Quitar `@keyframes` de entrada de `.screen` y `.simulation-panel`.
- Quitar o establecer en `0ms` las transiciones decorativas de la barra de progreso, botones y paneles. Los cambios de estado deben ser inmediatos.
- No introducir `setTimeout`, esperas artificiales ni temporizadores de red para el flujo de presentación.
- Como criterio de demo, un clic válido debe mostrar su cambio de estado visual antes de 100 ms en condiciones locales normales. No es una medición de red.
- Se conserva `prefers-reduced-motion` como protección adicional, aunque la experiencia estándar ya no tendrá animaciones perceptibles.

### 6.2 Legibilidad y señalización

- Todo texto de estado, regla aplicada, siguiente responsable y acción de incidencia usa al menos `16px` (`1rem`).
- Los resultados que el jurado debe retener —por ejemplo, `Pendiente de revisión`, `Andrea confirmó` o `Alerta enviada a Rodrigo`— usan al menos `20px` (`1.25rem`) o una jerarquía visual equivalente claramente predominante.
- Las etiquetas P1/P2/P3, íconos de estado y mensajes textuales se presentan juntos. Ningún estado se entiende solo por rojo, ámbar, verde o borde.
- Mantener contraste suficiente entre texto y fondo; los mensajes secundarios no pueden sustituir al estado principal.
- Revisar la interfaz a ancho móvil (320 px) y a ancho de la aplicación (hasta 544 px) sin recortes, superposición ni pérdida de jerarquía.
- El Bottom Sheet debe seguir permitiendo scroll interno y mostrar un control claro para cerrarlo.

## 7. Estructura de archivos a modificar

Las rutas corresponden a la estructura actual del proyecto:

```text
src/
  components/
    demo-app.tsx          // Actualizar: wordmark como botón de reset y eliminar reset textual redundante
    simulation-panel.tsx  // Actualizar: switch y estado visible de conectividad simulada
    incident-card.tsx     // Actualizar: jerarquía tipográfica, iconos y alto contraste
  app/
    globals.css           // Actualizar: eliminar animaciones y ajustar legibilidad/contraste
  domain/
    types.ts              // Actualizar: isNetworkMocked y acción toggle_network_mock
    demo-reducer.ts       // Actualizar: estado inicial, toggle y reset atómico
    demo-reducer.test.ts  // Actualizar: pruebas de toggle y reset completo
    incident-engine.test.ts // Actualizar: verificar que red simulada no cambia decisiones, si el contexto lo expone
  hooks/
    use-demo-state.ts     // Actualizar: hidratación compatible y persistencia de isNetworkMocked
```

Responsabilidades:

| Unidad | Responsabilidad |
| --- | --- |
| `demo-reducer.ts` | Fuente de verdad para `isNetworkMocked`, sus transiciones y el estado inicial completo. |
| `use-demo-state.ts` | Eliminar/persistir el estado de forma segura e hidratar snapshots anteriores sin `isNetworkMocked`. |
| `demo-app.tsx` | Exponer el Hard Reset global a través del wordmark y reutilizar el mismo callback en los CTAs existentes. |
| `simulation-panel.tsx` | Presentar y alternar el switch; no modificar la lógica de enrutamiento. |
| `incident-card.tsx` y `globals.css` | Hacer distinguibles los estados para un jurado a distancia, sin depender solo del color. |

## 8. Orden de implementación

1. **Estado y compatibilidad:** añadir `isNetworkMocked: false` al estado inicial, la acción del reducer y la hidratación segura de snapshots previos.
2. **Reset centralizado:** comprobar que `resetDemo` borra persistencia, despacha una nueva instancia inicial y es reutilizable desde todos los CTAs.
3. **Wordmark accesible:** reemplazar el enlace del logo por el botón semántico de Hard Reset y retirar el botón textual redundante de la cabecera.
4. **Modo offline visible:** implementar el switch, el mensaje de estado y su persistencia sin tocar el motor de incidentes.
5. **Pulido visual:** eliminar animaciones, elevar la jerarquía de los incidentes y revisar contraste, iconos y responsividad.
6. **Limpieza:** eliminar logs, textos obsoletos y cualquier rastro que prometa integración de red real.
7. **Pruebas automatizadas:** cubrir reducer, persistencia compatible y estabilidad de decisiones en ambos modos de red simulada.
8. **Ensayo de pitch:** ejecutar los tres recorridos descritos abajo, incluyendo resets desde el Bottom Sheet abierto.

## 9. Recorridos de validación manual

Cada recorrido empieza desde un Hard Reset y termina con otro. Ninguno puede heredar estado del anterior.

| Recorrido | Pasos críticos | Resultado esperado |
| --- | --- | --- |
| 1. Noche habitual | Aceptar relevo → Activar sueño protegido → Inyectar P3 → Activar caída de internet → Simular la mañana | P3 agrupado y pendiente de revisión; no se modifica por el modo offline; mañana muestra el resultado habitual correcto. |
| 2. Red de seguridad confirmada | Hard Reset → Aceptar relevo → Activar sueño protegido → Activar caída de internet → Inyectar P1 → Andrea confirma | El motor local mantiene la ruta; Andrea asume el P1 y Rodrigo no recibe alerta. La prueba sigue separada del resumen habitual. |
| 3. Escalamiento conservador | Hard Reset → Aceptar relevo → Activar sueño protegido → Inyectar P1 → Andrea no responde | Rodrigo recibe la alerta crítica simulada. El resultado no se mezcla con la noche habitual. |

Comprobaciones adicionales:

- Ejecutar Hard Reset con el Bottom Sheet abierto y verificar que se cierra sin dejar overlay ni incidentes visibles.
- Recargar el navegador con `isNetworkMocked: true` y verificar que la UI lo recupera. Ejecutar Hard Reset y verificar que vuelve a `false` tras otra recarga.
- Ejecutar el Recorrido 1 con la caída de red desactivada y activada; las decisiones y textos de enrutamiento deben ser idénticos salvo por el indicador de conectividad simulada.

## 10. Criterios de aceptación (DoD Fase 4)

### Hard Reset y estado

- [ ] El wordmark es un botón accesible con `aria-label="Reiniciar demo y volver al inicio"`; no navega a una ancla.
- [ ] Al presionarlo desde cualquiera de las cinco pantallas, la demo vuelve a Pantalla 1 en menos de 1 segundo sin diálogo de confirmación.
- [ ] El reset cierra el Bottom Sheet, borra ambos historiales, desactiva el modo offline, reinicia mañana y restablece turno, relevo y modo de activación.
- [ ] Los CTAs de reinicio de activación y mañana invocan exactamente la misma operación central de reset.
- [ ] Si `localStorage` no está disponible, la demo sigue reiniciándose en memoria sin errores visibles.

### Modo offline y motor determinístico

- [ ] El Bottom Sheet contiene un switch accesible `Simular caída de internet` y un mensaje textual con icono para ambos estados.
- [ ] El switch se persiste al recargar y los snapshots anteriores sin esa propiedad se hidratan con `false`.
- [ ] Activar o desactivar el switch no borra incidentes ni altera la severidad, regla, destinatario, timeout, estado ni escenario de un P3 o P1.
- [ ] Con el modo offline activo, el P3 habitual, el P1 confirmado y el P1 sin respuesta completan el mismo flujo determinístico que con el modo desactivado.
- [ ] La UI no afirma haber desconectado una red real ni promete una cobertura infalible.

### Presentación y calidad

- [ ] Ninguna transición o animación decorativa agrega espera perceptible; los cambios de estado son visibles antes de 100 ms en ejecución local normal.
- [ ] Estados críticos, responsables y próximos pasos combinan texto, icono y color; no dependen solo del color.
- [ ] Los textos de estado cumplen el mínimo de `16px` y los resultados decisivos tienen jerarquía visual de al menos `20px` o equivalente.
- [ ] La interfaz se revisó en 320 px y 544 px sin recortes, solapamientos ni pérdida de acciones.
- [ ] No quedan `console.log` de desarrollo ni datos que no sean sintéticos.
- [ ] Los tres recorridos de validación se completan consecutivamente sin errores ni datos arrastrados.
