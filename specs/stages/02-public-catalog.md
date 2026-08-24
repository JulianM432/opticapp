# Etapa 2 — Catálogo público + uploads (Backend)

**Estado:** activa  
**Depende de:** Etapa 1

## Objetivo

API de catálogo paginado, detalle de armazones publicados, infraestructura Multer e imágenes estáticas.

## Alcance

- [ ] Model `product.ts` según [data-model.md](../data-model.md) (enum material, soft delete, unique index).
- [ ] `services/product.ts`: `getPublishedPaginated(page, limit)`, `getPublishedById(id)` — excluir `deletedAt`.
- [ ] `controllers/product.ts` + `routes/product.ts`:
  - `GET /products?page=&limit=` → respuesta paginada (ver [architecture.md](../architecture.md)).
  - `GET /products/:id` → detalle publicado; soft-deleted o no publicado → 404.
- [ ] Rutas **públicas** (no en `permissions.json`).
- [ ] Validación Zod ObjectId → 400.
- [ ] **`configs/multer.ts`** + **`middlewares/upload.ts`** (config listo; upload admin en etapa 4).
- [ ] Servir estáticos `/uploads`.
- [ ] Seed opcional: 3–5 productos publicados con imágenes en `uploads/anteojos/`.

## Fuera de alcance

- Auth / admin / upload desde formulario (etapa 4).
- Precios.
- Filtros y búsqueda avanzada.
- UI del frontend (repo `opticapp-front`).

## Criterios de aceptación

- [ ] `GET /products` paginado, solo `isPublished: true` y `deletedAt: null`.
- [ ] Defaults `page=1`, `limit=12`.
- [ ] Response sin `_id`, con `id`.
- [ ] Errores en español.
- [ ] Multer config + carpetas uploads operativas; static `/uploads` sirve archivos.

## Archivos esperados

```
src/models/product.ts
src/services/product.ts
src/controllers/product.ts
src/routes/product.ts
src/validations/product.ts
src/configs/multer.ts
src/middlewares/upload.ts
src/scripts/seed-products.ts   (opcional)
```

## Notas para el agente

- Usar `mapDocument` en service al retornar productos.
- Material enum validado con Zod.
