# Etapa 1 — Bootstrap repos (Backend)

**Estado:** hecha  
**Depende de:** Etapa 0 (documentación)

## Objetivo

Crear la base del repo backend con pnpm, TypeScript, Express + MongoDB, sin lógica de negocio de productos ni auth.

## Alcance

- [ ] Inicializar con pnpm, TypeScript, Express, Mongoose.
- [ ] Estructura según [architecture.md](../architecture.md).
- [ ] `configs/app.ts`: JSON parser, CORS (`credentials: true`), cookie-parser, `express.static('/uploads')` (carpeta vacía con `.gitkeep`).
- [ ] `configs/db.ts`: conexión Mongoose.
- [ ] `errors/AppError.ts` + `middlewares/errorHandler.ts` → `{ message }` en español.
- [ ] `utils/mapDocument.ts` (stub listo para etapa 2).
- [ ] `routes/index.ts`: `GET /health` → `{ status, mongodb }`.
- [ ] `index.ts`: entry point.
- [ ] `.env.example`, `.prettierrc`, `eslint.config.js`.
- [ ] Scripts: `"dev": "tsx watch src/index.ts"`, `build`, `start`.
- [ ] `.gitignore`: `node_modules`, `dist`, `.env`, `uploads/**/*` (excepto `.gitkeep`).
- [ ] `README.md`: cómo instalar (`pnpm install`), env, `pnpm dev`.
- [ ] `engines.node: ">=22.0.0"` en `package.json`.

## Fuera de alcance

- Models, auth, productos, multer upload funcional (solo carpeta uploads).
- Tests, Docker, CI, deployment.
- Archivos del frontend (viven en `opticapp-front`).

## Criterios de aceptación

- [ ] `pnpm dev` → Express en PORT.
- [ ] `GET /health` → `{ status: "ok", mongodb: "connected" }` (o `"disconnected"` si no hay DB).
- [ ] TypeScript strict.

## Archivos esperados (mínimo)

```
package.json
tsconfig.json
eslint.config.js
.prettierrc
.env.example
src/index.ts
src/configs/app.ts
src/configs/db.ts
src/middlewares/errorHandler.ts
src/errors/AppError.ts
src/routes/index.ts
src/utils/mapDocument.ts
uploads/anteojos/.gitkeep
uploads/lentes/.gitkeep
```

## Notas para el agente

- No crear `package.json` fuera de la raíz de este repo.
- Commits locales opcionales con formato `create: backend/bootstrap`.
