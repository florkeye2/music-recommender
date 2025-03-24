import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "./Header";
import CurrentSong from "./CurrentSong";
import ControlBar from "./ControlBar";
import Search from "./Search";
import Queue from "./Queue";
import Timestamp from "./Timestamp";
import Recommendations from "./Recommendations"; // Import Recommendations component
import ExplorationSlider from "./ExplorationSlider";

const VERSION = 'B';

const Dashboard: React.FC = () => {
    const [searchParams] = useSearchParams();
    const accessToken = searchParams.get("access_token") || localStorage.getItem("access_token");
    const refreshToken = searchParams.get("refresh_token") || localStorage.getItem("refresh_token");
    const [playerData, setPlayerData] = useState<any>(null);
    const [explorationValue, setExplorationValue] = useState(0);

    // Store access token and refresh token in localStorage
    useEffect(() => {
        if (accessToken) {
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken || "");
        }
    }, [accessToken, refreshToken]);

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
            }
        } catch (error) {
            console.error(`Error getting player data:`, error);
        }
    };

    // Add a song to the queue
    const addToQueue = async (id: any) => {
        try {
            const response = await fetch(
                `https://api.spotify.com/v1/me/player/queue?uri=spotify:track:${id}`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                console.error(`Error queuing song: ${id}`);
            }
        } catch (error) {
            console.error(`Error adding song to queue: ${error}`);
        }
    };

    const handleExplorationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExplorationValue(Number(event.target.value));
    };

    // Automatically refresh player data every second
    useEffect(() => {
        if (accessToken) {
            fetchPlayerData();
        }

        const interval = setInterval(fetchPlayerData, 1000); // Refresh every second
        return () => clearInterval(interval);
    }, [accessToken]);

    return (
        <div className="bg-zinc-900 text-white w-full h-screen justify-center items-center">
            <Header />
            {accessToken ? (
                <>
                    {playerData ? (
                        <>
                            <div className="flex flex-col items-center w-full h-[88vh] p-4 pb-16">
                                <div className="flex justify-evenly w-full space-x-4">
                                    <Search accessToken={accessToken} addToQueue={addToQueue} />
                                    <CurrentSong songData={playerData.item} />
                                    <div className="flex flex-col space-y-4">
                                        <Recommendations songData={playerData.item} explorationValue={explorationValue} accessToken={accessToken} addToQueue={addToQueue} />
                                        {VERSION == 'B' ? (
                                            <ExplorationSlider explorationValue={explorationValue} handleExplorationChange={handleExplorationChange} />
                                        ) : null}
                                    </div>
                                    <Queue accessToken={accessToken} />
                                </div>
                                <div className="fixed flex flex-col bottom-0 w-full bg-zinc-950 h-[12vh] justify-center">
                                    <div className="flex flex-col justify-center items-center space-y-2">
                                        <ControlBar accessToken={accessToken} />
                                        <div className="w-full max-w-md">
                                            <Timestamp playerData={playerData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>No active Spotify player. Try opening Spotify and playing a song.</p>
                    )}
                </>
            ) : (
                <div className="flex flex-col justify-center items-center">
                    <p>Not logged in</p>
                    <a className="text-blue-500 cursor-pointer" href="http://localhost:5173/login">Click here to try logging in again.</a>
                </div>
            )}
        </div>
    );
};

export default Dashboard;