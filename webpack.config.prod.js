const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const cssLoaderQuery = '?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'

module.exports = {
  entry: [
    './app/setup/index',
  ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'scripts/bundle.js',
  },

  plugins: [
    new ExtractTextPlugin('css/styles.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new CopyWebpackPlugin([
      { from: 'static/index-prod.html', to: 'index.html' },
    ]),
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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', `css-loader${cssLoaderQuery}!sass-loader!postcss-loader`),
      },
    ],
  },

  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],
}
