# Etapa 3 — Auth admin (Frontend)

**Estado:** hecha  
**Depende de:** Etapa 1

## Objetivo

Login admin en `/admin`, sesión persistente vía cookie + `AuthContext`, dashboard con acceso a CRUD y perfil.

## Alcance

- [x] `AuthContext` + `useAuth` + persistencia vía `/auth/me`.
- [x] **`/admin`**: si no auth → login; si auth → dashboard.
- [x] **`/admin/login`**: formulario (redirige a dashboard si ya logueado).
- [x] **`/admin/profile`**: muestra email, firstName, lastName (solo lectura en MVP).
- [x] Dashboard `/admin`: links a Productos (etapa 4) y Perfil.
- [x] `ProtectedRoute` para rutas admin.
- [x] **Home pública sin link a admin.**

## Fuera de alcance

- CRUD productos (etapa 4).
- Editar perfil (solo ver en MVP).
- Múltiples admins.
- Refresh tokens.
- JWT, cookies y `permissions.json` (repo `opticapp-back`).

## Criterios de aceptación

- [x] Login OK → user en context + cookie del backend.
- [x] Login fallido → mensaje de error en español.
- [x] `/auth/me` restaura sesión al recargar.
- [x] `/admin` accesible solo escribiendo URL manualmente (sin link en home).
- [x] Dashboard muestra acceso CRUD (placeholder) y perfil.
- [x] Rutas admin protegidas con `ProtectedRoute`.

## Archivos esperados

```
src/types/auth.ts
src/api/auth.ts
src/context/AuthContext.tsx
src/hooks/useAuth.ts
src/pages/admin/LoginPage.tsx
src/pages/admin/DashboardPage.tsx
src/pages/admin/ProfilePage.tsx
src/components/ProtectedRoute.tsx
src/layouts/AdminLayout.tsx   (básico)
```

## Notas para el agente

- `withCredentials: true` en todas las llamadas auth.
- No usar `localStorage` para el token JWT.
