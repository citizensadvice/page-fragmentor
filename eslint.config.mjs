import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import js from '@eslint/js';
import playwright from 'eslint-plugin-playwright';

export default [
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
  },
  {
    ignores: ['node_modules', 'dist', 'test-results', '.gh-pages'],
  },
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  eslintConfigPrettier,
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
      'import/extensions': ['error', 'always'],
      'import/no-default-export': 'error',
      'import/prefer-default-export': 'off',
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
    files: ['eslint.config.mjs', 'playwright.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'import/no-default-export': 'off',
    },
  },
];
