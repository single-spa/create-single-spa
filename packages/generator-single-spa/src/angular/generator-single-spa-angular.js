const Generator = require("yeoman-generator");
const { spawn } = require("child_process");
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

    spawn(
      command,
      args.concat(["new", "--directory", this.options.dir || "."]),
      { stdio: "inherit" }
    );
  }
};
