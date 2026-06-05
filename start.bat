@echo off
REM Unity Game Modifier - Auto Start Script (Windows)

echo.
echo ========================================
echo   Unity Game Modifier - Auto Start
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8+
    echo    Download from: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Check if Node is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 16+
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Python and Node.js found
echo.

REM Setup and start backend
echo 📦 Setting up backend...
cd backend

if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

call venv\Scripts\activate.bat
pip install -q -r requirements.txt

echo 🚀 Starting backend server...
start "Unity Game Modifier - Backend" python app.py

cd ..

REM Wait for backend to start
timeout /t 2 /nobreak

REM Setup and start frontend
echo.
echo 📦 Setting up frontend...
cd frontend

if not exist "node_modules" (
    echo Installing npm dependencies...
    call npm install -q
)

echo 🚀 Starting frontend...
start "Unity Game Modifier - Frontend" npm start

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
