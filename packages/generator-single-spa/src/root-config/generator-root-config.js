const Generator = require("yeoman-generator");
const fs = require("fs").promises;
const ejs = require("ejs");
const chalk = require("chalk");

module.exports = class SingleSpaRootConfigGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("packageManager", {
      type: String
    });

    this.option("typescript", {
      type: Boolean,
      default: false
    });

    this.option("orgName", {
      type: String
    });
  }
  async createPackageJson() {
    if (!this.options.packageManager) {
      this.options.packageManager = (
        await this.prompt([
          {
            type: "list",
            name: "packageManager",
            message: "Which package manager do you want to use?",
            choices: ["yarn", "npm"]
          }
        ])
      ).packageManager;
    }

    if (!this.options.hasOwnProperty("typescript")) {
      this.options.typescript = (
        await this.prompt([
          {
            type: "confirm",
            name: "typescript",
            message: "Will this project use Typescript?",
            default: false
          }
        ])
      ).typescript;
    }

    const packageJsonTemplate = await fs.readFile(
      this.templatePath("package.json"),
      { encoding: "utf-8" }
    );
    const packageJsonStr = ejs.render(packageJsonTemplate, {
      packageManager: this.options.packageManager,
      typescript: this.options.typescript
    });

    const packageJson = JSON.parse(packageJsonStr);

    if (this.options.typescript) {
      // Will be added as a dependency via ts package.json
      delete packageJson.devDependencies["@types/jest"];
      // Will be replaced by eslint-config-ts-react-important-stuff
      delete packageJson.devDependencies["eslint-config-important-stuff"];
      // Will be replaced by webpack-config-single-spa-ts
      delete packageJson.devDependencies["webpack-config-single-spa"];
    }

    this.fs.extendJSON(this.destinationPath("package.json"), packageJson);

    if (this.options.typescript) {
      this.fs.extendJSON(
        this.destinationPath("package.json"),
        this.fs.readJSON(
          this.templatePath("../../common-templates/typescript/package.json")
        )
      );
    }
  }
  async copyFiles() {
    if (!this.options.orgName) {
      this.options.orgName = await this.prompt([
        {
          type: "input",
          name: "orgName",
          message: "Organization name (use lowercase and dashes)"
        }
      ]).orgName;
    }

    this.options.framework = "none";

    const srcFileExtension = this.options.typescript ? "ts" : "js";

    this.fs.copyTpl(
      this.templatePath("../../common-templates/.babelrc.ejs"),
      this.destinationPath(".babelrc"),
      this.options
    );

    this.fs.copyTpl(
      this.templatePath("../../common-templates/gitignore"), // this is relative to /templates
      this.destinationPath(".gitignore"),
      this.options
    );

    this.fs.copyTpl(
      this.templatePath(".eslintrc"),
      this.destinationPath(".eslintrc"),
      this.options
    );

    this.fs.copyTpl(
      this.templatePath(".prettierignore"),
      this.destinationPath(".prettierignore"),
      this.options
    );

    this.fs.copyTpl(
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js"),
      this.options
    );

    this.fs.copyTpl(
      this.templatePath("src/activity-functions.js"),
      this.destinationPath(`src/activity-functions.${srcFileExtension}`),
      this.options
    );

    this.fs.copyTpl(
      this.templatePath("src/activity-functions.test.js"),
      this.destinationPath(`src/activity-functions.test.${srcFileExtension}`),
      this.options
    );

    this.fs.copyTpl(
      this.templatePath("tsconfig.json"),
      this.destinationPath("tsconfig.json"),
      this.options
    );

    this.fs.copyTpl(
      this.templatePath("src/root-config.js"),
      this.destinationPath(
        `src/${this.options.orgName}-root-config.${srcFileExtension}`
      ),
      this.options
    );

    this.fs.copyTpl(
      this.templatePath("src/index.ejs"),
      this.destinationPath(`src/index.ejs`),
      this.options,
      { delimiter: "?" }
    );
  }
  install() {
    this.installDependencies({
      npm: this.options.packageManager === "npm",
      yarn: this.options.packageManager === "yarn",
      bower: false
    });
  }
  finished() {
    this.on(`${this.options.packageManager}Install:end`, () => {
      const coloredFinalInstructions = chalk.bgWhite.black;
      console.log(coloredFinalInstructions("Project setup complete!"));
      console.log(
        coloredFinalInstructions(
          `Run '${this.options.packageManager} start' to boot up your single-spa root config`
        )
      );
    });
  }
};
