# Convenciones de código — OpticApp

Fuente de verdad para estilo, nombres y formato en ambos paquetes. El agente debe seguir esto además de [constitution.md](constitution.md).

## Prettier

Config estándar IT (Prettier defaults + `singleQuote`), en la clave `"prettier"` del `package.json` raíz y de cada paquete:

```json
"prettier": {
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

## pnpm (monorepo)

Workspace en la raíz (`pnpm-workspace.yaml`):

```yaml
packages:
  - backend
  - frontend

allowBuilds:
  esbuild: true
  bcrypt: true
```

Instalar dependencias desde la raíz: `pnpm install`. Ejecutar scripts por paquete: `pnpm --filter opticapp-back dev`.

**Node.js 22** requerido (`engines.node: ">=22.0.0"`).

## ESLint

Config flat recomendada (typescript-eslint v8+) en cada paquete:

```javascript
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);
```

Scripts: `"lint": "eslint src"`, `"lint:fix": "eslint src --fix"`.

## Commits

Formato acordado (cuando se commitee):

```
fix: product/validation
update: auth/login
create: catalog/product-card
remove: home/legacy-page
```

Patrón: `{fix|update|create|remove}: {resource}/{thing}`

## Backend — nombres y patrones

Un recurso = `{resource}.ts` por carpeta (sin `.controller`, `.service`, `.routes`).

| Capa | Ejemplo |
|------|---------|
| `routes/` | `product.ts` |
| `controllers/` | `product.ts` → `export const productController = { ... }` |
| `services/` | `product.ts` → `export const productService = { ... }` |
| `models/` | `product.ts` |
| `validations/` | `product.ts` (Zod) |

## Frontend — nombres y patrones

| Carpeta | Ejemplo |
|---------|---------|
| `api/` | `product.ts`, `auth.ts`, `client.ts` |
| `hooks/` | `useProducts.ts`, `useAuth.ts` |
| `pages/` | `CatalogPage.tsx`, `admin/LoginPage.tsx` |
| `types/` | `product.ts`, `auth.ts` |
| `components/` | `ProductCard.tsx` |
| `helpers/` | `whatsapp.ts` |

Alias `@/` → `src/` en `vite.config.ts` + `tsconfig paths`.

### Objetos exportados en `api/`

```typescript
import { apiClient } from './client';

export const productApi = {
  getProducts: async (page: number, limit: number) => {
    const { data } = await apiClient.get('/products', { params: { page, limit } });
    return data;
  },
};
```

- Named exports de objetos (`productApi`, `authApi`). No `export default` en `api/`.
- Prohibido sufijo `.api.ts`.

## Zod (backend)

Validación HTTP en `backend/src/validations/` con Zod. El frontend **no** duplica reglas de negocio de Mongoose/Zod; confía en la API y muestra errores `{ message }`.

## TypeScript

- `strict: true`. Prohibido `any`.
- Preferir `interface` para shapes, `type` para unions.
- Types de API alineados con [data-model.md](data-model.md).

## Idioma

- Código (variables, funciones, archivos): **inglés**.
- UI visible al usuario: **español**.
- Mensajes de error del backend (`message`): mostrar en español tal cual vienen.
