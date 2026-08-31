@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 Starting EPL Predictions Dashboard...
echo.

REM Check if docker-compose is installed
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ docker-compose is not installed. Please install Docker Desktop first.
    echo Visit: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

REM Start docker-compose
echo 📦 Starting Docker services (PostgreSQL, Backend, Frontend)...
docker-compose up -d

REM Wait for backend to be ready
echo.
echo ⏳ Waiting for services to start (this may take 30-60 seconds)...
timeout /t 10 /nobreak

REM Check if backend is responding
set "max_attempts=30"
set "attempt=1"

:wait_loop
if !attempt! gtr !max_attempts! (
    echo ❌ Backend failed to start. Check docker-compose logs:
    echo    docker-compose logs backend
    pause
    exit /b 1
)

curl -s http://localhost:8000/health >nul 2>&1
if errorlevel 0 (
    echo ✅ Backend is ready!
    goto load_predictions
)

echo   Waiting... (attempt !attempt!/!max_attempts!)
timeout /t 2 /nobreak
set /a attempt=!attempt!+1
goto wait_loop

:load_predictions
echo.
echo 📥 Loading predictions into database...
python load_predictions.py

if errorlevel 1 (
    echo ❌ Failed to load predictions. Make sure the backend is running.
    pause
    exit /b 1
)

REM Display summary
echo.
echo ✨ All set! Your dashboard is ready:
echo    Frontend:  http://localhost:5173
echo    Backend:   http://localhost:8000
echo    API Docs:  http://localhost:8000/docs
echo.
echo 📊 Opening dashboard in your browser...
echo.

REM Try to open in browser
start http://localhost:5173

echo 🎉 Dashboard loaded! Enjoy comparing your predictions!
echo.
echo To stop the services, run: docker-compose down
echo.
pause
