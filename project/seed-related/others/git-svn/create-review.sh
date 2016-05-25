
# 提交issue.info
echo 123 > issue.info
svn add issue.info
./git-svn/upload.py -r zhouhailian,wangleifeng -m "$1" issue.info