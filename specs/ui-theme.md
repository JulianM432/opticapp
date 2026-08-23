# UI y tema — Opticapp

## Marca

- **Nombre:** Opticapp
- **Logo y favicon:** icono de lentes (buscar asset libre o crear SVG simple). Ubicación: `public/logo.svg`, `public/favicon.ico`
- **Imagen placeholder producto:** `public/images/not-found.png` (genérica cuando el producto no tiene imagen)

## Tema Shadcn (configuración owner)

Generar tema con [ui.shadcn.com](https://ui.shadcn.com) o equivalente con estos valores:

| Setting | Valor |
|---------|-------|
| Style | **Mira** |
| Base color | **Zinc** |
| Theme color | **Sky** |
| Chart color | **Sky** |
| Font / Heading | **Inter** |
| Icon library | **Lucide** |
| Border radius | **Default** |
| Menu style | **Default / Translucent** |
| Menu accent | **Subtle** |

## Modo oscuro

- **Sí.** Toggle en header público (etapa 2+) usando Shadcn `ThemeProvider` o equivalente.
- Persistir preferencia en `localStorage` (`theme: light | dark | system`).

## Layouts

### Público (`PublicLayout`)

- **Header:** logo Opticapp + toggle dark mode. **Sin link a admin.**
- **Footer:** dirección y teléfono de la óptica (valores desde env o `constants/store.ts`).
- **Responsive:** mobile-first.

### Admin (`AdminLayout`) — básico en MVP

- Sidebar o top nav simple: Dashboard, Productos, Perfil, Logout.
- Mejoras visuales en iteraciones futuras.

## Dashboard admin (`/admin`)

Contenido MVP (etapa 3–4):

- Acceso rápido a **CRUD Productos**
- **Mi perfil:** email, nombre (`firstName`), apellido (`lastName`)

## Feedback UI

- **Toasts:** Shadcn Sonner o Toast — implementar desde **etapa 2** para errores/éxito en catálogo.
- Textos UI en **español**.

## Acceso admin

- La home pública **no** muestra link al panel admin.
- El admin navega manualmente a `/admin`.
- Si no está autenticado, `/admin` muestra login (o redirige a `/admin/login` — implementación equivalente).

## Constantes sugeridas (`src/constants/store.ts`)

```typescript
export const STORE_INFO = {
  name: 'Opticapp',
  address: '', // COMPLETAR por owner
  phone: '',   // COMPLETAR por owner
};
```

## Referencia visual (v0 u otros prototipos)

Si el owner agrega capturas en `specs/assets/`, usarlas **solo para look & feel**. No copiar stack ni estructura de prototipos externos (ej. Next.js). Implementar sobre Vite + React Router de este repo.
