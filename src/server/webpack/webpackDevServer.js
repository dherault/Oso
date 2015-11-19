import chalk from 'chalk';
import webpack from 'webpack';
import WDSConfig from './webpack.config';
import WDS from 'webpack-dev-server';
import config from '../../../config';

export default function webpackDevServer() {
  
  let startTime;
  const bundle = webpack(WDSConfig);
  
  bundle.plugin('compile', () => {
    startTime  = Date.now();
    console.log(chalk.green('Bundling...'));
  });
  
  bundle.plugin('done', () => console.log(chalk.green(`Bundled in ${Date.now() - startTime}ms!`)));
  
  new WDS(bundle, {
    publicPath: WDSConfig.output.publicPath,
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
  }).listen(config.WDSPort, '0.0.0.0', err => {
    if (err) return console.error('devServer.listen', err);
    console.log(`WDS listening on port ${config.WDSPort}.`);
  });
}