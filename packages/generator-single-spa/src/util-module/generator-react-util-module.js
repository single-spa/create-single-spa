const PnpmGenerator = require("../PnpmGenerator");
const SingleSpaReactGenerator = require("../react/generator-single-spa-react");
const validate = require("../validate-naming");

module.exports = class ReactUtilModuleGenerator extends PnpmGenerator {
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

    Object.assign(this.options, answers);
  }
  // This generator is just the react app or parcel, but with a different main file.
  async runReactGenerator() {
    this.composeWith(
      {
        Generator: SingleSpaReactGenerator,
        path: require.resolve("../react/generator-single-spa-react.js"),
      },
      {
        ...this.options,
        skipMainFile: true,
      }
    );
  }
  async modifyMainFile() {
    const srcFileExtension = this.options.typescript ? "tsx" : "js";
    const mainFile = `src/${this.options.orgName}-${this.options.projectName}.${srcFileExtension}`;
    this.fs.copyTpl(
      this.templatePath("src/main.js"),
      this.destinationPath(mainFile),
      {
        ...this.options,
        mainFile,
      }
    );
  }
};
