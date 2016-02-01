var path = require('path');

module.exports = function(config) {
  config.set({
    basePath: '.',

    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],

    files: [
      'node_modules/es5-shim/es5-shim.js',
      'node_modules/react/dist/react.js',
      'node_modules/react/dist/react-with-addons.js',

      'spec/**.spec.jsx',
      { pattern: 'lib/**/*', watched: true, included: false }
    ],

    reporters: ['progress', 'coverage'],

    preprocessors: {
      // add webpack as preprocessor
      'spec/**.spec.jsx': ['webpack', 'sourcemap', 'eslint']
    },

    webpack: loadWebpackConfig(),

    webpackServer: {
      noInfo: true
    },

    eslint: {
      stopOnError: false,
      stopOnWarning: true
    },

    singleRun: true,

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }

  });
};


/**
  Loads configuration while ensuring sounce-map is enabled
 */
function loadWebpackConfig () {
  var webpackConfig = require('./webpack.config.js');
  webpackConfig.devtool = 'inline-source-map';
  webpackConfig.module.preLoaders = [
    {
      test: /\.jsx?$/,
      include: path.resolve('lib'),
      loader: 'isparta'
    }
  ];
  return webpackConfig;
}
