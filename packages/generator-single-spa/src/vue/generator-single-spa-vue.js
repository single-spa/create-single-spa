const Generator = require("yeoman-generator");
const { spawnSync } = require("child_process");
const util = require("util");
const commandExists = util.promisify(require("command-exists"));
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const isValidName = require("../naming");

module.exports = class SingleSpaVueGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("projectName", {
      type: String,
    });

    this.option("orgName", {
      type: String,
    });
  }
  async getOptions() {
    while (!this.options.orgName) {
      let { orgName } = await this.prompt([
        {
          type: "input",
          name: "orgName",
          message: "Organization name (use lowercase and dashes)",
        },
      ]);

      orgName = orgName && orgName.trim();
      if (!orgName) console.log(chalk.red("orgName must be provided!"));
      if (!isValidName(orgName))
        console.log(chalk.red("orgName must use lowercase and dashes!"));
      this.options.orgName = orgName;
    }

    let { dir, name } = path.parse(this.options.dir);

    if (!isValidName(name)) {
      while (!this.options.projectName) {
        let { projectName } = await this.prompt([
          {
            type: "input",
            name: "projectName",
            message: "Project name (use lowercase and dashes)",
          },
        ]);

        projectName = projectName && projectName.trim();
        if (!projectName)
          console.log(chalk.red("projectName must be provided!"));
        if (!isValidName(projectName))
          console.log(chalk.red("projectName must use lowercase and dashes!"));
        this.options.projectName = projectName;
      }
    } else {
      this.options.dir = dir;
      this.options.projectName = name;
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

    const { status, signal } = spawnSync(
      command,
      args.concat(["create", this.options.projectName, "--skipGetStarted"]),
      {
        cwd: this.options.dir,
        stdio: "inherit",
      }
    );

    if (signal) {
      process.exit(1);
    } else if (status !== 0) {
      process.exit(status);
    }

    const pkgJsonPath = path.resolve(
      this.options.dir,
      this.options.projectName,
      "package.json"
    );
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath));
    this.projectName = pkgJson.name = `@${this.options.orgName}/${this.options.projectName}`;
    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));

    // We purposely do not attempt to install in one command using presets to avoid being too restrictive with application configuration
    spawnSync(command, args.concat(["add", "single-spa"]), {
      stdio: "inherit",
      cwd: path.resolve(this.options.dir, this.options.projectName),
      env: Object.assign({}, process.env, {
        VUE_CLI_SKIP_DIRTY_GIT_PROMPT: true,
      }),
    });
  }
  async finished() {
    const usedYarn = this.fs.exists(
      path.resolve(this.options.dir, this.options.projectName, "yarn.lock")
    );
    console.log(
      chalk.bgWhite.black(
        `Project setup complete!
Steps to test your Vue single-spa application:
1. Run '${usedYarn ? "yarn" : "npm run"} serve'
2. Go to http://single-spa-playground.org/playground/instant-test?name=${
          this.projectName
        }&url=%2F%2Flocalhost%3A8080%2Fjs%2Fapp.js&framework=vue to see it working!`
      )
    );
  }
};
