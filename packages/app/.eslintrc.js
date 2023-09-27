module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	root: true,
	parser: "vue-eslint-parser",
	extends: [
		"eslint-config-prettier",
		"plugin:vue/vue3-essential",
		"plugin:prettier/recommended",
	],

	ignorePatterns: [".eslintrc.js", "index.html"],
	overrides: [],
	parserOptions: {
		parser: "@typescript-eslint/parser",
		ecmaVersion: "latest",
		sourceType: "module",
		extraFileExtensions: [".vue"],
	},
	plugins: ["vue"],
	rules: {
		"vue/multi-word-component-names": "off",
		"vue/valid-define-props": "off",
		"no-undef": "off",
	},
};
