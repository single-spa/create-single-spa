const webpackConfigSingleSpa = require("webpack-config-single-spa");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { mergeWithCustomize } = require("webpack-merge");

const modifyConfig = (opts, webpackConfig) => {
  const merge = mergeWithCustomize({
    customizeArray(first, second, key) {
      return first.concat(second);
    },
  });

  return merge(webpackConfig, {
    entry: webpackConfig.entry.replace(
      ".js",
      opts.framework === "react" ? ".tsx" : ".ts"
    ),
    plugins: [
      opts.webpackConfigEnv && opts.webpackConfigEnv.analyze
        ? false
        : new ForkTsCheckerWebpackPlugin({}),
    ].filter(Boolean),
    resolve: {
      extensions: [".ts", ".tsx"],
    },
  });
};

function webpackConfigSingleSpaTypescript(opts) {
  const config = webpackConfigSingleSpa(opts);
  return modifyConfig(opts, config);
}

webpackConfigSingleSpaTypescript.modifyConfig = modifyConfig;

module.exports = webpackConfigSingleSpaTypescript;
