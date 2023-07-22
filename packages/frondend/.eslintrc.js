module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  root: true,
  parser: 'vue-eslint-parser',
  extends: ['eslint-config-prettier', 'plugin:vue/vue3-essential', 'plugin:prettier/recommended'],

  ignorePatterns: ['.eslintrc.js', 'index.html'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-undef': 'off',
  },
}
