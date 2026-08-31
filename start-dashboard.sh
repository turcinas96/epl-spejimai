#!/bin/bash

echo "🚀 Starting EPL Predictions Dashboard..."
echo ""

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install Docker Desktop or docker-compose first."
    exit 1
fi

# Start docker-compose
echo "📦 Starting Docker services (PostgreSQL, Backend, Frontend)..."
docker-compose up -d

# Wait for backend to be ready
echo ""
echo "⏳ Waiting for services to start (this may take 30-60 seconds)..."
sleep 10

# Check if backend is responding
max_attempts=30
attempt=1
while [ $attempt -le $max_attempts ]; do
    if curl -s http://localhost:8000/health > /dev/null; then
        echo "✅ Backend is ready!"
        break
    fi
    echo "  Waiting... (attempt $attempt/$max_attempts)"
    sleep 2
    attempt=$((attempt + 1))
done

if [ $attempt -gt $max_attempts ]; then
    echo "❌ Backend failed to start. Check docker-compose logs:"
    echo "   docker-compose logs backend"
    exit 1
fi

# Load predictions
echo ""
echo "📥 Loading predictions into database..."
python3 load_predictions.py

if [ $? -ne 0 ]; then
    echo "❌ Failed to load predictions. Make sure the backend is running."
    exit 1
fi

# Display summary
echo ""
echo "✨ All set! Your dashboard is ready:"
echo "   Frontend:  http://localhost:5173"
echo "   Backend:   http://localhost:8000"
echo "   API Docs:  http://localhost:8000/docs"
echo ""
echo "📊 Opening dashboard in your browser..."
echo ""

# Try to open in browser (works on most systems)
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:5173
elif command -v open &> /dev/null; then
    open http://localhost:5173
elif command -v start &> /dev/null; then
    start http://localhost:5173
else
    echo "⚠️  Couldn't auto-open browser. Visit: http://localhost:5173"
fi

echo ""
echo "🎉 Dashboard loaded! Enjoy comparing your predictions!"
echo ""
echo "To stop the services, run: docker-compose down"
