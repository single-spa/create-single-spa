const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { UnusedFilesWebpackPlugin } = require("unused-files-webpack-plugin");

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

  const typescript = opts.typecheck === "typescript";

  let webpackConfigEnv = opts.webpackConfigEnv || {};
  let entryFileExtension;
  if (typescript) {
    entryFileExtension = opts.react ? "tsx" : "ts";
  } else {
    entryFileExtension = "js";
  }

  return {
    entry: path.resolve(
      process.cwd(),
      `src/${opts.orgName}-${opts.projectName}.${entryFileExtension}`
    ),
    output: {
      filename: `${opts.orgName}-${opts.projectName}.js`,
      libraryTarget: "system",
      path: path.resolve(process.cwd(), "dist"),
      jsonpFunction: `webpackJsonp_${opts.projectName}`,
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
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: [
            { loader: "style-loader" },
            {
              loader: "css-loader",
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
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      disableHostCheck: true,
    },
    externals: ["single-spa", new RegExp(`^@${opts.orgName}/`)],
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
    ].concat(
      typescript ? [new (require("fork-ts-checker-webpack-plugin"))()] : []
    ),
    resolve: {
      extensions: [".js", ".mjs", ".wasm", ".json"].concat(
        typescript ? [".ts", ".tsx"] : []
      ),
    },
  };
}
