# Etapa 1 — Bootstrap repos (Frontend)

**Estado:** hecha  
**Depende de:** Etapa 0 (documentación)

## Objetivo

Crear la base del repo frontend con pnpm, Vite, React + Shadcn (tema Mira), sin lógica de catálogo ni auth.

## Alcance

- [x] Inicializar con pnpm, Vite, React, TypeScript.
- [x] Shadcn con tema [ui-theme.md](../ui-theme.md): **Mira, Zinc, Sky, Inter, Lucide**.
- [x] Alias `@/` → `src/`.
- [x] **React Router v7**.
- [x] Logo + favicon (lentes) en `public/`.
- [x] `api/client.ts`: Axios, `withCredentials: true`.
- [x] `App.tsx`: ruta `/` placeholder con `PublicLayout` básico (header logo + footer vacío).
- [x] `HomePage`: título Opticapp + health check del backend.
- [x] `.env.example`, Prettier en `package.json`, `eslint.config.js`.
- [x] **Sin link a `/admin`** en ninguna parte de la UI pública.
- [x] `README.md`: cómo instalar (`pnpm install`), env, `pnpm dev`.
- [x] `engines.node: ">=22.0.0"` en `package.json`.

## Fuera de alcance

- Catálogo, auth, admin, toasts, dark mode toggle (etapa 2).
- Tests, Docker, CI, deployment.
- Archivos del backend (viven en `backend/`).

## Criterios de aceptación

- [x] `pnpm dev` → Vite OK en `http://localhost:5173`.
- [x] HomePage muestra health check del backend.
- [x] Shadcn Button importable.
- [x] Tema Mira/Zinc/Sky aplicado.
- [x] Logo y favicon presentes.
- [x] Sin referencias a admin en home pública.

## Archivos esperados (mínimo)

```
package.json
tsconfig.json
vite.config.ts
eslint.config.js
components.json
.env.example
public/logo.svg
public/favicon.ico
src/main.tsx
src/App.tsx
src/api/client.ts
src/pages/HomePage.tsx
src/layouts/PublicLayout.tsx
src/lib/utils.ts
```

## Notas para el agente

- No crear `package.json` fuera de la raíz de este repo.
- Prettier: clave `"prettier"` en `package.json` (ver [conventions.md](../conventions.md)).
- Commits locales opcionales con formato `create: frontend/bootstrap`.
