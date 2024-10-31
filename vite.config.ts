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
      assets: '/src/assets',
      common: '/src/common',
      pages: '/src/pages',
      test: '/src/test',
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
    mockReset: true,
    setupFiles: ['./vitest.setup.ts'],
  },
});
