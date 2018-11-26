/* global __dirname */

var path = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin")
var webpack = require("webpack")

module.exports = function(env) {
  env = env || {}
  env.dist = Boolean(env.dist)
  env.dev = !env.dist

  const config = {
    mode: env.dist ? "production" : "development",

    resolve: {
      modules: [path.resolve("./src"), "node_modules"],
    },

    entry: {
      scripts: ["babel-polyfill", "./src/index.js"],
    },

    devServer: {
      inline: true,
      hot: true,
      port: 3000,
      stats: "minimal",
    },

    performance: {
      hints: false,
    },

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      library: "game",
      libraryTarget: "var",
    },

    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
            { loader: "less-loader" },
          ],
        },
        {
          test: /\.hbs$/,
          loader: "handlebars-loader",
          options: {
            runtime: "handlebars/dist/handlebars.runtime.js",
          },
        },
        {
          test: /\.yaml$/,
          use: [{ loader: "json-loader" }, { loader: "yaml-loader" }],
        },
        {
          test: /\.json$/,
          use: "json-loader",
        },
        {
          test: /\.txt$/,
          use: "raw-loader",
        },
      ],
    },

    node: {
      fs: "empty",
    },

    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require("./package.json").version),
        "process.env": env,
      }),
      new HtmlWebpackPlugin({
        inlineSource: ".js$",
        template: "pug-loader!./src/templates/layout.pug",
      }),
      new HtmlWebpackInlineSourcePlugin(),
    ],
  }

  if (env.dist) {
    //add babel translate to dist
    config.module.rules.push({
      test: /\.js$/,
      include: [
        path.resolve(__dirname, "src"),
        path.resolve(__dirname, "node_modules/contractions"),
        path.resolve(__dirname, "node_modules/cool-typewriter"),
      ],
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    })
  } else {
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  return config
}
