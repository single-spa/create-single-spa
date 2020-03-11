const Generator = require('yeoman-generator')
const { spawn } = require('child_process')

module.exports = class SingleSpaVueGenerator extends Generator {
  async runVueCli() {
    const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
    spawn(npxCmd, ['@vue/cli', 'create', '.'], { stdio: 'inherit' })
  }
}