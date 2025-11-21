@echo off
chcp 65001 >nul
echo ==========================================
echo      CSP-J Studio GitHub 设置助手
echo ==========================================
echo.

:: 设置正确的仓库地址
SET REPO_URL=https://github.com/zzkk1234567/CSP-J-Algorithm-Studio.git

echo 1. 正在检查 Git 环境...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未检测到 Git。请先安装 Git: https://git-scm.com/
    pause
    exit /b
)

echo.
echo 2. 正在检查本地提交...
git rev-parse --verify HEAD >nul 2>&1
if %errorlevel% neq 0 (
    echo 检测到尚未提交代码，正在自动提交...
    git config user.email "student@cspj-studio.local"
    git config user.name "CSP-J Student"
    git add .
    git commit -m "Auto commit by setup script"
)

echo.
echo 3. 正在设置主分支名称为 main...
git branch -M main

echo.
echo 4. 正在添加远程仓库地址...
echo 目标地址: %REPO_URL%
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

echo.
echo 5. 正在推送到 GitHub...
echo (如果这是第一次连接，可能会弹出窗口要求您登录 GitHub)
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ==========================================
    echo ✅ 成功！代码已推送到 GitHub。
    echo ==========================================
) else (
    echo.
    echo ==========================================
    echo ❌ 推送失败。
    echo 请检查：
    echo 1. 网络连接是否正常？
    echo 2. 您是否有权限访问该仓库？(是否登录了正确的账号)
    echo 3. 仓库地址是否正确？(%REPO_URL%)
    echo ==========================================
)

pause
