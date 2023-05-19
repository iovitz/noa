module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	parser: 'vue-eslint-parser',
	extends: [
		'eslint-config-prettier',
		'plugin:vue/vue3-essential',
		'standard-with-typescript',
		'plugin:prettier/recommended',
	],
	overrides: [],
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['vue'],
	rules: {
		'vue/multi-word-component-names': 'off',
		'no-undef': 'off',
	},
};
