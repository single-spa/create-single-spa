const generator = require("../src/generator-single-spa");
const helpers = require("yeoman-test");

describe("generator-single-spa", () => {
  it("can do git init", async () => {
    const runResult = await helpers
      .create(generator)
      .withOptions({
        moduleType: "root-config",
        packageManager: "pnpm",
        orgName: "org",
        projectName: "proj",
        layout: false,
        skipInstall: true,
      })
      .run();
    runResult.assertFile(".git/HEAD");
  });

  it("can skip git init", async () => {
    const runResult = await helpers
      .create(generator)
      .withOptions({
        moduleType: "root-config",
        packageManager: "pnpm",
        orgName: "org",
        projectName: "proj",
        layout: false,
        skipInstall: true,
        skipGit: true,
      })
      .run();
    runResult.assertNoFile(".git/HEAD");
  });
});
