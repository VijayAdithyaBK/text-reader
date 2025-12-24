import { AudioWaveform } from 'lucide-react';

export const Header = () => {
    return (
        <header className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3">
                {/* Sound wave icon logic */}
                <div className="flex items-center gap-1 h-8">
                    <div className="w-1.5 h-4 bg-brand-purple rounded-full" />
                    <div className="w-1.5 h-6 bg-brand-orange rounded-full" />
                    <div className="w-1.5 h-8 bg-brand-purple rounded-full" />
                    <div className="w-1.5 h-6 bg-brand-orange rounded-full" />
                    <div className="w-1.5 h-4 bg-brand-purple rounded-full" />
                </div>

                <h1 className="text-3xl font-bold text-brand-dark tracking-tight">
                    Audibly<span className="text-brand-orange">Human</span>
                </h1>

                <div className="flex items-center gap-1 h-8">
                    <div className="w-1.5 h-4 bg-brand-purple rounded-full" />
                    <div className="w-1.5 h-6 bg-brand-orange rounded-full" />
                    <div className="w-1.5 h-8 bg-brand-purple rounded-full" />
                    <div className="w-1.5 h-6 bg-brand-orange rounded-full" />
                    <div className="w-1.5 h-4 bg-brand-purple rounded-full" />
                </div>
            </div>
        </header>
    );
};
