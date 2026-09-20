# Etapa 3 — Auth admin (Backend)

**Estado:** hecha  
**Depende de:** Etapa 1

## Objetivo

Login admin, JWT cookie 1d, permisos globales vía `permissions.json`.

## Alcance

- [x] Model `user.ts` (email, password, firstName, lastName, role).
- [x] `scripts/initApp.ts`: crea **un** admin desde env si no existe (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_FIRST_NAME`, `ADMIN_LAST_NAME`).
- [x] `configs/permissions.json` inicial.
- [x] `services/auth.ts`, `controllers/auth.ts`, `routes/auth.ts`:
  - `POST /auth/login` — público
  - `POST /auth/logout`, `GET /auth/me` — protegidos
- [x] `/auth/me` → `AuthUser` (id, email, firstName, lastName, role).
- [x] Middlewares globales `authenticate` + `authorize` en `configs/app.ts`.
- [x] Cookie: `httpOnly`, `sameSite: 'lax'`, **`secure: false` en dev**, `secure: true` en production.
- [x] `JWT_EXPIRES_IN=1d`.
- [x] Validación Zod login.

## Fuera de alcance

- CRUD productos (etapa 4).
- Editar perfil (solo ver en MVP — frontend).
- Múltiples admins.
- Refresh tokens.
- UI admin (repo `opticapp-front`).

## Criterios de aceptación

- [x] `pnpm exec tsx src/scripts/initApp.ts` crea admin único.
- [x] Login OK → cookie + user JSON.
- [x] Login fallido → 401, message español.
- [x] `/auth/me` restaura sesión al recargar (cookie válida).
- [x] JWT expira a 1d.
- [x] Middlewares solo en `app.ts`.

## `permissions.json` (etapa 3)

```json
{
  "admin": [
    { "route": "/auth/me",     "methods": ["GET"] },
    { "route": "/auth/logout", "methods": ["POST"] }
  ]
}
```

## Variables de entorno

```
ADMIN_EMAIL=admin@opticapp.com
ADMIN_PASSWORD=change-me
ADMIN_FIRST_NAME=Admin
ADMIN_LAST_NAME=Opticapp
JWT_SECRET=change-me
JWT_EXPIRES_IN=1d
COOKIE_NAME=token
```

## Archivos esperados

```
src/scripts/initApp.ts
src/models/user.ts
src/services/auth.ts
src/controllers/auth.ts
src/routes/auth.ts
src/middlewares/authenticate.ts
src/middlewares/authorize.ts
src/validations/auth.ts
src/helpers/hashPassword.ts
src/configs/permissions.json
```

## Notas para el agente

- No usar `seed-admin.ts`; usar **`initApp.ts`**.
- Login response y `/auth/me` incluyen firstName, lastName.
