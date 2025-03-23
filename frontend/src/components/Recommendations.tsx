import { useEffect, useState } from "react";
import axios from "axios";

const TopTracks: React.FC<{ accessToken: string }> = ({ accessToken }) => {
    const [topTracks, setTopTracks] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchTopTracks = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3001/top-tracks?access_token=${accessToken}`);
            console.log("Top Tracks Response:", response.data);  // Check the structure
            setTopTracks(response.data.top_tracks);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching top tracks:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (accessToken) {
            fetchTopTracks();
        }
    }, [accessToken]);

    return (
        <div className="p-4 bg-gray-900 text-white rounded-lg w-full">
            <h2 className="text-xl font-bold mb-4">Top Tracks</h2>
            {loading ? (
                <p>Loading top tracks...</p>
            ) : (
                <ul className="space-y-4">
                    {topTracks.length === 0 ? (
                        <p>No top tracks found.</p>
                    ) : (
                        topTracks.map((track, index) => (
                            <li key={index} className="p-2 bg-gray-800 rounded-lg">
                                <p className="text-lg font-semibold">{track}</p>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default TopTracks;
