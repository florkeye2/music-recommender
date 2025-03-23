import pickle
import pandas as pd
from sklearn.neighbors import NearestNeighbors

# Load the model
with open("./model/knn_model.pkl", "rb") as f:
    knn = pickle.load(f)

# Load track IDs and tag features
track_ids = pd.read_csv("./model/track_ids.csv")
tag_features = pd.read_csv("./model/tag_features.csv")

def recommend_similar_tracks(track_id, num_recommendations=5):
    if track_id not in track_ids["id_spotify"].values:
        return None

    track_index = track_ids[track_ids["id_spotify"] == track_id].index[0]
    track_vector = pd.DataFrame(tag_features.iloc[track_index].values.reshape(1, -1), columns=tag_features.columns)

    # Find the nearest neighbors
    distances, indices = knn.kneighbors(track_vector, n_neighbors=num_recommendations + 1)  # +1 to exclude itself

    # Get recommended track IDs (excluding the first one, which is itself)
    recommended_ids = track_ids.iloc[indices[0][1:]]["id_spotify"]

    return recommended_ids
