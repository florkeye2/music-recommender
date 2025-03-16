from fastapi import FastAPI
from backend.routes import main

app = FastAPI(title="Music Recommender Backend")

app.include_router(main.router, prefix="", tags=[""])