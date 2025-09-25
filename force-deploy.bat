@echo off
echo 强制部署开始...
git add .
git commit -m "FORCE DEPLOY: 管理后台查看详情功能 - %date% %time%"
git push origin main --force
echo 部署完成，请等待3-5分钟后检查线上版本
pause