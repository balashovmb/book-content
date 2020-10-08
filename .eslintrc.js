module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/prop-types": 0
  },
  settings: {
    react: {
      "createClass": "createReactClass",
      "pragma": "React",
      "fragment": "Fragment",
      "version": "detect",
    }
  }
};
