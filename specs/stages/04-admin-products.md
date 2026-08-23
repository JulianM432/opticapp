# Etapa 4 — CRUD productos admin (Frontend)

**Estado:** pendiente  
**Depende de:** Etapa 2, Etapa 3

## Objetivo

Formularios admin con upload de imágenes, soft delete, toasts y navegación en panel admin.

## Alcance

- [ ] `productApi`: CRUD + FormData para imágenes.
- [ ] `ProductsListPage`, `ProductFormPage`, `ProductForm`.
- [ ] Upload múltiple imágenes en formulario.
- [ ] Select material (enum).
- [ ] Toggle `isPublished`.
- [ ] Confirmación antes de soft delete.
- [ ] Toasts éxito/error.
- [ ] Rutas: `/admin/products`, `/admin/products/new`, `/admin/products/:id/edit`.
- [ ] `AdminLayout` básico con nav.

## Fuera de alcance

- Import CSV (etapa 6).
- Precio interno.
- WhatsApp (etapa 5).
- Paginación admin (lista completa MVP).
- Lógica Multer y soft delete en DB (repo `opticapp-back`).

## Criterios de aceptación

- [ ] Crear producto con imágenes → visible en listado admin.
- [ ] Duplicado brand+model+color → toast/mensaje con error 409 del backend.
- [ ] Delete → desaparece del listado admin y del catálogo público.
- [ ] Publicar → visible en catálogo paginado.
- [ ] Solo admin accede (ProtectedRoute).
- [ ] Errores en español.

## Archivos esperados

```
src/pages/admin/ProductsListPage.tsx
src/pages/admin/ProductFormPage.tsx
src/components/admin/ProductForm.tsx
src/layouts/AdminLayout.tsx
src/api/product.ts          (extender CRUD)
src/types/product.ts        (ProductAdmin)
```

## Notas para el agente

- FormData para POST/PUT con imágenes.
- Material enum según [data-model.md](../data-model.md).
