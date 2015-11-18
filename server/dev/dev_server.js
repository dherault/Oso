import chalk from 'chalk';
import webpack from 'webpack';
import config from './webpack.config';
import webpackDevServer from 'webpack-dev-server';

export default function devServer() {
  
  let startTime;
  const bundle = webpack(config);
  
  bundle.plugin('compile', () => {
    startTime  = Date.now();
    console.log(chalk.green('Bundling...'));
  });
  
  bundle.plugin('done', () => console.log(chalk.green(`Bundled in ${Date.now() - startTime}ms!`)));
  
  new webpackDevServer(bundle, {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo : true,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    stats: {
      colors: true
    },
    devServer: {
      hot: true,
      inline: true
    }
    /*proxy: [{
      path:    new RegExp(proxyPathRegex),
      target:  `http://localhost:${api.port}/`
    }]*/
  }).listen(3000, '0.0.0.0', err => {
    if (err) return console.error('devServer.listen', err);
    console.log(`WDS listening at port 3000`);
  });
}