import { Play, Pause } from 'lucide-react';
import { useRef, useMemo } from 'react';
import { clsx } from 'clsx';

interface WaveformPlayerProps {
    isPlaying: boolean;
    isLoading: boolean;
    currentTime: number;
    duration: number;
    onTogglePlay: () => void;
    onSeek: (time: number) => void;
}

export const WaveformPlayer = ({
    isPlaying,
    isLoading,
    currentTime,
    duration,
    onTogglePlay,
    onSeek
}: WaveformPlayerProps) => {
    const progressBarRef = useRef<HTMLDivElement>(null);

    // Generate a static "waveform" pattern that looks natural
    const bars = useMemo(() => {
        // A pattern that mimics speech (quiet start, peaks, pauses, peaks)
        const pattern = [
            0.2, 0.3, 0.5, 0.4, 0.3, 0.6, 0.8, 0.9, 0.6, 0.4,
            0.3, 0.5, 0.8, 0.9, 0.7, 0.5, 0.3, 0.2, 0.4, 0.6,
            0.8, 0.7, 0.5, 0.3, 0.4, 0.6, 0.8, 0.9, 0.6, 0.4,
            0.3, 0.2, 0.5, 0.7, 0.8, 0.6, 0.4, 0.3, 0.2
        ];
        return pattern;
    }, []);

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressBarRef.current || duration === 0) return;

        const rect = progressBarRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const percentage = Math.min(Math.max(x / width, 0), 1);

        onSeek(percentage * duration);
    };

    const progressPercent = duration > 0 ? (currentTime / duration) : 0;

    return (
        <div className="bg-[#E0E7FF] p-2 rounded-full flex items-center gap-4 h-24 shadow-lg w-full relative overflow-hidden group hover:shadow-xl transition-shadow select-none">
            {/* Play Button */}
            <button
                onClick={onTogglePlay}
                disabled={isLoading}
                className="w-20 h-20 bg-[#6366f1] hover:bg-[#585ce0] rounded-full flex items-center justify-center text-white shadow-xl transition-all hover:scale-105 active:scale-95 shrink-0 ml-1 z-10"
            >
                {isLoading ? (
                    <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isPlaying ? (
                    <Pause className="w-10 h-10 fill-current" />
                ) : (
                    <Play className="w-10 h-10 fill-current ml-2" />
                )}
            </button>

            <div className="flex flex-col z-10 justify-center h-full flex-1 min-w-0 pr-6">
                <span className="font-bold text-slate-900 text-base mb-1 ml-1 truncate">Read in Human Voice</span>

                {/* Interactive Waveform Container */}
                <div
                    ref={progressBarRef}
                    className="h-10 flex items-center gap-[3px] ml-1 cursor-pointer relative py-2"
                    onClick={handleSeek}
                >
                    {/* Render visual bars */}
                    {bars.map((height, i) => {
                        // Determine if this bar is "past" or "future" based on time
                        const barPos = i / bars.length;
                        const isActive = barPos <= progressPercent;

                        return (
                            <div
                                key={i}
                                className={clsx(
                                    "w-1.5 rounded-full transition-colors duration-100",
                                    isActive ? "bg-[#6366f1]" : "bg-[#6366f1]/20"
                                )}
                                style={{
                                    height: `${height * 100}%`,
                                    // Make active bars slightly animate 'breathing' if playing? 
                                    // Maybe too distracting, let's keep it clean as requested.
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
