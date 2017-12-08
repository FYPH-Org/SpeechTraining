module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  // extends: "airbnb-base",
  // extends: ["eslint:recommended", "plugin:react/recommended"],
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module"
  },
  plugins: ["react"], // use only with react
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "no-unused-vars": ["error", {"varsIgnorePattern": "dotenv"}],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error"
  }
};
