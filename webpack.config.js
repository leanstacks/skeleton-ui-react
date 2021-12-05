const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  entry: {
    'babel': ['core-js/stable', 'regenerator-runtime/runtime'],
    'app': './src/app.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },

  module: {

    rules: [

      {
        test: /\.js$/,
        use: 'babel-loader',
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            mimetype: 'application/font-woff',
            name: 'fonts/[name].[hash].[ext]'
          }
        }]
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash].[ext]'
        }
      }, {
        test: /\.(png|jpe?g|gif|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[hash].[ext]'
        }
      }

    ]

  },

  plugins: [

    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),

    new CopyWebpackPlugin({
      patterns: [{
        from: './public'
      }]
    })

  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    publicPath: '/',
    port: 9000,
    proxy: {
      '/api': {
        target: 'https://api-dev.example.com',
        changeOrigin: true
      }
    }
  }


};
