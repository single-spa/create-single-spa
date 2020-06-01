const Generator = require("yeoman-generator");
const { spawnSync } = require("child_process");
const util = require("util");
const commandExists = util.promisify(require("command-exists"));
const chalk = require("chalk");

module.exports = class SingleSpaAngularGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("packageManager", {
      type: String,
    });

    this.option("projectName", {
      type: String,
    });
  }
  async getOptions() {
    if (!this.options.packageManager) {
      this.options.packageManager = (
        await this.prompt([
          {
            type: "list",
            name: "packageManager",
            message: "Which package manager do you want to use?",
            choices: ["yarn", "npm"],
          },
        ])
      ).packageManager;
    }

    if (!this.options.projectName) {
      this.options.projectName = (
        await this.prompt([
          {
            type: "input",
            name: "projectName",
            message: "Project name (use lowercase and dashes)",
          },
        ])
      ).projectName;
    }
  }
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

    this.cwd = this.options.dir || ".";

    const { status, signal } = spawnSync(
      command,
      args.concat([
        "new",
        this.options.projectName, // name of the new workspace and initial project
        "--directory",
        this.cwd,
        "--package-manager",
        this.options.packageManager,
        // "--routing", false, TODO: Figure out how to interop with single-spa-angular's routing option so that we don't ask the user twice with opposite defaults
      ]),
      { stdio: "inherit" }
    );

    if (signal) {
      process.exit(1);
    } else if (status !== 0) {
      process.exit(status);
    } else {
      spawnSync(command, args.concat(["add", "single-spa-angular"]), {
        stdio: "inherit",
        cwd: this.cwd,
      });

      console.log(
        "For further routing setup, see https://single-spa.js.org/docs/ecosystem-angular#configure-routes"
      );
    }
  }

  // Including single-spa as a dependency has not been fully resolved.
  // It is now included in the Angular schematic https://github.com/single-spa/single-spa-angular/pull/193
  // but that has only been released as an alpha version https://github.com/single-spa/single-spa-angular/releases/tag/v4.1.0-alpha.0
  async validateSingleSpaDependency() {
    const { dependencies } = await this.fs.readJSON(`${this.cwd}/package.json`);
    if (dependencies && !dependencies["single-spa"]) {
      const install = (cmd, opts) =>
        spawnSync(cmd, opts, {
          stdio: "inherit",
          cwd: this.cwd,
        });
      switch (this.options.packageManager) {
        case "npm":
          install("npm", ["install", "single-spa"]);
          break;
        case "yarn":
          install("yarn", ["add", "single-spa"]);
          break;
        default:
          break;
      }
    }
  }

  async finished() {
    console.log(
      chalk.bgWhite.black(
        `Project setup complete!
Steps to test your Angular single-spa application:
1. Run '${this.options.packageManager}${
          this.options.packageManager === "npm" ? " run" : ""
        } serve:single-spa:${this.options.projectName}'
2. Go to http://single-spa-playground.org/playground/instant-test?name=${
          this.options.projectName
        }&url=%2F%2Flocalhost%3A4200%2Fmain.js to see it working!`
      )
    );
  }
};
