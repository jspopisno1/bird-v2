var webpackConfig = require('./base.webpack.config')()
var _ = require('lodash')

var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

_.extend(webpackConfig, {
    devtool: null,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            __PRODUCTION__: true,
            __DEVELOPMENT__: false,
            __DEVTOOLS__: false
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        'common-chunks',
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
})

module.exports = webpackConfig