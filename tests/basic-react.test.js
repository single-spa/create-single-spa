const { createFixtureIfDoesntExist } = require("./test-helpers.js");
const nixt = require("nixt");

const fixtureName = "basic-react";

describe(`react generator`, () => {
  const fixtureDir = createFixtureIfDoesntExist(
    fixtureName,
    `
    --framework react
    --packageManager yarn
    --orgName org
    --projectName project
  `
  );

  it(`Can yarn build`, (done) => {
    nixt()
      .cwd(fixtureDir)
      .run(`yarn build`)
      .expect((result) => {
        expect(result.stdout).toMatch(/webpack --mode=production/);
        expect(result.stdout).toMatch(/org-project.js/);
      })
      .code(0)
      .end(done);
  });

  it(`Can yarn lint`, (done) => {
    nixt()
      .cwd(fixtureDir)
      .run(`yarn lint`)
      .expect((result) => {
        expect(result.stdout).toMatch(/eslint/);
      })
      .code(0)
      .end(done);
  });

  it(`Can yarn format`, (done) => {
    nixt()
      .cwd(fixtureDir)
      .run(`yarn format`)
      .expect((result) => {
        expect(result.stdout).toMatch(/prettier/);
        expect(result.stdout).toMatch(/.+webpack.config.js+/);
      })
      .code(0)
      .end(done);
  });

  it(`Can yarn test`, (done) => {
    nixt()
      .cwd(fixtureDir)
      .run(`yarn test`)
      .expect((result) => {
        expect(result.stdout).toMatch(/jest/);
        expect(result.stderr).toMatch(/.+Ran all test suites.+/);
      })
      .code(0)
      .end(done);
  });
});
