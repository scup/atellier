/* jshint node: true */
var path = require('path');

module.exports = {
  context: path.join(__dirname),
  entry: './lib/index.jsx',

  output: {
    path: path.join(__dirname),
    filename: 'react-attelier.js',
    libraryTarget: 'umd',
    library: 'ReactAttelier'
  },

  externals: {
   'react': 'var React',
   'react/addons': 'var React'
  },

  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style!css!less?outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './bower_components')) + '&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      },
      {
        test: /\.less$/,
        loader: 'autoprefixer'
      },
      {
        test: /\.(otf|ttf|png)$/,
        loader: 'file'
      },
      {
        test: /(\.jsx?)$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
};
