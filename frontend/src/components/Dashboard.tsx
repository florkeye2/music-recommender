import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
    const [searchParams] = useSearchParams();
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");

    useEffect(() => {
        if (accessToken) {
            localStorage.setItem("spotify_access_token", accessToken);
            localStorage.setItem("spotify_refresh_token", refreshToken || "");
        }
    }, [accessToken, refreshToken]);

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            {accessToken ? <p>Logged in to Spotify!</p> : <p>Not logged in</p>}
        </div>
    );
};

export default Dashboard;