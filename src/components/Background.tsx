export const Background = () => {
    return (
        <div className="fixed inset-0 -z-10 bg-[#F0F4F8] overflow-hidden">
            {/* Top Left Blue Wave */}
            <svg className="absolute top-0 left-0 w-[600px] h-[600px] text-[#6366f1] opacity-10" viewBox="0 0 100 100" fill="currentColor" preserveAspectRatio="none">
                <path d="M0 0 L100 0 C 80 50 50 80 0 100 Z" />
            </svg>

            {/* Top Right Orange Blob */}
            <svg className="absolute top-0 right-0 w-[500px] h-[500px] text-[#fb923c] opacity-80" viewBox="0 0 100 100" fill="currentColor">
                <path d="M100 0 L100 100 C 50 100 0 50 0 0 Z" transform="translate(50, -50) scale(1.5)" />
                <circle cx="80" cy="20" r="50" />
            </svg>

            {/* Bottom Right Green Blob - Big Wave */}
            <svg className="absolute bottom-0 right-0 w-[800px] h-[600px] text-[#4ade80] opacity-60" viewBox="0 0 100 100" fill="currentColor" preserveAspectRatio="none">
                <path d="M0 100 L100 100 L100 0 C 40 20 20 60 0 100 Z" />
            </svg>

            {/* Bottom Left Blue Blob */}
            <svg className="absolute bottom-0 left-0 w-[400px] h-[400px] text-[#60a5fa] opacity-60" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="0" cy="100" r="80" />
            </svg>

            {/* Overlay to soften if needed */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
        </div>
    );
};
