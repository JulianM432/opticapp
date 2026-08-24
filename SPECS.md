# OpticApp Frontend — Spec-Driven Development

> **Este repo es el frontend** (`opticapp-front`). Implementar **solo** la sección Frontend de la etapa `activa`.
> El backend vive en el repo hermano `opticapp-back`. Si la etapa pide trabajo allí, **no** implementarlo aquí.

## Visión

Interfaz web pública de **Opticapp**, vidriera de catálogo de armazones. Sin e-commerce, sin precios públicos ni carrito. Consume la API del backend.

## Stack (este repo)

| Capa | Tecnología |
|------|------------|
| Gestor de paquetes | **pnpm** |
| Node.js | **22.x** (mínimo `>=22.0.0`) — verificar con `node -v` |
| Build | Vite, React, TypeScript |
| UI | Shadcn UI (tema [Mira / Zinc / Sky](specs/ui-theme.md)) |
| Routing | **React Router v7** |
| HTTP client | Axios (solo en `src/api/`) |
| Alias imports | `@/` → `src/` |
| Lint | ESLint flat config + typescript-eslint ([conventions.md](specs/conventions.md)) |

## Regla de oro para el agente

> **Solo se implementa la etapa marcada como `activa`, y solo el alcance Frontend de esa etapa.** Si algo no está en la spec, no se hace. Si hay ambigüedad, se pregunta; no se inventa.

## Documentación

| Documento | Descripción |
|-----------|-------------|
| [Constitución](specs/constitution.md) | Principios anti-slop, Hacer / No hacer |
| [Arquitectura](specs/architecture.md) | Carpetas, rutas, contrato API consumido |
| [Modelo de datos (UI)](specs/data-model.md) | Types y DTOs que consume el frontend |
| [Convenciones](specs/conventions.md) | Prettier, ESLint, commits, patrón de objetos |
| [UI / Tema](specs/ui-theme.md) | Shadcn Mira, layouts, responsive, dark mode |

## Etapas

> **Sync:** al cambiar `activa`/`hecha`, actualizar también `SPECS.md` en el repo `opticapp-back`.

| # | Etapa | Spec | Estado |
|---|-------|------|--------|
| 0 | Documentación SDD | *(esta iteración)* | `hecha` |
| 1 | Bootstrap repos | [01-bootstrap.md](specs/stages/01-bootstrap.md) | `hecha` |
| 2 | Catálogo público + uploads | [02-public-catalog.md](specs/stages/02-public-catalog.md) | `hecha` |
| 3 | Auth admin | [03-admin-auth.md](specs/stages/03-admin-auth.md) | `activa` |
| 4 | CRUD productos admin | [04-admin-products.md](specs/stages/04-admin-products.md) | `pendiente` |
| 5 | WhatsApp CTA | [05-whatsapp-cta.md](specs/stages/05-whatsapp-cta.md) | `pendiente` |
| 6 | Import CSV/Excel | [06-import-csv.md](specs/stages/06-import-csv.md) | `pendiente` |

### Cómo avanzar de etapa

1. Implementar solo la etapa `activa` (alcance Frontend).
2. Revisar criterios de aceptación de su spec.
3. Marcar `hecha` en esta tabla **y en el SPECS.md del backend**, y activar la siguiente.

## Roles

| Rol | Acceso |
|-----|--------|
| Público | Ver catálogo paginado de productos publicados |
| Admin | Login en `/admin` + CRUD productos + ver perfil |

## Decisiones cerradas (owner)

- Catálogo: solo **armazones**. Sin precios en UI.
- Auth: sesión vía cookie httpOnly del backend + `AuthContext` con `/auth/me`.
- **No hay enlace al panel admin** desde la home pública — acceso manual a `/admin`.
- WhatsApp etapa 5. Import CSV etapa 6.
- Textos UI en **español**. Código en **inglés**.
- Commits (cuando aplique): `fix|update|create|remove: resource/thing`.
- Node.js **22** (`>=22.0.0`).
