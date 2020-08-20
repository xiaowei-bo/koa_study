#!/bin/sh

#脚本执行需要2个参数

if [ $# -eq 1 ]; then

  echo "开始执行git脚本..."

  echo "你的新建分支名称：$1，你要基于哪个分支：$2，"

else

  echo "脚本执行需要1个参数：你的新建分支名称，你要基于哪个分支（若不配默认为master）"

exit -1

fi

#你所要创建的分支

new_branch_name=$1

#你所要基于的分支

if [$2]; then

  base_branch_name=$2

else

  base_branch_name="master"

fi

#切换至 base_branch_name 分支

git checkout "$base_branch_name"

#新建 new_branch_name 分支

git branch "$new_branch_name"

#git push,创建远程分支

git push origin "$new_branch_name":"$new_branch_name"

if [ $? -ne 0 ]; then

  echo "git push 错误"

  exit -1

fi

#查看分支建立情况

echo "you can open IntelliJ IDEA to write Java code..."
