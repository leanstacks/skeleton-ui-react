const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const ExtractCSS = new ExtractTextWebpackPlugin('styles.[contenthash].css');

module.exports = {
    entry: {
        'polyfill': 'babel-polyfill',
        'app': './src/app.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: ExtractCSS.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            })
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    mimetype: 'application/font-woff',
                    name: 'assets/[name].[hash].[ext]'
                }
            }]
        }, {
            test: /\.(png|jpe?g|gif|ico|svg|ttf|eot)$/,
            loader: 'file-loader?name=assets/[name].[hash].[ext]'
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new CopyWebpackPlugin([{
            from: './public'
        }]),
        ExtractCSS
    ]
};
