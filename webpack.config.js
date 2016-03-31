var path = require('path');

module.exports = {

  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-atellier.js',
    library: 'ReactAtellier',
    libraryTarget: 'umd',
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
        test: /\.(otf|ttf)$/,
        loader: 'url?limit=100000'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=45000'
      },
      {
        test: /(\.js)$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel',
        include: path.join(__dirname, 'src')
      },
    ],
  },

  devServer: {
    contentBase: './example',
    host: 'localhost',
    inline: true,
    info: false,
  },
};
