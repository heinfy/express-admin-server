module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': ['off', 'windows'],
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'max-len': ['off', { code: 300 }],
    'no-unused-vars': ['error', { argsIgnorePattern: 'next|fields' }],
  },
};
