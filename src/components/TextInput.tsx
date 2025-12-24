import type { ChangeEvent } from 'react';
import { clsx } from 'clsx';

interface TextInputProps {
    text: string;
    setText: (text: string) => void;
    disabled?: boolean;
}

export const TextInput = ({ text, setText, disabled }: TextInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    // Mockup: Very thick (12-16px) Blue Border, creating a "pad" look.
    // Border color: #5A67D8 (Indigo-500 approx)
    // Background: White

    return (
        <div className={clsx(
            "relative w-full h-full bg-white rounded-[2.5rem]",
            "border-[16px] border-[#6366f1]/80", // Thick frame
            "flex flex-col shadow-2xl shadow-indigo-200/50 overflow-hidden box-border"
        )}>
            <textarea
                className="w-full h-full p-8 text-xl font-medium text-slate-700 bg-transparent outline-none resize-none placeholder:text-slate-400 placeholder:font-normal"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                placeholder="| Paste Text Here"
                value={text}
                onChange={handleChange}
                disabled={disabled}
            />

            {/* Green Mockup Logo */}
            <div className="absolute bottom-6 right-6 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md select-none hover:scale-105 transition-transform">
                G
            </div>
        </div>
    );
};
