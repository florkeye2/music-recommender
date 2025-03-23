import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import CurrentSong from "./CurrentSong";
import ControlBar from "./ControlBar";
import Search from "./Search";
import Queue from "./Queue";
import Timestamp from "./Timestamp";
import Recommendations from "./Recommendations"; // Import Recommendations component

const Dashboard: React.FC = () => {
    const [searchParams] = useSearchParams();
    const accessToken = searchParams.get("access_token") || localStorage.getItem("access_token");
    const refreshToken = searchParams.get("refresh_token") || localStorage.getItem("refresh_token");
    const [playerData, setPlayerData] = useState<any>(null);
    const [queuedSongs, setQueuedSongs] = useState<any[]>([]);
    const [currentSongId, setCurrentSongId] = useState<string | null>(null);

    const [topTracks, setTopTracks] = useState<any[]>([]); // Track top tracks

    // Store access token and refresh token in localStorage
    useEffect(() => {
        if (accessToken) {
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken || "");
        }
    }, [accessToken, refreshToken]);

    // Fetch the top tracks for the current user from Spotify API
    const fetchTopTracks = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3001/top-tracks?access_token=${accessToken}`);
            console.log("Top Tracks Response:", response.data);  // Check the structure
            setTopTracks(response.data.top_tracks);
        } catch (error) {
            console.error("Error fetching top tracks:", error);
        }
    };

    // Fetch player data to get the current playing song
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

                // Track the current playing song
                const nowPlayingId = data.item?.id;
                if (nowPlayingId && nowPlayingId !== currentSongId) {
                    setCurrentSongId(nowPlayingId);

                    // Remove the current song from the queue
                    setQueuedSongs((prevQueue) =>
                        prevQueue.filter((song) => song.id !== nowPlayingId)
                    );
                }
            }
        } catch (error) {
            console.error(`Error getting player data:`, error);
        }
    };

    // Add a song to the queue
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

    // Automatically refresh player data every second
    useEffect(() => {
        if (accessToken) {
            fetchTopTracks();  // Fetch top tracks when access token is available
            fetchPlayerData();  // Fetch player data
        }

        const interval = setInterval(fetchPlayerData, 1000); // Refresh every second
        return () => clearInterval(interval);
    }, [accessToken, currentSongId]);

    return (
        <div className="min-h-screen bg-zinc-900 text-white flex flex-row items-start p-4">
            {accessToken ? (
                <>
                    <div className="flex-1 mr-8">
                        <Search accessToken={accessToken} addToQueue={addToQueue} />
                    </div>
                    <div className="flex-grow max-w-md">
                        {playerData ? (
                            <div className="flex-col space-y-2">
                                <CurrentSong songData={playerData.item} />
                                <div className="fixed bottom-0 left-0 w-full bg-zinc-950">
                                    <div className="flex flex-col justify-center items-center p-4 space-y-2">
                                        <ControlBar accessToken={accessToken} setQueuedSongs={setQueuedSongs} />
                                        <div className="relative w-full max-w-md">
                                            <Timestamp playerData={playerData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>No active Spotify player.</p>
                        )}
                    </div>
                    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-4">
                        {/* Pass top tracks to Recommendations component */}
                        {accessToken && topTracks.length > 0 ? (
                            <Recommendations accessToken={accessToken} topTracks={topTracks} />
                        ) : (
                            <p>Please log in to get recommendations.</p>
                        )}
                    </div>
                    <div className="flex-1 ml-8">
                        <Queue queuedSongs={queuedSongs} />
                    </div>
                </>
            ) : (
                <p>Not logged in</p>
            )}
        </div>
    );
};

export default Dashboard;
