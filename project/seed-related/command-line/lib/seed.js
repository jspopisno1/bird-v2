var fs = require('fs')

var del = require('delete')

// console.log('@debug, ', module)

var config = require('common/config.js')
var utils = require('common/utils.js')
var sp = require('common/sp.js')

// 先写死一个 repo url, 未来更改
var gitRepo = require('main-script-config.js').gitUrl


module.exports = function (opts) {
    console.log(config.seedPath) // @debug;

    var version = opts.seedVersion
    var dev = opts.dev


    if (opts.force) {
        console.log('Force flag detected, try removing the seed folder. Please wait...')
        del.sync(config.seedPath)
    }

    var gitProcess = new Promise(function(resolve) {resolve()})
    if (!fs.existsSync(config.seedPath)) {
        console.log('Start checking seed repo to: ', config.seedPath) // @debug;

        gitProcess = gitProcess.then(function () {
            return sp('git clone ' + gitRepo + ' ' + config.seedPath)
                .then(function () {
                    console.log('Git cloned.')
                })
                .catch(function (error) {
                    console.error('[ERROR] please make sure that you can reach gitlab.baiud.com')
                    console.error(error)
                })
        })
    } else {
        gitProcess = gitProcess.then(function () {
            return sp('git pull origin', {
                cwd: config.seedPath
            })
        }).catch(function(e) {
            console.log(e)
        })
    }

    if (dev) {
        gitProcess = gitProcess.then(function () {
            return sp('git checkout dev/' + dev, {
                cwd: config.seedPath
            }).catch(function (e) {
                utils.logs([
                    'error: Failed to checkout the specific dev branch : `dev/' + dev + '`',
                    'hint: Probably you should check if it exists or not.'
                ])
                console.log(e)
            })
        })
    } else if (version) {
        gitProcess = gitProcess.then(function () {
            return sp('git checkout release/' + version, {
                cwd: config.seedPath
            }).catch(function (e) {
                utils.logs([
                    'error: Failed to checkout the specific dev branch : `release/' + version + '`',
                    'hint: Probably you should check if it exists or not.'
                ])
                console.log(e)
            })
        })
    }

    return gitProcess
}