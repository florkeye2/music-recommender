import { useEffect, useState } from "react";
import axios from "axios";

const Recommendations: React.FC<{ accessToken: string }> = ({ accessToken }) => {
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const fetchRecommendations = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:3001/recommend?access_token=${accessToken}`
            );
            console.log("Recommendations Response:", response.data);
            setRecommendations(response.data.recommendations);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            setError("Failed to fetch recommendations.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, [accessToken]);

    return (
        <div className="p-4 bg-gray-900 text-white rounded-lg w-full">
            <h2 className="text-xl font-bold mb-4">Song Recommendations</h2>
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
                            <li key={index} className="p-2 bg-gray-800 rounded-lg">
                                <p className="text-lg font-semibold">{rec.name}</p>
                                <p className="text-sm">{rec.artist}</p>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default Recommendations;