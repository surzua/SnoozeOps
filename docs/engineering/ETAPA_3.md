# Etapa 3 — Consolidar y evaluar el ciclo

## Gestión local de registros

La pantalla **Registros** presenta fecha, turno, restricciones confirmadas, acción acordada, realización declarada, duración estimada y evento. Se puede corregir realización o duración, o eliminar un registro. Al hacerlo se eliminan los análisis y decisiones vinculados de ese experimento-versión, y el resumen se recalcula sólo con datos vigentes.

## Comparaciones conservadoras

Un descanso entra a un grupo sólo si coincide el tipo de turno y la firma de restricciones activas confirmadas. Se necesitan dos estimaciones conocidas para describir un rango. Las duraciones desconocidas quedan visibles como desconocidas; las acciones parciales y las interrupciones se cuentan por separado.

La interfaz nunca produce un puntaje de salud ni afirma que el cambio lo causó la aplicación. Si falta comparabilidad, explica que los registros se muestran por separado.

## Seguridad y continuidad

- Todo el estado se mantiene local y sintético, aislado de la demo MVP histórica.
- La hidratación valida el esquema actual antes de recuperar una sesión; los datos corruptos se descartan sin bloquear el flujo.
- La UI ofrece estado de carga, fallo del proveedor, salida inválida y respuesta obsoleta. Ninguno reemplaza una propuesta válida ni bloquea el registro manual.
- Los controles se mantienen semánticos, con texto además de color, foco nativo y mensajes de estado.

## Validación de salida

La matriz automatizada cubre el sueño desconocido, acciones parciales, cambio de turno, duplicados, catálogo restringido, resultados contradictorios, corrección/eliminación y comparabilidad. Se ejecutaron `lint`, `typecheck`, `test` y `build` correctamente.
