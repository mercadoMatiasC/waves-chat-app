@echo off
:: Start XAMPP Minimized
start /min "Xampp" "D:\xampp\xampp-control.exe"

:: Start Frontend via PowerShell (Minimized, NoExit)
start /min powershell -NoExit -command "cd D:\xampp\htdocs\WavesChatApp\frontend; npm run dev -- --host"

:: Start Reverb via PowerShell (Minimized, NoExit)
start /min powershell -NoExit -command "cd D:\xampp\htdocs\WavesChatApp\backend; php artisan reverb:start --host=0.0.0.0 --port=8080 --debug"

:: Start VSCODE
start "VSCode" "D:\Program Files\Microsoft VS Code\Code.exe"

:: Start Backend via PowerShell (Minimized, NoExit)
start /min powershell -NoExit -command "cd D:\xampp\htdocs\WavesChatApp\backend; php artisan serve --host=0.0.0.0 --port=8000"