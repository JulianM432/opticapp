# Etapa 6 — Import CSV/Excel (Backend)

**Estado:** pendiente  
**Depende de:** Etapa 4 (CRUD admin)

## Objetivo

Permitir al admin importar productos en lote desde archivo CSV o Excel.

> **Nota:** Esta spec es intencionalmente de alto nivel. El detalle de implementación se definirá cuando esta etapa se active, tras revisar etapas anteriores.

## Alcance preliminar

- [ ] Endpoint `POST /admin/products/import` (multipart/form-data).
- [ ] Soporte CSV como mínimo. Excel (.xlsx) como stretch goal.
- [ ] Parser que mapee columnas a campos de Product ([data-model.md](../data-model.md)).
- [ ] Validación fila por fila; reportar errores parciales (cuáles filas fallaron y por qué).
- [ ] Transacción o bulk insert con manejo de duplicados (definir criterio al activar etapa).

### Columnas esperadas (borrador)

| Columna CSV | Campo Product | Obligatorio |
|-------------|---------------|-------------|
| brand | brand | sí |
| model | model | sí |
| color | color | sí |
| material | material | sí |
| description | description | no |
| images | images (URLs separadas por `;`) | no |
| isPublished | isPublished (`true`/`false`) | no, default false |

## Fuera de alcance (hasta definir en activación)

- Sincronización bidireccional.
- Import incremental / diff.
- Validación de URLs de imágenes (HEAD request).
- Precios.
- UI de import (repo `opticapp-front`).

## Criterios de aceptación (borrador)

- [ ] Admin autenticado puede subir CSV válido e importar productos.
- [ ] CSV inválido → 400 con detalle de errores.
- [ ] Import parcial reporta filas OK y filas con error.

## Preguntas abiertas (resolver al activar etapa)

1. ¿Duplicados por `brand + model + color` → skip, error o update?
2. ¿Límite de filas por import?
3. ¿Solo CSV o también .xlsx desde el inicio?

## Archivos esperados (estimado)

```
src/services/product-import.ts
src/controllers/product-import.ts
src/routes/product-import.ts
src/validations/product-import.ts
```

## Notas para el agente

- **No implementar** hasta que `SPECS.md` marque esta etapa como `activa`.
- Al activar, actualizar esta spec con respuestas a preguntas abiertas antes de escribir código.
