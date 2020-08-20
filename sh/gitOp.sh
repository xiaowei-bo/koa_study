#!/bin/sh

#脚本运行命令 sh gitOp.sh new_branch

#配置默认基础分支

default_branch="master"

if [ ! $1 ]; then

  echo "脚本执行需要至少1个参数：你的新建分支名称"

exit -1

else

  new_branch_name=$1
  if [ ! $2 ]; then

    base_branch_name="$default_branch"

  else

    base_branch_name=$2

  fi

  echo "开始基于 $base_branch_name 分支创建 $new_branch_name 分支..."

fi


#切换至 base_branch_name 分支

git checkout "$base_branch_name"

#pull 操作

git pull

if [ $? -ne 0 ]; then
  echo "git pull 错误"
  exit -1
fi

#新建 new_branch_name 分支

git branch "$new_branch_name"

#切换至 new_branch_name 分支

git checkout "$new_branch_name"

#git push,创建远程分支

git push origin "$new_branch_name":"$new_branch_name"

if [ $? -ne 0 ]; then
  echo "git push 错误"
  exit -1
fi

#查看分支建立情况

echo "$new_branch_name 分支已创建成功，请开始你的表演..."
