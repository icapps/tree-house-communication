module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/warnings',
  ],
  rules: {
      'import/no-unused-modules': 'warn',
      'import/order': [
          'error',
          {
              groups: [
                  ['builtin', 'external'],
                  ['internal', 'parent', 'sibling', 'index'],
              ],
              pathGroups: [
                  {
                      pattern: '@libs/**',
                      group: 'internal',
                  },
              ],
              pathGroupsExcludedImportTypes: ['builtin'],
              'newlines-between': 'always',
          },
      ],
      'prefer-arrow-callback': 'warn',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      "@typescript-eslint/no-empty-function": 'warn',
      "@typescript-eslint/ban-types": "warn"
  },
  env: {
      node: true,
  },
};
