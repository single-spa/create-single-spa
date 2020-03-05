const Generator = require('yeoman-generator')
const fs = require('fs').promises
const chalk = require('chalk')

let times = 0

module.exports = class SingleSpaRootConfigGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.option("packageManager", {
      type: String
    })
  }
  async createPackageJson() {
    this.packageManager = this.options.packageManager

    if (!this.packageManager) {
      this.packageManager = (await this.prompt([
        {
          type: "list",
          name: "packageManager",
          message: "Which package manager do you want to use?",
          choices: [
            "yarn",
            "npm",
          ]
        }
      ])).packageManager
    }

    const templatePackageJson = JSON.parse(await fs.readFile(this.templatePath('package.json')))

    this.fs.extendJSON(
      this.destinationPath("package.json"),
      templatePackageJson
    )
  }
  async copyFiles() {
    const templateOptions = await this.prompt([
      {
        type: "input",
        name: "orgName",
        message: "Organization name (use lowercase and dashes)",
        default: "org-name"
      },
    ])

    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc'),
      templateOptions,
      { delimiter: '?' }
    )

    this.fs.copyTpl(
      this.templatePath('.eslintrc'),
      this.destinationPath('.eslintrc'),
      templateOptions,
      { delimiter: '?' }
    )

    this.fs.copyTpl(
      this.templatePath('.prettierignore'),
      this.destinationPath('.prettierignore'),
      templateOptions,
      { delimiter: '?' }
    )

    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      templateOptions,
      { delimiter: '?' }
    )
  }
  install() {
    this.installDependencies({
      npm: this.packageManager === 'npm',
      yarn: this.packageManager === 'yarn',
      bower: false,
    })
  }
  finished() {
    this.on(`${this.packageManager}Install:end`, () => {
      const coloredFinalInstructions = chalk.bgWhite.black
      console.log(coloredFinalInstructions("Project setup complete!"))
      console.log(coloredFinalInstructions(`Run '${this.packageManager} start' to boot up your single-spa root config`))
    })
  }
}
