import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent / ".env"  # Get absolute path
load_dotenv(dotenv_path=env_path)

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")
TOKEN_URL = "https://accounts.spotify.com/api/token"
FRONTEND_URL = "http://localhost:5173"
SPOTIFY_API_URL = "https://api.spotify.com/v1"
LASTFM_KEY = os.getenv("LASTFM_KEY")
LASTFM_API_URL = "http://ws.audioscrobbler.com/2.0"