const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  module: {
    rules: [{
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.ts']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.DefinePlugin({
      HERE_MAPS_APP_ID: JSON.stringify(process.env.HERE_MAPS_APP_ID),
      HERE_MAPS_APP_CODE: JSON.stringify(process.env.HERE_MAPS_APP_CODE)
    })
  ]
};
