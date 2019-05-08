module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-useless-escape': 'off',
    'no-unused-vars': 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'no-empty': 'off',
    'no-undef': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
