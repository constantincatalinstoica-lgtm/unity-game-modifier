@echo off
REM Unity Game Modifier - Auto Start Script (Windows)
setlocal enabledelayedexpansion

echo.
echo ========================================
echo   Unity Game Modifier - Auto Start
echo ========================================
echo.

REM Check if Python is installed
echo Checking Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8+
    echo    Download from: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Check if Node is installed
echo Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 16+
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Python and Node.js found
echo.

REM Check if backend directory exists
if not exist "backend" (
    echo ❌ Backend folder not found in current directory
    echo    Current location: %cd%
    echo    Please run this script from the root project directory
    pause
    exit /b 1
)

REM Check if frontend directory exists
if not exist "frontend" (
    echo ❌ Frontend folder not found in current directory
    echo    Current location: %cd%
    echo    Please run this script from the root project directory
    pause
    exit /b 1
)

REM Setup and start backend
echo 📦 Setting up backend...
cd /d backend

if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo ❌ Failed to create virtual environment
        cd ..
        pause
        exit /b 1
    )
)

echo Activating virtual environment...
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ❌ Failed to activate virtual environment
    cd ..
    pause
    exit /b 1
)

echo Installing Python dependencies...
pip install -q -r requirements.txt
if errorlevel 1 (
    echo ❌ Failed to install Python dependencies
    echo    Make sure requirements.txt exists in the backend folder
    cd ..
    pause
    exit /b 1
)

echo 🚀 Starting backend server...
start "Unity Game Modifier - Backend" python app.py
if errorlevel 1 (
    echo ❌ Failed to start backend
    echo    Make sure app.py exists in the backend folder
    cd ..
    pause
    exit /b 1
)

cd ..

REM Wait for backend to start
echo Waiting for backend to initialize...
timeout /t 3 /nobreak

REM Setup and start frontend
echo.
echo 📦 Setting up frontend...
cd /d frontend

if not exist "package.json" (
    echo ❌ package.json not found in frontend folder
    cd ..
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Installing npm dependencies...
    call npm install
    if errorlevel 1 (
        echo ❌ Failed to install npm dependencies
        cd ..
        pause
        exit /b 1
    )
)

echo 🚀 Starting frontend...
start "Unity Game Modifier - Frontend" npm start
if errorlevel 1 (
    echo ❌ Failed to start frontend
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo ✅ Unity Game Modifier is starting!
echo.
echo    Backend:  http://localhost:5000
echo    Frontend: http://localhost:3000
echo.
echo Frontend will open automatically in your browser.
echo Close both windows to stop the application.
echo ========================================
echo.

pause
