const Generator = require("yeoman-generator");
const { spawn } = require("child_process");
const util = require("util");
const commandExists = util.promisify(require("command-exists"));

module.exports = class SingleSpaVueGenerator extends Generator {
  async runVueCli() {
    const globalInstallation = await commandExists("vue");

    let command,
      args = [];
    if (globalInstallation) {
      command = "vue";
    } else {
      command = "npx";
      args.push("@vue/cli");
    }

    if (process.platform === "win32") {
      command += ".cmd";
    }

    spawn(command, args.concat(["create", this.options.dir || "."]), {
      stdio: "inherit"
    });
  }
};
