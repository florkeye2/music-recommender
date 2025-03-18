import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
    const [searchParams] = useSearchParams();
    const accessToken = searchParams.get("access_token") || localStorage.getItem("spotify_access_token");
    const refreshToken = searchParams.get("refresh_token") || localStorage.getItem("spotify_refresh_token");

    useEffect(() => {
        if (accessToken) {
            localStorage.setItem("spotify_access_token", accessToken);
            localStorage.setItem("spotify_refresh_token", refreshToken || "");
        }
    }, [accessToken, refreshToken]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white flex-col">
            <div className="p-4 bg-green-500 text-white py-2 rounded-lg font-semibold">
                <h1>Welcome to the Dashboard</h1>
            </div>
            {accessToken ? <p>Logged in to Spotify!</p> : <p>Not logged in</p>}
        </div>
    );
};

export default Dashboard;