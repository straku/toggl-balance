const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const cssModules = '?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'

module.exports = {
  entry: [
    './app/setup/index',
  ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'scripts/bundle.js',
  },

  resolve: {
    alias: {
      aphrodite: 'aphrodite/no-important',
    },
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
      { from: 'static/404.html', to: '404.html' },
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
        test: /\.global\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader!postcss-loader'),
      },
      {
        test: /^((?!\.global).)*\.scss$/,
        loaders: ExtractTextPlugin.extract('style-loader', `css-loader${cssModules}!sass-loader!postcss-loader`),
      },
    ],
  },

  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],
}
