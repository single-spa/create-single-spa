const PnpmGenerator = require("../PnpmGenerator");
const fs = require("fs").promises;
const ejs = require("ejs");
const chalk = require("chalk");
const validate = require("../validate-naming");

module.exports = class SingleSpaRootConfigGenerator extends PnpmGenerator {
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
        choices: ["yarn", "npm", "pnpm"],
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
        default: true,
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
      this.templatePath("root-config.package.json"),
      { encoding: "utf-8" }
    );

    const srcFileExtension = this.options.typescript ? "ts" : "js";
    const mainFile = `src/${this.options.orgName}-root-config.${srcFileExtension}`;

    const packageJsonStr = ejs.render(packageJsonTemplate, {
      name: `@${this.options.orgName}/root-config`,
      packageManager: this.options.packageManager,
      typescript: this.options.typescript,
      mainFile,
    });

    const packageJson = JSON.parse(packageJsonStr);

    if (this.options.typescript) {
      // Will be added as a dependency via ts package.json
      delete packageJson.devDependencies["@types/jest"];
      // Will be replaced by eslint-config-ts-react-important-stuff
      delete packageJson.devDependencies["eslint-config-important-stuff"];
      // Will be replaced by webpack-config-single-spa-ts
      delete packageJson.devDependencies["webpack-config-single-spa"];
      packageJson.types = `dist/${this.options.orgName}-root-config.d.ts`;
    }

    this.fs.extendJSON(this.destinationPath("package.json"), packageJson);

    if (this.options.typescript) {
      this.fs.extendJSON(
        this.destinationPath("package.json"),
        this.fs.readJSON(
          this.templatePath(
            "../../common-templates/typescript/typescript.package.json"
          )
        )
      );
    }

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
      this.templatePath(`../../common-templates/.husky/pre-commit`),
      this.destinationPath(`.husky/pre-commit`),
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
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js"),
      this.options
    );

    if (this.options.typescript) {
      this.fs.copyTpl(
        this.templatePath("tsconfig.json"),
        this.destinationPath("tsconfig.json"),
        {
          ...this.options,
          mainFile,
        }
      );
    }

    const parentPath = `src${this.options.layout ? "/layout" : ""}`;
    this.fs.copyTpl(
      this.templatePath(`${parentPath}/root-config.ejs`),
      this.destinationPath(mainFile),
      this.options
    );

    this.fs.copyTpl(
      this.templatePath(`${parentPath}/index.ejs`),
      this.destinationPath(`src/index.ejs`),
      this.options,
      { delimiter: "?" }
    );

    if (this.options.layout) {
      this.fs.copyTpl(
        this.templatePath(`${parentPath}/microfrontend-layout.html`),
        this.destinationPath(`src/microfrontend-layout.html`),
        this.options
      );
    }

    if (this.options.typescript) {
      this.fs.copyTpl(
        this.templatePath(
          `../../common-templates/typescript/declarations.d.ts`
        ),
        this.destinationPath(`src/declarations.d.ts`),
        this.options
      );
    }

    if (this.options.layout) {
      const layoutTemplate = await fs.readFile(
        this.templatePath("root-config-layout.package.json"),
        { encoding: "utf-8" }
      );
      const layoutJson = JSON.parse(
        ejs.render(layoutTemplate, {
          name: `@${this.options.orgName}/root-config`,
          packageManager: this.options.packageManager,
          typescript: this.options.typescript,
          mainFile,
        })
      );
      this.fs.extendJSON(this.destinationPath("package.json"), layoutJson);
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
    if (!this.skipInstall) {
      this.installDependencies({
        npm: this.options.packageManager === "npm",
        yarn: this.options.packageManager === "yarn",
        pnpm: this.options.packageManager === "pnpm",
        bower: false,
      });
    }
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
