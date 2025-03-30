const path = require("path");
const { readFileSync } = require("fs");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const _HtmlWebpackPlugin = require("html-webpack-plugin");
const StandaloneSingleSpaPlugin =
  require("standalone-single-spa-webpack-plugin").default;
const SystemJSPublicPathPlugin = require("systemjs-webpack-interop/SystemJSPublicPathWebpackPlugin");
const {
  ImportMapExternalsPlugin,
} = require("import-map-externals-webpack-plugin");

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

  let isProduction =
    argv.p || argv.mode === "production" || webpackConfigEnv.WEBPACK_BUILD;

  const isStandalone = webpackConfigEnv.standalone;

  let HtmlWebpackPlugin = opts.HtmlWebpackPlugin || _HtmlWebpackPlugin;

  const outputSystemJS = !!opts.outputSystemJS;

  return {
    mode: isProduction ? "production" : "development",
    entry: path.resolve(
      process.cwd(),
      `src/${opts.orgName}-${opts.projectName}`
    ),
    output: {
      filename: `${opts.orgName}-${opts.projectName}.js`,
      libraryTarget: opts.outputSystemJS ? "system" : "module",
      path: path.resolve(process.cwd(), "dist"),
      uniqueName: opts.projectName,
      devtoolNamespace: `${opts.projectName}`,
      publicPath: outputSystemJS ? "" : "auto",
    },
    module: {
      rules: [
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
          exclude: [/\.module\.css$/],
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
        {
          test: /\.module\.css$/i,
          exclude: [/node_modules/],
          use: [
            {
              loader: require.resolve("style-loader", { paths: [__dirname] }),
            },
            {
              loader: require.resolve("css-loader", { paths: [__dirname] }),
              options: {
                modules: true,
              },
            },
          ],
        },
        {
          test: /\.(bmp|png|jpg|jpeg|gif|webp)$/i,
          exclude: /node_modules/,
          type: "asset/resource",
        },
        // svg has its own loader to allow easier overriding (eg. svg-loader for React components)
        {
          test: /\.svg$/i,
          exclude: /node_modules/,
          type: "asset/resource",
        },
        {
          test: /\.html$/i,
          exclude: [/node_modules/, /\.vue\.html$/],
          type: "asset/source",
        },
      ],
    },
    devtool: "source-map",
    devServer: {
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      client: {
        webSocketURL: {
          hostname: "localhost",
        },
      },
      allowedHosts: "all",
      hot: outputSystemJS,
      setupMiddlewares: (middlewares, devServer) => {
        if (!opts.disableHtmlGeneration && !isStandalone) {
          const htmlDevServer = readFileSync(
            path.join(__dirname, "index.html"),
            "utf8"
          );
          devServer.app.get("/", (_, res) => res.send(htmlDevServer));
        }
        return middlewares;
      },
    },
    externals: opts.orgPackagesAsExternal
      ? ["single-spa", new RegExp(`^@${opts.orgName}/`)]
      : ["single-spa"],
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: webpackConfigEnv.analyze ? "server" : "disabled",
      }),
      outputSystemJS &&
        new SystemJSPublicPathPlugin({
          systemjsModuleName: `@${opts.orgName}/${opts.projectName}`,
          rootDirectoryLevel: opts.rootDirectoryLevel,
        }),
      !isProduction && !opts.disableHtmlGeneration && new HtmlWebpackPlugin(),
      isStandalone &&
        !opts.disableHtmlGeneration &&
        new StandaloneSingleSpaPlugin({
          appOrParcelName: `@${opts.orgName}/${opts.projectName}`,
          moduleFormat: outputSystemJS ? "systemjs" : "esm",
          disabled: !webpackConfigEnv.standalone,
          HtmlWebpackPlugin,
          ...opts.standaloneOptions,
        }),
      opts.importMapUrl &&
        new ImportMapExternalsPlugin({
          importMapUrl: opts.importMapUrl,
        }),
    ].filter(Boolean),
    resolve: {
      extensions: [".mjs", ".js", ".jsx", ".wasm", ".json"],
    },
    experiments: {
      outputModule: !outputSystemJS,
    },
  };
}
