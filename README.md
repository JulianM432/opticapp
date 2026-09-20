# Opticapp

Monorepo full-stack para **Opticapp**, vidriera de catálogo de armazones para una óptica. Sin e-commerce, sin precios públicos ni carrito.

| Paquete | Descripción | Puerto dev |
|---------|-------------|------------|
| [`backend/`](backend/) | API REST (Express + MongoDB) | `5000` |
| [`frontend/`](frontend/) | Interfaz web (React + Vite) | `5173` |

Repositorio: [JulianM432/opticapp](https://github.com/JulianM432/opticapp) (privado).

## Spec-Driven Development

La documentación SDD vive en la raíz del monorepo:

| Recurso | Descripción |
|---------|-------------|
| [SPECS.md](SPECS.md) | Etapa activa y visión del proyecto |
| [specs/](specs/) | Constitución, arquitectura, modelo de datos, etapas |
| [.cursor/rules/](.cursor/rules/) | Reglas para el agente |

**Cursor:** abrir la **raíz del monorepo** (`opticapp/`) como workspace.

## Requisitos

- Node.js `>=22.0.0` (`node -v`)
- pnpm
- MongoDB en ejecución (opcional en bootstrap; `GET /health` reporta estado)

## Instalación

Desde la raíz del monorepo:

```bash
pnpm install
cp backend/.env.example backend/.env    # Windows: copy backend\.env.example backend\.env
cp frontend/.env.example frontend/.env  # Windows: copy frontend\.env.example frontend\.env
```

## Desarrollo

Arrancar ambos servicios en paralelo:

```bash
pnpm dev
```

O por separado:

```bash
pnpm dev:backend   # http://localhost:5000
pnpm dev:frontend  # http://localhost:5173
```

El frontend consume la API vía `VITE_API_URL`. El backend acepta requests del frontend con CORS (`CLIENT_URL`) y cookies httpOnly.

## Variables de entorno

### Backend (`backend/.env.example`)

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto del servidor (default `5000`) |
| `MONGODB_URI` | URI de conexión MongoDB |
| `CLIENT_URL` | Origen del frontend para CORS (`http://localhost:5173`) |
| `UPLOADS_BASE_URL` | Base pública de imágenes (`http://localhost:5000/uploads`) |
| `JWT_SECRET` | Secreto JWT |
| `JWT_EXPIRES_IN` | Expiración del token (default `1d`) |
| `COOKIE_NAME` | Nombre de la cookie de sesión (default `token`) |
| `ADMIN_*` | Credenciales para script `initApp` |

### Frontend (`frontend/.env.example`)

| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | URL base del backend (`http://localhost:5000`) |

## Scripts (raíz)

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Backend + frontend en paralelo |
| `pnpm dev:backend` | Solo API |
| `pnpm dev:frontend` | Solo UI |
| `pnpm build` | Build de ambos paquetes |
| `pnpm start` | Backend en producción (requiere `pnpm build` previo) |
| `pnpm lint` | ESLint en ambos paquetes |

Ver [backend/README.md](backend/README.md) y [frontend/README.md](frontend/README.md) para scripts específicos de cada paquete.

## Estructura

```
opticapp/
├── SPECS.md
├── specs/
├── .cursor/rules/
├── .agents/skills/          # Skills de agente (Shadcn, etc.)
├── backend/                 # API Express
├── frontend/                # React + Vite
├── package.json             # Scripts del workspace
└── pnpm-workspace.yaml
```

## Migración desde repos anteriores

Este monorepo reemplaza los repositorios archivados:

- [opticapp-back](https://github.com/JulianM432/opticapp-back) → código en `backend/`
- [opticapp-front](https://github.com/JulianM432/opticapp-front) → código en `frontend/`

El historial Git de ambos repos se preservó mediante merge de historiales no relacionados.
