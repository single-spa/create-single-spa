const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { UnusedFilesWebpackPlugin } = require("unused-files-webpack-plugin");
const _HtmlWebpackPlugin = require("html-webpack-plugin");
const StandaloneSingleSpaPlugin = require("standalone-single-spa-webpack-plugin");

module.exports = webpackConfigSingleSpa;

function webpackConfigSingleSpa(opts) {
  if (typeof opts !== "object") {
    throw Error(`webpack-config-single-spa requires an opts object`);
  }

  if (typeof opts.orgName !== "string") {
    throw Error(`webpack-config-single-spa requires an opts.orgName string`);
  }

  if (typeof opts.projectName !== "string") {
    throw Error(
      `webpack-config-single-spa requires an opts.projectName string`
    );
  }

  if (opts.orgPackagesAsExternal !== false) {
    opts.orgPackagesAsExternal = true;
  }

  let webpackConfigEnv = opts.webpackConfigEnv || {};

  let argv = opts.argv || {};

  let isProduction = argv.p || argv.mode === "production";

  let HtmlWebpackPlugin = opts.HtmlWebpackPlugin || _HtmlWebpackPlugin;

  return {
    entry: path.resolve(
      process.cwd(),
      `src/${opts.orgName}-${opts.projectName}.js`
    ),
    output: {
      filename: `${opts.orgName}-${opts.projectName}.js`,
      libraryTarget: "system",
      path: path.resolve(process.cwd(), "dist"),
      jsonpFunction: `webpackJsonp_${opts.projectName}`,
      devtoolNamespace: `${opts.projectName}`,
    },
    module: {
      rules: [
        {
          parser: {
            system: false,
          },
        },
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve("babel-loader", { paths: [__dirname] }),
          },
        },
        {
          test: /\.css$/i,
          include: [/node_modules/, /src/],
          use: [
            {
              loader: require.resolve("style-loader", { paths: [__dirname] }),
            },
            {
              loader: require.resolve("css-loader", { paths: [__dirname] }),
              options: {
                modules: false,
              },
            },
          ],
        },
      ],
    },
    devtool: "sourcemap",
    devServer: {
      compress: true,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      disableHostCheck: true,
    },
    externals: opts.orgPackagesAsExternal
      ? ["single-spa", new RegExp(`^@${opts.orgName}/`)]
      : ["single-spa"],
    plugins: [
      new CleanWebpackPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: webpackConfigEnv.analyze ? "server" : "disabled",
      }),
      new UnusedFilesWebpackPlugin({
        globOptions: {
          cwd: path.resolve(process.cwd(), "src"),
          ignore: [
            "**/*.test.*",
            "**/*.spec.*",
            "**/*.*.snap",
            "**/test-setup.*",
            "**/*.stories.*",
          ],
        },
      }),
      !isProduction && new HtmlWebpackPlugin(),
      !isProduction &&
        new StandaloneSingleSpaPlugin({
          appOrParcelName: `@${opts.orgName}/${opts.projectName}`,
          disabled: !webpackConfigEnv.standalone,
          HtmlWebpackPlugin,
          ...opts.standaloneOptions,
        }),
    ].filter(Boolean),
    resolve: {
      extensions: [".js", ".mjs", ".jsx", ".wasm", ".json"],
    },
  };
}
