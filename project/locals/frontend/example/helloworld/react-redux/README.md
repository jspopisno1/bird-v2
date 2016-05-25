# 项目说明

- index.js 为页面的逻辑入口, 逻辑入口里会做如下的依赖处理和初始加载:
    - 初始化 store 
        - `initer.configureStore()`
    - 绑定 routes 
        - `initer.init({routes: ...})`
- routes.js 是该页面的路由配置
    - 通过对路由配置, 将指定相关的 reducer 以及 Container组件
- reducer.js 是页面所需的 逻辑处理器, 这个例子, 只有非常简单的一些操作
    - reducer 里要暴露的东西主要就是 triggers
        - triggers 用于产生 Actions
- MyApp.js 是一个container组件, 它用于实现页面的UI层面, 以及处理用户的事件处理