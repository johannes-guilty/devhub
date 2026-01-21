/**
 * ESLint Configuration for DevHub
 *
 * Uses the new flat config format (ESLint 9+).
 * Extends Next.js defaults with stricter TypeScript rules.
 *
 * Key decisions:
 * - 'error' for rules that catch real bugs (no-unused-vars, no-explicit-any)
 * - 'warn' for rules that are preferences (ban-ts-comment)
 * - Prettier handles formatting, ESLint handles code quality
 */
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js recommended configs + Prettier (disables formatting rules)
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    rules: {
      // TypeScript strict rules - catch bugs early
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',

      // Warnings for things that are sometimes necessary
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },
  {
    ignores: ['.next/', 'node_modules/'],
  },
];

export default eslintConfig;
