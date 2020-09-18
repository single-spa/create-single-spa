const Generator = require("yeoman-generator");
const ejs = require("ejs");
const fs = require("fs").promises;
const chalk = require("chalk");
const validate = require("../validate-naming");

module.exports = class SingleSpaUtilModuleGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("packageManager", {
      type: String,
    });

    this.option("typescript", {
      type: Boolean,
    });

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
      {
        type: "confirm",
        name: "typescript",
        message: "Will this project use Typescript?",
        default: false,
        when: this.options.typescript === undefined,
      },
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

    Object.assign(this.options, answers, { framework: "none" });
  }
  async createPackageJson() {
    const packageJsonTemplate = await fs.readFile(
      this.templatePath("package.json"),
      { encoding: "utf-8" }
    );
    const packageJsonStr = ejs.render(packageJsonTemplate, {
      packageManager: this.options.packageManager,
      typescript: this.options.typescript,
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
  async copyOtherFiles() {
    const srcFileExtension = this.options.typescript ? "ts" : "js";

    this.fs.copyTpl(
      this.templatePath("jest.config.js"),
      this.destinationPath("jest.config.js"),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath("../../common-templates/babel.config.json.ejs"),
      this.destinationPath("babel.config.json"),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath(".eslintrc.ejs"),
      this.destinationPath(".eslintrc"),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath(".prettierignore"),
      this.destinationPath(".prettierignore"),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath("../../common-templates/gitignore"), // this is relative to /templates
      this.destinationPath(".gitignore"),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js"),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath("src/set-public-path.js"),
      this.destinationPath(`src/set-public-path.${srcFileExtension}`),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath("src/main.js"),
      this.destinationPath(
        `src/${this.options.orgName}-${this.options.projectName}.${srcFileExtension}`
      ),
      this.options
    );

    if (this.options.typescript) {
      this.fs.copyTpl(
        this.templatePath("tsconfig.json"),
        this.destinationPath("tsconfig.json"),
        this.options
      );
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
      const coloredFinalInstructions = chalk.bgWhite.black;
      console.log(coloredFinalInstructions("Project setup complete!"));
      console.log(
        coloredFinalInstructions("Steps to test your utility module:")
      );
      console.log(
        coloredFinalInstructions(
          `1. Run '${this.options.packageManager} start${
            this.options.packageManager === "npm" ? " --" : ""
          } --port 8500'`
        )
      );
      console.log(
        coloredFinalInstructions(`2. Go to http://single-spa-playground.org`)
      );
      console.log(
        coloredFinalInstructions(
          `3. Run the following in the browser console: window.importMapOverrides.addOverride('@${this.options.orgName}/${this.options.projectName}', '8500')`
        )
      );
      console.log(
        coloredFinalInstructions(
          `4. Run the following in the browser console: System.import('@${this.options.orgName}/${this.options.projectName}')`
        )
      );
    });
  }
};
