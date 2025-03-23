import pickle
import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer
import requests
import difflib
from backend.config import LASTFM_KEY, LASTFM_API_URL
import numpy as np

# Load the model
with open("./model/knn_model.pkl", "rb") as f:
    knn = pickle.load(f)

# Load track IDs and tag features
track_ids = pd.read_csv("./model/track_ids.csv")
tag_features = pd.read_csv("./model/tag_features.csv")
valid_tags = tag_features.columns

mlb = MultiLabelBinarizer(classes=list(tag_features))

def get_lastfm_tags(track_name: str, artist_name: str):
    # Normalize and prepare track/artist names by trimming and converting to lowercase
    track_name = track_name.strip().lower()
    artist_name = artist_name.strip().lower()

    params = {
        "method": "track.gettoptags",
        "track": track_name,
        "artist": artist_name,
        "autocorrect": "1",
        "api_key": LASTFM_KEY,
        "format": "json"
    }

    response = requests.get(LASTFM_API_URL, params=params)

    if response.status_code != 200:
        raise Exception(f"Error fetching tags from LastFM: {response.status_code}")
    
    data = response.json()
    
    if "toptags" not in data or "tag" not in data["toptags"]:
        # If no exact match is found, try fuzzy matching by comparing track names
        return fuzzy_search_lastfm(track_name, artist_name)

    # Return the list of tags if found
    return mlb.fit_transform([[tag["name"] for tag in data["toptags"]["tag"]]])

def fuzzy_search_lastfm(track_name: str, artist_name: str):
    # Perform a fuzzy search to find the closest match to the artist and track name
    # Search for the artist first
    artist_search_params = {
        "method": "artist.search",
        "artist": artist_name,
        "api_key": LASTFM_KEY,
        "format": "json"
    }
    artist_response = requests.get(LASTFM_API_URL, params=artist_search_params)

    if artist_response.status_code != 200:
        raise Exception(f"Error searching artist on LastFM: {artist_response.status_code}")

    artist_data = artist_response.json()
    if "results" in artist_data and "artistmatches" in artist_data["results"]:
        artist_matches = artist_data["results"]["artistmatches"]["artist"]
        
        # Fuzzy match on artist names
        best_artist_match = difflib.get_close_matches(artist_name, [artist["name"].lower() for artist in artist_matches], n=1, cutoff=0.6)
        
        if best_artist_match:
            artist_name = best_artist_match[0]  # Use the closest match from fuzzy search

    # Now perform the track search with the refined artist name
    track_search_params = {
        "method": "track.search",
        "track": track_name,
        "artist": artist_name,
        "api_key": LASTFM_KEY,
        "format": "json"
    }
    track_response = requests.get(LASTFM_API_URL, params=track_search_params)

    if track_response.status_code != 200:
        raise Exception(f"Error searching track on LastFM: {track_response.status_code}")

    track_data = track_response.json()
    if "results" in track_data and "trackmatches" in track_data["results"]:
        track_matches = track_data["results"]["trackmatches"]["track"]
        
        # Fuzzy match on track names
        best_track_match = difflib.get_close_matches(track_name, [track["name"].lower() for track in track_matches], n=1, cutoff=0.6)
        
        if best_track_match:
            track_name = best_track_match[0]  # Use the closest match from fuzzy search

    # Try again to get top tags for the best match found
    return get_lastfm_tags(track_name, artist_name)

def recommend_similar_tracks(track_data, num_recommendations=5, explorationValue=0):
    if track_data["id"] not in track_ids["id_spotify"].values:
        track_vector = pd.DataFrame(get_lastfm_tags(track_data["track_name"], track_data["artist_name"]), columns=tag_features.columns)
    else:
        track_index = track_ids[track_ids["id_spotify"] == track_data["id"]].index[0]
        track_vector = pd.DataFrame(tag_features.iloc[track_index].values.reshape(1, -1), columns=tag_features.columns)

    max_neighbors = min(len(track_ids), num_recommendations + int((explorationValue / 100) * 50))
    distances, indices = knn.kneighbors(track_vector, n_neighbors=max_neighbors + 1)

    candidate_ids = track_ids.iloc[indices[0][1:]]["id_spotify"]
    
    if explorationValue == 0:
        recommended_ids = candidate_ids[:num_recommendations]  # Pick closest tracks
    else:
        num_diverse = int((explorationValue / 100) * len(candidate_ids))  # Control randomness level
        recommended_ids = np.random.choice(candidate_ids[:num_diverse], num_recommendations, replace=False)

    return recommended_ids
