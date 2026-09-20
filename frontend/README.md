# Opticapp — Frontend

Interfaz web de **Opticapp**. Paquete `opticapp-front` dentro del monorepo [opticapp](../).

Documentación SDD en la raíz: [SPECS.md](../SPECS.md), [specs/](../specs/).

## Stack

| Capa | Tecnología |
|------|------------|
| Build | Vite 8 |
| UI | React 19 + Shadcn UI |
| Estilos | Tailwind CSS 4 |
| Routing | React Router 7 |
| HTTP client | Axios (`withCredentials`) |

## Instalación

Desde la **raíz del monorepo**:

```bash
pnpm install
cp frontend/.env.example frontend/.env   # Windows: copy frontend\.env.example frontend\.env
```

## Desarrollo

Desde la raíz:

```bash
pnpm dev:frontend
```

O desde este directorio:

```bash
pnpm dev
```

La app arranca en `http://localhost:5173`. Requiere el backend en ejecución (`http://localhost:5000`).

## Variables de entorno

Ver [.env.example](.env.example):

| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | URL base del backend (ej. `http://localhost:5000`) |
| `VITE_WHATSAPP_NUMBER` | Número de WhatsApp en formato internacional sin `+` (ej. `5493434123456`) |

## Scripts

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Servidor de desarrollo Vite |
| `pnpm build` | Build de producción |
| `pnpm preview` | Preview del build |
| `pnpm lint` | ESLint sobre `src/` |

## Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Home con preview del catálogo |
| `/catalogo` | Catálogo paginado |
| `/products/:id` | Detalle de armazón |
| `/admin/login` | Login admin |
| `/admin/*` | Panel admin (protegido) |

Ver [specs/architecture.md](../specs/architecture.md) para detalle completo.
