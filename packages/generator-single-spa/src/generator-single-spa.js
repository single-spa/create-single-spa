const Generator = require('yeoman-generator')
const SingleSpaReactGenerator = require('./react/generator-single-spa-react')

module.exports = class SingleSpaGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.option("framework", {
      type: String,
    })

    this.destinationPath("test")
  }
  async getFramework() {
    if (!this.options.framework) {
      const answers = await this.prompt([
        {
          type: "list",
          name: "framework",
          message: "Which framework do you want to use?",
          choices: [
            "react",
            "angular",
          ]
        }
      ])

      this.options.framework = answers.framework
    }
  }
  initPackageJson() {
    if (this.options.framework === 'react') {
      this.composeWith({
        Generator: SingleSpaReactGenerator,
        path: require.resolve('./react/generator-single-spa-react.js')
      })
    } else {
      throw Error(`Unsupported framework '${this.options.framework}'`)
    }
  }
}