#!/bin/bash

# GitHub Pages 发布脚本
# 1. 在master分支build
# 2. 切换到gh-pages
# 3. 把根目录并列的dist目录下的内容替换掉gh-pages的旧内容
# 4. 推送gh-pages分支

set -e  # 遇到错误立即退出

echo "🚀 开始发布流程..."

# 设置Node.js环境
export PATH="/Users/yxr/.nvm/versions/node/v22.17.1/bin:$PATH"

# 1. 确保在master分支并构建
echo "📦 步骤1: 切换到master分支并构建项目..."
git checkout master
npm run docs:build

# 2. 切换到gh-pages分支
echo "🔄 步骤2: 切换到gh-pages分支..."
git checkout gh-pages

# 3. 备份node_modules（如果存在）
if [ -d "node_modules" ]; then
    echo "💾 备份node_modules..."
    cp -r node_modules ../node_modules_backup
fi

# 4. 清空当前目录（保留.git）
echo "🧹 步骤3: 清空gh-pages分支内容..."
rm -rf * .[^.]* 2>/dev/null || true

# 5. 恢复node_modules（如果之前存在）
if [ -d "../node_modules_backup" ]; then
    echo "📦 恢复node_modules..."
    cp -r ../node_modules_backup node_modules
    rm -rf ../node_modules_backup
fi

# 6. 复制构建产物
echo "📋 复制构建产物..."
cp -r ../dist/* .

# 7. 添加所有文件到git
echo "📝 添加文件到git..."
git add .

# 8. 提交更改
echo "💬 提交更改..."
git commit -m "docs: update site $(date '+%Y-%m-%d %H:%M:%S')"

# 9. 推送到远程仓库
echo "🚀 步骤4: 推送到GitHub..."
git push origin gh-pages

echo "✅ 发布完成！"
echo "🌐 网站地址: https://kittyfairy-han.github.io/knowledge-system/" 