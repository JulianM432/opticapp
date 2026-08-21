# Opticapp Backend

API REST para **Opticapp**, plataforma vidriera de catálogo de armazones para una óptica. Sin e-commerce, sin precios públicos ni carrito.

Repositorio frontend: [opticapp-front](https://github.com/JulianM432/opticapp-front)

## Stack

| Capa | Tecnología |
|------|------------|
| Runtime | Node.js 22+ |
| Gestor de paquetes | pnpm |
| Lenguaje | TypeScript (strict) |
| Framework HTTP | Express |
| Base de datos | MongoDB + Mongoose |
| Validación HTTP | Zod (etapas futuras) |
| Auth | JWT + cookie httpOnly (etapas futuras) |
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
| `JWT_SECRET` | Secreto JWT (etapas futuras) |

## Scripts

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Desarrollo con hot reload (`tsx watch`) |
| `pnpm build` | Compila TypeScript a `dist/` |
| `pnpm start` | Ejecuta build de producción |
| `pnpm lint` | ESLint sobre `src/` |

## Estructura de archivos

```
backend/
├── src/
│   ├── index.ts              # Entry point
│   ├── configs/
│   │   ├── app.ts            # Express: JSON, CORS, cookies, static /uploads
│   │   └── db.ts             # Conexión Mongoose
│   ├── routes/               # Routers HTTP (sin prefijo /api)
│   ├── controllers/          # Handlers (etapas futuras)
│   ├── services/             # Lógica de negocio (etapas futuras)
│   ├── models/               # Schemas Mongoose (etapas futuras)
│   ├── middlewares/
│   │   └── errorHandler.ts   # Errores → { message } en español
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

## Endpoints (bootstrap)

| Método | Ruta | Respuesta |
|--------|------|-----------|
| `GET` | `/health` | `{ status: "ok" \| "degraded", mongodb: "connected" \| "disconnected" }` |

Las rutas **no** usan prefijo `/api`.
