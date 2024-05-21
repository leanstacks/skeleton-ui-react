/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { coverageConfigDefaults } from 'vitest/config';
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
  test: {
    coverage: {
      exclude: [
        '**/__fixtures__/**',
        '**/__mocks__/**',
        'src/main.tsx',
        'src/test',
        '**/postcss.config.js',
        '**/tailwind.config.js',
        ...coverageConfigDefaults.exclude,
      ],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
});
