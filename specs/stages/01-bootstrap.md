# Etapa 1 — Bootstrap repos (Backend)

**Estado:** hecha  
**Depende de:** Etapa 0 (documentación)

## Objetivo

Crear la base del repo backend con pnpm, TypeScript, Express + MongoDB, sin lógica de negocio de productos ni auth.

## Alcance

- [x] Inicializar con pnpm, TypeScript, Express, Mongoose.
- [x] Estructura según [architecture.md](../architecture.md).
- [x] `configs/app.ts`: JSON parser, CORS (`credentials: true`), cookie-parser, `express.static('/uploads')` (carpeta vacía con `.gitkeep`).
- [x] `configs/db.ts`: conexión Mongoose.
- [x] `errors/AppError.ts` + `middlewares/errorHandler.ts` → `{ message }` en español.
- [x] `utils/mapDocument.ts` (stub listo para etapa 2).
- [x] `routes/index.ts`: `GET /health` → `{ status, mongodb }`.
- [x] `index.ts`: entry point.
- [x] `.env.example`, Prettier en `package.json`, `eslint.config.js`.
- [x] Scripts: `"dev": "tsx watch src/index.ts"`, `build`, `start`.
- [x] `.gitignore`: `node_modules`, `dist`, `.env`, `uploads/**/*` (excepto `.gitkeep`).
- [x] `README.md`: cómo instalar (`pnpm install`), env, `pnpm dev`.
- [x] `engines.node: ">=22.0.0"` en `package.json`.

## Fuera de alcance

- Models, auth, productos, multer upload funcional (solo carpeta uploads).
- Tests, Docker, CI, deployment.
- Archivos del frontend (viven en `opticapp-front`).

## Criterios de aceptación

- [x] `pnpm dev` → Express en PORT.
- [x] `GET /health` → `{ status: "ok", mongodb: "connected" }` o `{ status: "degraded", mongodb: "disconnected" }` si no hay DB.
- [x] TypeScript strict.

## Archivos esperados (mínimo)

```
package.json
pnpm-workspace.yaml
tsconfig.json
eslint.config.js
.env.example
src/index.ts
src/configs/app.ts
src/configs/db.ts
src/middlewares/errorHandler.ts
src/middlewares/requestLogger.ts
src/errors/AppError.ts
src/routes/index.ts
src/utils/mapDocument.ts
uploads/anteojos/.gitkeep
uploads/lentes/.gitkeep
```

## Notas para el agente

- No crear `package.json` fuera de la raíz de este repo.
- Prettier: clave `"prettier"` en `package.json` (ver [conventions.md](../conventions.md)).
- Commits locales opcionales con formato `create: backend/bootstrap`.
