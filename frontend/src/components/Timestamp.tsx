interface TimestampProps {
    playerData: any;
}
const Timestamp: React.FC<TimestampProps> = ({ playerData }) => {
    const progressPercent = (playerData && playerData.item && playerData.item.duration_ms != 0)
        ? (playerData.progress_ms / playerData.item.duration_ms) * 100
        : 0;

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="w-full">
            <div className="relative h-2 bg-zinc-600 rounded-full">
                <div
                    className="h-2 bg-zinc-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                ></div>
            </div>
            <div className="flex justify-between text-sm text-zinc-600 mt-1">
                <span>{formatTime(playerData.progress_ms)}</span>
                <span>{formatTime(playerData.item.duration_ms)}</span>
            </div>
        </div>
    )
}

export default Timestamp;