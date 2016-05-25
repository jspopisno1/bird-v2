var express = require('express')
var fs = require('fs')
var path = require('path')
var request = require('request')
var colors = require('colors');

var utils = require('bird-common/utils')
var configParser = require('bird-common/config-parser')

var proxy = require('bird-lib/proxy')


/**
 * bird启动入口
 *
 * @param  {Object} config bird-configuration file path
 *  我们需要改成一个自动检测的能力
 *
 * @return {undefined}
 */
module.exports = function start(configPath) {

    var config = configParser.parse(configPath);

    // config 检测过程
    if (!config) {
        utils.log('error', 'Config should not be empty, please check your config file.')
        return;
    }

    if (!config.staticFileRootDirPath || !config.useServer) {
        var missingParts = []
        if (!config.staticFileRootDirPath) {
            missingParts.push('staticFileRootDirPath')
        }
        if (!config.useServer) {
            missingParts.push('useServer')
        }

        utils.logs(
            ['error', 'The following required setting is missing: ' + missingParts.join(', ')],
            ['error', 'Please check your configuration'],
            ['hint', 'You can refer to the bird README.md or birdfile_example.js to get more information']
        )
        return;
    }

    /**
     * 集中处理所有请求
     */
    var app = new express()
    
    app.all('*', proxy(config))

    // go!
    app.listen(config.bird_port)
    console.info('BIRD'.rainbow, '============', config.name, 'RUNNING at', 'http://localhost:' + config.bird_port, '===============', 'BIRD'.rainbow);

    // var ROUTER = config.router;
    // var COOKIE = config.cookie;
    // // var AUTO_INDEX = config.autoIndex ? config.autoIndex.split(/\x20+/) : ['index.html']
    // //保证路径完整
    // var TARGET_SERVER = config.server.slice('-1') === '/' ? config.server : config.server + '/';
    // var jar = request.jar();  // jar to store cookies
    // config = configResolver(config, jar);
    // var auth = config.auth;
    // auth(config, jar).then(function () {
    //
    //     if (config.middleware) {
    //         console.log('or @debug, am i here?', config)
    //         function compose(middleware) {
    //             return function (req, res, next) {
    //                 connect.apply(null, middleware.concat(next.bind(null, null))).call(null, req, res)
    //             }
    //         }
    //
    //         // http://stackoverflow.com/questions/20274483/how-do-i-combine-connect-middleware-into-one-middleware
    //         return compose([proxy, require('./lib/mock')(config), require('./lib/change-user')(config), require('./lib/logout')(config)]);
    //     } else {
    //         console.log('@debug, am i here?')
    //         // setup bird app
    //         var app = new express()
    //         app.all('*', require('./lib/mock')(config))
    //         app.all('*', require('./lib/static')(config))
    //         app.all('*', require('./lib/change-user')(config))
    //         app.all('*', require('./lib/logout')(config))
    //         app.all('*', proxy)
    //
    //         // go!
    //         app.listen(config.bird_port)
    //         console.info('BIRD'.rainbow, '============', config.name, 'RUNNING at', 'http://localhost:' + config.bird_port, '===============', 'BIRD'.rainbow);
    //     }
    // }).catch(function (e) {
    //     console.log(e)
    // })
    //
    // function configResolver(originConfig, jar) {
    //     var config = Object.assign({}, originConfig);
    //     config.auth = require('./auths/' + (originConfig.authType || originConfig.auth_standalone || 'uuap'));
    //     config.birdPort = originConfig.bird_port;
    //     config.jar = jar;
    //     return config;
    // }


};

/**
 * resolve static file path,, take care of welcome file
 * @param  {String} staticFileRootDirPath
 * @param  {String} pathname
 * @return {String} working path
 */
function resolveFilePath(staticFileRootDirPath, pathname) {
    if (pathname === '/') { // resolve welcome file
        return path.join(staticFileRootDirPath, 'index.html')
    }
    return path.join(staticFileRootDirPath, pathname);
}


function router(url, router) {
    var path = '';
    var reg;
    if (router) {
        for (var i in router) {
            reg = new RegExp(i)
            if (reg.test(url)) {
                path = url.replace(reg, router[i]);
                console.log('special route mapping found! converting...', url, 'to', path)
            }
        }
    } else {
        path = url;
    }
    return path;
}

