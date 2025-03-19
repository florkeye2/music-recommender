interface CurrentSongProps {
    songData: any;
}

const CurrentSong: React.FC<CurrentSongProps> = ({ songData }) => {
    return (
        <div className="">
            {songData ? (
                <div className="flex-col items-center space-y-2">
                    <img src={songData.album.images[0].url} alt="Album cover" className="w-100 h-100 rounded-xl border-4 border-gray-800" />
                    <div>
                        <p className="text-lg font-bold">{songData.name}</p>
                        <p className="text-gray-600">{songData.artists.map((artist: any) => artist.name).join(", ")}</p>
                    </div>
                </div>
            ) : (
                <p>No song playing</p>
            )}
        </div>
    );
};

export default CurrentSong;