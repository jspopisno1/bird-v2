/**
 *
 * @param opts
 *  devMode = 'prod' | 'dev'
 *      used in adapter
 *  callback: function (opts)
 *      opts:
 *          app
 */
var serverStarter = function(opts, callback) {
    opts = opts || {}

    var webpack = require('webpack')
    var express = require('express')
    var webpackDevMiddleware = require('webpack-dev-middleware')
    var webpackHotMiddleware = require('webpack-hot-middleware')

    var config = require('common/config')
    var webpackConfigAdaptor = require('../../locals/config/adaptors/webpack-config-adaptor')

    var app = express()


    /*
     得到 webpack 的config之后, 通过计算得到entry列表
     */
    var webpackConfig = require('../webpack-configs/webpack.dev.config')
    var entryExtractor = require('./entry-extractor')({
        context: './entries/',
        path: config.devPagesPath,
        mode: 'dev'
    })

    console.log(entryExtractor)

    var entries = entryExtractor
        .getAllEntries()
        .processForWebpack()

    console.log('detected entries for webpack : ', entries)

    webpackConfig.entry = entries
    webpackConfig = webpackConfigAdaptor.process(webpackConfig, {
        devMode: opts.devMode
    })

    // 启动 webpack 解析器
    var compiler = webpack(webpackConfig)

    // debug and output the webpack config
    console.log(webpackConfig.module.loaders)

    console.log('Generating htmls for entries')
    /*
     自动根据 entry 产生入口的html文件, 放置于 pages/ 下
     */
    entryExtractor.generateHtmls()

    console.log('Running local server')
    callback && callback({
        app: app
    })

    console.log('Setting up webpack middleware')

    app.use(webpackDevMiddleware(compiler, {
        noInfo: false,
        quiet: false,
        publicPath: webpackConfig.output.publicPathForServer
    }))
    app.use(webpackHotMiddleware(compiler))

    app.use('/pages', express.static(config.devPagesPath))

    var appConfig = {
        port: config.devServerPort
    }

    app.listen(appConfig.port, function (err) {
        if (err) {
            console.error(err)
        } else {
            console.info('Server run on http://localhost:%s', appConfig.port)
        }
    })
}

module.exports = serverStarter