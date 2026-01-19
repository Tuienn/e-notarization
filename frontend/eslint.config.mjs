import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import reactHooks from 'eslint-plugin-react-hooks'

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts'
    ]),
    {
        rules: {
            ...reactHooks.configs.recommended.rules,
            '@typescript-eslint/no-explicit-any': 'off',
            'react-refresh/only-export-components': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    args: 'after-used',
                    ignoreRestSiblings: true,
                    // cho phép biến bắt đầu bằng _
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_'
                }
            ],
            'no-unused-vars': 'off',
            'no-restricted-imports': [
                'error',
                {
                    patterns: [{ regex: '^@mui/[^/]+$' }]
                }
            ]
            // Doc: https://mui.com/material-ui/guides/minimizing-bundle-size/
        }
    }
])

export default eslintConfig
