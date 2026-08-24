# Opticapp Frontend

Interfaz web pública de **Opticapp**, vidriera de catálogo de armazones para una óptica. Sin e-commerce, sin precios públicos ni carrito.

Repositorio backend: [opticapp-back](https://github.com/JulianM432/opticapp-back)

## Spec-Driven Development (SDD)

Este repo incluye su propia documentación de specs y reglas de Cursor:

| Recurso | Descripción |
|---------|-------------|
| [SPECS.md](SPECS.md) | Etapa activa y visión del frontend |
| [specs/](specs/) | Constitución, arquitectura, UI/tema, etapas |
| [.cursor/rules/](.cursor/rules/) | Reglas para el agente (SDD + frontend) |

**Cursor (desktop / iOS / cloud):** abrir **este directorio** como workspace (`opticapp-front`), no la carpeta contenedora `opticapp/`.

Al avanzar de etapa, actualizar `SPECS.md` también en el repo backend para mantener la tabla sincronizada.

## Stack

| Capa | Tecnología |
|------|------------|
| Runtime | Node.js 22+ |
| Gestor de paquetes | pnpm |
| Lenguaje | TypeScript (strict) |
| Build | Vite |
| UI | React 19 |
| Componentes | Shadcn UI (Mira / Zinc / Sky, Inter, Lucide) |
| Estilos | Tailwind CSS v4 |
| Routing | React Router v7 |
| HTTP client | Axios (`withCredentials`) |
| Lint / formato | ESLint flat + Prettier |

## Requisitos

- Node.js `>=22.0.0` (`node -v`)
- pnpm
- Backend en ejecución para el catálogo (`GET /products` y `GET /products/:id` en `opticapp-back`)

## Instalación

```bash
pnpm install
cp .env.example .env   # Windows: copy .env.example .env
pnpm dev
```

La app arranca en `http://localhost:5173`.

## Variables de entorno

Ver [.env.example](.env.example):

| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | URL base del backend (ej. `http://localhost:3000`) |

## Scripts

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Servidor de desarrollo Vite |
| `pnpm build` | Build de producción |
| `pnpm preview` | Preview del build |
| `pnpm lint` | ESLint sobre `src/` |

## Estructura de archivos

```
├── SPECS.md
├── specs/
├── .cursor/rules/
├── public/
│   ├── logo.svg              # Logo Opticapp (lentes)
│   ├── favicon.ico
│   └── images/
│       └── not-found.png     # Placeholder si el producto no tiene imagen
├── src/
│   ├── main.tsx              # Entry point React
│   ├── App.tsx               # React Router v7 (`/`, `/products/:id`)
│   ├── api/
│   │   ├── client.ts         # Axios + withCredentials
│   │   └── product.ts        # productApi (listado y detalle)
│   ├── components/
│   │   ├── ProductCard.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ui/               # Componentes Shadcn (Button, Toaster)
│   ├── constants/
│   │   └── store.ts          # Nombre, dirección y teléfono
│   ├── hooks/
│   │   ├── useProducts.ts
│   │   └── useProduct.ts
│   ├── layouts/
│   │   └── PublicLayout.tsx  # Header (logo + dark mode) + footer
│   ├── pages/
│   │   ├── CatalogPage.tsx   # Catálogo paginado
│   │   └── ProductDetailPage.tsx
│   ├── lib/
│   │   └── utils.ts          # cn() para Tailwind/Shadcn
│   └── index.css             # Tema Zinc/Sky + Tailwind
├── components.json           # Config Shadcn
├── vite.config.ts            # Alias @/ → src/
├── eslint.config.js
└── tsconfig.json
```

## Catálogo público

La home (`/`) muestra el catálogo paginado de armazones publicados. El detalle vive en `/products/:id`. La UI **no incluye enlace al panel admin** (`/admin` se accede manualmente en etapas futuras).
