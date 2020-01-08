const Generator = require('yeoman-generator')
const { spawn } = require('child_process')

module.exports = class SingleSpaAngularGenerator extends Generator {
  async runVueCli() {
    spawn('ng', ['new'], { stdio: 'inherit' })
  }
}