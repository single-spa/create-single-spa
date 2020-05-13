const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa<% if (typescript) { %>-ts<% } %>");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "<%= orgName %>",
    projectName: "root-config",
    webpackConfigEnv,
  });

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true",
        },
      }),
    ],
  });
};
