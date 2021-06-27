const generator = require("../src/generator-single-spa");
const helpers = require("yeoman-test");

describe("generator-single-spa-svelte", () => {
  const runWithPrompts = (prompts) =>
    helpers
      .create(generator)
      .withOptions({
        framework: "svelte",
      })
      .withPrompts({
        packageManager: "npm",
        orgName: "org",
        projectName: "svelte-project",
        ...prompts,
      })
      .run();

  it("handles yarn option properly", async () => {
    const runResult = await runWithPrompts({ packageManager: "yarn" });
    runResult.assertFile("package.json");
  });

  it("handles pnpm option properly", async () => {
    const runResult = await runWithPrompts({ packageManager: "pnpm" });
    runResult.assertFile("package.json");
  });

  it("handles npm option properly", async () => {
    const runResult = await runWithPrompts();
    runResult.assertFile("package.json");
  });

  it("copies the correct files over", async () => {
    const runResult = await runWithPrompts({ packageManager: "yarn" });
    runResult.assertFile("rollup.config.js");
    runResult.assertFile("src/App.svelte");
  });
});
