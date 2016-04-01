var path = require('path');
var webpack = require('webpack');

module.exports = {
  debug: false,
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-atellier.js',
    library: 'ReactAtellier',
    libraryTarget: 'umd',
  },
  externals: {
      // Use external version of React
      "react": "React"
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  ],
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
