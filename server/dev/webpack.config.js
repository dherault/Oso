import webpack from 'webpack';
import config from '../../config';

export default {
  devtool: 'eval',
  entry: [
    'webpack/hot/dev-server',
    './client/client.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: 'http://' + config.publicIp + ':' + config.WDSPort + '/static/',
    // https://github.com/webpack/webpack-dev-server/issues/135
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
    // new webpack.IgnorePlugin(/queryDb/),
    // new webpack.ContextReplacementPlugin(/chalk/, null)
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot','babel'],
        // include: [__dirname + '/src', __dirname + '/config'],
        exclude: /node_modules/
      }/*,
      {
        test:   /\.css$/,
        loader: "style!css!cssnext"
      }*/
    ]
  },
  node: {
    fs: 'empty'
  }/*,
  cssnext: {
    browsers: "last 2 versions",
  },*/
};
