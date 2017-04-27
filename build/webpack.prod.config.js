const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const config = require('../config');
const tool = require('./tool');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const env =config.build.env
const ProdConfig = merge(baseConfig, {
  module: {
    rules: tool.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' :false,
  output: {
    path: config.build.staticRoot,
    filename: tool.staticPath('js/[name].[chunkhash].js'),
    chunkFilename: tool.staticPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new ProgressBarPlugin(),
    new webpack.optimize.UglifyJsPlugin({
     compress: {
     warnings: false,
     drop_debugger: true,
     drop_console: true
     },
      sourceMap: true
     }),
    //extract css  into one files?
    new ExtractTextPlugin({
      filename: tool.staticPath('css/[name].[contenthash].css')
    }),
    //solve extract css duplicated problem
    new OptimizeCSSPlugin(),
    //auto inject js css to index.html
    new HtmlWebpackPlugin({
      filename: config.build.indexHtml,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    //https://webpack.js.org/plugins/commons-chunk-plugin/
    //Generate an extra chunk, which contains common modules shared between entry points.
    //in here we generate chunk,which is from node_modules
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // If module has a path, and inside of the path exists the name "/\.js$/",like vue jq ...
        // only vendor node_modules file
        //console.log(JSON.stringify(module.resource)+'>>>>>>\n\n')
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever main.js bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
  ]
});
module.exports = ProdConfig;
