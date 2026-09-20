# Constitución del proyecto — Backend

Principios no negociables para cualquier agente o desarrollador que trabaje en el **repo backend** de OpticApp.

## Fuente de verdad

1. Los archivos en `specs/` y `SPECS.md` **de este repo** definen **qué** se construye aquí.
2. La etapa marcada como `activa` en `SPECS.md` es la **única** que se implementa.
3. Si un criterio no está definido, **preguntar** al owner. No rellenar huecos con supuestos.

## Producto

- Es una **vidriera**, no un e-commerce.
- **No** hay carrito, checkout, pasarela de pago ni precios en la API pública.
- El precio se consultará por WhatsApp en el frontend (etapa 5); **sin cambios de backend** en esa etapa.

## Alcance de este repo

- **Solo backend:** Express, Mongoose, JWT, Multer, endpoints REST.
- El frontend vive en el repo hermano `opticapp-front`. **No crear** archivos React, pages, hooks ni componentes aquí.
- Mantener la tabla de etapas de `SPECS.md` sincronizada con el frontend al avanzar de etapa.

## Arquitectura backend

- Patrón obligatorio: `routes → controllers → services → models`.
- Controllers **flacos**: validar input, llamar service, responder. Sin lógica de negocio.
- Services: toda la lógica de negocio y acceso a datos vía models.
- Models: schemas Mongoose únicamente.
- Errores HTTP centralizados con `AppError` + middleware `errorHandler`. **Prohibido** `res.status(500).json(...)` suelto en controllers.
- Rutas **sin prefijo `/api`** (ej. `/products`, `/auth/login`).
- Permisos por role en `configs/permissions.json`. Middlewares `authenticate` + `authorize` **globales** en `configs/app.ts`. **Prohibido** repetirlos en cada route.
- Auth: JWT en cookie `httpOnly`, verificar firma y `exp`.

## Hacer

- Leer `SPECS.md` y la spec de la etapa activa (sección Backend) antes de escribir código.
- Respetar la estructura de carpetas definida en [architecture.md](architecture.md).
- Usar TypeScript estricto (`strict: true`). Evitar `any`.
- Validar requests en `validations/` con Zod.
- Usar variables de entorno para secretos y URLs. Proveer `.env.example`.
- Escribir mensajes de error claros y códigos HTTP correctos (400, 401, 403, 404, 409, 500).
- Patrón de código: controllers y services como **objetos exportados** (`productController`, `productService`). Ver [conventions.md](conventions.md).
- Archivos por recurso: `{resource}.ts` en cada capa (sin `.controller`, `.service`, `.routes`).
- Mantener commits y cambios acotados al alcance de la etapa activa.
- Seguir Prettier y convenciones de [conventions.md](conventions.md).

## No hacer

- **No** adelantar etapas (auth, CRUD admin, CSV, Socket.io si no es la etapa activa).
- **No** agregar features "de regalo" (Socket.io, Redis, tests E2E, CI, Docker) salvo que la spec lo pida.
- **No** crear archivos del frontend en este repo.
- **No** crear roles extra (staff, vendedor) sin actualizar specs primero.
- **No** inventar convenciones de estilo: seguir [conventions.md](conventions.md).
- **No** repetir middlewares de auth en archivos de routes (van globales en `configs/app.ts`).
- **No** hardcodear secretos, tokens ni URLs de producción.
- **No** refactorizar código fuera del alcance de la etapa activa.
- **No** usar sufijos `.controller.ts`, `.service.ts`, `.routes.ts`.

## Resolución de conflictos

Si una regla de `.cursor/rules/` contradice esta constitución o `SPECS.md`, prevalecen **SPECS.md** y **constitution.md**.
