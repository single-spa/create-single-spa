const webpackConfigSingleSpa = require("webpack-config-single-spa");

module.exports = webpackConfigSingleSpaReact;

function webpackConfigSingleSpaReact(opts) {
  const webpackConfigEnv = opts.webpackConfigEnv || {};

  opts.react = true;
  const config = webpackConfigSingleSpa(opts);

  if (!webpackConfigEnv.standalone) {
    config.externals.push("react", "react-dom");
  }

  return config;
}
