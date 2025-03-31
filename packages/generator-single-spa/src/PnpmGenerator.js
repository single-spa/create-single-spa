const Generator = require("yeoman-generator");
const _ = require("lodash");
const assert = require("assert");
const chalk = require("chalk");

module.exports = class PnpmGenerator extends Generator {
  constructor(...args) {
    super(...args);
  }
  // This overrides https://github.com/yeoman/generator/blob/9cd93ee0fe8babd26cce4e22a6f1db7637573801/lib/actions/install.js#L119
  // to include support for pnpm installations
  _installDependencies() {
    const options = {
      npm: this.options.packageManager === "npm",
      yarn: this.options.packageManager === "yarn",
      pnpm: this.options.packageManager === "pnpm",
      bower: false,
    };
    const msg = {
      commands: [],
      template: _.template(
        "\n\nI'm all done. " +
          '<%= skipInstall ? "Just run" : "Running" %> <%= commands %> ' +
          '<%= skipInstall ? "" : "for you " %>to install the required dependencies.' +
          "<% if (!skipInstall) { %> If this fails, try running the command yourself.<% } %>\n\n"
      ),
    };

    const getOptions = (options) => {
      return typeof options === "object" ? options : null;
    };

    if (options.npm !== false) {
      msg.commands.push("npm install");
      this.npmInstall(null, getOptions(options.npm));
    }

    if (options.yarn) {
      msg.commands.push("yarn install");
      this.yarnInstall(null, getOptions(options.yarn));
    }

    if (options.bower !== false) {
      msg.commands.push("bower install");
      this.bowerInstall(null, getOptions(options.bower));
    }

    if (options.pnpm !== false) {
      msg.commands.push("pnpm install");
      this._pnpmInstall(null, getOptions(options.pnpm));
    }

    assert(
      msg.commands.length,
      "installDependencies needs at least one of `npm`, `bower` or `yarn` to run."
    );

    if (!options.skipMessage) {
      const tplValues = _.extend(
        {
          skipInstall: false,
        },
        this.options,
        {
          commands: chalk.yellow.bold(msg.commands.join(" && ")),
        }
      );
      this.log(msg.template(tplValues));
    }
  }
  _pnpmInstall(pkgs, options, spawnOptions) {
    this.scheduleInstallTask("pnpm", pkgs, options, spawnOptions);
  }
  install() {
    this._installDependencies();
    this._gitInit();
  }
  _gitInit() {
    if (this.options.skipGit || this.options["skip-git"]) {
      this.log("Skipping git initialization");
      return;
    } else {
      const childGitInitProcess = this.spawnCommandSync("git", ["init"]);
      if (childGitInitProcess.error) {
        this.log(chalk.red("************"));
        this.log(chalk.red("Cannot initialize git repository"));
        this.log(chalk.red("************"));
      } else {
        this.log(chalk.green("Initialized git repository"));
      }
    }
  }
};
