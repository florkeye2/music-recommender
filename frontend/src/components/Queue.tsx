import React from "react";

interface QueueProps {
    queuedSongs: any[];
}

const Queue: React.FC<QueueProps> = ({ queuedSongs }) => (
    <div className="space-y-4 w-full max-w-md">
        <h2 className="text-xl font-bold">Your Queue</h2>
        
        {queuedSongs.length === 0 ? (
            <p>No songs in queue.</p>
        ) : (
            <ul className="space-y-2">
                {queuedSongs.map((song, index) => (
                    <li key={index} className="flex justify-between items-center">
                        {song.name} by {song.artists[0].name}
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default Queue;
