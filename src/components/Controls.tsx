import { Play, Pause, Square, Settings2, Download } from 'lucide-react';
import { useState } from 'react';

// Extended Voice Interface to handle Server voices
export interface VoiceOption {
    name: string;
    lang: string;
    source: 'browser' | 'server' | 'preset';
    id: string; // unique identifier (uri for browser, shortName for server)
    // Optional preset properties
    baseVoiceId?: string;
    pitch?: number;
    rate?: number;
    category?: string;
}

interface ControlsProps {
    isPlaying: boolean;
    onPlayPause: () => void;
    onStop: () => void;
    voices: VoiceOption[];
    selectedVoice: VoiceOption | null;
    onVoiceChange: (voice: VoiceOption) => void;
    rate: number;
    onRateChange: (rate: number) => void;
    pitch: number;
    onPitchChange: (pitch: number) => void;
    onDownload: () => void;
    isLoading?: boolean;
}

export const Controls = ({
    isPlaying,
    onPlayPause,
    onStop,
    voices,
    selectedVoice,
    onVoiceChange,
    rate,
    onRateChange,
    pitch,
    onPitchChange,
    onDownload,
    isLoading
}: ControlsProps) => {
    const [showSettings, setShowSettings] = useState(false);

    return (
        <div className="bg-surface border-t border-surface/50 p-4 md:p-6 sticky bottom-0 z-10 backdrop-blur-lg bg-surface/90">
            <div className="max-w-4xl mx-auto flex flex-col gap-4">

                {/* Main Controls */}
                <div className="flex items-center justify-between gap-4">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-3 rounded-full hover:bg-background text-muted hover:text-text transition-colors"
                        title="Settings"
                    >
                        <Settings2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={onStop}
                            className="p-3 rounded-full hover:bg-background text-muted hover:text-red-400 transition-colors"
                            title="Stop"
                        >
                            <Square className="w-5 h-5 fill-current" />
                        </button>

                        <button
                            onClick={onPlayPause}
                            disabled={isLoading}
                            className="p-4 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-wait"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : isPlaying ? (
                                <Pause className="w-6 h-6 fill-current" />
                            ) : (
                                <Play className="w-6 h-6 fill-current ml-1" />
                            )}
                        </button>
                    </div>

                    <button
                        onClick={onDownload}
                        disabled={isLoading}
                        className="p-3 rounded-full hover:bg-background text-muted hover:text-accent transition-colors disabled:opacity-50"
                        title="Download Audio"
                    >
                        <Download className="w-5 h-5" />
                    </button>
                </div>

                {/* Extended Settings */}
                {showSettings && (
                    <div className="bg-background/50 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-2 fade-in duration-200">
                        <div className="space-y-2 md:col-span-3">
                            <label className="text-xs font-medium text-muted uppercase tracking-wider">Voice</label>
                            <select
                                className="w-full bg-surface border border-surface rounded-lg p-2 text-sm focus:border-primary outline-none"
                                value={selectedVoice?.id || ''}
                                onChange={(e) => {
                                    const voice = voices.find(v => v.id === e.target.value);
                                    if (voice) onVoiceChange(voice);
                                }}
                            >
                                <optgroup label="Neural Voices (Server)">
                                    {voices.filter(v => v.source === 'server').map(voice => (
                                        <option key={voice.id} value={voice.id}>
                                            {voice.name}
                                        </option>
                                    ))}
                                </optgroup>
                                {/* 
                           We can choose to keep browser voices as fallback or hide them.
                           User asked for "Human like", which implies Server voices.
                           Let's keep browser voices in a separate group just in case.
                        */}
                                <optgroup label="Browser Voices (Robotic)">
                                    {voices.filter(v => v.source === 'browser').map(voice => (
                                        <option key={voice.id} value={voice.id}>
                                            {voice.name}
                                        </option>
                                    ))}
                                </optgroup>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-muted">
                                <span className="font-medium uppercase tracking-wider">Speed</span>
                                <span>{rate > 0 ? '+' : ''}{Math.round(rate * 100)}%</span>
                            </div>
                            {/* Range for server voices is usually percentage based strings, but we'll map simplified -50 to +50 */}
                            <input
                                type="range" min="-0.5" max="0.5" step="0.1"
                                value={rate}
                                onChange={(e) => onRateChange(parseFloat(e.target.value))}
                                className="w-full accent-primary h-1 bg-surface rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-muted">
                                <span className="font-medium uppercase tracking-wider">Pitch</span>
                                <span>{pitch > 0 ? '+' : ''}{Math.round(pitch * 10)}Hz</span>
                            </div>
                            {/* Range for pitch -20Hz to +20Hz approx */}
                            <input
                                type="range" min="-20" max="20" step="5"
                                value={pitch}
                                onChange={(e) => onPitchChange(parseFloat(e.target.value))}
                                className="w-full accent-primary h-1 bg-surface rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
