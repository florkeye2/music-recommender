import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CurrentSong from "./CurrentSong";
import ControlBar from "./ControlBar"

const Dashboard: React.FC = () => {
    const [searchParams] = useSearchParams();
    const accessToken = searchParams.get("access_token") || localStorage.getItem("access_token");
    const refreshToken = searchParams.get("refresh_token") || localStorage.getItem("refresh_token");
    const [playerData, setPlayerData] = useState<any>(null);

    useEffect(() => {
        if (accessToken) {
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken || "");
        }
    }, [accessToken, refreshToken]);

    const fetchPlayerData = async () => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/player`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status == 200) {
                const data = await response.json();
                setPlayerData(data)
            }
        } catch (error) {
            console.error(`Error getting player data:`, error);
        }
    };

    useEffect(() => {
        fetchPlayerData();
        const interval = setInterval(fetchPlayerData, 1000); // Refresh every second
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white flex-col">
            {accessToken ? (
                <div>
                    {playerData ? (
                        <div className="flex-col space-y-2">
                            <CurrentSong songData={playerData.item} />
                            <ControlBar accessToken={accessToken}/>
                        </div>
                    ) : (<p>No active Spotify player.</p>)
                    }
                </div>
            ) : (<p>Not logged in</p>)
            }
        </div>
    );
};

export default Dashboard;