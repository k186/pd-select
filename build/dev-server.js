const path = require('path');
const webpack = require("webpack");
const webpackConfig = require("./webpack.dev.config");
const config = require('../config');

const opn = require('opn');
const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const url = 'http://localhost:' + config.dev.port;
const app = express();

const compiler = webpack(webpackConfig);

//https://github.com/webpack/webpack-dev-middleware
const DevMiddleware =  webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  //noInfo: false,
  // display no info to console (only warnings and errors)
  quiet: true,
  // display nothing to the console
});
// https://github.com/glenjamin/webpack-hot-middleware/blob/master/example/server.js
const HotMiddleware = webpackHotMiddleware(compiler, {
  //log:console.log, clean the terminal
  log: () => {},
  //path: '/__webpack_hmr',
  //heartbeat: 10 * 1000
});

//force reload when html-webpack-plugin changes
//more https://github.com/jantimon/html-webpack-plugin
compiler.plugin('compilation', function (compilation) {
  //console.log('The html-webpack-plugin is starting a new compilation...');
  compilation.plugin('html-webpack-plugin-after-emit', function (htmlPluginData, callback) {
    HotMiddleware.publish({action: 'reload'});
    callback();
  });
});

//https://segmentfault.com/a/1190000007890379
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

app.use(DevMiddleware);
app.use(HotMiddleware);

//http://expressjs.com/en/starter/static-files.html
const staticPath = path.posix.join(config.dev.staticPublishPath, config.dev.staticSubDirectory);
app.use(staticPath, express.static('./static'));


//https://github.com/webpack/webpack-dev-middleware  Advanced API
DevMiddleware.waitUntilValid(function () {
  console.log(">>Listening at " + url + '\n');
});
app.listen(8080, function (err) {
  if (err) {
    console.log(err);
    return
  }
   if(config.dev.autoOpenBrowser){
   opn(url);
   }
});
