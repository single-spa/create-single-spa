const webpackConfigSingleSpa = require('webpack-config-single-spa')

module.exports = webpackConfigSingleSpaReact;

function webpackConfigSingleSpaReact(opts) {
  const config = webpackConfigSingleSpa(opts)

  config.externals.push('react', 'react-dom')

  return config
}