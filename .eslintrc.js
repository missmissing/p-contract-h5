// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'airbnb',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-new': 0,
    'space-before-function-paren': 0,
    'one-var': 0,
    'spaced-comment': 0,
    'comma-dangle': ['error', 'never'],
    'object-curly-spacing': 0,
    'no-param-reassign': ['error', {'props': false}],
    'no-restricted-properties': [2, {
      'object': 'disallowedObjectName',
      'property': 'disallowedPropertyName'
    }],
    'linebreak-style': 0,
    'prefer-destructuring': 0,
    'global-require': 0,
    'func-names': ['error', 'as-needed'],
    'max-len': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'no-console': 0,
    'no-unused-expressions': 0,
    'import/prefer-default-export': 0,
    'import/no-dynamic-require': 0,
    'import/extensions': 0
  }
};
