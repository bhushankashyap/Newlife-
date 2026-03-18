import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume1 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const PlaybackControls = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => usePlayerStore.setState({ isPlaying: false });

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  const handleSeek = (value: number[]) => {
    if (audioRef.current) audioRef.current.currentTime = value[0];
  };

  const iconBtn = (onClick: () => void, icon: React.ReactNode, disabled?: boolean, active?: boolean) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-lg transition-all disabled:opacity-30 ${
        active
          ? "text-violet-400 hover:text-violet-300"
          : "text-gray-500 hover:text-white hover:bg-white/5"
      }`}
    >
      {icon}
    </button>
  );

  return (
    <footer className="h-20 sm:h-24 bg-[#0a0a18] border-t border-white/5 px-4">
      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto gap-4">
        {/* Now playing */}
        <div className="hidden sm:flex items-center gap-3 min-w-[180px] w-[28%]">
          {currentSong && (
            <>
              <div className="relative flex-shrink-0">
                <img
                  src={currentSong.imageUrl}
                  alt={currentSong.title}
                  className="w-12 h-12 object-cover rounded-xl ring-1 ring-white/10"
                />
                {isPlaying && (
                  <div className="absolute inset-0 rounded-xl ring-2 ring-violet-500/40 animate-pulse" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-semibold truncate">{currentSong.title}</div>
                <div className="text-gray-500 text-xs truncate">{currentSong.artist}</div>
              </div>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-[45%]">
          <div className="flex items-center gap-1">
            {iconBtn(() => {}, <Shuffle className="size-4" />, false)}
            {iconBtn(playPrevious, <SkipBack className="size-4" />, !currentSong)}
            <button
              onClick={togglePlay}
              disabled={!currentSong}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30 shadow-lg ${
                isPlaying
                  ? "bg-white text-black hover:bg-gray-100 shadow-white/10"
                  : "bg-gradient-to-br from-violet-500 to-cyan-500 text-white hover:from-violet-400 hover:to-cyan-400 shadow-violet-500/30"
              }`}
            >
              {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
            </button>
            {iconBtn(playNext, <SkipForward className="size-4" />, !currentSong)}
            {iconBtn(() => {}, <Repeat className="size-4" />, false)}
          </div>

          <div className="hidden sm:flex items-center gap-2 w-full">
            <span className="text-xs text-gray-600 w-8 text-right">{formatTime(currentTime)}</span>
            <div className="flex-1">
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                className="w-full hover:cursor-grab active:cursor-grabbing"
                onValueChange={handleSeek}
              />
            </div>
            <span className="text-xs text-gray-600 w-8">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden sm:flex items-center gap-2 min-w-[180px] w-[28%] justify-end">
          {iconBtn(() => {}, <Mic2 className="size-4" />)}
          {iconBtn(() => {}, <ListMusic className="size-4" />)}
          {iconBtn(() => {}, <Laptop2 className="size-4" />)}
          <div className="flex items-center gap-2">
            {iconBtn(() => {}, <Volume1 className="size-4" />)}
            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-24 hover:cursor-grab active:cursor-grabbing"
              onValueChange={(value) => {
                setVolume(value[0]);
                if (audioRef.current) audioRef.current.volume = value[0] / 100;
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
