const webpackConfigSingleSpa = require("webpack-config-single-spa");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const merge = require("webpack-merge");

const modifyConfig = (opts, webpackConfig) => {
  const typescriptPath =
    opts.typescriptPath ||
    require.resolve("typescript", { paths: [process.cwd()] });

  return merge.strategy({
    entry: "replace",
    plugins: "append",
    "resolve.extensions": "append",
  })(webpackConfig, {
    entry: webpackConfig.entry.replace(
      ".js",
      opts.framework === "react" ? ".tsx" : ".ts"
    ),
    plugins: [
      opts.webpackConfigEnv && opts.webpackConfigEnv.analyze
        ? false
        : new ForkTsCheckerWebpackPlugin({ typescript: typescriptPath }),
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
