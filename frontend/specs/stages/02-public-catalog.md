# Etapa 2 — Catálogo público + uploads (Frontend)

**Estado:** hecha  
**Depende de:** Etapa 1

## Objetivo

Vidriera paginada con listado y detalle de armazones, layouts públicos, toasts y dark mode.

## Alcance

- [x] `types/product.ts` — `ProductPublic`, `PaginatedProducts`.
- [x] `api/product.ts` — `productApi.getProducts(page, limit)`, `getProductById`.
- [x] `hooks/useProducts.ts`, `hooks/useProduct.ts`.
- [x] `layouts/PublicLayout.tsx`: header (logo, **dark mode toggle**), footer (dirección + teléfono desde constants).
- [x] `pages/CatalogPage.tsx`: grid paginado + controles página anterior/siguiente.
- [x] `pages/ProductDetailPage.tsx`.
- [x] `components/ProductCard.tsx`.
- [x] Placeholder imagen: `/images/not-found.png` si `images` vacío.
- [x] **Toasts** (Sonner) para errores de carga.
- [x] Rutas: `/`, `/products/:id`.
- [x] UI español. Responsive mobile-first.
- [x] **Sin link a admin.**

## Fuera de alcance

- Auth / admin / upload desde formulario (etapas 3–4).
- WhatsApp (etapa 5).
- Precios.
- Filtros y búsqueda avanzada.
- Endpoints y Multer (repo `opticapp-back`).

## Criterios de aceptación

- [x] Catálogo con paginación funcional contra `GET /products`.
- [x] Detalle en `/products/:id`.
- [x] Dark mode toggle persiste preferencia.
- [x] Footer muestra dirección y teléfono.
- [x] Imagen not-found cuando no hay imagen.
- [x] Toasts en errores de API.

## Archivos esperados

```
src/types/product.ts
src/api/product.ts
src/hooks/useProducts.ts
src/hooks/useProduct.ts
src/pages/CatalogPage.tsx
src/pages/ProductDetailPage.tsx
src/components/ProductCard.tsx
src/layouts/PublicLayout.tsx
public/images/not-found.png
src/constants/store.ts
```

## Notas para el agente

- Ver [ui-theme.md](../ui-theme.md).
- Datos vía `hooks/` → `api/`; nunca Axios en pages o components.
