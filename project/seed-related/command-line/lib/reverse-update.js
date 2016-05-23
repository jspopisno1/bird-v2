var config = require('common/config.js')
var syncUtils = require('sync-utils.js')

module.exports = function () {

    syncUtils.sync(config.seedPath, config.projectPath)
}