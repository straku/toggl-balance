const path = require('path')

const cssLoaderQuery = '?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'

module.exports = {
  devtool: 'inline-source-map',

  entry: [
    './app/setup/index',
  ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },

  resolve: {
    alias: {
      test: path.join(__dirname, 'test'),
    },
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: [
          path.join(__dirname, 'app'),
          path.join(__dirname, 'test'),
        ],
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

  externals: {
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
}
