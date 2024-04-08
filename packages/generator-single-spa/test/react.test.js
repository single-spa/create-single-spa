const generator = require("../src/generator-single-spa");
const helpers = require("yeoman-test");

describe("generator-single-spa-react", () => {
  const runGenerator = (prompts) =>
    helpers
      .create(generator)
      .withOptions({
        framework: "react",
        skipInstall: true,
      })
      .withPrompts({
        packageManager: "npm",
        orgName: "org",
        projectName: "react-project",
        ...prompts,
      })
      .run();

  it("handles yarn option properly", async () => {
    const runResult = await runGenerator({
      packageManager: "yarn",
    });

    runResult.assertFile("package.json");
  });

  it("handles npm option properly", async () => {
    const runResult = await runGenerator();

    runResult.assertFile("package.json");
  });

  it("handles pnpm option properly", async () => {
    const runResult = await runGenerator({
      packageManager: "pnpm",
    });

    runResult.assertFile("package.json");
  });

  it("copies the correct files over", async () => {
    const runResult = await runGenerator({
      packageManager: "pnpm",
    });
    runResult.assertFile("jest.config.js");
    runResult.assertFile("babel.config.json");
  });
});
