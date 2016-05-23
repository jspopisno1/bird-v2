var builder = require('./build.js')
var express = require('express')
var config = require('common/config')

var del = require('delete')
del.sync(config.prodDistPath)

builder.build({
    devMode: 'prod'
}, function(opts) {
    var app = express()

    app.use('/', express.static(config.prodDestPath))

    var serverApp = require(config.localPath + '/backend/dev/server-app')
    serverApp.setup(app, {
        devMode: 'prod'
    })

    var appConfig = {
        port: config.preProdServerPort
    }

    app.listen(appConfig.port, function(err) {
        if (err) {
            console.error(err)
        } else {
            console.info('Server run on http://localhost:%s', appConfig.port)
        }
    })
})