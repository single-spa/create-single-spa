const generator = require("../src/generator-single-spa");
const helpers = require("yeoman-test");

describe("generator-single-spa", () => {
  it("can run the generator", async () => {
    const runResult = await helpers
      .create(generator)
      .withOptions({
        framework: "react",
        skipInstall: true,
      })
      .withPrompts({
        packageManager: "yarn",
        orgName: "org",
        projectName: "basic-test",
      })
      .run();

    return runResult.assertFile("package.json");
  });
});
