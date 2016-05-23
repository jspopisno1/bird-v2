# project 架构

```
project-root/
    |- _matriks_/
        |- seed/            # 摆放我们可爱的 seed project 的 git repo
    |- project/             # 这个project 是为了能够在 seed-related 和 locals 的基础上共享一些资源 
        |- seed-related/    # 与seed相关的所有东西, 每次执行 update 的时候, 会被清除
            |- doc
            |- webpack-config/
            |- server/
            |- command-line/
        |- dest/            # 构建目标文件夹
            |- prod/         # 生产构建用
            |- dev/          # 开发构建用
        |- node_modules/    
        |- locals/
            |- config/          # 一些本地的config配置
                |- adaptors/    # 对一些 seed 的配置的适配, 如 config对象, webpack对象 
            |- tasks/
            |- command-line/
            |- lib/
            |- backend/
            |- frontend/
                |- template/
                |- asset/
                |- example/
                |- entries/
                    |- config/
                    |- ...
    |- tmp/
```