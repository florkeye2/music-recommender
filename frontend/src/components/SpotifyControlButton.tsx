import React from "react";

interface SpotifyControlButtonProps {
  accessToken: string;
  requestMethod: string;
  endpoint: string;  // API endpoint (e.g., 'next', 'previous', 'pause', etc.)
  label: string;     // Button text or emoji
}

const SpotifyControlButton: React.FC<SpotifyControlButtonProps> = ({ accessToken, requestMethod, endpoint, label }) => {
  const handleClick = async () => {
    if (!accessToken) {
      console.error("No access token provided.");
      return;
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/${endpoint}`, {
        method: requestMethod,
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      
      if (response.status == 204) {
        console.error(`${endpoint} successful`);
      }
    } catch (error) {
      console.error(`Error performing ${endpoint}:`, error);
    }
  };

  return (
    <button onClick={handleClick} className="bg-green-500 text-white p-2 ml-2 rounded">
      {label}
    </button>
  );
};

export default SpotifyControlButton;