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
    --typescript
  `
  );

  it(`Can yarn build`, (done) => {
    nixt().cwd(fixtureDir).run(`yarn build`).stdout(/Done!/).code(0).end(done);
  });
});
