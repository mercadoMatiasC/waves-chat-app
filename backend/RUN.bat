@echo off
:: Start XAMPP Minimized
start /min "Xampp" "D:\xampp\xampp-control.exe"

:: Start Frontend in a new, titled window
start "Frontend-App" /D "D:\xampp\htdocs\WavesChatApp\frontend" "RUN.bat"

:: Start Backend via PowerShell (Minimized, NoExit)
start /min powershell -NoExit -command "cd D:\xampp\htdocs\WavesChatApp\backend; php artisan serve --host=0.0.0.0 --port=8000"