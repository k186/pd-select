const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const tool =require('./tool');
const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

//add hot-reload related code to entry chunks
Object.keys(baseConfig.entry).forEach(function (name) {
  baseConfig.entry[name] = ['./build/dev-client'].concat(baseConfig.entry[name])
});

const devConfig = merge(baseConfig, {
  module: {
    rules: tool.styleLoaders({sourceMap:config.dev.cssSourceMap})
    /*[
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  minimize: false,
                  sourceMap: true
                }
              }
            ],
            scss: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  minimize: false,
                  sourceMap: true
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              }
            ],
            sass: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  minimize: false,
                  sourceMap: true
                }
              },
              {
                loader: "sass-loader",
                options: {
                  indentedSyntax: true,
                  sourceMap: true
                }
              }
            ],
            postcss: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  minimize: false,
                  sourceMap: true
                }
              }
            ]
          }
        }
      }
    ]*/
  },
  //more on https://webpack.js.org/configuration/devtool/
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    //https://github.com/glenjamin/webpack-hot-middleware
    //new webpack.optimize.OccurenceOrderPlugin(), //webpack 1 only
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin(),//webpack 1 only
    new webpack.NoEmitOnErrorsPlugin(),
    //auto inject js css to index.html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
    new FriendlyErrorsPlugin()
  ]
});
module.exports = devConfig;
