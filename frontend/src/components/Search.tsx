import { useState } from "react";

interface SearchProps {
    accessToken: string;
    addToQueue: (song: any) => void;
}

const Search: React.FC<SearchProps> = ({ accessToken, addToQueue }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);

    const searchSongs = async () => {
        try {
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                setResults(data.tracks.items);
            } else {
                console.error("Error searching songs:", await response.json());
            }
        } catch (error) {
            console.error(`Error in searchSongs():`, error);
        }
    };

    return (
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Search for a song..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-2 border border-zinc-700 rounded bg-zinc-800 text-white w-full"
            />
            <button
                onClick={searchSongs}
                className="p-2 bg-green-500 text-white rounded w-full"
            >
                Search
            </button>

            <ul className="space-y-2">
                {results.map((track) => (
                    <li key={track.id} className="flex justify-between items-center">
                        {track.name} by {track.artists[0].name}
                        <button
                            onClick={() => addToQueue(track.id)}
                            className="ml-4 p-1 bg-blue-500 text-white rounded"
                        >
                            Queue
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;