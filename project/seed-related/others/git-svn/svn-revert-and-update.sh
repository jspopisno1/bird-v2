
# 全量回退到相应的版本
svn up -r $1
svn revert -R .

# git reset为最新的git提交
git reset --hard

# 获得svn更新
svn up
svn info > git-svn/svn-info.txt
