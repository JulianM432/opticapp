# Modelo de datos — Frontend (types y DTOs)

Types TypeScript en `src/types/`. Deben alinearse con el JSON que devuelve el backend (`opticapp-back`).

> Detalle de schemas Mongoose e índices: ver backend `specs/data-model.md`. Aquí solo lo que consume la UI.

## Enum `material` (Product)

Valores permitidos (para selects y validación de formulario):

- `acetate`
- `metal`
- `tr90`
- `titanium`
- `mixed`
- `other`

## ProductPublic

Catálogo público y detalle. **Sin** `isPublished`, `deletedAt`, ni `price`.

```typescript
interface ProductPublic {
  id: string;
  brand: string;
  model: string;
  color: string;
  material: string;
  description?: string;
  images: string[];
}
```

## ProductAdmin

Listado y formularios admin (etapa 4).

```typescript
interface ProductAdmin {
  id: string;
  brand: string;
  model: string;
  color: string;
  material: string;
  description?: string;
  images: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## PaginatedProducts

Respuesta de `GET /products`:

```typescript
interface PaginatedProducts {
  items: ProductPublic[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

## AuthUser

Respuesta de login y `GET /auth/me`:

```typescript
interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin';
}
```

## Reglas de UI

- API expone `id` (string), nunca `_id`.
- Sin imagen en `images[]` → mostrar `/images/not-found.png`.
- **No** mostrar precios al público.
- Soft-deleted o no publicados no aparecen en catálogo (el backend filtra; 404 en detalle).
