import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CurrentSong from "./CurrentSong";
import ControlBar from "./ControlBar";
import Search from "./Search";
import Queue from "./Queue";
import Timestamp from "./Timestamp";

const Dashboard: React.FC = () => {
    const [searchParams] = useSearchParams();
    const accessToken = searchParams.get("access_token") || localStorage.getItem("access_token");
    const refreshToken = searchParams.get("refresh_token") || localStorage.getItem("refresh_token");
    const [playerData, setPlayerData] = useState<any>(null);
    const [queuedSongs, setQueuedSongs] = useState<any[]>([]);

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

            if (response.status === 200) {
                const data = await response.json();
                setPlayerData(data);
            }
        } catch (error) {
            console.error(`Error getting player data:`, error);
        }
    };

    const addToQueue = async (song: any) => {
        setQueuedSongs([...queuedSongs, song]);

        try {
            const response = await fetch(
                `https://api.spotify.com/v1/me/player/queue?uri=spotify:track:${song.id}`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                console.error(`Error queuing song: ${song.name}`);
            }
        } catch (error) {
            console.error(`Error adding song to queue: ${error}`);
        }
    };

    useEffect(() => {
        fetchPlayerData();
        const interval = setInterval(fetchPlayerData, 1000); // Refresh every second
        return () => clearInterval(interval);
    }, [accessToken]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white space-y-4 p-4">
            <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
                {accessToken ? (
                    <>
                        <Search accessToken={accessToken} addToQueue={addToQueue} />
                        {playerData ? (
                            <div className="flex-col space-y-2 w-full max-w-md">
                                <CurrentSong songData={playerData.item} />
                                <ControlBar accessToken={accessToken} setQueuedSongs={setQueuedSongs} />
                                <div className="flex fixed bottom-0 left-0 w-full bg-zinc-950 justify-center items-center">
                                    <div className="relative w-[50%] space-y-4 m-2">
                                        <Timestamp playerData={playerData} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>No active Spotify player.</p>
                        )}
                        <Queue queuedSongs={queuedSongs} />
                    </>
                ) : (
                    <p>Not logged in</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
