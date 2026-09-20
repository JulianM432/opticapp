# Modelo de datos

Schemas Mongoose en `backend/src/models/{resource}.ts`. Types TypeScript en `frontend/src/types/`. Serialización `_id` → `id` vía `backend/src/utils/mapDocument.ts`.

## User

Administrador único. Creado con `backend/src/scripts/initApp.ts` (etapa 3).

| Campo | Tipo | Obligatorio | Notas |
|-------|------|-------------|-------|
| `_id` | ObjectId | auto | |
| `email` | String | sí | Único, lowercase, trim |
| `password` | String | sí | Hash bcrypt. Nunca en responses |
| `firstName` | String | sí | Nombre (UI: "nombre") |
| `lastName` | String | sí | Apellido |
| `role` | String | sí | Enum: `'admin'`. Default: `'admin'` |
| `createdAt` | Date | auto | timestamps |
| `updatedAt` | Date | auto | timestamps |

### Índices

- `email`: unique

### Reglas

- Password bcrypt cost ≥ 10.
- `/auth/me` y login responden: `{ id, email, firstName, lastName, role }`.
- Un solo admin en MVP. Sin registro público.

## Product (armazón)

| Campo | Tipo | Obligatorio | Notas |
|-------|------|-------------|-------|
| `_id` | ObjectId | auto | |
| `brand` | String | sí | Marca |
| `model` | String | sí | Modelo |
| `color` | String | sí | Color |
| `material` | String | sí | Enum — ver abajo |
| `description` | String | no | |
| `images` | String[] | no | URLs públicas (`/uploads/anteojos/...`) |
| `isPublished` | Boolean | sí | Default: `false` |
| `deletedAt` | Date | no | **Soft delete.** `null` = activo |
| `createdAt` | Date | auto | timestamps |
| `updatedAt` | Date | auto | timestamps |

### Enum `material`

Valores permitidos (backend Zod + frontend selects):

- `acetate`
- `metal`
- `tr90`
- `titanium`
- `mixed`
- `other`

### Unicidad (sin duplicados)

**Unique compound index:** `{ brand: 1, model: 1, color: 1 }` (solo documentos con `deletedAt: null`).

Regla de negocio: mismo `brand + model` con **colores distintos** = OK. Misma tripleta = **409 Conflict**.

### Soft delete

- Admin `DELETE /products/:id` → set `deletedAt: new Date()`, no borrar documento.
- Queries públicas y listados excluyen `deletedAt != null`.

### Campos ausentes (por ahora)

| Campo | Razón |
|-------|-------|
| `price` / `internalPrice` | No implementar aún. Consulta por WhatsApp (etapa 5). |
| `category` | MVP = solo armazones |
| `stock` | No e-commerce |

## DTOs (contrato JSON)

### ProductPublic

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

### ProductAdmin

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

### PaginatedProducts

```typescript
interface PaginatedProducts {
  items: ProductPublic[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

### AuthUser

```typescript
interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin';
}
```

## Reglas de UI (frontend)

- API expone `id` (string), nunca `_id`.
- Sin imagen en `images[]` → mostrar `/images/not-found.png`.
- **No** mostrar precios al público.
- Soft-deleted o no publicados no aparecen en catálogo (el backend filtra; 404 en detalle).
