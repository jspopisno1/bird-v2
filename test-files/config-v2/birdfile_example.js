var npath = require('path')

module.exports = {
    // 该 bird 实例的名称
    name: 'ar',

    // bird 启动的 port, 如果设置成 middle ware的话, 将失效
    bird_port: 7676,

    // 默认的 静态资源 root
    staticFileRootDirPath: npath.resolve(__dirname),

    // 目标后端
    useServer: 'serverA',

    // 所有预设的 servers
    servers: {
        serverA: {
            server: 'https://abc.com',

            // bird 预设的 auth plugin, 通过 string 来给定
            authPlugin: 'uuap',

            // authConfig : 为当前 auth Object
            // reqForward : 为当前要 forward 的 req, plugin需要根据给定的 authConfig 对 reqForward 进行更新
            // authPlugin 允许用户自己定义和加载
            // authPlugin: function(serverConfig, reqForward) { ... },

            // some-auth-method.js 为符合 auth plugin 函数原型的一个npm module脚本, 即:
            // 返回: module.exports = function (authConfig, reqForward) { ... }
            // authPlugin: require('./some-auth-method.js'),

            // 一些自定义的 settings, e.g.
            useUser: 'wujun',
            users: {
                'chenchengxing': 'chenchengxing8030',
                'wujun': 'wujun8030',
                'lili': 'lili8030'
            },
            bprouting: 'bprouting/BpSecurityAuthentification?bpservice=https%3A%2F%2Ferp8020.baidu.com%2Fbprouting%2FBpFlowRouting%3Fappindex%3Dtrue%26t%3D0.9769457862712443',
            uuap_server: 'http://xx.xx.com:8100',

        },
        serverB: {
            server: 'https://def.com',

            // 如果没有给定任何的auth plugin, 则用默认的 default,
            // default 主要就是把cookie写到头部去
            cookie: 'JSESSIONID=asdfiawefi309rifwefhasdf'
        }
    },

    // 需要一个完整路径
    mockRoot: false,

    // 默认的文件夹入口, 即如果访问的是文件夹, 且本设置为非空, 则尝试返回该文件夹下的同名文件
    // 默认为 index.html
    defaultIndex: 'index.html',

    // routes 使用顺序单次匹配, 如果某一次匹配成功, 则不做下一次fallback匹配, 用于简单化整个数据转接的流程, 避免路由过于复杂, 调试繁琐
    routes: [
        // 匹配从root开始的url, 允许正则, 默认都是从起始开始匹配, 例如, '/api/' => /^\/api\//
        // 两种类型: 'mock' 和 'static'

        // mock: 从mockRoot开始计算
        {test: '/api/some-data.json', mock: '/hi'},
        {test: '/api/some-other-data.json', mock: 'mock/hi'},

        // 如果没有前缀, 则走 后端 server, 如果没有指定 replace, 则不进行replace
        {test: '(/api/)to-be-replace/(my-data.json)', replace: '$1$2'},
        {test: '/api/'}, 

        // static: 是匹配至静态资源
        {test: '/root/', static: '/'},
        {test: '/', static: '/'}
    ],

    // middleware 的话, bird会return一个中间件函数, 默认为false
    middleware: false,

    // 待定, 如果有开发出webUI, 可以考虑允许用户指定webUI的context
    birdWebUI: '/biiiirrrrd/',

    // 是否打印出debug信息
    debug: true
};