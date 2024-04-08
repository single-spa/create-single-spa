module.exports = {
  testEnvironment: "node",
  testTimeout: 120000,
  testPathIgnorePatterns: ["<rootDir>/tests/fixtures/"],
  watchPathIgnorePatterns: ["<rootDir>/tests/fixtures/"],
  projects: [
    "<rootDir>/packages/*/jest.config.js",
    "<rootDir>/tests/jest.config.js",
  ],
};
