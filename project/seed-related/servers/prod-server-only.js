
var express = require('express')
var config = require('common/config')

var app = express();

app.use('/', express.static(config.prodDestPath))

var serverApp = require(config.backendPath + '/dev/server-app')
serverApp.setup(app, {
    devMode: 'prod'
})

var appConfig = {
    port: config.prodServerPort
}

app.listen(appConfig.port, function(err) {
    if (err) {
        console.error(err)
    } else {
        console.info('Server run on http://localhost:%s', appConfig.port)
    }
})