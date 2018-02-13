const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
    {
      test: /\.css$/,
      loader: 'style!css!'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
       path.join(__dirname, "src"),
       "node_modules"
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    headers: {
           'Access-Control-Allow-Origin': '*'
    }
  }
};
