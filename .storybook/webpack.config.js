const path = require('path');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: 'edX Cookie Banner',
      warningSound: true,
      failureSound: true,
    }),
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
            },
          },
          { loader: 'source-map-loader' },
        ],
      },
      {
        test: /\.scss|\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]',
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.join(__dirname, '../src/utils'),
                path.join(__dirname, '../node_modules'),
              ],
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
