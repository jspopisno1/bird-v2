# 目标的设置

- 技术栈
    - webpack
        - es6 loader
    - react
    - redux
    - react-router
    - redux-router
    - immutablejs

- 考虑的点:
    - [!] WebpackIsomorphicToolsPlugin ?
        - 用来做图片转成统一dataURI打包
    - [x] mock 
    - [x] 模块 --> 在 app/common 和 base/common 下 resolve
    - [] 不同页面的 store replace 问题
    - [!] i18n
        - finfa 暂无支持
    - [x] blue bird
        - 我们就是跟superagent在一起 只在发请求的时候用的
    - [x] bird
        - 我们起了一个express服务器 然后把webpack-middleware 还有bird都当中间件插进去了
    - [x] image
        - [x] url loader ??? => data uri
    - [x] font files
        - [x] 尝试 font-awesome
    - [x] jquery
    - [x] html files
    - [x] islider
        - [] islider 与 react 共存?
    - [x] styles
        - [x] auto-prefixer
        - [x] sass in adaptor
        - [x] sourcemap
            - [x] ? 还是没匹配上?
                - 应该匹配上了
    - [x] production mechanism
        - define plugin?
    - [x] common loader
    - [x] local server 能力
        
- 多entry 模板问题
    - [x] entry 后缀
        - [] entry 文件夹???
    - [] command line
    - [] prod 环境 server
    - [] test 的能力
        
- [] 种子管理器, 对非业务逻辑更改的警告作用

- [] 每个example / 模块, 可以很容易的分离出一个 webpack 开发环境
- [] weex https://github.com/amfe/article/issues/14
    - http://alibaba.github.io/weex/

# 种子项目的诸多流程

- npm run dev
- npm run test
- npm run prod 
- npm run release

- npm run example -- component/something ...

# problems

- warning.js:14 You are currently using minified code outside of NODE_ENV === 'production'. This means that you are running a slower development build of Redux. You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) to ensure you have the correct code for your production build.