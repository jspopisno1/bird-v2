var webpack = require('webpack')

var utils = require('common/utils')
var config = require('common/config')
var loaders = require('./common-loaders')

module.exports = function() {
    return {
        devtool: 'inline-source-map',
        context: utils.p(config.frontendPath),
        entry: {
            /* 这个参数会被自动替换 */
        },
        output: {
            path: config.prodDistPath,
            filename: '[name].bundle.js',
            chunkFilename: '[name].[chunkhash].bundle.js',
            publicPath: '../dist/',
            publicPathForServer: '/dist/'
        },
        plugins: [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ],
        resolve: {
            root: [
                // frontend 作为 root
                utils.p(config.frontendPath)
            ],
            alias: {
                // resolve the issue:
                // Cannot resolve module 'ie' in node_modules/superagent-no-cache
                // https://github.com/johntron/superagent-no-cache/issues/11
                ie: 'component-ie'
            }
        },
        module: {
            loaders: loaders
        }
    }
}