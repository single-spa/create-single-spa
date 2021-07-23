const generator = require("../src/generator-single-spa");
const helpers = require("yeoman-test");

describe("generator-single-spa-util-module", () => {
  const generateRunContext = (prompts) =>
    helpers
      .create(generator)
      .withOptions({
        moduleType: "util-module",
        skipInstall: true,
      })
      .withPrompts({
        packageManager: "npm",
        orgName: "org",
        projectName: "util-module-project",
        ...prompts,
      })
      .run();

  it("handles yarn option properly", async () => {
    const runResult = await generateRunContext({ packageManager: "yarn" });
    runResult.assertFile("package.json");
  });

  it("handles pnpm option properly", async () => {
    const runResult = await generateRunContext({ packageManager: "pnpm" });
    runResult.assertFile("package.json");
  });

  it("handles npm option properly", async () => {
    const runResult = await generateRunContext();
    runResult.assertFile("package.json");
  });

  it("copies the correct files over", async () => {
    const runResult = await generateRunContext({ packageManager: "yarn" });
    runResult.assertFile("jest.config.js");
    runResult.assertFile("babel.config.json");
    runResult.assertFile("webpack.config.js");
  });
});
