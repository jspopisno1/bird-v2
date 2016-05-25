# This is bird with auth

## Development

当前的开发方向如下:

- 提高bird配置的可读性与有效性 (重构config的结构)
- 实现配置文件的动态加载 (当前需要重新启动服务器)
- fix 一些常见的bug
    - 如, debug: false的时候, 会影响所有其他正常的console.log输出
    - 没有指定username, 则静默式退出
    - 没有内网环境下, cheerio解析出错
- 加入多一些合理的错误信息, 以方便用户调试和调整config
- 引入 matriks 项目结构

## 重构后的主要思路

- 关于config的自动更新
    - 利用 setInterval 和 fs.stat 来动态检测 config 变化, 更新 js 引用对象 config
    - 参见 @[  动态更新 config 对象  ]{t97zs_zd0tksdx_iom9u7yv}@
- 逻辑重构思路
    - bird的两大核心:
        - 设置好目标的后端 server, 并利用 httpClient 来进行接口转发
            - 接口转发的逻辑:
                - 1 得到 request 时, 获取其 pathname
                - 2 将 pathname 提交给 routes 解析函数, 得到一个资源处理策略
                - 3 根据资源处理策略来处理该 request
                - 4 如果为接口转发, 首先做一些简单的配置, 生成一个转发的必要对象: urlOptions
                - 5 通过 plugin (一般是用于解决用户身份验证, 得到cookie), 修改 urlOptions
                    - 参见 @[  解析所用的 plugin, 并调用它  ]{t97zs_vd7sdnis_iomf0g31}@
                - 6 将最终得到的 urlOptions 作为转发的参数, 发送 http 或 https 的请求到目标后端服务器
                - 7 截取所有后端服务器的返回进行处理
                - 8 如果后端返回是 3XX, 403 等特殊的跟身份验证相关的状态值, 需要考虑是否进行 plugin 的 retry
                    - 参见 @[  特殊返回的处理, 如 3XX, 403  ]{t97zs_w0fege8q_iomeynf7}@ 
                - 9 否则, 如果是其他的状态, 我们就全量的写到给前端的 reponse 里, 实现最终的接口转发
        - 通过 routes (路由设置) 来判定资源的返回方式
            - 目前有三种资源类别: mock (假数据), static (静态资源), forward (接口转发) 

[项目开发任务列表](./doc/tasks.md)


**注意: 以下的README内容可能会短时间内失效, 请随时关注项目的开发**

## usage

### global

- npm install -g birdv2
- touch birdfile.js
- vi birdfile.js

```
// sample birdfile.js
module.exports = {
  name: 'ar',
  bird_port: 7676,
  staticFileRootDirPath: '../webapp',
  server: 'http://xx.xx.com:8901/ar/',
  uuap_server: 'http://xx.xx.com:8100',
  username: 'jay',
  password_suffix: ''
};
```
- bird  `or` bird  -c ../yourPath/birdfile.js

### local

- npm install -D birdv2
- touch birdfile.js
- vi birdfile.js

```
// sample birdfile.js
var config = {
  name: 'ar',
  bird_port: 7676,
  staticFileRootDirPath: '../webapp',
  server: 'http://xx.xx.com:8901/ar/',
  uuap_server: 'http://xx.xx.com:8100',
  username: 'jay',
  password_suffix: ''
};
require('bird')(config)
```

- node birdfile.js

### as middleware with mock

请参考erp-finfap

## config
- bird的配制可是一个object,也可以是一个array, eg:
```
  var config = {
    name: 'ar',
    bird_port: 7676,
    staticFileRootDirPath: '../webapp',
    server: 'http://xx.xx.com:8901/ar/',
    uuap_server: 'http://xx.xx.com:8100',
    username: 'jay',
    password_suffix: ''
  };

  `or`
  var config = [{
    name: 'ar',
    bird_port: 7676,
    staticFileRootDirPath: '../webapp',
    server: 'http://xx.xx.com:8901/ar/',
    uuap_server: 'http://xx.xx.com:8100',
    username: 'jay',
    password_suffix: ''
  }, {
    name: 'ar2',
    bird_port: 7777,
    staticFileRootDirPath: '../webapp',
    server: 'http://xx.xx.com:8902/ar/',
    uuap_server: 'http://xx.xx.com:82S00',
    username: 'jay',
    password_suffix: ''
  }]
```
- 下面是详细的配制说明，*表示必须的配制， #表示正在开发或功能不稳定的配制， 其他是可选项
  ```
  // *服务名字,本配制以ar为例
  name: 'ar',
  // *服务端口
  bird_port: 3000,
  // *静态文件目录，可以为相对路径，如：../build
  staticFileRootDirPath: '/home/zp/work/ar/src/main/webapp/resources',
  // *测试机地址，是否带`ar`看环境的context
  server: 'http://xx-xx.epc:8901/ar/',
  // *该测试机对应的uuap地址
  uuap_server: 'http://uuap_test.com:8100',
  // *你想用谁登录
  username: 'who_you_want',
  // *密码后缀，没有就留空
  password_suffix: '',
  // 是否开启dev-tools(提供切换用户等功能)default:false
  dev_tool: {
    type: 'input', // #暂时只有这一个，后续加select
    top: 20,       // 工具上边距
    right: 20      //右边距
  },
  // feapps专用登录，hard code this one. default:false
  bprouting: 'bprouting/BpFlowRouting?appindex=true',
  // 是否使用静态的cookie,录bird出问题了你还可以把cookie粘到这里，像旧版一样default:false
  cookie: 'sessionid=XXXXXXXXXXX',
  // 转发路由，你可以将本地的请求转发到指定的路径
  router: {  
      '/ar': '/ar-web' // 将http://xx-xx.epc:8901/ar/XX/XX -> http://xx-xx.epc:8901/ar-web/XX/XX 
  },
  // 登录方式，默认是使用uuap来登录，加载auths/uuap.js default:'uuap'
  auth_standalone: 'uuap',
  // #当cookie效了重新cookie，当然，你可以重启bird来手动获取.default:true
  keep_alive: true,
  // #使用本地的数据，不转发. 当服务器当了，你可以造些假数据来本地测试
  use_local_data: {
    '/ar': '/your/data/path'
  }
  ```
## extendable

- 如果你的项目不是用uuap登录的，那你需要配制auth_standalone选项, 然后在auths/目录下添加上对应的js文件，当然你可以联系我，告诉你项目的地址 及登录帐号， 让我帮你加



## browser ci api

- 打开浏览器的console,可以执行以下命令：
- birdv2.use('uuap_name') 切换到其他用户登录

## notice

- 当获取的cookie失效时，如果response是重定向到其他url,bird会自动获取新cookie,并重定向回来，用户是感觉不到这个过程的。如果response是返回一个对象，使浏览器登出，跳转到 /logout，bird会根据request->header->referer又跳转回来，因为referer不包括锚点信息，对于angular用户会发现页面跳到默认页面；同理，手动点登出也会跳回来，只是换了个cookie


## todo

- track forward history??
- forwarding local json data
