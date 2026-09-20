# Arquitectura — OpticApp (monorepo)

## Estructura del monorepo

```
opticapp/                    ← raíz del workspace (este repo)
├── SPECS.md
├── specs/
├── .cursor/rules/
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── backend/                 # Paquete opticapp-back
│   ├── package.json
│   ├── .env.example
│   ├── uploads/
│   └── src/
│       ├── index.ts
│       ├── configs/
│       ├── middlewares/
│       ├── routes/
│       ├── controllers/
│       ├── services/
│       ├── models/
│       ├── validations/
│       └── scripts/
└── frontend/                # Paquete opticapp-front
    ├── package.json
    ├── .env.example
    ├── vite.config.ts
    ├── public/
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── api/
        ├── components/
        ├── context/
        ├── hooks/
        ├── layouts/
        ├── pages/
        ├── types/
        └── constants/
```

En desarrollo corren **dos procesos separados**: backend en `:5000`, frontend en `:5173`. El monorepo unifica código y specs, no el despliegue.

---

## Backend (`backend/`)

### Patrón de capas

`routes → controllers → services → models`

| Capa | Responsabilidad | No debe |
|------|-----------------|---------|
| `routes` | Definir path, método HTTP, handler | Contener lógica ni middlewares de auth |
| `controllers` | Parsear req, invocar service, formatear res | Acceder a Mongoose directo |
| `services` | Lógica de negocio, orquestar models | Conocer req/res de Express |
| `models` | Schema + índices Mongoose | Validar HTTP |
| `middlewares` | Auth, authorize, error handler | Lógica de negocio |
| `validations` | Schemas de input (Zod) | Acceder a DB |

Un recurso = un archivo `{resource}.ts` por carpeta (sin `.routes`, `.controller`, `.service`).

### Convención de rutas HTTP

**Las rutas NO llevan prefijo `/api`.**

| Correcto | Incorrecto |
|----------|------------|
| `GET /products` | `GET /api/products` |
| `POST /auth/login` | `POST /api/auth/login` |

El frontend usa `VITE_API_URL` apuntando a la raíz del backend (ej. `http://localhost:5000`).

### Contrato de API

- Respuestas OK: `res.json(data)` — payload directo, sin wrapper `{ data }`.
- Listado paginado: `{ items, total, page, limit, totalPages }`. Defaults: `page=1`, `limit=12`.
- Errores: `{ "message": "..." }` en **español**.
- Serialización: exponer `id`, nunca `_id`.

### Upload de imágenes

| Aspecto | Decisión |
|---------|----------|
| Librería | Multer |
| Almacenamiento | Disco: `backend/uploads/{categoria}/` |
| Categorías | `anteojos/` (MVP), `lentes/` (reservada) |
| Servir archivos | `express.static` en `/uploads` |

URL ejemplo: `http://localhost:5000/uploads/anteojos/674abc_20260820143000.jpg`

### Auth (etapa 3+)

1. `POST /auth/login` con email + password (público).
2. JWT en cookie `httpOnly`, `sameSite: 'lax'`, `secure: true` en production.
3. Middlewares globales `authenticate` + `authorize` leen `configs/permissions.json`.
4. Admin único creado con `scripts/initApp.ts`.

### Endpoints

| Endpoint | Acceso | Etapa |
|----------|--------|-------|
| `GET /health` | Público | 1 |
| `GET /products` | Público, paginado | 2 |
| `GET /products/:id` | Público | 2 |
| `POST /auth/login` | Público | 3 |
| `POST /auth/logout` | Admin | 3 |
| `GET /auth/me` | Admin | 3 |
| `GET /admin/products` | Admin | 4 |
| `POST /products` | Admin | 4 |
| `PUT /products/:id` | Admin | 4 |
| `DELETE /products/:id` | Admin | 4 |

---

## Frontend (`frontend/`)

### Patrón de capas

`pages → hooks → api → backend`

| Carpeta | Para qué sirve |
|---------|----------------|
| `api/` | Única capa HTTP (Axios). Un archivo por recurso. |
| `components/` | UI reutilizable del proyecto |
| `components/ui/` | Shadcn (generados) |
| `context/` | Estado global (ej. `AuthContext`) |
| `hooks/` | Lógica reutilizable entre pages |
| `layouts/` | Estructura compartida (header, sidebar, footer) |
| `pages/` | Una page por ruta |
| `types/` | Interfaces TypeScript |
| `constants/` | Valores fijos |

### Routing

| Ruta | Page | Acceso |
|------|------|--------|
| `/` | Home (hero + preview catálogo) | Público |
| `/catalogo` | Catálogo paginado | Público |
| `/products/:id` | Detalle de armazón | Público |
| `/admin/login` | Login admin | Público |
| `/admin` | Dashboard | Admin |
| `/admin/profile` | Mi perfil | Admin |
| `/admin/products` | Listado admin | Admin |
| `/admin/products/new` | Crear producto | Admin |
| `/admin/products/:id/edit` | Editar producto | Admin |

Rutas bajo `/admin/*` (excepto `/admin/login`) usan `ProtectedRoute`.

---

## Integración frontend ↔ backend

- Axios en `frontend/src/api/client.ts` con `withCredentials: true`.
- CORS en backend: `CLIENT_URL` + `credentials: true`.
- Desarrollo: frontend `http://localhost:5173`, backend `http://localhost:5000`.
- Imágenes: URLs absolutas o relativas servidas por `/uploads/anteojos/...`.

### Variables de entorno

**Backend** (`backend/.env.example`):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/opticapp
JWT_SECRET=change-me
JWT_EXPIRES_IN=1d
COOKIE_NAME=token
NODE_ENV=development
CLIENT_URL=http://localhost:5173
UPLOADS_BASE_URL=http://localhost:5000/uploads
ADMIN_EMAIL=admin@opticapp.com
ADMIN_PASSWORD=change-me
ADMIN_FIRST_NAME=Admin
ADMIN_LAST_NAME=Opticapp
```

**Frontend** (`frontend/.env.example`):

```
VITE_API_URL=http://localhost:5000
```
