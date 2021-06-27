const { getFixtureDir } = require("../test-helpers.js");
const nixt = require("nixt");

const fixtureDir = getFixtureDir(__filename);

describe(`basic react usage`, () => {
  it(`Can pnpm run build`, (done) => {
    console.log("pnpm run build");
    nixt()
      .cwd(fixtureDir)
      .run(`pnpm run build`)
      .expect((result) => {
        console.log(result.stdout);
        console.log(result.stderr);
        expect(result.stdout).toMatch(/webpack --mode=production/);
        expect(result.stdout).toMatch(/org-project.js/);
      })
      .code(0)
      .end(done);
  });

  it(`Can pnpm run lint`, (done) => {
    console.log("pnpm run lint");
    nixt()
      .cwd(fixtureDir)
      .run(`pnpm run lint`)
      .expect((result) => {
        console.log(result.stdout);
        console.log(result.stderr);
        expect(result.stdout).toMatch(/eslint/);
      })
      .code(0)
      .end(done);
  });

  it(`Can pnpm run format`, (done) => {
    console.log("pnpm run format");
    nixt()
      .cwd(fixtureDir)
      .run(`pnpm run format`)
      .expect((result) => {
        console.log(result.stdout);
        console.log(result.stderr);
        expect(result.stdout).toMatch(/prettier/);
        expect(result.stdout).toMatch(/webpack.config.js/);
      })
      .code(0)
      .end(done);
  });

  it(`Can pnpm test`, (done) => {
    console.log("pnpm test");
    nixt()
      .cwd(fixtureDir)
      .run(`pnpm test`)
      .expect((result) => {
        console.log(result.stdout);
        console.log(result.stderr);
        expect(result.stdout).toMatch(/jest/);
        expect(result.stderr).toMatch(/Ran all test suites/);
      })
      .code(0)
      .end(done);
  });
});
