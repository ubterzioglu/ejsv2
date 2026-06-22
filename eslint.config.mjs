import next from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...next,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "supabase/**",
      "scripts/**",
      "proxy.js",
      ".omc/**",
    ],
  },
];

export default eslintConfig;
