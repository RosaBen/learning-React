import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import cssPlugin from "@eslint/css";
import markdown from "@eslint/markdown";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.css"],
    plugins: { css: cssPlugin },
    language: "css/css",
    extends: ["css/recommended"],  // règles recommandées CSS
    rules: {
      "css/no-duplicate-imports": "error",
      "css/no-empty-blocks": "warn",
    },
  },
  {
    files: ["**/*.md"],
    plugins: { markdown },
    processor: "markdown/markdown",
  },
]);
