module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
