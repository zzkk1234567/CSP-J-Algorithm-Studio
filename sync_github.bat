@echo off
chcp 65001 >nul
echo ==========================================
echo      CSP-J Studio 代码同步助手
echo ==========================================
echo.

echo 当前状态：
git status -s
echo.

set /p msg="请输入本次修改的描述 (例如: 修复了排序动画): "

if "%msg%"=="" (
    echo 错误: 描述不能为空！
    pause
    exit /b
)

echo.
echo 1. 正在保存更改 (git add)...
git add .

echo.
echo 2. 正在提交更改 (git commit)...
git commit -m "%msg%"

echo.
echo 3. 正在同步到 GitHub (git push)...
git push

if %errorlevel% equ 0 (
    echo.
    echo ==========================================
    echo ✅ 同步成功！
    echo 您的代码已安全保存到 GitHub。
    echo ==========================================
) else (
    echo.
    echo ==========================================
    echo ❌ 同步失败。请检查网络或查看上方错误信息。
    echo ==========================================
)

pause
