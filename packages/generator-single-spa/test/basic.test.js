const path = require('path')
const generator = require('../src/generator-single-spa')
const helpers = require('yeoman-test')
const assert = require('yeoman-assert')

describe('generator-single-spa', () => {
  let runContext

  afterEach(() => {
    runContext.cleanTestDirectory()
  })

  it('can run the generator', () => {
    runContext = helpers.run(generator)
      .withOptions({
        framework: "react",
      })
      .withPrompts({
        packageManager: "yarn"
      })

    return runContext.then(dir => {
      assert.file(path.join(dir, 'package.json'))
    })
  })
})