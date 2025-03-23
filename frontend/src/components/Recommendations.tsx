import { useEffect, useState } from "react";
import axios from "axios";

interface RecommendationsProps {
    songData: any;
    explorationValue: any;
    accessToken: any;
    addToQueue: any;
}

const Recommendations: React.FC<RecommendationsProps> = ({ songData, explorationValue, accessToken, addToQueue }) => {
    const [lastSongId, setLastSongId] = useState<string>("");
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const fetchRecommendations = async () => {
        if (lastSongId != songData.id) {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:3001/recommend?id=${songData.id}&track_name=${songData.name}&artist_name=${songData.artists[0].name}&explorationValue=${explorationValue}&access_token=${accessToken}`
                );
                console.log("Recommendations Response:", response.data);
                setRecommendations(response.data.recommendations);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching recommendations:", error);
                setError("Failed to fetch recommendations.");
                setLoading(false);
            }
            setLastSongId(songData.id);
        }
    };

    useEffect(() => {
        if (accessToken) {
            fetchRecommendations();
        }
    }, [accessToken, songData.id]);

    return (
        <div className="text-white rounded-lg space-y-4">
            <h2 className="text-xl font-bold">Song Recommendations</h2>
            {loading ? (
                <p>Loading recommendations...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <ul className="space-y-4">
                    {recommendations.length === 0 ? (
                        <p>No recommendations found.</p>
                    ) : (
                        recommendations.map((rec, index) => (
                            <li key={index} className="p-2 bg-zinc-800 rounded-lg">
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <p className="text-lg font-semibold">{rec.name}</p>
                                        <p className="text-sm">{rec.artist}</p>
                                    </div>
                                    <button
                                        onClick={() => addToQueue(rec.id)}
                                        className="ml-4 p-1 bg-blue-500 text-white rounded"
                                    >
                                        Queue
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default Recommendations;