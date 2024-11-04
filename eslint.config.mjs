import globals from 'globals';
import tsParser from '@typescript-eslint/parser';

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
    plugins: {
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-empty-object-type': ['error', { allowWithName: 'Props$' }],
    },
  },
  {
    // global ignores
    // do not add any other keys to this object
    ignores: ['coverage/', 'dist/'],
  },
);
