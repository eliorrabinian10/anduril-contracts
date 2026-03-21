@echo off
echo Starting Anduril Contracts Tracking System...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo Installing dependencies...
echo.

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install backend dependencies
    pause
    exit /b 1
)

REM Install frontend dependencies
echo Installing frontend dependencies...
cd ..\frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install frontend dependencies
    pause
    exit /b 1
)

cd ..

echo.
echo Installation complete!
echo.
echo Starting servers...
echo.

REM Start backend
echo Starting Backend on port 5000...
start "Anduril Backend" cmd /k "cd backend && npm start"

REM Wait for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
echo Starting Frontend on port 3000...
start "Anduril Frontend" cmd /k "cd frontend && npm start"

echo.
echo Servers are starting!
echo.
echo Backend:  http://localhost:5000/api
echo Frontend: http://localhost:3000
echo.
echo Two command windows have been opened.
echo Close them to stop the servers.
echo.
pause
