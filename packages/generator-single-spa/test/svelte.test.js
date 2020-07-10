const path = require("path");
const generator = require("../src/generator-single-spa");
const helpers = require("yeoman-test");
const assert = require("yeoman-assert");

describe("generator-single-spa-svelte", () => {
  let runContext;
  const generateRunContext = (prompts) =>
    helpers
      .run(generator)
      .withOptions({
        framework: "svelte",
      })
      .withPrompts({
        packageManager: "npm",
        orgName: "org",
        projectName: "svelte-project",
        ...prompts,
      });

  afterEach(() => {
    runContext.cleanTestDirectory();
  });

  it("handles yarn option properly", () => {
    runContext = generateRunContext({ packageManager: "yarn" });

    return runContext.then((dir) => {
      assert.file(path.join(dir, "package.json"));
    });
  });

  it("handles npm option properly", () => {
    runContext = generateRunContext();

    return runContext.then((dir) => {
      assert.file(path.join(dir, "package.json"));
    });
  });

  it("copies the correct files over", () => {
    runContext = generateRunContext();

    return runContext.then((dir) => {
      assert.file(path.join(dir, "rollup.config.js"));
      assert.file(path.join(dir, "src/App.svelte"));
    });
  });
});
