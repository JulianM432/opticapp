# Opticapp — Backend

API REST para **Opticapp**. Paquete `opticapp-back` dentro del monorepo [opticapp](../).

Documentación SDD en la raíz: [SPECS.md](../SPECS.md), [specs/](../specs/).

## Stack

| Capa | Tecnología |
|------|------------|
| Runtime | Node.js 22+ |
| Framework HTTP | Express 5 |
| Base de datos | MongoDB + Mongoose |
| Validación HTTP | Zod |
| Auth | JWT + cookie httpOnly |
| Uploads | Multer (imágenes en disco) |

## Instalación

Desde la **raíz del monorepo**:

```bash
pnpm install
cp backend/.env.example backend/.env   # Windows: copy backend\.env.example backend\.env
```

## Desarrollo

Desde la raíz:

```bash
pnpm dev:backend
```

O desde este directorio:

```bash
pnpm dev
```

El servidor arranca en `http://localhost:5000` (configurable con `PORT`).

## Variables de entorno

Ver [.env.example](.env.example):

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto del servidor (default `5000`) |
| `MONGODB_URI` | URI de conexión MongoDB |
| `CLIENT_URL` | Origen del frontend para CORS |
| `UPLOADS_BASE_URL` | Base pública de imágenes |
| `JWT_SECRET` | Secreto JWT |
| `JWT_EXPIRES_IN` | Expiración del token (default `1d`) |
| `COOKIE_NAME` | Nombre de la cookie de sesión |
| `ADMIN_*` | Credenciales para script `initApp` |

## Scripts

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Desarrollo con hot reload (`tsx watch`) |
| `pnpm build` | Compila TypeScript a `dist/` |
| `pnpm start` | Ejecuta build de producción |
| `pnpm lint` | ESLint sobre `src/` |
| `pnpm seed:products` | Carga armazones de ejemplo |
| `pnpm exec tsx src/scripts/initApp.ts` | Crea el admin único si no existe |

## Endpoints principales

| Método | Ruta | Acceso |
|--------|------|--------|
| `GET` | `/health` | Público |
| `GET` | `/products` | Público (paginado) |
| `GET` | `/products/:id` | Público |
| `POST` | `/auth/login` | Público |
| `POST/GET` | `/auth/logout`, `/auth/me` | Admin |
| `GET` | `/admin/products` | Admin |
| `POST/PUT/DELETE` | `/products`, `/products/:id` | Admin |

Ver [specs/architecture.md](../specs/architecture.md) para detalle completo.
