const nixt = require("nixt");
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const { resolve } = require("path");

exports.createFixtureIfDoesntExist = function (name, args) {
  const dir = testDir(name);

  if (!fs.existsSync(path.join(__dirname, `./fixtures/${name}/package.json`))) {
    const cwd = path.join(__dirname, "./fixtures");
    mkdirp.sync(cwd);

    return new Promise((resolve, reject) => {
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
            reject(err);
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

            resolve(dir);
          }
        });
    });
  } else {
    console.log(`Reusing existing fixture for ${name}`);
    resolve(dir);
  }
};

exports.ensureInstall = () => {
  return new Promise((resolve, reject) => {
    console.log("Running pnpm install for all fixtures");
    nixt()
      .cwd(process.cwd())
      .run("pnpm install")
      .code(0)
      .end((err) => {
        if (err) {
          reject(err);
        } else {
          console.log("pnpm install finished");
          resolve();
        }
      });
  });
};

function testName(fileName) {
  return fileName
    .replace(__dirname + path.sep + "e2e" + path.sep, "")
    .replace(".test.js", "");
}

function testDir(name) {
  return path.join(__dirname, `./fixtures/${name}`);
}

exports.getFixtureDir = (fileName) => {
  return testDir(testName(fileName));
};
