import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['node_modules/', 'dist/', 'vitest.config.*'],
    },
    js.configs.recommended,
    ...tseslint.configs.strict,
    {
        plugins: {
            import: importPlugin,
        },
        rules: {
            ...importPlugin.configs.recommended.rules,
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            'import/no-unresolved': 'off',
        },
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
            },
        },
    },
    prettierConfig
);
