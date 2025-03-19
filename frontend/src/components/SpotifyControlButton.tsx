import React from "react";

interface SpotifyControlButtonProps {
    icon: React.ReactNode | string; // icon or text
    accessToken: string;
    requestMethod: string;
    endpoint: string;  // API endpoint (e.g., 'next', 'previous', 'pause', etc.)
    setQueuedSongs: React.Dispatch<React.SetStateAction<any[]>>;
}

const SpotifyControlButton: React.FC<SpotifyControlButtonProps> = ({
    accessToken,
    requestMethod,
    endpoint,
    icon,
    setQueuedSongs
}) => {
    const handleClick = async () => {
        if (!accessToken) {
            console.error("No access token provided.");
            return;
        }

        try {
            const response = await fetch(
                `https://api.spotify.com/v1/me/player/${endpoint}`,
                {
                    method: requestMethod,
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 204) {
                console.log(`${endpoint} successful`);

                if (endpoint === "next") {
                    setQueuedSongs((prevQueue) => prevQueue.slice(1));
                }
            }
        } catch (error) {
            console.error(`Error performing ${endpoint}:`, error);
        }
    };

    return (
        <button
            onClick={handleClick}
            className="transition-all duration-300 bg-gray-800 hover:bg-gray-600 text-white active:text-gray-400 p-2 rounded text-lg"
        >
        <button onClick={handleClick} className="transition-all duration-300 bg-zinc-800 hover:bg-zinc-600 text-white active:text-zinc-400 p-2 rounded text-lg">
            {icon}
        </button>
    );
};

export default SpotifyControlButton;