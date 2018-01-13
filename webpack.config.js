const {join} = require('path');

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './src',
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                modules: false,
                loose: true,
              }],
              'preact',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: join(__dirname, 'node_modules'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        include: join(__dirname, 'node_modules'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: false,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|webp|gif|bmp|tiff|svg|ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html.js',
    }),
  ],
};
