import { useState } from "react";

function RegisterPage() {
    const [clientId] = useState(import.meta.env.VITE_SPOTIFY_CLIENT_ID);
    const REDIRECT_URI = "http://localhost:5173/callback";
    const SCOPES = [
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing"
    ];

    const handleRegister = () => {
        const authUrl = `https://accounts.spotify.com/authorize` +
            `?client_id=${clientId}` +
            `&response_type=code` +
            `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
            `&scope=${encodeURIComponent(SCOPES.join(" "))}`;

        window.location.href = authUrl;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Register with Spotify</h1>

                <button
                    onClick={handleRegister}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold"
                >
                    Register with Spotify
                </button>

                <p className="text-center mt-4 text-sm">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-400 hover:underline">Login here</a>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;