const Generator = require("yeoman-generator");
const ejs = require("ejs");
const fs = require("fs").promises;
const chalk = require("chalk");
const validate = require("../validate-naming");

module.exports = class SingleSpaSvelteGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("packageManager", {
      type: String,
    });
    // this.option("typescript", {
    //   type: Boolean,
    // });
    this.option("orgName", {
      type: String,
    });
    this.option("projectName", {
      type: String,
    });
  }
  async getOptions() {
    const answers = await this.prompt([
      {
        type: "list",
        name: "packageManager",
        message: "Which package manager do you want to use?",
        choices: ["yarn", "npm"],
        when: !this.options.packageManager,
      },
      // {
      //   type: "confirm",
      //   name: "typescript",
      //   message: "Will this project use Typescript?",
      //   default: false,
      //   when: this.options.typescript === undefined,
      // },
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
        when: !this.options.projectName,
        validate,
      },
    ]);

    Object.assign(this.options, answers, { framework: "svelte" });
  }
  async createPackageJson() {
    const packageJsonTemplate = await fs.readFile(
      this.templatePath("package.json"),
      { encoding: "utf-8" }
    );
    const packageJsonStr = ejs.render(packageJsonTemplate, {
      name: `@${this.options.orgName}/${this.options.projectName}`,
    });

    const packageJson = JSON.parse(packageJsonStr);

    // if (this.options.typescript) {
    //   // Will be added as a dependency via ts package.json
    //   delete packageJson.devDependencies["@types/jest"];
    // }

    this.fs.extendJSON(this.destinationPath("package.json"), packageJson);

    // if (this.options.typescript) {
    //   this.fs.extendJSON(
    //     this.destinationPath("package.json"),
    //     this.fs.readJSON(
    //       this.templatePath("../../common-templates/typescript/package.json")
    //     )
    //   );
    // }
  }
  async copyOtherFiles() {
    const srcFileExtension = /* this.options.typescript ? "tsx" : */ "js";

    this.fs.copyTpl(
      this.templatePath(`../../common-templates/gitignore`), // this is relative to /templates
      this.destinationPath(`.gitignore`),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath(`.prettierignore`),
      this.destinationPath(`.prettierignore`),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath(`rollup.config.js`),
      this.destinationPath(`rollup.config.js`),
      this.options
    );
    ejs.render(this.destinationPath(`rollup.config.js`), {
      orgName: this.options.orgName,
      projectName: this.options.projectName,
    });
    this.fs.copyTpl(
      this.templatePath(`jest.config.js`),
      this.destinationPath(`jest.config.js`),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath(`babel.config.js`),
      this.destinationPath(`babel.config.js`),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath(`src/App.svelte`),
      this.destinationPath(`src/App.svelte`),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath(`src/App.test.js`),
      this.destinationPath(`src/App.test.${srcFileExtension}`),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath(`src/main.js`),
      this.destinationPath(
        `src/${this.options.orgName}-${this.options.projectName}.${srcFileExtension}`
      ),
      this.options
    );
    // if (this.options.typescript) {
    //   this.fs.copyTpl(
    //     this.templatePath("tsconfig.json"),
    //     this.destinationPath("tsconfig.json"),
    //     this.options
    //   );
    // }

    const childGitInitProcess = this.spawnCommandSync("git", ["init"]);
    if (childGitInitProcess.error) {
      console.log(chalk.red("\n************"));
      console.log(chalk.red("Cannot initialize git repository"));
      console.log(chalk.red("************\n"));
    } else {
      console.log(chalk.green("\nInitialized git repository\n"));
    }
  }
  install() {
    this.installDependencies({
      npm: this.options.packageManager === "npm",
      yarn: this.options.packageManager === "yarn",
      bower: false,
    });
  }
  finished() {
    this.on(`${this.options.packageManager}Install:end`, () => {
      const bwLog = (msg) => console.log(chalk.bgWhite.black(msg));

      bwLog("Project setup complete!");
      bwLog("Steps to test your Svelte single-spa application:");
      bwLog(`1. Run '${this.options.packageManager} start'`);
      bwLog(
        `2. Go to http://single-spa-playground.org/playground/instant-test?name=@${this.options.orgName}/${this.options.projectName}&url=5000 to see it working!`
      );
    });
  }
};
