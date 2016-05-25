/**
 * <<[ webpack config adaptor ]{pyyqj_xnnwll3m_ina20rmc}>>
 *
 * 本配置文件, 可以考虑合并重复代码
 *
 */

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpackAdaptorConfig = {
    useLess: true,

    // 如果选择为 true, 你需要确认 sass-loader 已经安装成功
    // `npm install sass-loader -d`
    useSass: false
}

var WebpackConfigAdaptor = function() {

}

WebpackConfigAdaptor.prototype = {
    process: function(webpackConfig, opts) {
        opts = opts || {};

        console.log(opts);

        require('style-loaders/css-loader-config')
            .setup(webpackConfig.module.loaders, opts)


        if (webpackAdaptorConfig.useLess) {
            require('style-loaders/less-loader-config')
                .setup(webpackConfig.module.loaders, opts)
        }

        if (webpackAdaptorConfig.useSass) {
            require('style-loaders/sass-loader-config')
                .setup(webpackConfig.module.loaders, opts)
        }

        return webpackConfig
    }
}

module.exports = new WebpackConfigAdaptor();