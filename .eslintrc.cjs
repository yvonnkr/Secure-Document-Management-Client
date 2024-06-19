module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            {allowConstantExport: true},
        ],
        // custom
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
        "no-unused-vars": "warn",
        // "@typescript-eslint/no-unused-vars-experimental": "error",
        // "import/order": "error",
        // "no-console": ["warn", { allow: ["warn", "error"] }],
        // eqeqeq: ["error", "always"],
        // "no-else-return": "error",

    },
}
