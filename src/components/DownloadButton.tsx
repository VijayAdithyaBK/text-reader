import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';

interface DownloadButtonProps {
    onDownload: () => void;
    isLoading?: boolean;
}

export const DownloadButton = ({ onDownload }: DownloadButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative h-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-full bg-white hover:border-indigo-200 border border-indigo-100 transition-all rounded-[2rem] px-6 flex items-center justify-between gap-2 group relative z-10 shadow-sm"
            >
                <span className="font-bold text-slate-700 text-sm">Download Audio</span>
                <ChevronDown className={clsx("w-4 h-4 text-slate-400 transition-transform", isOpen && "rotate-180")} />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-indigo-100 overflow-hidden z-50 p-1">
                    {['MP3', 'WAV', 'AAC'].map((format) => (
                        <button
                            key={format}
                            onClick={() => {
                                setIsOpen(false);
                                onDownload();
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors"
                        >
                            {format}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
