module.exports = {
  testEnvironment: "node",
  // Tests in the "src" folder are template tests which should not be run as part of the generator tests
  testPathIgnorePatterns: ["<rootDir>/src/"],
};
