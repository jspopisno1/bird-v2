# 说明

这些是为适应我们"可爱"的svn, git之间的双版本共存问题.

# 使用

请将这个文件夹移到 `.svn` 管理的文件夹下

## 普通更新

```
git-svn/svn-up.sh
```

## 重置更新

svn与git的版本可能出现不同步, 再这种情况下, 需要把`svn-info.txt`的版本, 假设是 `12345`, 拿出来, 使用以下命令更新.

```
git-svn/svn-revert-and-update.sh 12345
```

## 创建review

注意把 `reviewer`, 即 `-r`, 的信息修改成你所需要的人.
