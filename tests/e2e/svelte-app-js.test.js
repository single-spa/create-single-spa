const { createFixtureIfDoesntExist } = require("../test-helpers.js");
const nixt = require("nixt");

describe(`basic svelte usage`, () => {
  const fixtureDir = createFixtureIfDoesntExist(
    __filename,
    [],
    `
    --framework svelte
    --packageManager yarn
    --orgName org
    --projectName project
  `
  );

  console.log("fixtureDir", fixtureDir);

  it(`Can yarn build`, (done) => {
    console.log("yarn build");
    nixt()
      .cwd(fixtureDir)
      .run(`yarn build`)
      .stdout(/rollup/) // Unable to capture the result beyond that it is executing the bundler
      .code(0)
      .end(done);
  });

  // it(`Can yarn lint`, done => {
  //   console.log("yarn lint");
  //   nixt()
  //     .cwd(fixtureDir)
  //     .run(`yarn lint`)
  //     .expect(result => {
  //       console.log(result.stdout);
  //       console.log(result.stderr);
  //       expect(result.stdout).toMatch(/eslint/);
  //     })
  //     .code(0)
  //     .end(done);
  // });

  it(`Can yarn format`, (done) => {
    console.log("yarn format");
    nixt()
      .cwd(fixtureDir)
      .run(`yarn format`)
      .stdout(/prettier/)
      .code(0)
      .end(done);
  });

  it(`Can yarn test`, (done) => {
    console.log("yarn test");
    nixt()
      .cwd(fixtureDir)
      .run(`yarn test`)
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
