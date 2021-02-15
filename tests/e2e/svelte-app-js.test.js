const { createFixtureIfDoesntExist } = require("../test-helpers.js");
const nixt = require("nixt");

describe(`basic svelte usage`, () => {
  const fixtureDir = createFixtureIfDoesntExist(
    __filename,
    `
    --framework svelte
    --packageManager pnpm
    --orgName org
    --projectName project
  `
  );

  console.log("fixtureDir", fixtureDir);

  it(`Can pnpm run build`, (done) => {
    console.log("pnpm run build");
    nixt()
      .cwd(fixtureDir)
      .run(`pnpm run build`)
      .stdout(/rollup/) // Unable to capture the result beyond that it is executing the bundler
      .code(0)
      .end(done);
  });

  // it(`Can pnpm run lint`, done => {
  //   console.log("pnpm run lint");
  //   nixt()
  //     .cwd(fixtureDir)
  //     .run(`pnpm run lint`)
  //     .expect(result => {
  //       console.log(result.stdout);
  //       console.log(result.stderr);
  //       expect(result.stdout).toMatch(/eslint/);
  //     })
  //     .code(0)
  //     .end(done);
  // });

  it(`Can pnpm run format`, (done) => {
    console.log("pnpm run format");
    nixt()
      .cwd(fixtureDir)
      .run(`pnpm run format`)
      .stdout(/prettier/)
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
