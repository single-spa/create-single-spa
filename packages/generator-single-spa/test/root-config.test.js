const path = require('path')
const fs = require('fs')
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
        moduleType: "root-config",
      })
      .withPrompts({
        packageManager: "yarn",
        orgName: 'some-org-name'
      })

    return runContext.then(dir => {
      assert.file(path.join(dir, 'package.json'))

      // The webpack config should have their org name in its webpack externals
      assert.file(path.join(dir, "webpack.config.js"))
      const webpackConfigAsStr = fs.readFileSync(path.join(dir, 'webpack.config.js'), {encoding: "utf-8"})
      expect(webpackConfigAsStr.includes('some-org-name')).toBe(true)

      // The index.ejs file should have their org name in it
      assert.file(path.join(dir, "src/index.ejs"))
      const indexEjsStr = fs.readFileSync(path.join(dir, 'src/index.ejs'), {encoding: 'utf-8'})
      expect(indexEjsStr.includes('some-org-name')).toBe(true)
    })
  })
})