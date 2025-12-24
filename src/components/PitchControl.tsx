import { Zap } from 'lucide-react';

interface PitchControlProps {
    pitch: number;
    setPitch: (pitch: number) => void;
}

export const PitchControl = ({ pitch, setPitch }: PitchControlProps) => {
    return (
        <div className="flex flex-col h-full justify-center px-6">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Zap className="w-4 h-4 text-orange-500 fill-current" />
                </div>
                <span className="font-bold text-slate-700">Pitch</span>
                <span className="ml-auto font-mono text-xs font-bold text-slate-400 bg-white/50 px-2 py-1 rounded-md min-w-[3rem] text-center">
                    {pitch > 0 ? `+${Math.round(pitch)}` : Math.round(pitch)}Hz
                </span>
            </div>

            <input
                type="range"
                min="-50"
                max="50"
                step="5"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200/50 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-400 transition-all"
            />
            <div className="flex justify-between mt-1 text-[10px] text-slate-400 font-medium px-1">
                <span>Low</span>
                <span>Normal</span>
                <span>High</span>
            </div>
        </div>
    );
}
