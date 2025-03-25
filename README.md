# music-recommender
Music Recommendation Explainability: https://karapostk.github.io/assets/pdf/afchar2022explainability.pdf

Interactive Music Genre Exploration with Visualization and Mood Control: https://dl.acm.org/doi/pdf/10.1145/3397481.3450700

Dataset: https://github.com/renesemela/lastfm-dataset-2020

# How to run on Windows
1. Run .\install-venv.bat
2. Run .\venv\Scripts\activate
3. Run pip install -r requirements.txt
4. Run npm install
5. Run .\run-backend.bat
6. Run .\run-frontend.bat

# Code Organization
Our project has a separate backend and frontend. Our backend uses Fast API and our frontend uses React and Typescript. The backend handles routes (defining endpoints for Spotify and authentication operations), the config, and the implementation of our model. The frontend uses typescript and tailwind to dynamically update what the user sees and processes the actions the user takes on the page. The frontend is where we immplement various features like search, queue, etc.

If you're having trouble using the Spotify API ask us for help and we will add you to our Spotify developers app. To use the app it requires us to give permissions through your Spotify account email and name.
