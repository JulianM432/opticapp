# Constitución del proyecto — Frontend

Principios no negociables para cualquier agente o desarrollador que trabaje en el **repo frontend** de OpticApp.

## Fuente de verdad

1. Los archivos en `specs/` y `SPECS.md` **de este repo** definen **qué** se construye aquí.
2. La etapa marcada como `activa` en `SPECS.md` es la **única** que se implementa.
3. Si un criterio no está definido, **preguntar** al owner. No rellenar huecos con supuestos.

## Producto

- Es una **vidriera**, no un e-commerce.
- **No** hay carrito, checkout, pasarela de pago ni precios visibles al público.
- El precio se consultará por WhatsApp en etapa 5.

## Alcance de este repo

- **Solo frontend:** Vite, React, Shadcn, pages, hooks, api.
- El backend vive en el repo hermano `opticapp-back`. **No crear** archivos Express, Mongoose, controllers ni services aquí.
- Mantener la tabla de etapas de `SPECS.md` sincronizada con el backend al avanzar de etapa.

## Arquitectura frontend

- Patrón: `pages → hooks → api → backend`.
- **Prohibido** llamar a Axios directamente desde componentes o pages.
- Componentes reutilizables en `components/`; UI de Shadcn en `components/ui/`.
- Estado global solo cuando la spec lo justifique (`context/`).
- Sesión admin persiste vía cookie httpOnly + `AuthContext` con `/auth/me` al montar. Dashboard en `/admin`.

## Hacer

- Leer `SPECS.md` y la spec de la etapa activa (sección Frontend) antes de escribir código.
- Respetar la estructura de carpetas definida en [architecture.md](architecture.md).
- Usar TypeScript estricto (`strict: true`). Evitar `any`.
- Patrón de código: `api/` como **objetos exportados** (`productApi`, `authApi`). Ver [conventions.md](conventions.md).
- Archivos por recurso: `{resource}.ts` en `api/` y `types/` (sin `.api.ts`).
- Mantener commits y cambios acotados al alcance de la etapa activa.
- Seguir Prettier, [ui-theme.md](ui-theme.md) y [conventions.md](conventions.md).

## No hacer

- **No** adelantar etapas (WhatsApp, CSV, auth, CRUD admin si no es la etapa activa).
- **No** agregar features "de regalo" (Socket.io, Redis, tests E2E, CI, Docker) salvo que la spec lo pida.
- **No** mostrar precios al público.
- **No** crear archivos del backend en este repo.
- **No** crear roles extra sin actualizar specs primero.
- **No** inventar convenciones de estilo.
- **No** hardcodear secretos ni URLs de producción.
- **No** refactorizar código fuera del alcance de la etapa activa.
- **No** usar sufijos `.api.ts`.

## Resolución de conflictos

Si una regla de `.cursor/rules/` contradice esta constitución o `SPECS.md`, prevalecen **SPECS.md** y **constitution.md**.
