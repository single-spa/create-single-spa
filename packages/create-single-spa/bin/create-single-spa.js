#!/usr/bin/env node

const yeoman = require('yeoman-environment')
const argv = require('yargs').argv

const env = yeoman.createEnv()
env.registerStub(require('generator-single-spa'), 'single-spa')
env.run('single-spa', argv)
