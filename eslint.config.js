import tseslint from "typescript-eslint";
import globals from "globals";

export default [
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "TemplateLiteral > CallExpression[callee.property.name='map']",
          message:
            "Do not use .map() directly in template literals. Use .join() instead.",
        },
      ],

      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: ["signature", "field", "constructor", "method"],
        },
      ],

      // Prefer type inference, but enforce consistency

      "@typescript-eslint/consistent-type-imports": [
        "warn",

        { prefer: "type-imports" },
      ],

      // Enforce consistent type definitions (type vs interface)

      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],

      // Require explicit return types ONLY for exported functions

      "@typescript-eslint/explicit-module-boundary-types": "warn",

      // Avoid unnecessary type annotations (keeps code clean)

      "@typescript-eslint/no-inferrable-types": "warn",

      // Enforce consistent array types (T[] instead of Array<T>)

      "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],

      /**
    
    - --- Safety & Clarity ---
    - */

      // Prevent using "any" casually

      "@typescript-eslint/no-explicit-any": "warn",

      // Encourage better type narrowing

      "@typescript-eslint/strict-boolean-expressions": "off", // too harsh for juniors

      // Catch unused vars but allow _

      "@typescript-eslint/no-unused-vars": [
        "warn",

        { argsIgnorePattern: "^_" },
      ],
    },
  },
];
