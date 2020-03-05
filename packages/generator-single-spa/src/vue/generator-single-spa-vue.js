const Generator = require('yeoman-generator')
const { spawn } = require('child_process')

module.exports = class SingleSpaVueGenerator extends Generator {
  async runVueCli() {
    spawn('npx', ['@vue/cli', 'create', '.'], { stdio: 'inherit' })
  }
}