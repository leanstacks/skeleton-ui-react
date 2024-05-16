import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      __fixtures__: '/src/__fixtures__',
      api: '/src/api',
      assets: '/src/assets',
      components: '/src/components',
      hooks: '/src/hooks',
      pages: '/src/pages',
      providers: '/src/providers',
      test: '/src/test',
      utils: '/src/utils',
    },
  },
});
