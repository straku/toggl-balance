module.exports = {
  extends: ['airbnb'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true,
  },
  parser: 'babel-eslint',
  settings: {
    'import/parser': 'babel-eslint',
    'import/resolver': {
      webpack: {
        config: 'webpack.config.dev.js',
      },
    },
    'import/ignore': [
      'node_modules',
      '\.scss$',
    ],
  },
  rules: {
    'semi': [2, 'never'],
    'space-before-function-paren': [2, 'always'],
    'max-len': [2, 120, 2],
    'no-trailing-spaces': [2, { skipBlankLines: true }],

    // import errors
    'import/no-unresolved': 2,
    'import/named': 2,
    'import/default': 2,
    'import/namespace': 2,
    'import/export': 2,

    // import warnings
    'import/no-duplicates': 1,
  },
  plugins: [
    'babel',
    'react',
    'import',
  ]
}
