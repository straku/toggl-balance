const webpackConfig = require('./webpack.config.test')
webpackConfig.entry = {}

module.exports = (config) => {
  config.set({
    basePath: '',

    frameworks: ['mocha'],

    files: [
      'test/index.js',
    ],

    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap'],
    },

    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },

    reporters: ['mocha', 'coverage'],

    mochaReporter: {
      showDiff: true,
    },

    coverageReporter: {
      reporters: [
        { type: 'text-summary' },
        { type: 'lcovonly', subdir: '.' },
        { type: 'json', subdir: '.' },
      ],
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity,
  })
}
