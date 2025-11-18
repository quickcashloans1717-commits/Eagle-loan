@echo off
REM ======================================================
REM Loan API - Production Startup Script (Windows)
REM This is for reference - use start.sh on Hostinger
REM ======================================================

setlocal enabledelayedexpansion

cls
echo.
echo ╔════════════════════════════════════════════════════╗
echo ║     Loan Application API - Production Setup        ║
echo ║              (Windows Reference)                   ║
echo ╚════════════════════════════════════════════════════╝
echo.

REM Get current directory
set SCRIPT_DIR=%~dp0
echo Working directory: %SCRIPT_DIR%
echo.

REM Step 1: Install dependencies
echo 1️⃣  Installing Node.js dependencies...
call npm install
echo ✓ Dependencies installed
echo.

REM Step 2: Create logs directory
echo 2️⃣  Creating logs directory...
if not exist "logs" mkdir logs
echo ✓ Logs directory created
echo.

REM Step 3: Check if PM2 is installed
echo 3️⃣  Checking PM2...
where pm2 > nul 2>&1
if errorlevel 1 (
    echo Installing PM2 globally...
    call npm install -g pm2
)
echo ✓ PM2 is available
echo.

REM Step 4: Stop existing app if running
echo 4️⃣  Stopping existing app ^(if running^)...
pm2 stop loan-api 2>nul
pm2 delete loan-api 2>nul
timeout /t 2 /nobreak > nul
echo ✓ Cleaned up existing processes
echo.

REM Step 5: Start with PM2
echo 5️⃣  Starting API server with PM2...
pm2 start index.js --name "loan-api" --env production
timeout /t 2 /nobreak > nul
echo ✓ API server started
echo.

REM Step 6: Save PM2 configuration
echo 6️⃣  Saving PM2 configuration...
pm2 save
echo ✓ Configuration saved
echo.

REM Step 7: Show status
echo 7️⃣  Checking server status...
echo.
pm2 list
echo.

REM Display test information
echo.
echo ╔════════════════════════════════════════════════════╗
echo ║          Setup Complete on Windows! ✅             ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo Use these commands:
echo.
echo 📊 Monitor logs:
echo    pm2 logs loan-api
echo.
echo 📋 List processes:
echo    pm2 list
echo.
echo 🔄 Restart API:
echo    pm2 restart loan-api
echo.
echo ⏹️  Stop API:
echo    pm2 stop loan-api
echo.
pause
