module.exports = {
  arrowParens: 'always',
  singleQuote: true,
  jsxSingleQuote: true,
  tabWidth: 2,
  semi: true,
  printWidth: 80,
  importOrder: [
    // Packages `react` related packages come first.
    '^react',
    '^next',
    '^jotai',
    '^use',
    '^moment',
    '^@components?\\w',
    '^@utils?\\w',
    '^@?\\w',
    '<THIRD_PARTY_MODULES>',
    // Internal packages.
    '^@/',
    // Side effect imports.
    '^\\u0000',
    // Parent imports. Put `..` last.
    '^\\.\\.(?!/?$)',
    '^\\.\\./?$',
    // Other relative imports. Put same-folder imports and `.` last.
    '^\\./(?=.*/)(?!/?$)',
    '^\\.(?!/?$)',
    '^\\./?$',
    // Style imports.
    '^.+\\.?(css)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
