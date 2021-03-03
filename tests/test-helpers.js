const nixt = require("nixt");
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

exports.createFixtureIfDoesntExist = function (fileName, args) {
  const name = fileName
    .replace(__dirname + path.sep + "e2e" + path.sep, "")
    .replace(".test.js", "");

  const dir = path.join(__dirname, `./fixtures/${name}`);

  if (!fs.existsSync(path.join(__dirname, `./fixtures/${name}/package.json`))) {
    const cwd = path.join(__dirname, "./fixtures");
    mkdirp.sync(cwd);

    it(`can successfully generate the '${name}' fixture`, (done) => {
      const argsStr = args.replace(/\s+/g, " ");

      console.log(`Creating '${name}' fixture. This could take a while...`);

      const command = `node ../../packages/create-single-spa/bin/create-single-spa.js --dir ${name} ${argsStr}`;

      console.log(command);

      nixt()
        .cwd(cwd)
        .run(command)
        .code(0)
        .end((err) => {
          if (err) {
            fail(err);
          } else {
            const packageJsonPath = path.join(dir, "package.json");
            const packageJson = JSON.parse(
              fs.readFileSync(packageJsonPath, "utf-8")
            );
            packageJson.private = true;
            fs.writeFileSync(
              packageJsonPath,
              JSON.stringify(packageJson, null, 2),
              "utf-8"
            );

            // pnpm install seems to exit slightly before the node_modules are actually ready to use.
            // Because of this, we have to guess how long to wait before we try to use them.
            setTimeout(done, 200);
          }
        });
    });
  } else {
    console.log(`Reusing existing fixture for ${name}`);
  }

  return dir;
};
