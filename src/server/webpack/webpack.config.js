import webpack from 'webpack';
import config from '../../../config';

export default {
  devtool: 'eval',
  entry: [
    'webpack/hot/dev-server',
    './src/client/client.js'
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
      },
      {
          test:   /\.style.js$/,
          loaders: ['style', 'css', 'postcss?parser=postcss-js', 'babel'],
          // loader: "style-loader!css-loader!postcss-loader?parser=postcss-js!babel-loader",
          exclude: /node_modules/
      }
    ]
  },
  // node: {
  //   fs: 'empty'
  // }
};
