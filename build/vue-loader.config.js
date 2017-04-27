//todo know more vue-cli config
var tool = require('./tool')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  loaders: tool.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  })
}
