

## proposed config

- [x] auth plugin specified
- [x] middle ware setting
- [x] router setting
- [] 暂时取消 array 的设定??
    - 推荐 bird 内置于项目中, 作为代码的一部分跟着项目走
    
    
## 实现配置文件的动态加载 (当前需要重新启动服务器)

- [] 当检测到 bird config 有更新, 不用重启server地刷新config

## fix 一些常见的bug

- [] debug: false的时候, 会影响所有其他正常的console.log输出
- [x] 没有指定username, 则静默式退出, 这个使用新的config之后, 就没这个问题了
- [] 没有内网环境下, cheerio解析出错

## 开发建议
 
- 加入多一些合理的错误信息, 以方便用户调试和调整config
