/**  @type {import('@jest/types').Config.ProjectConfig} */
const config = {
  moduleNameMapper: {
    "node-fetch": "<rootDir>/__mocks__/node-fetch.js",
    "import-map-overrides": "<rootDir>/__mocks__/import-map-overrides.js",
  },
  clearMocks: true,
};

export default config;
