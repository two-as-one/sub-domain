/* global __dirname */

var path = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var webpack = require("webpack")
var pkg = require("./package.json")

module.exports = function(env) {
  env = env || {}

  const config = {
    resolve: {
      modules: [path.resolve("./src"), "node_modules"],
      alias: {
        handlebars: "handlebars/dist/handlebars.js"
      }
    },

    entry: {
      scripts: "./src/index.js"
    },

    devServer: {
      inline: true,
      stats: "minimal"
    },

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      library: "game",
      libraryTarget: "var"
    },

    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            "style-loader",
            { loader: "css-loader", options: { importLoaders: 1 } },
            "less-loader"
          ]
        },
        {
          test: /\.hbs$/,
          use: "handlebars-loader"
        },
        {
          test: /\.pug$/,
          use: "pug-loader"
        },
        {
          test: /\.json$/,
          use: "json-loader"
        },
        {
          test: /\.txt$/,
          use: "raw-loader"
        }
      ]
    },

    node: {
      fs: "empty"
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: env.dist
          ? ["sub-domain", pkg.version, "html"].join(".")
          : "index.html",
        inject: false,
        cache: false,
        template: "./src/templates/layout.pug"
      }),
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require("./package.json").version)
      })
    ]
  }

  if (env.dist) {
    //add babel translate to dist
    config.module.rules.push({
      test: /\.js$/,
      use: {
        loader: "babel-loader",
        options: {
          ignore: "underscore",
          presets: ["env"]
        }
      }
    })

    //minify scripts in dist
    config.plugins.unshift(
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    )
  }

  return config
}
