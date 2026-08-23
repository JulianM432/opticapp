# Arquitectura — Frontend

## Estructura del repo

Este directorio **es** el repo frontend (`opticapp-front`):

```
opticapp-front/              ← raíz del repo (este workspace)
├── SPECS.md
├── specs/
├── .cursor/rules/
├── package.json
├── vite.config.ts           # Alias @/ → src/
├── components.json          # Config Shadcn
├── public/
│   ├── logo.svg
│   ├── favicon.ico
│   └── images/
│       └── not-found.png
└── src/
    ├── main.tsx
    ├── App.tsx              # React Router v7
    ├── api/                 # Única capa HTTP (Axios)
    ├── components/
    │   └── ui/              # Shadcn (generados)
    ├── context/
    ├── hooks/
    ├── layouts/
    ├── pages/
    ├── lib/                 # Solo cn() de Shadcn
    ├── helpers/             # ej. whatsapp.ts (etapa 5)
    ├── types/
    └── constants/
```

El backend vive en un **repo hermano** (`opticapp-back`). Ver su `specs/architecture.md` para endpoints y auth del servidor.

---

## Patrón de capas

`pages → hooks → api → backend`

| Carpeta | Para qué sirve | Ejemplos |
|---------|----------------|----------|
| `api/` | Única capa que habla con el backend (Axios). Un archivo por recurso. | `product.ts`, `auth.ts`, `client.ts` |
| `components/` | Piezas de UI reutilizables propias del proyecto. | `ProductCard`, `ProtectedRoute`, `WhatsAppButton` |
| `components/ui/` | Componentes de Shadcn (generados, no editar a mano salvo customización). | `Button`, `Input`, `Dialog` |
| `context/` | Estado global de React cuando varias pages lo necesitan. | `AuthContext` (user logueado) |
| `hooks/` | Lógica con estado/effects reutilizable entre pages. | `useAuth`, `useProducts` |
| `layouts/` | Estructura compartida de page (header, sidebar, footer). | `PublicLayout`, `AdminLayout` |
| `pages/` | Una page por ruta. Orquesta hooks + components. | `CatalogPage`, `LoginPage` |
| `types/` | Interfaces y types TS compartidos. | `ProductPublic`, `AuthUser` |
| `constants/` | Valores fijos sin lógica. | `store.ts` |
| `lib/` | Utilidades de setup de Shadcn/Tailwind (`cn()`). **No** lógica de negocio. | `utils.ts` |
| `helpers/` | Helpers de negocio de UI (ej. WhatsApp). | `whatsapp.ts` |

---

## Routing

| Ruta | Page | Acceso | Etapa |
|------|------|--------|-------|
| `/` | Catálogo (grid de armazones) | Público | 2 |
| `/products/:id` | Detalle de armazón | Público | 2 |
| `/admin/login` | Login admin | Público | 3 |
| `/admin` | Dashboard o login si no auth | Admin / público | 3 |
| `/admin/profile` | Mi perfil (email, nombre, apellido) | Admin | 3 |
| `/admin/products` | Listado admin | Admin | 4 |
| `/admin/products/new` | Crear producto | Admin | 4 |
| `/admin/products/:id/edit` | Editar producto | Admin | 4 |

Rutas bajo `/admin/*` (excepto `/admin/login`) usan `ProtectedRoute` + verificación de sesión vía `/auth/me`.

---

## Contrato de API (consumido por este repo)

Base URL: `VITE_API_URL` (ej. `http://localhost:3000`). Axios con `withCredentials: true`.

### Respuestas exitosas

Payload **directo**, sin wrapper `{ data: ... }`.

### Listado paginado

`GET /products?page=1&limit=12`:

```json
{
  "items": [ /* ProductPublic[] */ ],
  "total": 48,
  "page": 1,
  "limit": 12,
  "totalPages": 4
}
```

Defaults: `page=1`, `limit=12`.

### Errores

Siempre `{ "message": "..." }` en **español**. Mostrar al usuario vía toasts o mensajes inline.

### Endpoints usados

| Endpoint | Uso en frontend | Etapa |
|----------|-----------------|-------|
| `GET /health` | Health check (bootstrap) | 1 |
| `GET /products` | Catálogo paginado | 2 |
| `GET /products/:id` | Detalle | 2 |
| `POST /auth/login` | Login admin | 3 |
| `POST /auth/logout` | Logout | 3 |
| `GET /auth/me` | Restaurar sesión | 3 |
| `GET /admin/products` | Listado admin | 4 |
| `POST /products` | Crear (FormData) | 4 |
| `PUT /products/:id` | Editar (FormData) | 4 |
| `DELETE /products/:id` | Soft delete | 4 |

Imágenes de producto: URLs absolutas o relativas servidas por el backend en `/uploads/anteojos/...`.

---

## Autenticación (etapa 3+)

1. Cookie `httpOnly` gestionada por el backend (no usar `localStorage` para el token).
2. `AuthContext` llama `GET /auth/me` al montar (y en rutas `/admin/*`).
3. 200 → user en context. 401 → user null, redirigir a login.
4. Tras login exitoso → actualizar context con user devuelto.

---

## CORS y cookies

- Axios: `withCredentials: true` en `api/client.ts`.
- Desarrollo: frontend `http://localhost:5173`, backend `http://localhost:3000`.

---

## Variables de entorno (`.env.example`)

```
VITE_API_URL=http://localhost:3000
```

> `VITE_WHATSAPP_NUMBER` se agrega en etapa 5.
