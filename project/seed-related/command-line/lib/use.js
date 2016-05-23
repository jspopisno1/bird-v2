var config = require('common/config.js')
var utils = require('common/utils.js')
var fs = require('fs')
var _ = require('lodash')
/**
 * this function is used by main.js
 * the path of main.js is:
 * absolute path: project/dev/dev-related/locals/lib/main.js
 * relative path: ../../lib/main.js
 */
module.exports = function(themes, opts) {
    var seedConfig = require(config.projectPath + '/seed-related/seed-project.js')

    // console.log('@debug;', themes, opts.force, seedConfig)
    // 逻辑:

    // 如果没有 locals/seed-use.js 则创建一个
    var seedUseConfigPath = utils.p(config.projectPath + '/seed-use.js')
    if (!fs.existsSync(seedUseConfigPath)) {
        fs.writeFileSync(seedUseConfigPath,
            fs.readFileSync(utils.p(config.projectPath + '/seed-related/others/seed-use_example.js').toString())
        )
    }

    // 将新增的 theme 添加至 locals/seed-use.js, 注意除重
    var seedUseConfig = require(seedUseConfigPath)

    _.map(themes, function(theme) {
        if (seedUseConfig.use.indexOf(theme) < 0) {
            seedUseConfig.use.push(theme)
        }
    })

    var resultDeps = {
        dependencies: {},
        devDependencies: {}
    }

    // 处理所有已有的 theme, update 所有的dependencies (包括dev模式的) 和版本
    _.map(seedUseConfig.use, function(useTheme) {
        // 返回的是seed-project.js中的use中的一个 例如 react
        var themeConfig = seedConfig.use[useTheme]

        console.log('@debug;', themeConfig, seedConfig.use, useTheme)
        
        // 遍历该theme下的所有npm模块与版本
        /**
         * @param  {[type]} deps     每个对象
         * @param  {[type]} depType) 每个对象的对象名，如 devDependencies
         */
        _.map(themeConfig, function(deps, depType) {
            /**
             * @param  {[type]} version     每个依赖的版本号
             * @param  {[type]} moduleName  依赖的模块名
             */
            _.map(deps, function(version, moduleName) {
                var seedUseDeps = seedUseConfig[depType]

                if (opts.force && themes.indexOf(useTheme) >= 0) {
                    resultDeps[depType][moduleName] = version
                }
                if (!seedUseDeps[moduleName] || version > seedUseDeps[moduleName]) {
                    seedUseDeps[moduleName] = version
                    resultDeps[depType][moduleName] = version
                }
            })
        })
    })


    // 做完所有更新之后, 重新写回文件
    fs.writeFileSync(seedUseConfigPath, 'module.exports = ' + JSON.stringify(seedUseConfig, null, 4));

    // 添加完毕后, 统一在parent层安装
    var generateModulesString = function(deps) {
        return _.map(deps, function(version, moduleName) {
            return moduleName + '@' + version
        }).join(' ')
    }

    var cnpm = require('cnpm');
    console.log('@debug;', config.parentPath, resultDeps)

    // 安装 prod 依赖
    cnpm(config.parentPath, generateModulesString(resultDeps.dependencies))
        .then(function() {
            if (!opts.prod) {
                // 安装 dev 依赖
                return cnpm(config.parentPath, generateModulesString(resultDeps.devDependencies), true)
            }
        })
        .then(function() {
            // 确保 project/ 也安装妥当
            return cnpm(config.parentProjectPath)
        })
}