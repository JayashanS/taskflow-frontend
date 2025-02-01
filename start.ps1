# start-react-apps.ps1

# Start Apps
Start-Process "cmd.exe" -ArgumentList "/c cd .\taskflow-host && npm start" -NoNewWindow
Start-Process "cmd.exe" -ArgumentList "/c cd .\taskflow-mfe-admin-dashboard && npm start" -NoNewWindow
Start-Process "cmd.exe" -ArgumentList "/c cd .\taskflow-mfe-task-management && npm start" -NoNewWindow
Start-Process "cmd.exe" -ArgumentList "/c cd .\taskflow-mfe-user-dashboard && npm start" -NoNewWindow

Write-Host "Started all React apps."
