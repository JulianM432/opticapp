# Constitución del proyecto — OpticApp

Principios no negociables para cualquier agente o desarrollador que trabaje en el monorepo OpticApp.

## Fuente de verdad

1. Los archivos en `specs/` y `SPECS.md` (raíz del monorepo) definen **qué** se construye.
2. La etapa marcada como `activa` en `SPECS.md` es la **única** que se implementa.
3. Si un criterio no está definido, **preguntar** al owner. No rellenar huecos con supuestos.

## Producto

- Es una **vidriera**, no un e-commerce.
- **No** hay carrito, checkout, pasarela de pago ni precios visibles al público.
- El precio se consultará por WhatsApp en el frontend (etapa 5); **sin cambios de backend** en esa etapa.

## Alcance del monorepo

| Paquete | Contiene | No contiene |
|---------|----------|-------------|
| `backend/` | Express, Mongoose, JWT, Multer, endpoints REST | React, pages, hooks, components |
| `frontend/` | Vite, React, Shadcn, pages, hooks, api | Express, Mongoose, controllers, services |

## Arquitectura backend

- Patrón obligatorio: `routes → controllers → services → models`.
- Controllers **flacos**: validar input, llamar service, responder. Sin lógica de negocio.
- Services: toda la lógica de negocio y acceso a datos vía models.
- Models: schemas Mongoose únicamente.
- Errores HTTP centralizados con `AppError` + middleware `errorHandler`.
- Rutas **sin prefijo `/api`** (ej. `/products`, `/auth/login`).
- Permisos por role en `configs/permissions.json`. Middlewares `authenticate` + `authorize` **globales** en `configs/app.ts`.
- Auth: JWT en cookie `httpOnly`, verificar firma y `exp`.

## Arquitectura frontend

- Patrón: `pages → hooks → api → backend`.
- **Prohibido** llamar a Axios directamente desde components o pages.
- Componentes reutilizables en `components/`; UI de Shadcn en `components/ui/`.
- Estado global solo cuando la spec lo justifique (`context/`).
- Sesión admin persiste vía cookie httpOnly + `AuthContext` con `/auth/me` al montar.

## Hacer

- Leer `SPECS.md` y la spec de la etapa activa antes de escribir código.
- Respetar la estructura de carpetas definida en [architecture.md](architecture.md).
- Usar TypeScript estricto (`strict: true`). Evitar `any`.
- Validar requests en `backend/src/validations/` con Zod.
- Usar variables de entorno para secretos y URLs. Proveer `.env.example` en cada paquete.
- Escribir mensajes de error claros y códigos HTTP correctos (400, 401, 403, 404, 409, 500).
- Mantener commits y cambios acotados al alcance de la etapa activa.
- Seguir Prettier y convenciones de [conventions.md](conventions.md).

## No hacer

- **No** adelantar etapas (auth, CRUD admin, CSV, WhatsApp si no es la etapa activa).
- **No** agregar features "de regalo" (Socket.io, Redis, tests E2E, Docker) salvo que la spec lo pida.
- **No** crear archivos de backend en `frontend/` ni archivos de frontend en `backend/`.
- **No** crear roles extra (staff, vendedor) sin actualizar specs primero.
- **No** hardcodear secretos, tokens ni URLs de producción.
- **No** refactorizar código fuera del alcance de la etapa activa.

## Resolución de conflictos

Si una regla de `.cursor/rules/` contradice esta constitución o `SPECS.md`, prevalecen **SPECS.md** y **constitution.md**.
