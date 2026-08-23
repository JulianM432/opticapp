# Etapa 1 — Bootstrap repos (Frontend)

**Estado:** hecha  
**Depende de:** Etapa 0 (documentación)

## Objetivo

Crear la base del repo frontend con pnpm, Vite, React + Shadcn (tema Mira), sin lógica de catálogo ni auth.

## Alcance

- [ ] Inicializar con pnpm, Vite, React, TypeScript.
- [ ] Shadcn con tema [ui-theme.md](../ui-theme.md): **Mira, Zinc, Sky, Inter, Lucide**.
- [ ] Alias `@/` → `src/`.
- [ ] **React Router v7**.
- [ ] Logo + favicon (lentes) en `public/`.
- [ ] `api/client.ts`: Axios, `withCredentials: true`.
- [ ] `App.tsx`: ruta `/` placeholder con `PublicLayout` básico (header logo + footer vacío).
- [ ] `HomePage`: título Opticapp + health check del backend.
- [ ] `.env.example`, `.prettierrc`, `eslint.config.js`.
- [ ] **Sin link a `/admin`** en ninguna parte de la UI pública.
- [ ] `README.md`: cómo instalar (`pnpm install`), env, `pnpm dev`.
- [ ] `engines.node: ">=22.0.0"` en `package.json`.

## Fuera de alcance

- Catálogo, auth, admin, toasts, dark mode toggle (etapa 2).
- Tests, Docker, CI, deployment.
- Archivos del backend (viven en `opticapp-back`).

## Criterios de aceptación

- [ ] `pnpm dev` → Vite OK en `http://localhost:5173`.
- [ ] HomePage muestra health check del backend.
- [ ] Shadcn Button importable.
- [ ] Tema Mira/Zinc/Sky aplicado.
- [ ] Logo y favicon presentes.
- [ ] Sin referencias a admin en home pública.

## Archivos esperados (mínimo)

```
package.json
tsconfig.json
vite.config.ts
eslint.config.js
.prettierrc
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
- Commits locales opcionales con formato `create: frontend/bootstrap`.
