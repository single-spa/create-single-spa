const Generator = require("yeoman-generator");
const fs = require("fs").promises;
const ejs = require("ejs");
const chalk = require("chalk");
const validate = require("../validate-naming");

module.exports = class SingleSpaRootConfigGenerator extends Generator {
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

    this.option("layout", {
      type: Boolean,
    });
  }
  async createPackageJson() {
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
        type: "confirm",
        name: "layout",
        message: "Would you like to use single-spa Layout Engine",
        default: false,
        when: this.options.layout === undefined,
      },
      {
        type: "input",
        name: "orgName",
        message: "Organization name",
        suffix: " (can use letters, numbers, dash or underscore)",
        when: !this.options.orgName,
        validate,
      },
    ]);

    Object.assign(this.options, answers, { framework: "none" });
  }
  async copyFiles() {
    const packageJsonTemplate = await fs.readFile(
      this.templatePath("package.json"),
      { encoding: "utf-8" }
    );
    const packageJsonStr = ejs.render(packageJsonTemplate, {
      name: `@${this.options.orgName}/root-config`,
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

    const srcFileExtension = this.options.typescript ? "ts" : "js";

    this.fs.copyTpl(
      this.templatePath("../../common-templates/babel.config.json.ejs"),
      this.destinationPath("babel.config.json"),
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

    if (this.options.typescript) {
      this.fs.copyTpl(
        this.templatePath("tsconfig.json"),
        this.destinationPath("tsconfig.json"),
        this.options
      );
    }

    const parentPath = `src${this.options.layout ? "/layout" : ""}`;
    this.fs.copyTpl(
      this.templatePath(`${parentPath}/root-config.ejs`),
      this.destinationPath(
        `src/${this.options.orgName}-root-config.${srcFileExtension}`
      ),
      this.options
    );

    this.fs.copyTpl(
      this.templatePath(`${parentPath}/index.ejs`),
      this.destinationPath(`src/index.ejs`),
      this.options,
      { delimiter: "?" }
    );

    if (this.options.layout) {
      const { stdout } = this.spawnCommandSync(
        "npm",
        ["view", "single-spa-layout", "version"],
        { stdio: "pipe" }
      );

      const singleSpaLayoutVersion = stdout.toString("utf8").trim();

      this.fs.extendJSON(this.destinationPath("package.json"), {
        dependencies: {
          "single-spa-layout": singleSpaLayoutVersion,
        },
      });
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
      console.log(
        chalk.bgWhite.black(`Project setup complete!
Run '${this.options.packageManager} start' to boot up your single-spa root config`)
      );

      if (this.options.layout) {
        console.log(
          `\nPlease report single-spa-layout issues and bugs on GitHub https://github.com/single-spa/single-spa-layout/issues/new`
        );
      }
    });
  }
};
