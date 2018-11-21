module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  plugins: ['import', 'react', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 120,
        bracketSpacing: true,
        semi: false,
      },
    ],
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'import/newline-after-import': ['error'],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
      },
    ],
  },
}
