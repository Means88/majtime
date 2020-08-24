module.exports = {
  "extends": "react-app",
  "plugins": ["react", "@typescript-eslint", "prettier"],
  "rules": {
    "prettier/prettier": ["error", { "singleQuote": true }],
    "react/prop-types": "off",
    "import/no-webpack-loader-syntax": "off",
  },
};
