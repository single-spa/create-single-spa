/**  @type {import('@jest/types').Config.ProjectConfig} */

const config = {
  moduleNameMapper: {
    "node-fetch": "<rootDir>/__mocks__/node-fetch.js",
    "import-map-overrides": "<rootDir>/__mocks__/import-map-overrides.js",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(node-fetch|lodash|import-map-overrides)/)",
  ],
  transform: {},
  clearMocks: true,
};

export default config;
