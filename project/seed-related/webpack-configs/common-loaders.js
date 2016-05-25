/**
 * styles 相关的配置在 @[  webpack config adaptor  ]{pyyqj_xnnwll3m_ina20rmc}@ 中
 */

var config = require('common/config')

var commonLoaders = [
    {
        test: /\.js$/,
        loaders: ['babel-loader'],
    include: [
        config.root
    ]
    }, {
        test: /\.(jpeg|jpg|png|gif)$/,
        loader: 'url-loader?limit=10240'
    }, {
        test: /\.html$/,
        loader: 'html-loader'
    }, {
        test: /\.json$/, loader: 'json-loader'
    }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"
    }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"
    }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"
    }, {
        test: /\.tag$/,
        loaders: ['babel-loader', 'befe-riotjs-loader']
    }
]

module.exports = commonLoaders