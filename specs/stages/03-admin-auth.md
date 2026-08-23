# Etapa 3 — Auth admin (Frontend)

**Estado:** pendiente  
**Depende de:** Etapa 1

## Objetivo

Login admin en `/admin`, sesión persistente vía cookie + `AuthContext`, dashboard con acceso a CRUD y perfil.

## Alcance

- [ ] `AuthContext` + `useAuth` + persistencia vía `/auth/me`.
- [ ] **`/admin`**: si no auth → login; si auth → dashboard.
- [ ] **`/admin/login`**: formulario (redirige a dashboard si ya logueado).
- [ ] **`/admin/profile`**: muestra email, firstName, lastName (solo lectura en MVP).
- [ ] Dashboard `/admin`: links a Productos (etapa 4) y Perfil.
- [ ] `ProtectedRoute` para rutas admin.
- [ ] **Home pública sin link a admin.**

## Fuera de alcance

- CRUD productos (etapa 4).
- Editar perfil (solo ver en MVP).
- Múltiples admins.
- Refresh tokens.
- JWT, cookies y `permissions.json` (repo `opticapp-back`).

## Criterios de aceptación

- [ ] Login OK → user en context + cookie del backend.
- [ ] Login fallido → mensaje de error en español.
- [ ] `/auth/me` restaura sesión al recargar.
- [ ] `/admin` accesible solo escribiendo URL manualmente (sin link en home).
- [ ] Dashboard muestra acceso CRUD (placeholder) y perfil.
- [ ] Rutas admin protegidas con `ProtectedRoute`.

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
