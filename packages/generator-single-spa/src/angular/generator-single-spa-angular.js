const Generator = require('yeoman-generator')
const { spawn } = require('child_process')

module.exports = class SingleSpaAngularGenerator extends Generator {
  async runAngularCli() {
    const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
    spawn(npxCmd, ['@angular/cli', 'new'], { stdio: 'inherit' })
  }
}