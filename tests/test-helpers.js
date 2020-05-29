const nixt = require("nixt");
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

const packagesToLink = [
  "webpack-config-single-spa",
  "webpack-config-single-spa-ts",
  "webpack-config-single-spa-react",
  "webpack-config-single-spa-react-ts",
];

beforeAll(() => {
  console.log("setting up yarn links");
  Promise.all(packagesToLink.map(linkPackage));
});

function linkPackage(packageName) {
  return new Promise((resolve, reject) => {
    nixt()
      .cwd(path.join(process.cwd(), `packages/${packageName}`))
      .run(`yarn link`)
      .code(0)
      .end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
}

exports.createFixtureIfDoesntExist = function (
  fileName,
  fixturePackagesToLink,
  args
) {
  const name = fileName
    .replace(__dirname + path.sep + "e2e" + path.sep, "")
    .replace(".test.js", "");

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
            if (fixturePackagesToLink && fixturePackagesToLink.length > 0) {
              console.log(
                `Linking create-single-spa packages to ${name} fixture`
              );
              nixt()
                .cwd(path.join(cwd, name))
                .run(`yarn link ${fixturePackagesToLink.join(" ")}`)
                .code(0)
                .end(done);
            } else {
              console.log("No fixture packages to link");
              done();
            }
          }
        });
    });
  } else {
    console.log(`Reusing existing fixture for ${name}`);
  }

  return path.join(__dirname, `./fixtures/${name}`);
};
