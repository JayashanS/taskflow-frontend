# stop-react-apps.ps1

# Stop Apps
$processes = Get-Process | Where-Object { 
    $_.Path -like "*node.exe" -and 
    ($_.StartInfo.Arguments -like "*npm start*")
}

foreach ($process in $processes) {
    Stop-Process -Id $process.Id -Force
}

Write-Host "Stopped all React apps."
