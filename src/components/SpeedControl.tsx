import { clsx } from "clsx";

interface SpeedControlProps {
    speed: number;
    setSpeed: (rate: number) => void;
}

export const SpeedControl = ({ speed, setSpeed }: SpeedControlProps) => {
    return (
        <div className="flex flex-col justify-center h-full px-6 py-2 relative">
            <h3 className="text-sm font-bold text-emerald-900 mb-5 text-center z-10 tracking-wide">Speaking Pace</h3>

            <div className="flex items-center gap-3 z-10 px-1">
                <span className="text-2xl filter grayscale-[0.2]" title="Slow">🐌</span>

                {/* Track */}
                <div className="flex-1 relative h-2.5 bg-white/50 rounded-full mx-2">
                    {/* Purple Progress Bar */}
                    <div
                        className="absolute top-0 left-0 bottom-0 bg-[#6366f1] rounded-full"
                        style={{ width: `${((speed + 0.5) / 1) * 100}%` }}
                    />
                    <input
                        type="range"
                        min="-0.5"
                        max="0.5"
                        step="0.1"
                        value={speed}
                        onChange={(e) => setSpeed(parseFloat(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    {/* Purple Thumb with White Border */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-[#6366f1] rounded-full shadow-sm border-[3px] border-white pointer-events-none transition-all z-10"
                        style={{ left: `calc(${((speed + 0.5) / 1) * 100}% - 12px)` }}
                    />
                </div>

                <span className="text-2xl" title="Fast">🐆</span>
            </div>
        </div>
    );
};
