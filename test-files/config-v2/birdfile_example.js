// <<[ Bird config example ]{t97zs_2osppcsk_iom9suor}>>
var npath = require('path')

module.exports = {
    // 该 bird 实例的名称
    name: 'AR项目',

    // bird 启动的 port, 如果设置成 middle ware的话, 将失效
    // 注意: 这个设置无法进行动态更改
    bird_port: 7678,

    // 默认的 静态资源 root
    staticFileRootDirPath: npath.resolve(__dirname),

    // 目标后端
    useServer: 'serverC',

    // 所有预设的 servers
    servers: {
        serverA: {
            server: 'https://abc.com:9999',

            // 用于forward前处理的plugin
            // bird 预设的 plugin, 通常为auth所用 通过 string 来给定
            plugin: 'uuap',

            // @pending, 需要讨论是否需要, 后续进行开发
            // 你也可以通过指定一些列的plugins来顺序对forward前的reqForward或urlOptions进行改造
            // plugins: [function, 'uuap', ...]


            // server : 为当前 server Object
            // reqForward : 为当前要 forward 的 req, plugin需要根据给定的 server info 对 urlOptions 进行更新
            // plugin 允许用户自己定义和加载
            // authPlugin: function(isRetry, serverConfig, urlOptions) { ... },

            // some-auth-method.js 为符合 auth plugin 函数原型的一个npm module脚本, 即:
            // 返回: module.exports = function (isRetry, serverConfig, urlOptions) { ... }
            // plugin: require('./some-auth-method.js'),

            // 一些自定义的 settings, e.g.
            useUser: 'wujun',
            users: {
                'chenchengxing': 'chenchengxing8030',
                'wujun': 'wujun8030',
                'lili': 'lili8030'
            },
            bprouting: 'bprouting/BpSecurityAuthentification?bpservice=https%3A%2F%2Ferp8020.baidu.com%2Fbprouting%2FBpFlowRouting%3Fappindex%3Dtrue%26t%3D0.9769457862712443',
            uuap_server: 'http://xx.xx.com:8100',

            // 如果发现被 30X 了则说明我们需要重新尝试, 默认尝试一次
            // 例如, 长时间没有操作, 导致登陆session过期, cookie失效, 这时, 需要重新登陆
            // 默认为false
            retry: false
        },
        serverB: {
            //server: 'https://www.baidu.com',
            server: 'http://demo.neisou.baidu.com/',
            //server: 'https://www.teambition.com',

            // 如果没有给定任何的auth plugin, 则用默认的 default,
            // default 主要就是把cookie写到头部去
            cookie: 'JSESSIONID=D0D9B07C9B8466F49646DC73737618C0; BAIDUID=745B42F128DB18CCDF2432566C07C339:FG=1; PSTM=1456808621; BIDUPSID=C4E27A4805415C295BF3ADE23E32E682; MCITY=-131%3A; Hm_lvt_97a3ccc58f72810a014745c167a12ffc=1460969053,1461639564,1462355104; H_PS_PSSID=18881_19288_1468_20079_18559_15776_11485; JSESSIONID=762BC17EC6DE857A07ACEA593D65B018.jvm-sso-lt-app1'
        },
        serverC: {
            server: 'https://www.baidu.com',
            //server: 'http://demo.neisou.baidu.com/',
            //server: 'https://www.teambition.com',

            // 如果没有给定任何的auth plugin, 则用默认的 default,
            // default 主要就是把cookie写到头部去
            cookie: 'JSESSIONID=D0D9B07C9B8466F49646DC73737618C0; BAIDUID=745B42F128DB18CCDF2432566C07C339:FG=1; PSTM=1456808621; BIDUPSID=C4E27A4805415C295BF3ADE23E32E682; MCITY=-131%3A; Hm_lvt_97a3ccc58f72810a014745c167a12ffc=1460969053,1461639564,1462355104; H_PS_PSSID=18881_19288_1468_20079_18559_15776_11485; JSESSIONID=762BC17EC6DE857A07ACEA593D65B018.jvm-sso-lt-app1'
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
        /*
            如果 mock 文件返回一个函数, 那么将运行这个函数, 并返回 mock data
            函数原型: function(urlInfo, queryObject, postBody)
         */
        {test: '/api/some-data.json', mock: 'mock/hi2'},
        {test: '/api/some-other-data.json', mock: 'mock/hi'},

        // 如果没有指定 mock 或 static, 则理解为接口转发, 将走指定的后端 server, 如果没有指定 replace, 则不进行replace
        {test: '(/api/)to/(data.json)', replace: '$1$2'},
        {test: '/api/'},
        {test: '/root', static: '/'},
        {test: '/'},

        // static: 是匹配至静态资源
        {test: '/root/', static: '/'},
        {test: '/', static: '/'}
    ],

    // middleware 的话, bird会return一个中间件函数, 默认为false
    middleware: false,

    // 待定, 如果有开发出webUI, 可以考虑允许用户指定webUI的context
    birdWebUI: '/biiiirrrrd/',

    // 是否打印出debug信息
    debug: true,

    // @todo 给其他人看的 demo
    // if send
    ifSendDemo: false,
    demos: {
        '/my-context/login.html': '登录页面'
    }
};