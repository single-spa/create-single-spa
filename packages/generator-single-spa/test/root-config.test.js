const generator = require("../src/generator-single-spa");
const helpers = require("yeoman-test");

describe("generator-single-spa", () => {
  it("can run the generator", async () => {
    const runResult = await helpers
      .create(generator)
      .withOptions({
        moduleType: "root-config",
        packageManager: "pnpm",
        orgName: "some-org-name",
        projectName: "some-project-name",
        layout: false,
        skipInstall: true,
      })
      .run();

    runResult.assertFile("package.json");
    runResult.assertFile(".eslintrc");
    runResult.assertFile(".prettierignore");
    runResult.assertFile("babel.config.json");

    // The webpack config should have their org name in its webpack externals
    runResult.assertFile("webpack.config.js");
    runResult.assertFileContent("webpack.config.js", /some-org-name/);

    // The index.ejs file should have their org name in it
    runResult.assertFile("src/index.ejs");
    runResult.assertFileContent(
      "src/index.ejs",
      /\/\/localhost:9000\/some-org-name-root-config.js/
    );

    // The root-config.js file should have their org name in it
    runResult.assertFile("src/some-org-name-root-config.js");
    runResult.assertFileContent(
      "src/some-org-name-root-config.js",
      /some-org-name/
    );
  });
});
