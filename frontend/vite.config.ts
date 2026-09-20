import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

/** Workaround: @hugeicons/core-free-icons@4.3.4 barrel has 6 case-mismatched re-exports. */
const hugeiconsCaseFix = (): Plugin => ({
  name: 'hugeicons-case-fix',
  enforce: 'pre',
  resolveId(source, importer) {
    if (!importer?.includes('@hugeicons/core-free-icons/dist/esm/index.js')) {
      return null;
    }

    const fixes: Record<string, string> = {
      './Grid2x2CheckIcon.js': './Grid2X2CheckIcon.js',
      './Grid2x2PlusIcon.js': './Grid2X2PlusIcon.js',
      './Grid2x2Icon.js': './Grid2X2Icon.js',
      './Grid2x2XIcon.js': './Grid2X2XIcon.js',
      './Grid3x2Icon.js': './Grid3X2Icon.js',
      './Grid3x3Icon.js': './Grid3X3Icon.js',
    };

    const fixed = fixes[source];
    if (!fixed) {
      return null;
    }

    return path.join(path.dirname(importer), fixed);
  },
});

export default defineConfig({
  plugins: [hugeiconsCaseFix(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});
