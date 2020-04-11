module.exports = {
  testEnvironment: "node",
  // Fun times waiting on yarn / npm install inside of CI
  testTimeout: 180000,
  testRegex: "tests\\/e2e\\/.+test.js",
  watchPathIgnorePatterns: ["<rootDir>/tests/fixtures/"],
};
