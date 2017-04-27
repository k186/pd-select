require('shelljs/global');
process.env.NODE_ENV='production'
const path = require('path');
const webpack = require('webpack');
const ProdConfig = require('./webpack.prod.config');
const chalk = require('chalk');
//clear dist
rm('-rf', './dist');//force delete
mkdir('-p', './dist/static');//create dist/static
cp('-R', 'static/*', './dist/static');//CP static file non-compressed


webpack(ProdConfig, function (err, stats) {
  if (err)throw err;
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModuleIds: false
    }) + '\n\n');
  console.log(chalk.cyan('Build complete.\n'));
  console.log((chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  )))

})
