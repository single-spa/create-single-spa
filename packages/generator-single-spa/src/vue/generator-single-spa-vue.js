const Generator = require("yeoman-generator");
const { spawnSync } = require("child_process");
const util = require("util");
const commandExists = util.promisify(require("command-exists"));
const chalk = require("chalk");

module.exports = class SingleSpaVueGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("packageManager", {
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
  }
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

    const cwd = this.options.dir || ".";

    const { status, signal } = spawnSync(
      command,
      args.concat([
        "create",
        cwd,
        "--packageManager",
        this.options.packageManager,
        "--skipGetStarted",
      ]),
      {
        stdio: "inherit",
      }
    );

    if (signal) {
      process.exit(1);
    } else if (status !== 0) {
      process.exit(status);
    } else {
      // We purposely do not attempt to install in one command using presets to avoid being too restrictive with application configuration
      spawnSync(command, args.concat(["add", "single-spa"]), {
        stdio: "inherit",
        cwd,
        env: Object.assign({}, process.env, {
          VUE_CLI_SKIP_DIRTY_GIT_PROMPT: true,
        }),
      });
    }
  }

  async finished() {
    console.log(
      chalk.bgWhite.black(
        `Project setup complete!
Steps to test your Vue single-spa application:
1. Run '${this.options.packageManager}${
          this.options.packageManager === "npm" ? " run" : ""
        } serve'
2. Go to http://single-spa-playground.org/playground/instant-test?name=${encodeURIComponent(
          this.options.dir
        )}&url=%2F%2Flocalhost%3A8080%2Fjs%2Fapp.js&framework=vue to see it working!`
      )
    );
  }
};
