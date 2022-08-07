module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
        "no-extra-semi": [
            "off",
        ],
        "@typescript-eslint/no-extra-semi": [
            "off",
        ],
        "no-await-in-loop": [
            "error",
        ],
        "no-explicit-any": [
            "off",
        ],
        "no-await-in-loop": [
            "error",
        ],
        "no-constructor-return": [
            "error",
            true,
        ],
        "block-scoped-var": [
            "error",
        ],
        "eqeqeq": [
            "error",
            "always",
        ],
        "dot-notation": [
            "error",
            {
                "allowKeywords": true,
            },
        ],
        "no-floating-decimal": [
            "error",
        ],
        "no-lonely-if": [
            "error",
        ],
        "no-var": [
            "error",
        ],
        "prefer-const": [
            "error",
            {
                "destructuring": "all",
                "ignoreReadBeforeAssign": true,
            },
        ],
        "spaced-comment": [
            "error",
            "always",
        ],
        "array-bracket-spacing": [
            "error",
            "always",
        ],
        "comma-dangle": [
            "error",
            "always-multiline",
        ],
        "comma-spacing": [
            "error",
            {
                "before": false,
                "after": true,
            },
        ],
        "eol-last": [
            "error",
            "never",
        ],
        "func-call-spacing": [
            "error",
            "never",
        ],
        "indent": [
            "error",
            4,
        ],
        "jsx-quotes": [
            "error",
            "prefer-double",
        ],
        "key-spacing": [
            "error",
            {
                "beforeColon": false,
                "afterColon": true,
                "mode": "strict",
            },
        ],
        "keyword-spacing": [
            "error",
            {
                "before": true,
                "after": true,
            },
        ],
        "newline-per-chained-call": [
            "error",
            {
                "ignoreChainWithDepth": 2,
            },
        ],
        "no-extra-parens": [
            "error",
            "all",
        ],
        "no-mixed-spaces-and-tabs": [
            "error",
            "smart-tabs",
        ],
        "no-multi-spaces": [
            "error",
            {
                "ignoreEOLComments": true,
            },
        ],
        "no-trailing-spaces": [
            "error",
            {
                "skipBlankLines": true,
            },
        ],
        "no-whitespace-before-property": [
            "error",
        ],
        "quotes": [
            "error",
            "double",
        ],
        "semi": [
            "error",
            "always",
        ],
        "semi-spacing": [
            "error",
            {
                "before": false,
                "after": true,
            },
        ],
	}
};
