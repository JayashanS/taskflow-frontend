# Start Apps
Start-Process "cmd.exe" -ArgumentList "/c cd .\taskflow-host && npm start" -NoNewWindow
Start-Process "cmd.exe" -ArgumentList "/c cd .\taskflow-mfe-task-management && npm start" -NoNewWindow


Write-Host "Started all React apps."
