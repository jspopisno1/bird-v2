

module.exports = {
    /**
     * @param opts
     *  devMode = 'prod' | 'dev'
     *      used in adapter
     * @param onBuilt function(opts)
     *  opts:
     *      extryExtractor
     */
    build: function(opts, onBuilt) {
        opts = opts || {};

        var webpack = require('webpack')
        var express = require('express')

        var config = require('common/config')
        var webpackConfigAdaptor = require(config.localPath + '/config/adaptors/webpack-config-adaptor')

        var fs = require('fs')

        /*
         得到 webpack 的config之后, 通过计算得到entry列表
         */
        var webpackConfig = require('../webpack-configs/webpack.prod.config')
        var entryExtractor = require('./entry-extractor')({
            path: config.prodPagesPath,
            context: './entries/',
            mode: opts.devMode
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

        if (opts.profile) {
            webpackConfig.profile = true
        }

        if (opts.devMode == 'prod') {
            var commonChunkPluginArgs = entryExtractor.processCommonChunks()

            var commonChunks = 'common-chunks'
            var index = webpackConfig.plugins.indexOf(commonChunks)
            commonChunkPluginArgs.unshift(index, 1)
            Array.prototype.splice.apply(webpackConfig.plugins, commonChunkPluginArgs)
            console.log('webpack config - ', webpackConfig.plugins)
        }

        /*
         自动根据 entry 产生入口的html文件, 放置于 pages/ 下
         */
        entryExtractor.generateHtmls()

        // 启动 webpack 解析器
        var compiler = webpack(webpackConfig)

        compiler.run(function(err, stats) {
            if (err) {
                console.error(err);
                return;
            }

            fs.writeFileSync(config.tmpPath + '/prod-build.txt', stats);
            if (opts.profile) {
                fs.writeFileSync(config.tmpPath + '/prod-profile.json', JSON.stringify(stats.toJson(), null, 3));
            }

            onBuilt && onBuilt({
                entryExtractor: entryExtractor
            })
        })
    }
}