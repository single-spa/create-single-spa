const webpackConfigSingleSpaTs = require("webpack-config-single-spa-ts");
const webpackConfigSingleSpaReact = require("webpack-config-single-spa-react");

module.exports = webpackConfigSingleSpaReactTs;

function webpackConfigSingleSpaReactTs(opts) {
  opts.framework = "react";
  const reactConfig = webpackConfigSingleSpaReact(opts);
  return webpackConfigSingleSpaTs.modifyConfig(opts, reactConfig);
}
