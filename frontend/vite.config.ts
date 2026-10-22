import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';

// Keep in sync with the fallback in src/constants/store.ts.
const DEFAULT_STORE_NAME = 'Óptica';

/**
 * Fills `%STORE_NAME%` in index.html. Vite's own `%VITE_*%` replacement leaves
 * the placeholder as-is when the variable is missing, which would leak into
 * the page title and link previews.
 */
function storeNameHtml(storeName: string): Plugin {
  return {
    name: 'store-name-html',
    transformIndexHtml: (html) => html.replaceAll('%STORE_NAME%', storeName),
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, 'VITE_');
  const storeName = env.VITE_STORE_NAME?.trim() || DEFAULT_STORE_NAME;

  return {
    plugins: [react(), tailwindcss(), storeNameHtml(storeName)],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
  };
});
