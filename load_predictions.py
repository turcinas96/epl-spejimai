#!/usr/bin/env python3
"""
Script to load predictions into the database
Run this after the backend is running:
  python load_predictions.py
"""

import httpx
import json

API_URL = "http://localhost:8000"

# Ignas predictions
ignas_predictions = {
    "username": "ignas",
    "display_name": "Ignas",
    "season": "2026-27",
    "teams": [
        {"position": 1, "team": "Arsenal"},
        {"position": 2, "team": "Manchester City"},
        {"position": 3, "team": "Chelsea"},
        {"position": 4, "team": "Manchester United"},
        {"position": 5, "team": "Tottenham Hotspur"},
        {"position": 6, "team": "Liverpool"},
        {"position": 7, "team": "Brentford"},
        {"position": 8, "team": "Aston Villa"},
        {"position": 9, "team": "Brighton"},
        {"position": 10, "team": "Nottingham Forest"},
        {"position": 11, "team": "Crystal Palace"},
        {"position": 12, "team": "Bournemouth"},
        {"position": 13, "team": "Sunderland"},
        {"position": 14, "team": "Newcastle United"},
        {"position": 15, "team": "Everton"},
        {"position": 16, "team": "Leeds"},
        {"position": 17, "team": "Coventry"},
        {"position": 18, "team": "Fulham"},
        {"position": 19, "team": "Ipswich"},
        {"position": 20, "team": "Hull"},
    ]
}

# Augustinas predictions
augustinas_predictions = {
    "username": "turcinas96",
    "display_name": "Augustinas",
    "season": "2026-27",
    "teams": [
        {"position": 1, "team": "Arsenal"},
        {"position": 2, "team": "Manchester City"},
        {"position": 3, "team": "Liverpool"},
        {"position": 4, "team": "Manchester United"},
        {"position": 5, "team": "Chelsea"},
        {"position": 6, "team": "Tottenham Hotspur"},
        {"position": 7, "team": "Brentford"},
        {"position": 8, "team": "Bournemouth"},
        {"position": 9, "team": "Newcastle United"},
        {"position": 10, "team": "Everton"},
        {"position": 11, "team": "Brighton"},
        {"position": 12, "team": "Aston Villa"},
        {"position": 13, "team": "Sunderland"},
        {"position": 14, "team": "Nottingham Forest"},
        {"position": 15, "team": "Crystal Palace"},
        {"position": 16, "team": "Leeds"},
        {"position": 17, "team": "Fulham"},
        {"position": 18, "team": "Coventry"},
        {"position": 19, "team": "Ipswich"},
        {"position": 20, "team": "Hull"},
    ]
}

def load_predictions():
    """Load both predictions into the database"""
    with httpx.Client() as client:
        print("Loading Ignas's predictions...")
        try:
            response = client.post(f"{API_URL}/api/predictions/", json=ignas_predictions)
            response.raise_for_status()
            print("✅ Ignas's predictions loaded successfully!")
        except Exception as e:
            print(f"❌ Error loading Ignas's predictions: {e}")
            return False

        print("\nLoading Augustinas's predictions...")
        try:
            response = client.post(f"{API_URL}/api/predictions/", json=augustinas_predictions)
            response.raise_for_status()
            print("✅ Augustinas's predictions loaded successfully!")
        except Exception as e:
            print(f"❌ Error loading Augustinas's predictions: {e}")
            return False

    print("\n🎉 All predictions loaded! Visit http://localhost:5173 to see the dashboard.")
    return True

if __name__ == "__main__":
    load_predictions()
