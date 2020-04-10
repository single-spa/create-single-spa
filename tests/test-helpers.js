const nixt = require("nixt");
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

exports.createFixtureIfDoesntExist = function (name, args) {
  if (!fs.existsSync(path.join(__dirname, `./fixtures/${name}`))) {
    const cwd = path.join(__dirname, "./fixtures");
    mkdirp.sync(cwd);

    it(`can successfully generate the '${name}' fixture`, (done) => {
      const argsStr = args.replace(/\s+/g, " ");

      console.log(`Creating '${name}' fixture. This could take a while...`);

      nixt()
        .cwd(cwd)
        .run(
          `node ../../packages/create-single-spa/bin/create-single-spa.js --dir ${name} ${argsStr}`
        )
        .stdout(/Project setup complete!/)
        .code(0)
        .end(done);
    });
  }

  return path.join(__dirname, `./fixtures/${name}`);
};
