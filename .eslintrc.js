module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        jest: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ["@typescript-eslint", "prettier", "react", "react-hooks"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "@feature-sliced"
    ],
    rules: {
        "import/no-internal-modules": "warn",
        "boundaries/element-types": [1, {}]
    },
    ignorePatterns: [".eslintrc.js", "node_modules", "lib", "dir"],
    settings: {
        react: {
            version: "detect",
        },
        "import/resolver": {
            typescript: {
                "alwaysTryTypes": true
            }
        },
    },
};
