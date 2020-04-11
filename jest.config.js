module.exports = {
  testEnvironment: "node",
  testRegex: "tests\\/.+\\.test.js",
  // Fun times waiting on yarn / npm install inside of CI
  testTimeout: 180000,
  watchPathIgnorePatterns: ["tests\\/fixtures\\/.+"],
};
