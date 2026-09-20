# Etapa 6 — Import CSV/Excel (Frontend)

**Estado:** pendiente  
**Depende de:** Etapa 4 (CRUD admin)

## Objetivo

UI para que el admin importe productos en lote desde CSV o Excel.

> **Nota:** Spec de alto nivel. Detalle al activar la etapa.

## Alcance preliminar

- [ ] Página o sección en admin: upload de archivo + resultado de importación.
- [ ] Descargable de plantilla CSV de ejemplo.

## Fuera de alcance (hasta definir en activación)

- Parser CSV, bulk insert, endpoint import (paquete `backend/`).
- Precios.

## Criterios de aceptación (borrador)

- [ ] Admin autenticado puede subir CSV desde la UI.
- [ ] Resultado muestra filas OK y filas con error (según respuesta del backend).
- [ ] Plantilla CSV descargable desde admin.

## Archivos esperados (estimado)

```
src/pages/admin/ProductImportPage.tsx
src/api/product-import.ts
public/templates/products-template.csv
```

## Notas para el agente

- **No implementar** hasta que `SPECS.md` marque esta etapa como `activa`.
- Coordinar contrato con backend al activar.
