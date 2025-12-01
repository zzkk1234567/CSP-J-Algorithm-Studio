@echo off
chcp 65001 >nul
echo ==========================================
echo      CSP-J Studio 自动备份工具
echo ==========================================

:: 获取当前日期时间作为提交信息
set "timestamp=%date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,2%:%time:~3,2%:%time:~6,2%"
set "timestamp=%timestamp: =0%"

echo.
echo [1/3] 正在检查文件变更...
git add csp-j-studio-simple.html

echo.
echo [2/3] 正在自动提交...
git commit -m "Auto-save: csp-j-studio-simple.html updated at %timestamp%"

echo.
echo [3/3] 正在推送到 GitHub...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ 自动备份完成！(%timestamp%)
) else (
    echo.
    echo ⚠️ 备份过程中可能遇到问题 (或者没有新文件需要提交)
)

timeout /t 3 >nul
