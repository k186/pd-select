const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const tool = require('./tool');
const vueLoaderConfig = require('./vue-loader.config')

function pathResolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    main: './src/main.js',
  },
  output: {
    path: config.build.staticRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.staticPublishPath
      : config.dev.staticPublishPath
  },
  resolve: {
    // Using this will override the default array,
    // meaning that webpack will no longer try to resolve
    // modules using the default extensions.
    // For modules that are imported with their extension,
    // e.g. import SomeFile from "./somefile.ext", to be properly resolved,
    // a string containing "*" must be included in the array.
    extensions: ['*', '.js', '.vue', '.json'],//in webpack 2.2 json-loader default
    modules: [path.resolve(__dirname, "src"), "node_modules"],// add a directory search src/!* over node_modules/
    alias: {
      //Create aliases to import or require certain modules more easily
      //for example in pageView import components may do like this import componentA from '../!**!/components/!**!/!*.vue'
      //but use alias you can import like this import componentA  from 'components/!**!/!*.vue'
      //watch more on https://webpack.js.org/configuration/resolve/
      //'components': pathResolve('src/components'),
      //'assets': pathResolve('src/assets'),
      //'src': pathResolve('src'),
      'vue$': 'vue/dist/vue.esm.js',
      //'pageView': pathResolve('src/pageView')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [pathResolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [pathResolve('src')]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',//it's auto fallback file-loader
        options: {
          limit: 10000,
          name: tool.staticPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: tool.staticPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  //https://webpack.js.org/configuration/externals/
  externals: {
    jquery: 'jQuery'
  },
  plugins: []
}
