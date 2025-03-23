import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";

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
        <div className="flex flex-col space-y-2">
            <div className="flex w-full items-center space-x-2">
                <input
                    type="text"
                    placeholder="Search for a song..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-2 border border-zinc-700 rounded bg-zinc-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    onClick={searchSongs}
                    aria-label="Search"
                    className="p-2 border border-green-800 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded"
                >
                    <IoIosSearch className="text-2xl" />
                </button>
            </div>
            <ul className="space-y-2">
                {results.map((track) => (
                    <li key={track.id} className="flex justify-between items-center space-x-2">
                        <div className="space-x-1">
                            <span className="font-bold">"{track.name}"</span>
                            <span className="text-zinc-300">by</span>
                            <span className="font-bold">{track.artists[0].name}</span>
                        </div>
                        <button
                            onClick={() => addToQueue(track.id)}
                            className="cursor-pointer"
                        >
                            <IoIosAddCircleOutline className="text-3xl text-green-500" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;