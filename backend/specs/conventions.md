# Convenciones de código — Backend

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

### pnpm

Desde pnpm v11, la config de instalación **no** va en `package.json`. Autorizar builds nativos de dependencias (p. ej. `esbuild` para `tsx`) en `pnpm-workspace.yaml`:

```yaml
allowBuilds:
  esbuild: true
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

## Zod

### ¿Por qué Zod?

| Razón | Detalle |
|-------|---------|
| Un solo lugar para validar | El body/query de Express se valida antes del service; mismas reglas que el tipo TS inferido. |
| Menos bugs silenciosos | MongoDB no valida forma del JSON entrante; Zod rechaza campos extraños o tipos incorrectos con **400** claro. |
| Alineado con SDD | Las specs definen campos obligatorios (`brand`, `model`…); Zod traduce eso a código verificable sin inventar reglas en el controller. |
| Sin duplicar tipos | `z.infer<typeof productSchema>` genera el type; no mantener interface + validación por separado. |
| Ecosistema TS | Integración directa con Express middleware; ampliamente usado en stacks MERN modernos. |

**Alternativa descartada:** validar a mano en controllers → más código repetido y el agente tiende a olvidar casos edge.

## Commits

Formato acordado (cuando se commitee):

```
fix: product/validation
update: auth/login
create: product/upload-middleware
remove: product/legacy-seed
```

Patrón: `{fix|update|create|remove}: {resource}/{thing}`

## Nombres de archivos

**Regla:** un recurso = `{resource}.ts` por carpeta. La carpeta indica la capa.

| Carpeta | Ejemplo |
|---------|---------|
| `routes/` | `product.ts`, `auth.ts` |
| `controllers/` | `product.ts`, `auth.ts` |
| `services/` | `product.ts`, `auth.ts` |
| `validations/` | `product.ts`, `auth.ts` |
| `models/` | `product.ts`, `user.ts` |
| `middlewares/` | `authenticate.ts`, `upload.ts` |
| `helpers/` | `hashPassword.ts` |
| `utils/` | `mapDocument.ts` |

## Alias `@/`

Opcional: `@/` → `src/` para imports limpios.

## Estilo de código — objetos exportados

Controllers y services como **objeto con métodos**:

```typescript
import { productService } from '../services/product';

export const productController = {
  getAll: async (req, res, next) => {
    try {
      const products = await productService.getPublished();
      res.json(products);
    } catch (err) {
      next(err);
    }
  },
};
```

## Serialización `_id` → `id`

**Problema:** Mongoose usa `_id`; la API expone `id` string.

**Solución:** helper único en `utils/mapDocument.ts`. Usarlo en **services** al devolver datos — nunca mezclar `_id` e `id` en controllers.

```typescript
// utils/mapDocument.ts — contrato
export const mapDocument = <T>(doc: { _id: unknown } & T) => ({
  id: String(doc._id),
  ...doc,
  _id: undefined,
});
```

Eliminar `_id` del objeto final antes de `res.json`.

## Exports

- Named exports de objetos (`productService`, `productController`).
- Routers: `export { router as productRouter }`.
- No `export default` en controllers ni services.

## TypeScript

- `strict: true`. Prohibido `any`.
- Preferir `interface` para shapes, `type` para unions.

## Idioma

- Código (variables, funciones, archivos): **inglés**.
- Mensajes de error API (`message`): **español**.

## Scripts pnpm

```json
{
  "dev": "tsx watch src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

Sin nodemon. **Node.js 22** requerido (`engines.node: ">=22.0.0"` en `package.json`).

```json
{
  "engines": {
    "node": ">=22.0.0"
  }
}
```
