import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SpotifyControlButton from "./SpotifyControlButton";

const Dashboard = () => {
    const [searchParams] = useSearchParams();
    const accessToken = searchParams.get("access_token") || localStorage.getItem("access_token");
    const refreshToken = searchParams.get("refresh_token") || localStorage.getItem("refresh_token");

    useEffect(() => {
        if (accessToken) {
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken || "");
        }
    }, [accessToken, refreshToken]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white flex-col">
            {accessToken ? (
                <div>
                    <SpotifyControlButton accessToken={accessToken} requestMethod="POST" endpoint="previous" label="Prev" />
                    <SpotifyControlButton accessToken={accessToken} requestMethod="PUT" endpoint="pause" label="Pause" />
                    <SpotifyControlButton accessToken={accessToken} requestMethod="PUT" endpoint="play" label="Play" />
                    <SpotifyControlButton accessToken={accessToken} requestMethod="POST" endpoint="next" label="Next" />
                </div>
            ) : (
                <p>Not logged in</p>)
            }
        </div>
    );
};

export default Dashboard;