const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const cssLoaderQuery = '?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    './app/setup/index',
  ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'app'),
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader',
      },
      {
        test: /\.scss$/,
        loaders: `style!css-loader${cssLoaderQuery}!sass-loader!postcss-loader`,
      },
    ],
  },

  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],
}
