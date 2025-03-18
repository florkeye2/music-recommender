from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import spotify
import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent / ".env"  # Get absolute path
load_dotenv(dotenv_path=env_path)

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")
TOKEN_URL = "https://accounts.spotify.com/api/token"

app = FastAPI(title="Music Recommender Backend")

# CORS settings (allows requests from frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow frontend to call backend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

app.include_router(spotify.router, prefix="", tags=[""])