import pluginNext from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    name: "eslint/ignores",
    ignores: [".next/**", "node_modules/**", "out/**"],
  },
  {
    name: "eslint/typescript",
    files: ["**/*.ts", "**/*.tsx", "**/*.mjs"],
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...tsPlugin.configs["recommended"]?.rules,
    },
  },
  // Next.js core-web-vitals (включает a11y)
  pluginNext.configs["core-web-vitals"],
  {
    name: "eslint/custom",
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];
