import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

/**
 * ESLint configuration for the project:
 * - Defines code quality and formatting rules for Next.js + TypeScript
 * - Integrates Next.js recommended linting rules (core-web-vitals + TypeScript support)
 *
 * Ignored files/folders:
 * - .next, out, build → auto-generated build outputs
 * - next-env.d.ts → auto-generated TypeScript declarations
 *
 * Purpose:
 * - Ensures consistent code quality across the project
 * - Catches potential errors and bad practices during development
 *
 * Lint Command (npm run lint):
 * - Runs ESLint across the entire project
 * - Checks code for errors, warnings, and bad practices
 * - Uses this config file to determine rules and ignored files
 * - Helps maintain clean, consistent, and bug-free code before deployment
 */