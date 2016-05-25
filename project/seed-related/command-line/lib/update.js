var config = require('common/config.js')
var syncUtils = require('sync-utils.js')

module.exports = function (opts) {
    console.log('@debug, hello boy 2')
    
    syncUtils.sync(config.projectPath, config.seedPath, opts)
}