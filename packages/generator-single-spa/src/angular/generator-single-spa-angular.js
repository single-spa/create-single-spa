const Generator = require("yeoman-generator");
const { spawnSync } = require("child_process");
const util = require("util");
const commandExists = util.promisify(require("command-exists"));

module.exports = class SingleSpaAngularGenerator extends Generator {
  async runAngularCli() {
    const globalInstallation = await commandExists("ng");

    let command,
      args = [];
    if (globalInstallation) {
      command = "ng";
    } else {
      command = "npx";
      args.push("@angular/cli");
    }

    if (process.platform === "win32") {
      command += ".cmd";
    }

    const cwd = this.options.dir || ".";

    const { status, signal } = spawnSync(
      command,
      args.concat(["new", "--directory", cwd]),
      { stdio: "inherit" }
    );

    if (signal) {
      process.exit(1);
    } else if (status !== 0) {
      process.exit(status);
    } else {
      spawnSync(command, args.concat(["add", "single-spa-angular"]), {
        stdio: "inherit",
        cwd
      });

      console.log(
        "For further routing setup, see https://single-spa.js.org/docs/ecosystem-angular#configure-routes"
      );
    }
  }
};
