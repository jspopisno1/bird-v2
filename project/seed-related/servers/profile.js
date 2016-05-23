var builder = require('./build.js')
var config = require('common/config')

var del = require('delete')
del.sync(config.prodDistPath)

builder.build({
    devMode: 'prod',
    profile: true
})