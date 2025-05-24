import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default [
	{ ignores: ['dist'] },
	{
		files: ['**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
				sourceType: 'module'
			}
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh
		},
		rules: {
			...js.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			'max-depth': ['error', 5],
			'react/jsx-key': 'error',
			complexity: ['error', 10],
			'max-lines': ['error', { max: 200, skipBlankLines: true, skipComments: true }],
			quotes: ['error', 'single'], // ковычки
			'jsx-quotes': ['error', 'prefer-single'], // ковычки jsx
			semi: ['error', 'never'], // точка с запятой
			// 'no-console': ['warn'],
			eqeqeq: ['error', 'always'], // ===
			'no-duplicate-imports': 'error', // дублирование импортов
			'object-shorthand': ['error', 'always'], // краткие записи { foo } <- { foo: foo }
			'prefer-const': 'error', // использовать const если переменная не меняется
			'no-var': 'error', // не использовать var
			'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
		}
	}
]
