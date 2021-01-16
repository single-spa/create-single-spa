const { mergeWithCustomize } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "single-spa",
    projectName: "welcome",
    webpackConfigEnv,
    argv,
  });

  const merge = mergeWithCustomize({
    customizeArray(first, second, key) {
      if (key === "externals") {
        return second;
      }
    },
  });

  const config = merge(defaultConfig, {
    externals: ["single-spa"], // bundle all other dependencies
  });

  const publicPathPluginIndex = config.plugins.findIndex(
    (plugin) => plugin.constructor.name === "SystemJSPublicPathWebpackPlugin"
  );
  if (publicPathPluginIndex >= 0) {
    config.plugins.splice(publicPathPluginIndex, 1);
  }

  return config;
};
