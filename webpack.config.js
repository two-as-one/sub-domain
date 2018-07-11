/* global __dirname */

var path = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
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
      }),
      new HtmlWebpackPlugin({
        inlineSource: '.js$',
        template: "./src/templates/layout.pug"
      }),
      new HtmlWebpackInlineSourcePlugin()
    ]
  }

  if (env.dist) {
    //add babel translate to dist
    config.module.rules.push({
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules/contractions'),
        path.resolve(__dirname, 'node_modules/cool-typewriter'),
        path.resolve(__dirname, 'node_modules/rpg-dialogue')
      ],
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    })

    // minify scripts in dist
    config.plugins.unshift(
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    )
  } else {
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  config.plugins.push()

  return config
}