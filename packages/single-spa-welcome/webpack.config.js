const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "single-spa",
    projectName: "welcome",
    webpackConfigEnv,
    argv,
  });

  const config = webpackMerge.smartStrategy({ externals: "replace" })(
    defaultConfig,
    {
      externals: ["single-spa"], // bundle all other dependencies
    }
  );

  return config;
};
