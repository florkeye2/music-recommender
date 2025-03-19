import React from "react";
import SpotifyControlButton from "./SpotifyControlButton";
import { IoIosPause, IoIosPlay, IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";

interface ControlBarProps {
    accessToken: string;
    setQueuedSongs: React.Dispatch<React.SetStateAction<any[]>>;
}

const ControlBar: React.FC<ControlBarProps> = ({ accessToken, setQueuedSongs }) => (
    <div className="flex justify-center space-x-2">
        <SpotifyControlButton accessToken={accessToken} requestMethod="POST" endpoint="previous" icon={<IoIosSkipBackward />} setQueuedSongs={setQueuedSongs} />
        <SpotifyControlButton accessToken={accessToken} requestMethod="PUT" endpoint="pause" icon={<IoIosPause />} setQueuedSongs={setQueuedSongs} />
        <SpotifyControlButton accessToken={accessToken} requestMethod="PUT" endpoint="play" icon={<IoIosPlay />} setQueuedSongs={setQueuedSongs} />
        <SpotifyControlButton accessToken={accessToken} requestMethod="POST" endpoint="next" icon={<IoIosSkipForward />} setQueuedSongs={setQueuedSongs} />
    </div>
);

export default ControlBar;
