const Generator = require("yeoman-generator");
const chalk = require("chalk");
const validate = require("../validate-naming");

module.exports = class SingleSpaHtmlGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("packageManager", {
      type: String,
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

    Object.assign(this.options, answers, { framework: "html" });
  }
  async copyTemplateFiles() {
    const name = `@${this.options.orgName}/${this.options.projectName}`;
    const filename = `${this.options.orgName}-${this.options.projectName}`;
    // Config files
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      { name }
    );
    this.fs.copyTpl(
      this.templatePath(".babelrc"),
      this.destinationPath(".babelrc"),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath("postcss.config.js"),
      this.destinationPath("postcss.config.js"),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js"),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath("../../common-templates/gitignore"), // this is relative to /templates
      this.destinationPath(".gitignore"),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath("jest.config.js"),
      this.destinationPath("jest.config.js"),
      this.options
    );
    // Source files
    this.fs.copyTpl(
      this.templatePath("src/orgName-projectName.js"),
      this.destinationPath(`src/${filename}.js`),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath("src/styles.css"),
      this.destinationPath(`src/styles.css`),
      this.options
    );
    this.fs.copyTpl(
      this.templatePath("src/template.html"),
      this.destinationPath(`src/template.html`),
      { name }
    );
    this.fs.copyTpl(
      this.templatePath("src/orgName-projectName.test.js"),
      this.destinationPath(`src/${filename}.test.js`),
      {
        filename,
        name,
      }
    );

    const childGitInitProcess = this.spawnCommandSync("git", ["init"]);
    if (childGitInitProcess.error) {
      console.log(
        chalk.red(
          `
************
Cannot initialize git repository
************
`
        )
      );
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
      const startCmd = `${this.options.packageManager} start${
        this.options.packageManager === "npm" ? " --" : ""
      }`;
      console.log(
        chalk.bgWhite.black(`Project setup complete!
Steps to test your single-spa application:
1. Run '${startCmd} --port 8600'
2. Go to http://single-spa-playground.org/playground/instant-test?name=@${this.options.orgName}/${this.options.projectName}&url=8600 to see it working!`)
      );
    });
  }
};
