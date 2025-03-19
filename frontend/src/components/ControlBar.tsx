import React from "react";
import SpotifyControlButton from "./SpotifyControlButton";
import { IoIosPause, IoIosPlay, IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";

interface ControlBarProps {
    accessToken: string;
}

const ControlBar: React.FC<ControlBarProps> = ({ accessToken }) => {
    return (
        <div className="flex justify-center space-x-2">
            <SpotifyControlButton accessToken={accessToken} requestMethod="POST" endpoint="previous" icon={<IoIosSkipBackward />} />
            <SpotifyControlButton accessToken={accessToken} requestMethod="PUT" endpoint="pause" icon={<IoIosPause />} />
            <SpotifyControlButton accessToken={accessToken} requestMethod="PUT" endpoint="play" icon={<IoIosPlay />} />
            <SpotifyControlButton accessToken={accessToken} requestMethod="POST" endpoint="next" icon={<IoIosSkipForward />} />
        </div>
    );
};

export default ControlBar;