# Convenciones de código — Frontend

Fuente de verdad para estilo, nombres y formato. El agente debe seguir esto además de [constitution.md](constitution.md).

## Prettier

Config estándar IT (Prettier defaults + `singleQuote`), en la clave `"prettier"` del `package.json`:

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

## ESLint

Config flat recomendada (typescript-eslint v8+):

```javascript
// eslint.config.js
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

## Nombres de archivos

**Regla:** un recurso = `{resource}.ts` por carpeta en `api/` y `types/`.

| Carpeta | Ejemplo |
|---------|---------|
| `api/` | `product.ts`, `auth.ts`, `client.ts` |
| `hooks/` | `useProducts.ts`, `useAuth.ts` |
| `pages/` | `CatalogPage.tsx`, `admin/LoginPage.tsx` |
| `types/` | `product.ts`, `auth.ts` |
| `components/` | `ProductCard.tsx` |
| `helpers/` | `whatsapp.ts` |

## Alias `@/`

`@/` → `src/` en `vite.config.ts` + `tsconfig paths`.

## Estilo de código — objetos exportados en `api/`

```typescript
import { apiClient } from './client';

export const productApi = {
  getProducts: async (page: number, limit: number) => {
    const { data } = await apiClient.get('/products', { params: { page, limit } });
    return data;
  },
};
```

## Exports

- Named exports de objetos (`productApi`, `authApi`).
- No `export default` en `api/`.

## TypeScript

- `strict: true`. Prohibido `any`.
- Preferir `interface` para shapes, `type` para unions.
- Types de API alineados con [data-model.md](data-model.md).

## Idioma

- Código (variables, funciones, archivos): **inglés**.
- UI visible al usuario: **español**.
- Mensajes de error del backend (`message`): mostrar en español tal cual vienen.

## Scripts pnpm

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview"
}
```

**Node.js 22** requerido (`engines.node: ">=22.0.0"` en `package.json`).

## Validación en backend

El frontend **no** duplica reglas de negocio de Mongoose/Zod. Confía en la API y muestra errores `{ message }`. Ver `opticapp-back/specs/conventions.md` para detalle de Zod (referencia, no implementar aquí).
