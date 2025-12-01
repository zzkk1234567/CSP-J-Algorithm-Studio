$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = "d:\CSPJ"
$watcher.Filter = "csp-j-studio-simple.html"
$watcher.IncludeSubdirectories = $false
$watcher.EnableRaisingEvents = $true

Write-Host "正在监控 csp-j-studio-simple.html 的变化..." -ForegroundColor Cyan

$action = {
    $path = $Event.SourceEventArgs.FullPath
    $changeType = $Event.SourceEventArgs.ChangeType
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    
    Write-Host "[$timestamp] 检测到文件变更: $changeType" -ForegroundColor Yellow
    
    # Wait a bit for file lock to release
    Start-Sleep -Seconds 1
    
    Write-Host "正在执行自动备份..." -ForegroundColor Green
    git add "$path"
    git commit -m "Auto-watch: csp-j-studio-simple.html updated at $timestamp"
    git push origin main
    
    if ($?) {
        Write-Host "✅ 备份成功！" -ForegroundColor Cyan
    }
    else {
        Write-Host "❌ 备份失败，请检查 git 状态。" -ForegroundColor Red
    }
}

Register-ObjectEvent $watcher "Changed" -Action $action
Register-ObjectEvent $watcher "Created" -Action $action
Register-ObjectEvent $watcher "Renamed" -Action $action

Write-Host "监控服务已启动。请不要关闭此窗口。" -ForegroundColor White
while ($true) { Start-Sleep -Seconds 5 }
