# Etapa 2 — Catálogo público + uploads (Frontend)

**Estado:** pendiente  
**Depende de:** Etapa 1

## Objetivo

Vidriera paginada con listado y detalle de armazones, layouts públicos, toasts y dark mode.

## Alcance

- [ ] `types/product.ts` — `ProductPublic`, `PaginatedProducts`.
- [ ] `api/product.ts` — `productApi.getProducts(page, limit)`, `getProductById`.
- [ ] `hooks/useProducts.ts`, `hooks/useProduct.ts`.
- [ ] `layouts/PublicLayout.tsx`: header (logo, **dark mode toggle**), footer (dirección + teléfono desde constants).
- [ ] `pages/CatalogPage.tsx`: grid paginado + controles página anterior/siguiente.
- [ ] `pages/ProductDetailPage.tsx`.
- [ ] `components/ProductCard.tsx`.
- [ ] Placeholder imagen: `/images/not-found.png` si `images` vacío.
- [ ] **Toasts** (Sonner) para errores de carga.
- [ ] Rutas: `/`, `/products/:id`.
- [ ] UI español. Responsive mobile-first.
- [ ] **Sin link a admin.**

## Fuera de alcance

- Auth / admin / upload desde formulario (etapas 3–4).
- WhatsApp (etapa 5).
- Precios.
- Filtros y búsqueda avanzada.
- Endpoints y Multer (repo `opticapp-back`).

## Criterios de aceptación

- [ ] Catálogo con paginación funcional contra `GET /products`.
- [ ] Detalle en `/products/:id`.
- [ ] Dark mode toggle persiste preferencia.
- [ ] Footer muestra dirección y teléfono.
- [ ] Imagen not-found cuando no hay imagen.
- [ ] Toasts en errores de API.

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
