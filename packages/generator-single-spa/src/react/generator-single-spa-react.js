const Generator = require('yeoman-generator')

module.exports = class SingleSpaReactGenerator extends Generator {
  createPackageJson() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
    )
  }
  async packageJson() {
    const answers = await this.prompt([
      {
        type: "list",
        name: "packageManager",
        message: "Which package manager do you want to use?",
        choices: [
          "npm",
          "yarn",
        ]
      }
    ])

    this.installDependencies({
      npm: answers.packageManager === 'npm',
      yarn: answers.packageManager === 'yarn',
      bower: false,
    })
  }
}