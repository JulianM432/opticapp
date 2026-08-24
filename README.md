# Opticapp Backend

API REST para **Opticapp**, plataforma vidriera de catálogo de armazones para una óptica. Sin e-commerce, sin precios públicos ni carrito.

Repositorio frontend: [opticapp-front](https://github.com/JulianM432/opticapp-front)

## Spec-Driven Development (SDD)

Este repo incluye su propia documentación de specs y reglas de Cursor:

| Recurso | Descripción |
|---------|-------------|
| [SPECS.md](SPECS.md) | Etapa activa y visión del backend |
| [specs/](specs/) | Constitución, arquitectura, modelo de datos, etapas |
| [.cursor/rules/](.cursor/rules/) | Reglas para el agente (SDD + backend) |

**Cursor (desktop / iOS / cloud):** abrir **este directorio** como workspace (`opticapp-back`), no la carpeta contenedora `opticapp/`.

Al avanzar de etapa, actualizar `SPECS.md` también en el repo frontend para mantener la tabla sincronizada.

## Stack

| Capa | Tecnología |
|------|------------|
| Runtime | Node.js 22+ |
| Gestor de paquetes | pnpm |
| Lenguaje | TypeScript (strict) |
| Framework HTTP | Express |
| Base de datos | MongoDB + Mongoose |
| Validación HTTP | Zod |
| Auth | JWT + cookie httpOnly |
| Uploads | Multer (imágenes en disco, URL en MongoDB) |
| Lint / formato | ESLint flat + Prettier |

## Requisitos

- Node.js `>=22.0.0` (`node -v`)
- pnpm
- MongoDB en ejecución (opcional en bootstrap; `/health` reporta estado)

## Instalación

```bash
pnpm install
cp .env.example .env   # Windows: copy .env.example .env
pnpm dev
```

El servidor arranca en `http://localhost:3000` (configurable con `PORT`).

## Variables de entorno

Ver [.env.example](.env.example). Mínimo para desarrollo:

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto del servidor (default `3000`) |
| `MONGODB_URI` | URI de conexión MongoDB |
| `CLIENT_URL` | Origen del frontend para CORS |
| `UPLOADS_BASE_URL` | Base pública de imágenes (seed) |
| `JWT_SECRET` | Secreto JWT |
| `JWT_EXPIRES_IN` | Expiración del token (default `1d`) |
| `COOKIE_NAME` | Nombre de la cookie de sesión (default `token`) |
| `ADMIN_EMAIL` | Email del admin (script `initApp`) |
| `ADMIN_PASSWORD` | Contraseña del admin |
| `ADMIN_FIRST_NAME` | Nombre del admin |
| `ADMIN_LAST_NAME` | Apellido del admin |

## Scripts

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Desarrollo con hot reload (`tsx watch`) |
| `pnpm build` | Compila TypeScript a `dist/` |
| `pnpm start` | Ejecuta build de producción |
| `pnpm lint` | ESLint sobre `src/` |
| `pnpm seed:products` | Carga 5 armazones publicados de ejemplo |
| `pnpm exec tsx src/scripts/initApp.ts` | Crea el admin único si no existe |

## Estructura de archivos

```
├── SPECS.md
├── specs/
├── .cursor/rules/
├── src/
│   ├── index.ts              # Entry point
│   ├── configs/
│   │   ├── app.ts            # Express: JSON, CORS, cookies, static /uploads
│   │   ├── db.ts             # Conexión Mongoose
│   │   └── multer.ts         # Destino, nombre y límites de upload
│   ├── routes/               # Routers HTTP (sin prefijo /api)
│   ├── controllers/          # Handlers flacos
│   ├── services/             # Lógica de negocio
│   ├── models/               # Schemas Mongoose
│   ├── validations/          # Schemas Zod
│   ├── middlewares/
│   │   ├── authenticate.ts   # JWT en cookie para rutas protegidas
│   │   ├── authorize.ts      # Permisos por role (permissions.json)
│   │   ├── errorHandler.ts   # Errores → { message } en español
│   │   ├── requestLogger.ts  # Log de requests HTTP
│   │   └── upload.ts         # Middleware Multer (uso admin en etapa 4)
│   ├── scripts/
│   │   ├── initApp.ts        # Crea admin único desde env
│   │   └── seed-products.ts  # Seed opcional del catálogo público
│   ├── errors/
│   │   └── AppError.ts       # Errores operacionales tipados
│   └── utils/
│       └── mapDocument.ts    # _id → id para respuestas JSON
├── uploads/
│   ├── anteojos/             # Imágenes de armazones
│   └── lentes/               # Reservada (futuro)
├── .env.example
├── eslint.config.js
└── tsconfig.json
```

## Endpoints

| Método | Ruta | Respuesta |
|--------|------|-----------|
| `GET` | `/health` | `{ status: "ok" \| "degraded", mongodb: "connected" \| "disconnected" }` |
| `GET` | `/products?page=&limit=` | Catálogo paginado (`items`, `total`, `page`, `limit`, `totalPages`). Defaults: `page=1`, `limit=12`. Solo publicados y no eliminados. |
| `GET` | `/products/:id` | Detalle público. Id inválido → 400. No publicado, soft-deleted o inexistente → 404. |
| `GET` | `/uploads/...` | Archivos estáticos de imágenes |
| `POST` | `/auth/login` | Login admin. Body: `{ email, password }`. OK → cookie httpOnly + `AuthUser`. |
| `POST` | `/auth/logout` | Cierra sesión (requiere cookie). |
| `GET` | `/auth/me` | Usuario autenticado (requiere cookie). |

Las rutas **no** usan prefijo `/api`. El payload de éxito va directo en `res.json` (sin wrapper `{ data }`). Cada producto expone `id` y nunca `_id`.
