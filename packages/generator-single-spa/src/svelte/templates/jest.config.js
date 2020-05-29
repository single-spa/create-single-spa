module.exports = {
  transform: {
    "^.+\\.svelte$": "svelte-jester",
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["js", "svelte"],
  setupFilesAfterEnv: [
    "./node_modules/@testing-library/jest-dom/dist/index.js",
  ],
};
