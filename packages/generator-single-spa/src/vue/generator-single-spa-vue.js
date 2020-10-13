const Generator = require("yeoman-generator");
const { spawnSync } = require("child_process");
const util = require("util");
const commandExists = util.promisify(require("command-exists"));
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const validate = require("../validate-naming");

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
    const { dir, name } = path.parse(path.resolve(this.options.dir));
    const hasValidName = validate(name) === true;

    const { orgName, projectName = name } = await this.prompt([
      {
        type: "input",
        name: "orgName",
        message: "Organization name",
        suffix: " (can use letters, numbers, dash or underscore)",
        when: !this.options.orgName,
        validate,
      },
      {
        type: "input",
        name: "projectName",
        message: "Project name",
        suffix: " (can use letters, numbers, dash or underscore)",
        when: !hasValidName,
        validate,
      },
    ]);

    this.options.orgName = orgName;
    this.options.projectName = projectName;
    if (hasValidName) this.options.dir = dir;

    if (!fs.existsSync(this.options.dir)) {
      fs.mkdirSync(this.options.dir);
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

    const dirPath = path.resolve(this.options.dir);
    const projectPath = path.resolve(dirPath, this.options.projectName);

    const { status, signal } = spawnSync(
      command,
      args.concat(["create", this.options.projectName, "--skipGetStarted"]),
      {
        cwd: dirPath,
        stdio: "inherit",
      }
    );

    if (signal) {
      process.exit(1);
    } else if (status !== 0) {
      process.exit(status);
    }

    const pkgJsonPath = path.resolve(projectPath, "package.json");
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath));
    this.projectName = pkgJson.name = `@${this.options.orgName}/${this.options.projectName}`;
    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));

    // We purposely do not attempt to install in one command using presets to avoid being too restrictive with application configuration
    spawnSync(command, args.concat(["add", "single-spa"]), {
      stdio: "inherit",
      cwd: projectPath,
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
