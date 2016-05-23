var _ = require('lodash')

var ConfigAdaptor = function() {

}

ConfigAdaptor.prototype = {
    process: function(config, opts) {
        opts = opts || {};

        // 如果有需要, 可以改为你需要的port number
        //_.extend(config, {
        //    devServerPort: 1234,
        //    preProdServerPort: 1235,
        //    prodServerPort: 1236,
        //})

        return config
    }
}

module.exports = new ConfigAdaptor();