import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import playwright from 'eslint-plugin-playwright';

export default defineConfig([
  eslintConfigPrettier,
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
  },
  globalIgnores([
    'node_modules',
    'dist',
    'test-results',
    '.gh-pages',
    'playwright-report',
  ]),
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'class-methods-use-this': 'off',
      'no-continue': 'off',
      'no-underscore-dangle': 'off',
      'no-restricted-syntax': 'off',
      'no-return-assign': ['error', 'except-parens'],
      'object-curly-newline': ['error', { consistent: true }],
      'no-param-reassign': ['error', { props: false }],
    },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['test/**'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-eval': 'off',
      'playwright/no-element-handle': 'off',
    },
  },
  {
    files: ['examples/**/*'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    files: ['eslint.config.js', 'playwright.config.js', 'stylelint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'import/no-default-export': 'off',
    },
  },
]);
