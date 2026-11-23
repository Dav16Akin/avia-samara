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
    // the tasteskill kit, copied in as plain files
    "public/assets/**",
  ]),
  {
    // Pages are full loads on purpose (plain <a>, plain <img>): the kit's scripts start
    // fresh on every page and the photographs are sized by hand for the static export.
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "off",
      "@next/next/no-css-tags": "off",
      "@next/next/no-page-custom-font": "off",
      "@next/next/google-font-display": "off",
      "@next/next/google-font-preconnect": "off",
    },
  },
]);

export default eslintConfig;
