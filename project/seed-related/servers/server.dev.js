var serverStarter = require('./base.server.dev')
var config = require('common/config')

module.exports = function(configAdjust) {

    if (configAdjust.port) {
        config.devServerPort = configAdjust.port
    }

    serverStarter({
        devMode: 'dev'
    }, function (opts) {
        var serverApp = require(config.localPath + '/backend/dev/server-app')

        serverApp.setup(opts.app, {
            devMode: 'dev'
        })
    })
}