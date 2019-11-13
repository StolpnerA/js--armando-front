module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['@vue/airbnb', 'plugin:vue/recommended'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'function-paren-newline': 'off',
    'space-before-function-paren': 'off',
    'arrow-parens': [2, 'as-needed', { requireForBlockBody: false }],
    'func-names': 'off',
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
