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
    jest: true,
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
    'no-console': 0,
    'no-use-before-define': 0,
    'new-cap': 0,
    'react/jsx-filename-extension': 0
  },
  plugins: [
    'babel',
    'react',
    'import',
  ]
}
