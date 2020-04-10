module.exports = {
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: [
    "./node_modules/@testing-library/jest-dom/dist/index.js",
  ],
};
