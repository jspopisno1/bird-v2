var fs = require('fs')
var npath = require('path')
var _ = require('lodash')
var del = require('delete')

var config = require('common/config')
var utils = require('common/utils')

var templateReplacer = require('common/template-replacer')()

var webpack = require('webpack')

var entryExtractor = function (opts) {
    this._opts = opts
    this._data = []
}

entryExtractor.prototype = {
    /**
     * 目前我们仅支持单级扫描, 未来希望可以加入多级扫描的能力
     *
     * entry的要求是 `XXX.js`, 即后缀名需要是 `js`
     */
    getAllEntries: function (opts) {
        opts = opts || this._opts

        var entrySetting
        if (opts.mode == 'prod') {
            entrySetting = require(config.entryPath + '/config/entry-prod.js')
        } else {
            var entryDevSettingPath = config.entryPath + '/config/entry-dev.js'
            if (!fs.existsSync(entryDevSettingPath)) {
                fs.writeFileSync(entryDevSettingPath, fs.readFileSync(config.entryPath + '/config/entry-dev_example.js'))
            }
            entrySetting = require(config.entryPath + '/config/entry-dev.js')
        }

        opts = opts || this._opts

        var entries = []
        this._entries = entrySetting.entries

        _.map(entrySetting.entries, function (themeEntries, themeName) {
            _.map(themeEntries, function (scriptPath, entryName) {

                if (!scriptPath) {
                    scriptPath = './entries/' + entryName + '.js'
                }

                entries.push({
                    themeName: themeName,
                    entryName: entryName,
                    scriptPath: scriptPath
                })
            })
        })

        this._data = entries


        return this;
    },


    /**
     * 生成给webpack的entry属性
     *
     * opts:
     *
     * context : entry脚本的相对路径, 可以参考src下的目录结构
     * mode : 'dev' | 'prod' (default)
     *
     *
     */
    processForWebpack: function (opts) {
        opts = opts || this._opts
        var hotModule = 'webpack-hot-middleware/client'
        var self = this

        var entries = {}

        this._data.map(function (entryInfo) {
            var entry = []

            // 如果是dev, 则要push hot module 进去
            opts.mode == 'dev' ? entry.push(hotModule) : 0

            entry.push(entryInfo.scriptPath)

            entries[entryInfo.entryName] = entry;
        })

        return entries
    },

    getCommonConfig: function (themeName, entries) {
        var commonName = 'common' + (themeName ? '_' + themeName : '')

        // @debug:
        console.log(commonName, themeName)

        return new webpack.optimize.CommonsChunkPlugin({
            name: commonName,
            filename: commonName + '.bundle.js',
            chunks: entries
        })
    },

    processCommonChunks: function (opts) {
        opts = opts || this._opts
        var self = this;
        var commonChunkPlugins = []

        // @debug:
        console.log(this._entrySetting)

        _.map(this._entries, function (themeEntries, themeName) {
            commonChunkPlugins.push(
                self.getCommonConfig(themeName, _.map(themeEntries, function (scriptPath, entryName) {
                    return entryName
                }))
            )
        })

        return commonChunkPlugins
    },

    /**
     *
     * @param opts:
     *
     * 1 现有清空入口页面
     * 2 根据入口列表产生新的入口页面
     *
     * path: 入口页面放置的文件夹
     * mode: 'dev' | 'prod' (default)
     *
     * prod 下的情况, 我们还有区分出不同的theme
     * 即, 假设 entries/ 下有:
     *
     * home_theme1.js
     * list_theme1.js
     * login_theme2.js
     * logout_theme2.js
     *
     * 编译时, home与list会使用 prod-page_theme1.html 这个模板, login 和 logout 会使用 prod-page_theme2 这个模板,
     *
     * 同时, home 与 list 会被同一个common chunk plugin 所引用, login和logout 也一样. 可以参照 processCommonChunks
     */
    generateHtmls: function (opts) {
        opts = opts || this._opts
        var self = this

        // 清空现有的所有入口html文件
        del.sync(opts.path + '/*')

        var templateFolderPath = utils.p(config.localPath + '/frontend/templates') + '/';

        /**
         * 获得 dev模式的html 模板,
         * 该模版在 dev模式下, 会被所有的entry共享,
         * 即, 无视entry的theme
         */
        var devTemplate = fs.readFileSync(utils.p(templateFolderPath + '/dev-page.html')).toString()

        /**
         * 获得所有 prod模式的html模板,
         *
         * prodTemplates: {}
         *  theme: string -- 模板文本
         *
         * 在 prod模式下, 每个entry都会对应一个 theme, 通过这个theme来匹配所用的html模板
         */
        var templateFiles = fs.readdirSync(templateFolderPath)
        var prodTemplates = templateFiles.reduce(function (prodTemplates, file) {
            var prodMatch = /^prod-page(?:\_(.+))?\.html$/.exec(file)
            if (prodMatch) {
                var theme = prodMatch[1] || ''
                prodTemplates[theme] = fs.readFileSync(utils.p(templateFolderPath + file)).toString()
            }
            return prodTemplates
        }, {})

        this._data.map(function (entryInfo) {
            /**
             * 根据情况选择模板文本
             */
            var templateHtml = opts.mode == 'dev' ? devTemplate :
                prodTemplates[entryInfo.themeName];

            /**
             * 如果模板文本为空, 说明缺少相应的模板html文件
             */
            if (!templateHtml) {
                throw new Error('Prod html template should not be empty! Please check the folder - dev-tools/templates/ ')
            }

            /**
             * 替换掉模板文本的内容, 并生成入口html文件,
             *
             * 相应的参数有:
             *
             * commonName   - 公共文件名称 (如 common_theme)
             * entryName    - 入口名称 (忽略了theme)
             * buildTime    - 当前的构建版本
             */
            var html = templateReplacer.setContent(templateHtml).applyDataAndReturn({
                commonName: 'common' + (entryInfo.themeName ? '_' + entryInfo.themeName : ''),
                entryName: entryInfo.entryName,
                buildTime: utils.getBuildTime()
            })
            fs.writeFileSync(utils.p(opts.path + '/' + entryInfo.entryName + '.html'), html)
        })
    }
}

module.exports = function (opts) {
    return new entryExtractor(opts)
}
