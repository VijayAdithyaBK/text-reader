import type { ReactNode } from 'react';
import { Background } from './Background';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen text-text relative font-sans">
            <Background />
            <div className="max-w-[1400px] mx-auto px-4 pb-12">
                {children}
            </div>
        </div>
    );
};
