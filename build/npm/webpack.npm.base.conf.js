var path = require('path')
var config = require('./config')
var vueLoaderConfig = require('../vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '../..', dir)
}

module.exports = {
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath:''
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      }
    ]
  }
}
