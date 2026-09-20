# Etapa 4 — CRUD productos admin (Backend)

**Estado:** hecha  
**Depende de:** Etapa 2, Etapa 3

## Objetivo

CRUD admin con upload de imágenes (Multer), soft delete, validación enum/unique.

## Alcance

- [x] Extender `productService`: `getAllAdmin`, `create`, `update`, `softDelete`.
- [x] Rutas (protegidas vía `permissions.json`, sin middleware inline):
  - `GET /admin/products`
  - `POST /products` — multipart: datos + imágenes
  - `PUT /products/:id` — multipart opcional
  - `DELETE /products/:id` — soft delete (`deletedAt`)
- [x] Usar `middlewares/upload.ts` en POST/PUT (categoría `anteojos/`).
- [x] Nombre archivo: `{productId}_{datetime}.{ext}`.
- [x] Guardar URLs en `images[]`.
- [x] Zod: material enum, campos obligatorios, unique brand+model+color → 409 español.
- [x] Actualizar `permissions.json`:

```json
{
  "admin": [
    { "route": "/admin/products", "methods": ["GET"] },
    { "route": "/products",       "methods": ["POST"] },
    { "route": "/products/:id",  "methods": ["PUT", "DELETE"] }
  ]
}
```

## Fuera de alcance

- Import CSV (etapa 6).
- Precio interno.
- Paginación admin (lista completa MVP).
- Formularios admin (repo `opticapp-front`).

## Criterios de aceptación

- [x] Crear con imágenes → URLs en `/uploads/anteojos/`.
- [x] Duplicado brand+model+color → 409.
- [x] Delete → soft delete, desaparece del catálogo público.
- [x] Publicar (`isPublished: true`) → visible en `GET /products`.
- [x] Solo admin accede (401/403 según caso).
- [x] Errores en español.

## Archivos esperados

```
src/configs/permissions.json
src/routes/product.ts
src/controllers/product.ts
src/services/product.ts
src/validations/product.ts
```

## Notas para el agente

- Reutilizar multer de etapa 2.
- `mapDocument` en todas las responses.
