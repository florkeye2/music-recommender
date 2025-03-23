import React from "react";

interface ExplorationSliderProps {
    explorationValue: any;
    handleExplorationChange: any;
}

const ExplorationSlider: React.FC<ExplorationSliderProps> = ({ explorationValue, handleExplorationChange }) => {
    return (
        <div className="flex flex-col text-xl font-bold space-y-2">
            <h1>How much exploration would you like?</h1>
            <input
                type="range"
                min="0"
                max="100"
                value={explorationValue}
                onChange={handleExplorationChange}
                className="cursor-pointer accent-zinc-300 w-full"
            />
        </div>
    );
};

export default ExplorationSlider;
