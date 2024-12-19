/**  @type {import('@jest/types').Config.ProjectConfig} */
const config = {
  moduleNameMapper: {
    "import-map-overrides": "<rootDir>/__mocks__/import-map-overrides.js",
  },
  clearMocks: true,
};

export default config;
