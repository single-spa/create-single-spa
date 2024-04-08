module.exports = {
  rootDir: "src",
  testEnvironment: "jsdom",
  transform: {
    "\\.[jt]sx?$": ["babel-jest", { cwd: __dirname }],
  },
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
