@echo off
chcp 65001 >nul
echo ==========================================
echo      CSP-J Studio 自动版本同步
echo ==========================================
echo.

if "%~1"=="" (
    echo 错误: 请提供提交描述作为参数。
    echo 用法: auto_sync.bat "您的提交描述"
    exit /b 1
)

set MSG=%~1
echo 提交描述: %MSG%

echo.
echo 1. Git Add...
git add .

echo.
echo 2. Git Commit...
git commit -m "%MSG%"

echo.
echo 3. Git Push...
git push

if %errorlevel% equ 0 (
    echo.
    echo ✅ [自动同步成功] 代码已上传到 GitHub
) else (
    echo.
    echo ❌ [自动同步失败] 请检查网络或 Git 状态
)
