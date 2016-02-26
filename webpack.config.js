/* jshint node: true */
var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
  entry: './lib/Atellier.jsx',
  output: {
    filename: './dist/react-atellier.min.js',
    libraryTarget: 'umd',
    library: 'ReactAtellier'
  },
  externals: {
   'react': 'React'
  },
  devtool: 'source-map',
  resolve: {
    fallback: [path.join(__dirname, 'node_modules')],
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
  },
  resolveLoader: {
    fallback: [path.join(__dirname, 'node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /(\.jsx?)$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ],
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
        test: /\.(otf|ttf)$/,
        loader: 'url?limit=100000'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
      }
    ]
  }
};
