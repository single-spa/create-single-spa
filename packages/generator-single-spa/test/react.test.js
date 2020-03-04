const path = require('path')
const fs = require('fs')
const generator = require('../src/generator-single-spa')
const helpers = require('yeoman-test')
const assert = require('yeoman-assert')

describe('generator-single-spa-react', () => {
  let runContext

  afterEach(() => {
    runContext.cleanTestDirectory()
  })

  it('handles yarn option properly', () => {
    runContext = helpers.run(generator)
      .withOptions({
        framework: "react",
      })
      .withPrompts({
        packageManager: "yarn"
      })

    return runContext.then(dir => {
      assert.file(path.join(dir, 'package.json'))
      assert.jsonFileContent(path.join(dir, 'package.json'), {
        husky: {
          hooks: {
            "pre-commit": "pretty-quick --staged && concurrently yarn:test yarn:lint"
          }
        }
      })
    })
  })

  it('handles npm option properly', () => {
    runContext = helpers.run(generator)
      .withOptions({
        framework: "react",
      })
      .withPrompts({
        packageManager: "npm"
      })

    return runContext.then(dir => {
      assert.file(path.join(dir, 'package.json'))
      assert.jsonFileContent(path.join(dir, 'package.json'), {
        husky: {
          hooks: {
            "pre-commit": "pretty-quick --staged && concurrently npm:test npm:lint"
          }
        }
      })
    })
  })

  it('copies the correct files over', () => {
    runContext = helpers.run(generator)
      .withOptions({
        framework: "react",
      })
      .withPrompts({
        packageManager: "npm"
      })
    
    return runContext.then(dir => {
      assert.file(path.join(dir, 'jest.config.js'))
      assert.file(path.join(dir, '.babelrc'))
    })
  })
})