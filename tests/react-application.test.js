const nixt = require("nixt");

describe(`react generator`, () => {
  it("can successfully generate a react project", (done) => {
    nixt()
      .cwd(process.cwd())
      .run("node ../packages/create-single-spa/bin/create-single-spa.js")
      .end(done);
  });
});
