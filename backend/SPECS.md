# OpticApp Backend — Spec-Driven Development

> **Este repo es el backend** (`opticapp-back`). Implementar **solo** la sección Backend de la etapa `activa`.
> El frontend vive en el repo hermano `opticapp-front`. Si la etapa pide trabajo allí, **no** implementarlo aquí.

## Visión

API REST para **Opticapp**, plataforma vidriera de catálogo de armazones. Sin e-commerce, sin precios públicos ni carrito. El frontend consume esta API.

## Stack (este repo)

| Capa | Tecnología |
|------|------------|
| Gestor de paquetes | **pnpm** |
| Node.js | **22.x** (mínimo `>=22.0.0`) — verificar con `node -v` |
| Framework | Express, TypeScript, Mongoose |
| Validación HTTP | **Zod** (ver [justificación](specs/conventions.md#zod)) |
| Auth | JWT (`jsonwebtoken`), bcrypt, cookie-parser — cookie `httpOnly`, exp **1d** |
| Uploads | Multer — imágenes en disco, URL en MongoDB |
| Base de datos | MongoDB |
| Dev | `tsx watch` (sin nodemon) |
| Lint | ESLint flat config + typescript-eslint ([conventions.md](specs/conventions.md)) |

## Regla de oro para el agente

> **Solo se implementa la etapa marcada como `activa`, y solo el alcance Backend de esa etapa.** Si algo no está en la spec, no se hace. Si hay ambigüedad, se pregunta; no se inventa.

## Documentación

| Documento | Descripción |
|-----------|-------------|
| [Constitución](specs/constitution.md) | Principios anti-slop, Hacer / No hacer |
| [Arquitectura](specs/architecture.md) | Carpetas, API, auth, uploads, error handler |
| [Modelo de datos](specs/data-model.md) | Schemas User y Product |
| [Convenciones](specs/conventions.md) | Prettier, ESLint, commits, patrón de objetos |

## Etapas

> **Sync:** al cambiar `activa`/`hecha`, actualizar también `SPECS.md` en el repo `opticapp-front`.

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

1. Implementar solo la etapa `activa` (alcance Backend).
2. Revisar criterios de aceptación de su spec.
3. Marcar `hecha` en esta tabla **y en el SPECS.md del frontend**, y activar la siguiente.

## Decisiones cerradas (owner)

- Catálogo: solo **armazones** (carpeta uploads `anteojos/`; `lentes/` reservada).
- Auth: JWT **1d** + cookie `httpOnly`; `secure: false` en dev.
- Admin único creado con script `initApp` en backend.
- Rutas **sin prefijo `/api`**.
- Respuestas OK: `res.json(data)`. Errores: `{ message }` en **español**.
- Código y variables en **inglés**.
- Soft delete productos. Unique `brand + model + color`.
- Sin campo `price` por ahora.
- Commits (cuando aplique): `fix|update|create|remove: resource/thing`.
- Node.js **22** (`>=22.0.0`).
