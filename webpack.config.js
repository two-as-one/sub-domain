/* global __dirname */

var path = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var webpack = require("webpack")

module.exports = function(env) {
  env = env || {}
  env.dist = Boolean(env.dist)
  env.dev = !env.dist

  const config = {
    resolve: {
      modules: [path.resolve("./src"), "node_modules"]
    },

    entry: {
      scripts: "./src/index.js"
    },

    devServer: {
      inline: true,
      hot: true,
      stats: "minimal"
    },

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
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
          loader: "handlebars-loader",
          options: {
            runtime: 'handlebars/dist/handlebars.runtime.js'
          }
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
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require("./package.json").version),
        "process.env": env
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
          ignore: ["underscore", "conjugate"],
          presets: ["@babel/preset-env"]
        }
      }
    })

    //minify scripts in dist
    config.plugins.unshift(
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    )

    //dist index file
    config.plugins.push(
      new HtmlWebpackPlugin({
        filename: "sub-domain.html",
        inject: false,
        cache: false,
        template: "./src/templates/layout-dist.pug"
      })
    )
  } else {
    config.plugins.push(new webpack.HotModuleReplacementPlugin())

    //dev index file
    config.plugins.push(
      new HtmlWebpackPlugin({
        filename: "index.html",
        inject: false,
        cache: false,
        template: "./src/templates/layout-dev.pug"
      })
    )
  }

  return config
}