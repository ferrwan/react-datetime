/*
 * 0 = Off
 * 1 = Warn
 * 2 = Error
*/

module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'airbnb',
    'plugin:flowtype/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    }
  },
  plugins: [
    'flowtype'
  ],
  rules: {
    semi: [2, 'never'],
    'max-len': [2, 120, {
      ignoreComments: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
    }],
    'eol-last': 0,
    'object-curly-newline': 0,

    // react
    'react/jsx-curly-spacing': [2, {
      when: 'always',
      children: true
    }],

    'flowtype/define-flow-type': 1,
    'flowtype/use-flow-type': 1,
  }
};
