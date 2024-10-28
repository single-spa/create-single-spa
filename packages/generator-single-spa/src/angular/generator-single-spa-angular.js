const Generator = require("yeoman-generator");
const { spawnSync } = require("child_process");
const util = require("util");
const path = require("path");
const fs = require("fs");
const commandExists = util.promisify(require("command-exists"));
const chalk = require("chalk");
const validate = require("../validate-naming");
const validateCLIVersion = require("./validate-cli-version");

module.exports = class SingleSpaAngularGenerator extends Generator {
  _globalInstallation = false;
  constructor(args, opts) {
    super(args, opts);

    this.option("projectName", {
      type: String,
    });
    this.option("angularCLIVersion", {
      type: String,
    });
  }
  async getOptions() {
    this._globalInstallation = await commandExists("ng");
    const questions = [
      {
        type: "input",
        name: "projectName",
        message: "Project name",
        suffix: " (can use letters, numbers, dash or underscore)",
        when: !this.options.projectName,
        validate,
      },
    ];
    if (!this._globalInstallation) {
      questions.push({
        type: "input",
        name: "angularCLIVersion",
        message: "Angular CLI version",
        suffix: " (can use letters, numbers, dash or underscore)",
        default: "latest",
        when: !this.options.angularCLIVersion,
        validateCLIVersion,
      });
    }
    const answers = await this.prompt(questions);

    Object.assign(this.options, answers, { framework: "angular" });
  }
  async runAngularCli() {
    let command,
      args = [];
    if (this._globalInstallation) {
      command = "ng";
    } else {
      command = "npx";
      args.push(["@angular/cli", "@", this.options.angularCLIVersion].join(""));
    }

    if (process.platform === "win32") {
      command += ".cmd";
    }

    const cwd = path.resolve(this.options.dir);

    // `ng new` fails if cwd doesn't already exist
    if (!fs.existsSync(cwd)) fs.mkdirSync(cwd);

    const { status, signal } = spawnSync(
      command,
      args.concat([
        "new",
        this.options.projectName, // name of the new workspace and initial project
        // "--routing", false, TODO: Figure out how to interop with single-spa-angular's routing option so that we don't ask the user twice with opposite defaults
      ]),
      { stdio: "inherit", cwd }
    );

    if (signal) {
      process.exit(1);
    } else if (status !== 0) {
      process.exit(status);
    } else {
      spawnSync(command, args.concat(["add", "single-spa-angular"]), {
        stdio: "inherit",
        cwd: path.resolve(cwd, this.options.projectName),
      });

      console.log(
        "For further routing setup, see https://single-spa.js.org/docs/ecosystem-angular#configure-routes"
      );
    }
  }

  async finished() {
    console.log(
      chalk.bgWhite.black(
        `Project setup complete!
Steps to test your Angular single-spa application:
1. Run 'npm run serve:single-spa:${this.options.projectName}'
2. Go to http://single-spa-playground.org/playground/instant-test?name=${this.options.projectName}&url=%2F%2Flocalhost%3A4200%2Fmain.js&framework=angular to see it working!`
      )
    );
  }
};
