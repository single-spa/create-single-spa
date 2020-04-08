const webpackConfigSingleSpa = require("webpack-config-single-spa");

module.exports = webpackConfigSingleSpaReact;

function webpackConfigSingleSpaReact(opts) {
  opts.react = true;
  const config = webpackConfigSingleSpa(opts);

  config.externals.push("react", "react-dom");

  return config;
}
