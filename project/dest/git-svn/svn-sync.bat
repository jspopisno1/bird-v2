# 全量回退到相应的版本
svn up
svn revert -R .

# git reset为最新的git提交
git reset --hard

# 获得svn更新
svn info > git-svn/svn-info.txt

# 创建 code review
# 只提交issue.info, 弄个假的东西
echo 123 > issue.info
svn add issue.info
./git-svn/upload.py -r gaoshaochen -m "$1" issue.info

echo "svn ci 前, 切记要 svn status 一下, 看看提交什么东西"