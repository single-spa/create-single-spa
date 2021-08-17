const PnpmGenerator = require("../PnpmGenerator");
const ejs = require("ejs");
const fs = require("fs").promises;
const chalk = require("chalk");
const validate = require("../validate-naming");

module.exports = class SingleSpaReactGenerator extends PnpmGenerator {
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
    this.option("skipMainFile", {
      type: Boolean,
    });
  }
  async getOptions() {
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

    Object.assign(this.options, answers, { framework: "react" });
  }
  async createPackageJson() {
    this.srcFileExtension = this.options.typescript ? "tsx" : "js";
    this.mainFile = `src/${this.options.orgName}-${this.options.projectName}.${this.srcFileExtension}`;

    const packageJsonTemplate = await fs.readFile(
      this.templatePath("react.package.json"),
      { encoding: "utf-8" }
    );
    const packageJsonStr = ejs.render(packageJsonTemplate, {
      name: `@${this.options.orgName}/${this.options.projectName}`,
      packageManager: this.options.packageManager,
      typescript: this.options.typescript,
      mainFile: this.mainFile,
    });

    const packageJson = JSON.parse(packageJsonStr);

    if (this.options.typescript) {
      // Will be added as a dependency via ts package.json
      delete packageJson.devDependencies["@types/jest"];
      // Will be replaced by eslint-config-ts-react-important-stuff
      delete packageJson.devDependencies["eslint-config-react-important-stuff"];
      // Will be replaced by webpack-config-single-spa-react-ts
      delete packageJson.devDependencies["webpack-config-single-spa"];
      // Will be replaced by webpack-config-single-spa-react-ts
      delete packageJson.devDependencies["webpack-config-single-spa-ts"];

      packageJson.types = `dist/${this.options.orgName}-${this.options.projectName}.d.ts`;
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

      this.fs.extendJSON(
        this.destinationPath("package.json"),
        this.fs.readJSON(
          this.templatePath(
            "../../common-templates/typescript/react.package.json"
          )
        )
      );

      // Extend with react-specific package json for typescript
      this.fs.extendJSON(
        this.destinationPath("package.json"),
        this.fs.readJSON(
          this.templatePath("typescript/typescript-react.package.json")
        ),
        (key, value) => {
          if (key === "devDependencies") {
            // Remove standard eslint configuration in favor of react specific
            delete value["eslint-config-ts-important-stuff"];
          }
          return value;
        }
      );
    }
  }
  async copyOtherFiles() {
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
      this.templatePath("../../common-templates/gitignore"), // this is relative to /templates
      this.destinationPath(".gitignore"),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath(`../../common-templates/.husky/pre-commit`),
      this.destinationPath(`.husky/pre-commit`),
      this.options
    );

    if (this.options.typescript) {
      this.fs.copyTpl(
        this.templatePath(
          `../../common-templates/typescript/declarations.d.ts`
        ),
        this.destinationPath(`src/declarations.d.ts`),
        this.options
      );
    }
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
      this.templatePath("src/root.component.js"),
      this.destinationPath(`src/root.component.${this.srcFileExtension}`),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath("src/root.component.test.js"),
      this.destinationPath(`src/root.component.test.${this.srcFileExtension}`),
      this.options
    );
    if (!this.options.skipMainFile) {
      this.fs.copyTpl(
        this.templatePath("src/main.js"),
        this.destinationPath(this.mainFile),
        this.options
      );
    }
    if (this.options.typescript) {
      this.fs.copyTpl(
        this.templatePath("tsconfig.json"),
        this.destinationPath("tsconfig.json"),
        {
          ...this.options,
          mainFile: this.mainFile,
        }
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
Steps to test your React single-spa application:
1. Run '${this.options.packageManager} start${
          this.options.packageManager === "yarn" ? "" : " --"
        } --port 8500'
2. Go to http://single-spa-playground.org/playground/instant-test?name=@${
          this.options.orgName
        }/${this.options.projectName}&url=8500 to see it working!`)
      );
    });
  }
};
