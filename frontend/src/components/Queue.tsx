import React from "react";
import { useEffect, useState } from "react";

interface QueueProps {
    accessToken: any;
}

interface Artist {
    name: string;
}

interface Album {
    images: { url: string; height: number; width: number }[];
}

interface QueueItem {
    name: string;
    artists: Artist[];
    album: Album;
}

const Queue: React.FC<QueueProps> = ({ accessToken }) => {
    const [queueData, setQueueData] = useState<QueueItem[]>([]);

    const fetchQueue = async () => {
        if (accessToken) {
            try {
                const response = await fetch(
                    `https://api.spotify.com/v1/me/player/queue`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!response.ok) {
                    console.error(`Error fetching queue`);
                }
                else {
                    const data = await response.json();
                    setQueueData(data.queue);
                }
            } catch (error) {
                console.error(`Error fetching queue: ${error}`);
            }
        }
    };

    useEffect(() => {
        fetchQueue();

        const interval = setInterval(fetchQueue, 1000); // Refresh every second
        return () => clearInterval(interval);
    }, [accessToken]);

    return (
        <div className="space-y-4 text-white flex flex-col h-[80vh]">
            <h2 className="text-xl font-bold">Your Queue</h2>

            {queueData.length === 0 ? (
                <p>No songs in queue.</p>
            ) : (
                <div className="flex-grow overflow-y-auto">
                    <ul className="space-y-2">
                        {queueData.map((track, index) => (
                            <li key={index} className="flex items-center space-x-4">
                                {/* Display Album Cover */}
                                {track.album.images.length > 0 && (
                                    <img
                                        src={track.album.images[0].url}
                                        alt={`Album cover for ${track.name}`}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                )}
                                <div className="flex-grow">
                                    <div>{track.name}</div>
                                    <div className="text-sm text-gray-400">
                                        {track.artists.map((artist, index) => (
                                            <span key={index}>
                                                {artist.name}
                                                {index < track.artists.length - 1 && ", "}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Queue;
