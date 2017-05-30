const path = require('path');

module.exports = {
  entry: './ZenPond.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: [/\.js$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*']
  }
};
