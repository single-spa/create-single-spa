module.exports = {
  // Base root configuration
  testEnvironment: "node",
  testTimeout: 60000,
  testPathIgnorePatterns: ["<rootDir>/fixtures/"],
  globalSetup: "<rootDir>/create-fixtures.js",
};
