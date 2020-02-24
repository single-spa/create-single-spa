const Generator = require('yeoman-generator')
const SingleSpaReactGenerator = require('./react/generator-single-spa-react')
const SingleSpaRootConfigGenerator = require('./root-config/generator-root-config')
const SingleSpaVueGenerator = require('./vue/generator-single-spa-vue')
const SingleSpaAngularGenerator = require('./angular/generator-single-spa-angular')
const SingleSpaUtilModuleGenerator = require('./util-module/generator-single-spa-util-module')

module.exports = class SingleSpaGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.option("framework", {
      type: String,
    })

    this.option("moduleType", {
      type: String,
    })
  }
  async composeChildGenerator() {
    let moduleType = this.options.moduleType

    if (!moduleType && this.options.framework) {
      moduleType = 'app-parcel'
    }

    if (!moduleType) {
      moduleType = (await this.prompt([
        {
          type: 'list',
          name: 'moduleType',
          message: 'Select type to generate',
          choices: [
            { name: 'single-spa application / parcel', value: 'app-parcel' },
            { name: 'in-browser utility module (styleguide, api cache, etc)', value: 'util-module' },
            { name: 'single-spa root config', value: 'root-config' },
          ]
        }
      ])).moduleType
    }

    if (moduleType === 'root-config') {
      this.composeWith({
        Generator: SingleSpaRootConfigGenerator,
        path: require.resolve('./root-config/generator-root-config.js'),
      }, this.options)
    } else if (moduleType === 'app-parcel') {
      await runFrameworkGenerator.call(this)
    } else if (moduleType === 'util-module') {
      this.composeWith({
        Generator: SingleSpaUtilModuleGenerator,
        path: require.resolve('./util-module/generator-single-spa-util-module.js')
      })
    } else {
      throw Error(`unknown moduleType option ${moduleType}`)
    }
  }
}

async function runFrameworkGenerator() {
  if (!this.options.framework) {
    const answers = await this.prompt([
      {
        type: "list",
        name: "framework",
        message: "Which framework do you want to use?",
        choices: [
          "react",
          "vue",
          "angular",
          "other"
        ]
      }
    ])

    this.options.framework = answers.framework
  }

  switch (this.options.framework) {
    case "react":
      this.composeWith({
        Generator: SingleSpaReactGenerator,
        path: require.resolve('./react/generator-single-spa-react.js'),
      }, this.options)
      break;
    case "vue":
      this.composeWith({
        Generator: SingleSpaVueGenerator,
        path: require.resolve("./vue/generator-single-spa-vue.js")
      })
      break;
    case "angular":
      this.composeWith({
        Generator: SingleSpaAngularGenerator,
        path: require.resolve('./angular/generator-single-spa-angular.js')
      })
      break;
    case "other":
      console.log(`Check https://github.com/single-spa/create-single-spa/issues for updates on new frameworks being added to create-single-spa. Feel free to create a new issue if one does not yet exist for the framework you're using.`)
      break;
    default:
      throw Error(`Unsupported framework '${this.options.framework}'`)
  }
}