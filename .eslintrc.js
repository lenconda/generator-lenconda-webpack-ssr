module.exports = {
  extends: ['eslint-config-alloy'],
  globals: {},
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    indent: [
      'error',
      2
    ],
    'semi': 'error',
    'eol-last': 2,
    quotes: [2, 'single']
  }
};
