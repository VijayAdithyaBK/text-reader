import { Upload, FileText } from 'lucide-react';
import { useCallback, useState } from 'react';
import { clsx } from 'clsx';

interface FileUploaderProps {
    onFileLoaded: (text: string, fileName: string) => void;
}

export const FileUploader = ({ onFileLoaded }: FileUploaderProps) => {
    const [isDragOver, setIsDragOver] = useState(false);

    const processFile = async (file: File) => {
        // ... same processing logic ...
        try {
            const validExtensions = ['.txt', '.md', '.pdf', '.docx'];
            const extension = '.' + file.name.split('.').pop()?.toLowerCase();
            if (!validExtensions.includes(extension)) { alert('Invalid file type.'); return; }
            onFileLoaded("Parsing...", file.name);
            const { parseFile } = await import('../utils/fileParsers');
            const text = await parseFile(file);
            onFileLoaded(text, file.name);
        } catch (error) { console.error(error); alert("Failed to parse file."); }
    };

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault(); setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) await processFile(file);
    }, []);

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); };
    const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(false); };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) processFile(e.target.files[0]); };

    // Styling:
    // The Component *IS* the Lavender Card. 
    // It contains: 
    // 1. Icons Row (Transparent bg, icons have white cards)
    // 2. Drop Zone (White Dashed card)

    return (
        <div className="flex flex-col gap-4 h-full justify-center">
            {/* Icons Row */}
            <div className="flex justify-between items-center px-2">
                {['TXT', 'DOC', 'PDF', 'MD'].map((type, i) => (
                    <div key={type} className="w-12 h-14 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center gap-1 border border-indigo-50">
                        <div className={clsx(
                            "w-6 h-6 rounded flex items-center justify-center text-white",
                            i === 0 ? "bg-green-500" : i === 1 ? "bg-blue-500" : i === 2 ? "bg-red-500" : "bg-slate-500"
                        )}>
                            <FileText className="w-3.5 h-3.5" />
                        </div>
                        <span className={clsx("text-[9px] font-bold",
                            i === 0 ? "text-green-700" : i === 1 ? "text-blue-700" : i === 2 ? "text-red-700" : "text-slate-700"
                        )}>{type}</span>
                    </div>
                ))}
            </div>

            {/* Drop Zone - White Card with Dashed Border */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={clsx(
                    "relative flex-1 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-2 text-center bg-white/60 hover:bg-white/80",
                    isDragOver ? "border-indigo-400" : "border-indigo-300/50"
                )}
                style={{ minHeight: '110px' }}
            >
                <Upload className="w-8 h-8 text-indigo-400" />
                <div className="flex flex-col">
                    <p className="font-bold text-indigo-900 text-sm">Drag and Drop</p>
                    <p className="text-[10px] text-indigo-400">or select text here</p>
                </div>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept=".txt,.md,.pdf,.docx" onChange={handleChange} />
            </div>
        </div>
    );
};
