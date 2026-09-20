# OpticApp — Spec-Driven Development

> Monorepo full-stack: [`backend/`](backend/) (API Express) y [`frontend/`](frontend/) (React + Vite).
> Implementar **solo** la etapa marcada como `activa`, respetando el alcance Backend o Frontend de su spec.

## Visión

**Opticapp** es una vidriera de catálogo de armazones para una óptica. Sin e-commerce, sin precios públicos ni carrito. El frontend consume la API del backend en el mismo repositorio.

## Stack

| Paquete | Tecnologías |
|---------|-------------|
| `backend/` | Express 5, TypeScript, Mongoose, Zod, JWT + cookie httpOnly, Multer |
| `frontend/` | Vite, React 19, React Router 7, Shadcn UI, Tailwind CSS 4, Axios |

| Común | Valor |
|-------|-------|
| Node.js | `>=22.0.0` |
| Gestor | pnpm (workspace en la raíz) |

## Regla de oro para el agente

> **Solo se implementa la etapa marcada como `activa`.** Si la spec tiene secciones Backend y Frontend, implementar solo la que corresponda al paquete que se está editando. Si algo no está en la spec, no se hace. Si hay ambigüedad, se pregunta; no se inventa.

## Documentación

| Documento | Descripción |
|-----------|-------------|
| [Constitución](specs/constitution.md) | Principios anti-slop, Hacer / No hacer |
| [Arquitectura](specs/architecture.md) | Estructura del monorepo, API, rutas, auth |
| [Modelo de datos](specs/data-model.md) | Schemas backend y types frontend |
| [Convenciones](specs/conventions.md) | Prettier, ESLint, commits, patrones |
| [UI / Tema](specs/ui-theme.md) | Shadcn Mira, layouts, responsive, dark mode |

## Etapas

| # | Etapa | Spec | Estado |
|---|-------|------|--------|
| 0 | Documentación SDD | *(esta iteración)* | `hecha` |
| 1 | Bootstrap repos | [01-bootstrap.md](specs/stages/01-bootstrap.md) | `hecha` |
| 2 | Catálogo público + uploads | [02-public-catalog.md](specs/stages/02-public-catalog.md) | `hecha` |
| 3 | Auth admin | [03-admin-auth.md](specs/stages/03-admin-auth.md) | `hecha` |
| 4 | CRUD productos admin | [04-admin-products.md](specs/stages/04-admin-products.md) | `hecha` |
| 5 | WhatsApp CTA | [05-whatsapp-cta.md](specs/stages/05-whatsapp-cta.md) | `activa` |
| 6 | Import CSV/Excel | [06-import-csv.md](specs/stages/06-import-csv.md) | `pendiente` |

### Cómo avanzar de etapa

1. Implementar solo la etapa `activa` (Backend en `backend/`, Frontend en `frontend/`).
2. Revisar criterios de aceptación de su spec.
3. Marcar `hecha` en esta tabla y activar la siguiente.

## Roles

| Rol | Acceso |
|-----|--------|
| Público | Ver catálogo paginado de productos publicados |
| Admin | Login en `/admin` + CRUD productos + ver perfil |

## Decisiones cerradas (owner)

- Catálogo: solo **armazones** (uploads `anteojos/`; `lentes/` reservada).
- Auth: JWT **1d** + cookie `httpOnly`; `secure: false` en dev.
- Admin único creado con script `initApp` en backend.
- Rutas **sin prefijo `/api`**.
- Respuestas OK: `res.json(data)`. Errores: `{ message }` en **español**.
- Código y variables en **inglés**. Textos UI en **español**.
- Soft delete productos. Unique `brand + model + color`.
- Sin campo `price` por ahora.
- **No hay enlace al panel admin** desde la home pública — acceso manual a `/admin`.
- Commits (cuando aplique): `fix|update|create|remove: resource/thing`.
- Node.js **22** (`>=22.0.0`).
