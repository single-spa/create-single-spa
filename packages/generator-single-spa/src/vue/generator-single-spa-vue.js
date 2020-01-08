const Generator = require('yeoman-generator')
const { spawn } = require('child_process')

module.exports = class SingleSpaVueGenerator extends Generator {
  async runVueCli() {
    spawn('vue', ['create', '.'], { stdio: 'inherit' })
  }
}