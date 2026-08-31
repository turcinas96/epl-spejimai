@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 Starting EPL Predictions Dashboard...
echo.

REM Start docker-compose
echo 📦 Starting Docker services (PostgreSQL, Backend, Frontend)...
docker-compose up -d

REM Wait for backend to be ready
echo.
echo ⏳ Waiting for services to start (this may take 30-60 seconds)...
timeout /t 15 /nobreak

REM Load predictions
echo.
echo 📥 Loading predictions into database...
python load_predictions.py

if errorlevel 1 (
    echo ❌ Failed to load predictions.
    pause
    exit /b 1
)

REM Display summary
echo.
echo ✨ All set! Your dashboard is ready:
echo    Frontend:  http://localhost:5173
echo    Backend:   http://localhost:8000
echo.
echo 📊 Opening dashboard in your browser...
timeout /t 2 /nobreak

start http://localhost:5173

echo.
echo 🎉 Dashboard loaded! Enjoy comparing your predictions!
echo.
echo To stop the services, run: docker-compose down
echo.
pause
