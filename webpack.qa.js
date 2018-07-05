const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

require('dotenv').config({ path: '.env.test' });

module.exports = merge(common, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.API_URL': JSON.stringify(process.env.API_URL)
        })
    ],
    devtool: 'inline-source-map'
});
