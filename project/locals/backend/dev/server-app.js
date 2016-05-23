module.exports = {
    setup: function(app, opts) {
        opts = opts || {}
        var cp = require('copy-dir')
        var express = require('express')
        var config = require('common/config')
        var utils = require('common/utils')

        // 设置api的context
        //console.log('bird -- ', cors(), bird(birdConfig))

        // bird 相关
        // 默认可以不用启动
        // var bird = require('birdv2')
        // var cors = require('cors')
        // var birdConfig = require('./bird/birdfile')
        //
        // app.use('api/', cors(), bird(birdConfig))

        if (opts.devMode == 'dev') {
            app.use('/content', express.static(utils.p(__dirname + '/content')))
        } else {
            console.log('Moving : ', utils.p(__dirname + '/content'), utils.p(config.prodDestPath + '/content'))

            // 如果是prod环境, 则直接move资源到 dist 文件夹下
            cp.sync(utils.p(__dirname + '/content'), utils.p(config.prodDestPath + '/content'))
        }
    }
}