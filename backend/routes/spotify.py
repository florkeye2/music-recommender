from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import RedirectResponse
import requests
import base64
from backend.config import SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, REDIRECT_URI, FRONTEND_URL, TOKEN_URL, SPOTIFY_API_URL
from backend.recommendation import recommend_similar_tracks

router = APIRouter()

@router.get("/login")
def login():
    auth_url = (
        "https://accounts.spotify.com/authorize"
        f"?client_id={SPOTIFY_CLIENT_ID}"
        "&response_type=code"
        f"&redirect_uri={REDIRECT_URI}"
        "&scope=user-read-private user-read-email streaming user-modify-playback-state user-read-playback-state user-top-read"
    )
    return RedirectResponse(auth_url)

@router.get("/callback")
async def callback(request: Request):
    code = request.query_params.get("code")
    if not code:
        raise HTTPException(status_code=400, detail="Authorization code not found")

    # Exchange code for access & refresh tokens
    auth_header = base64.b64encode(f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode()).decode()
    headers = {
        "Authorization": f"Basic {auth_header}",
        "Content-Type": "application/x-www-form-urlencoded",
    }
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
    }
    
    response = requests.post(TOKEN_URL, headers=headers, data=data)
    token_json = response.json()

    if "access_token" not in token_json:
        raise HTTPException(status_code=400, detail="Failed to get access token")

    access_token = token_json["access_token"]
    refresh_token = token_json["refresh_token"]

    # Store tokens in a session (you can use a database instead)
    redirect_url = f"{FRONTEND_URL}/dashboard?access_token={access_token}&refresh_token={refresh_token}"
    
    return RedirectResponse(redirect_url)

@router.get("/top-tracks")
def get_top_tracks(access_token: str):
    headers = {"Authorization": f"Bearer {access_token}"}
    
    response = requests.get(f"{SPOTIFY_API_URL}/me/top/tracks?limit=10", headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to fetch top tracks")

    top_tracks = response.json().get("items", [])
    track_ids = [track["id"] for track in top_tracks]

    return {"top_tracks": track_ids}

def get_top_tracks_from_spotify(access_token: str):
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(f"{SPOTIFY_API_URL}/me/top/tracks?limit=10", headers=headers)
    
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to fetch top tracks")

    top_tracks = response.json().get("items", [])
    track_names = [track["name"] for track in top_tracks]

    return track_names

@router.get("/recommend")
async def recommend_songs(id: str, track_name: str, artist_name: str, explorationValue: int, access_token: str):
    try:
        track_data = {"id": id, "track_name" : track_name, "artist_name" : artist_name}
        recommendation_ids = recommend_similar_tracks(track_data, 5, explorationValue).tolist()

        if not recommendation_ids:
            raise HTTPException(status_code=404, detail="No recommendations found.")

        track_details = []
        headers = {"Authorization": f"Bearer {access_token}"}

        for track_id in recommendation_ids:
            track_response = requests.get(f"{SPOTIFY_API_URL}/tracks/{track_id}", headers=headers)
            if track_response.status_code != 200:
                raise HTTPException(status_code=track_response.status_code, detail="Failed to fetch track details")

            track_data = track_response.json()
            track_name = track_data["name"]
            artist_name = track_data["artists"][0]["name"]

            track_details.append({"name": track_name, "artist": artist_name, "id": track_id})

        return {"recommendations": track_details}

    except Exception as e:
        print(f"Error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")