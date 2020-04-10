const Generator = require("yeoman-generator");
const ejs = require("ejs");
const fs = require("fs").promises;
const chalk = require("chalk");

module.exports = class SingleSpaReactGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("packageManager", {
      type: String,
    });
    this.option("typescript", {
      type: Boolean,
      default: false,
    });
  }
  async createPackageJson() {
    this.packageManager = this.options.packageManager;

    if (!this.packageManager) {
      this.packageManager = (
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

    if (!this.typescript) {
      this.typescript = (
        await this.prompt([
          {
            type: "confirm",
            name: "typescript",
            message: "Will this project use Typescript?",
            default: false,
          },
        ])
      ).typescript;
    }

    const packageJsonTemplate = await fs.readFile(
      this.templatePath("package.json"),
      { encoding: "utf-8" }
    );
    const packageJsonStr = ejs.render(packageJsonTemplate, {
      packageManager: this.packageManager,
      typescript: this.typescript,
    });

    const packageJson = JSON.parse(packageJsonStr);

    if (this.typescript) {
      // Will be added as a dependency via ts-package.json
      delete packageJson.devDependencies["@types/jest"];
      // Will be replaced by eslint-config-ts-react-important-stuff
      delete packageJson.devDependencies["eslint-config-react-important-stuff"];
    }

    this.fs.extendJSON(this.destinationPath("package.json"), packageJson);

    if (this.typescript) {
      this.fs.extendJSON(
        this.destinationPath("package.json"),
        this.fs.readJSON(this.templatePath("ts-package.json"))
      );
    }
  }
  async copyOtherFiles() {
    const templateOptions = await this.prompt([
      {
        type: "input",
        name: "orgName",
        message: "Organization name (use lowercase and dashes)",
      },
      {
        type: "input",
        name: "projectName",
        message: "Project name (use lowercase and dashes)",
      },
    ]);
    templateOptions.typescript = this.typescript;
    this.orgName = templateOptions.orgName;
    this.projectName = templateOptions.projectName;

    const srcFileExtension = this.typescript ? "tsx" : "js";

    this.fs.copyTpl(
      this.templatePath("jest.config.js"),
      this.destinationPath("jest.config.js"),
      templateOptions
    );
    this.fs.copyTpl(
      this.templatePath(".babelrc.ejs"),
      this.destinationPath(".babelrc"),
      templateOptions
    );
    this.fs.copyTpl(
      this.templatePath(".eslintrc.ejs"),
      this.destinationPath(".eslintrc"),
      templateOptions
    );
    this.fs.copyTpl(
      this.templatePath("../../common-templates/gitignore"), // this is relative to /templates
      this.destinationPath(".gitignore"),
      templateOptions
    );
    this.fs.copyTpl(
      this.templatePath(".prettierignore"),
      this.destinationPath(".prettierignore"),
      templateOptions
    );
    this.fs.copyTpl(
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js"),
      templateOptions
    );
    this.fs.copyTpl(
      this.templatePath("src/root.component.js"),
      this.destinationPath(`src/root.component.${srcFileExtension}`),
      templateOptions
    );
    this.fs.copyTpl(
      this.templatePath("src/root.component.test.js"),
      this.destinationPath(`src/root.component.test.${srcFileExtension}`),
      templateOptions
    );
    this.fs.copyTpl(
      this.templatePath("src/set-public-path.js"),
      this.destinationPath(`src/set-public-path.${srcFileExtension}`),
      templateOptions
    );
    this.fs.copyTpl(
      this.templatePath("src/main.js"),
      this.destinationPath(
        `src/${templateOptions.orgName}-${templateOptions.projectName}.${srcFileExtension}`
      ),
      templateOptions
    );
    if (this.typescript) {
      this.fs.copyTpl(
        this.templatePath("tsconfig.json"),
        this.destinationPath("tsconfig.json"),
        templateOptions
      );
    }

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
      npm: this.packageManager === "npm",
      yarn: this.packageManager === "yarn",
      bower: false,
    });
  }
  finished() {
    this.on(`${this.packageManager}Install:end`, () => {
      const coloredFinalInstructions = chalk.bgWhite.black;
      console.log(coloredFinalInstructions("Project setup complete!"));
      console.log(
        coloredFinalInstructions(
          "Steps to test your React single-spa application:"
        )
      );
      console.log(
        coloredFinalInstructions(
          `1. Run '${this.packageManager} start${
            this.packageManager === "npm" ? " --" : ""
          } --https --port 8500'`
        )
      );
      console.log(
        coloredFinalInstructions(
          `2. Go to https://single-spa-playground.org/playground/instant-test?name=@${this.orgName}/${this.projectName}&url=8500 to see it working!`
        )
      );
    });
  }
};
