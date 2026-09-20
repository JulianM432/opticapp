# Modelo de datos

Schemas Mongoose en `models/{resource}.ts`. Serialización `_id` → `id` vía `utils/mapDocument.ts`.

## User

Administrador único. Creado con `scripts/initApp.ts` (etapa 3).

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

Valores permitidos:

- `acetate`
- `metal`
- `tr90`
- `titanium`
- `mixed`
- `other`

Validar con Zod en create/update.

### Unicidad (sin duplicados)

**Unique compound index:** `{ brand: 1, model: 1, color: 1 }` (solo documentos con `deletedAt: null` — usar partial index si Mongoose lo soporta, o validar en service).

Regla de negocio: mismo `brand + model` con **colores distintos** = OK. Misma tripleta = **409 Conflict**.

### Soft delete

- Admin `DELETE /products/:id` → set `deletedAt: new Date()`, no borrar documento.
- Queries públicas y listados excluyen `deletedAt != null`.
- No aparece en catálogo ni en admin list (o admin list con filtro "archivados" — **fuera de MVP**, solo ocultos).

### Imágenes

- Archivo en disco vía Multer (etapa 2 infra, etapa 4 upload admin).
- Schema guarda URL, no binario.

### Campos ausentes (por ahora)

| Campo | Razón |
|-------|-------|
| `price` / `internalPrice` | No implementar aún. Consulta por WhatsApp (etapa 5). |
| `category` | MVP = solo armazones |
| `stock` | No e-commerce |

### Índices

- `{ brand: 1, model: 1, color: 1 }` unique (partial: `deletedAt: null`)
- `{ isPublished: 1, deletedAt: 1, brand: 1 }` — listado público paginado

## DTOs (contrato JSON con el frontend)

### ProductPublic

```typescript
{
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

```typescript
{
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
{
  items: ProductPublic[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

### AuthUser

```typescript
{
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin';
}
```

## Criterios de aceptación

- [ ] User con email único, firstName, lastName, password hasheado.
- [ ] Product material solo valores del enum.
- [ ] Unique brand+model+color (activos).
- [ ] Soft delete vía `deletedAt`.
- [ ] API nunca expone `_id`.
- [ ] Sin campo price.
