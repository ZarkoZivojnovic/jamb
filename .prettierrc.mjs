// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro'],
  trailingComma: "all",
  astroAllowShorthand: true,
  singleQuote: true,
  tabWidth: 2,
  printWidth: 160,
  bracketSpacing: true,
  arrowParens: "avoid",
  semi: false,
  jsxSingleQuote: true,
  endOfLine: "lf",
  quoteProps: "as-needed",
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
