module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': 'off',
    'no-unused-vars': 'off',
    'vue/no-unused-vars': 'off',
    'import/prefer-default-export': 'off',
    'comma-dangle': 'off',
    'no-alert': 'off',
    'no-param-reassign': 'off',
  },
};
