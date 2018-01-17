const {join} = require('path');

const webpack = require('webpack');
const webpackIf = require('webpack-if');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const ifProd = webpackIf.ifElse(process.env.NODE_ENV === 'production');

module.exports = webpackIf({
  devServer: {
    // host: 'mb-char.zerachu.com',
    port: 8081,
    allowedHosts: [
      'localhost',
      '0.0.0.0',
      '127.0.0.1',
      'mb-char.zerachu.com',
      '6bc6cb20.ngrok.io',
    ],
  },
  context: __dirname,
  entry: './src',
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [ifProd('lodash'), ifProd('ramda')],
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
        test: /\.js$/,
        include: /node_modules/,
        exclude: /localforage/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [ifProd('lodash'), ifProd('ramda')],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: join(__dirname, 'node_modules'),
        use: ifProd(() => ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                module: true,
              },
            },
            'postcss-loader',
          ],
        }), () => ([
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
            },
          },
          'postcss-loader',
        ])),
      },
      {
        test: /\.css$/,
        include: join(__dirname, 'node_modules'),
        use: ifProd(() => ExtractTextPlugin.extract({
          fallback: [
            'style-loader',
          ],
          use: [
            {
              loader: 'css-loader',
              options: {
                module: false,
              },
            },
          ]
        }), () => ([
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: false,
            },
          },
        ])),
      },
      {
        test: /\.(png|jpg|jpeg|webp|gif|bmp|tiff|svg|ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html.js',
    }),
    ifProd(() => new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'process.env.BABEL_ENV': '"production"',
    })),
    ifProd(() => new ExtractTextPlugin('styles.css')),
    ifProd(() => new OfflinePlugin()),
  ],
});
