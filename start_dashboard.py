#!/usr/bin/env python3
"""
Cross-platform script to start the EPL Predictions Dashboard
Works on Windows, Mac, and Linux
Run with: python start_dashboard.py
"""

import subprocess
import time
import os
import sys
import webbrowser
from pathlib import Path

def run_command(cmd, shell=False):
    """Run a command and return success status"""
    try:
        if shell:
            subprocess.run(cmd, shell=True, check=True)
        else:
            subprocess.run(cmd, check=True)
        return True
    except subprocess.CalledProcessError:
        return False
    except FileNotFoundError:
        return False

def check_service(url, max_attempts=30):
    """Check if a service is responding"""
    import urllib.request
    import urllib.error
    
    for attempt in range(max_attempts):
        try:
            urllib.request.urlopen(url)
            return True
        except (urllib.error.URLError, urllib.error.HTTPError):
            print(f"  Waiting... (attempt {attempt + 1}/{max_attempts})")
            time.sleep(2)
    return False

def main():
    print("\n🚀 Starting EPL Predictions Dashboard...\n")
    
    # Check if docker-compose is installed
    print("Checking Docker installation...")
    if not run_command("docker-compose --version", shell=True):
        print("❌ docker-compose is not installed.")
        print("Please install Docker Desktop from: https://www.docker.com/products/docker-desktop")
        input("Press Enter to exit...")
        sys.exit(1)
    
    # Start docker-compose
    print("📦 Starting Docker services (PostgreSQL, Backend, Frontend)...")
    run_command("docker-compose up -d", shell=True)
    
    # Wait for services
    print("\n⏳ Waiting for services to start (this may take 30-60 seconds)...")
    time.sleep(10)
    
    # Check if backend is ready
    print("Checking backend health...")
    if not check_service("http://localhost:8000/health"):
        print("❌ Backend failed to start.")
        print("Run 'docker-compose logs backend' to see errors")
        input("Press Enter to exit...")
        sys.exit(1)
    
    print("✅ Backend is ready!")
    
    # Load predictions
    print("\n📥 Loading predictions into database...")
    if not run_command([sys.executable, "load_predictions.py"]):
        print("❌ Failed to load predictions.")
        input("Press Enter to exit...")
        sys.exit(1)
    
    # Display summary
    print("\n✨ All set! Your dashboard is ready:")
    print("   Frontend:  http://localhost:5173")
    print("   Backend:   http://localhost:8000")
    print("   API Docs:  http://localhost:8000/docs")
    print("\n📊 Opening dashboard in your browser...\n")
    
    # Open browser
    webbrowser.open("http://localhost:5173")
    
    print("🎉 Dashboard loaded! Enjoy comparing your predictions!")
    print("\nTo stop the services, run: docker-compose down")
    print("\nPress Enter to exit this script (services will keep running)...")
    input()

if __name__ == "__main__":
    main()
