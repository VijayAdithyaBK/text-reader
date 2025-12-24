import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { marked } from 'marked';

// Configure PDF.js worker
// In Vite, we can point to the worker file in node_modules
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const parseFile = async (file: File): Promise<string> => {
    const extension = file.name.split('.').pop()?.toLowerCase();

    switch (extension) {
        case 'txt':
            return await parseTxt(file);
        case 'md':
            return await parseMd(file);
        case 'docx':
            return await parseDocx(file);
        case 'pdf':
            return await parsePdf(file);
        default:
            throw new Error(`Unsupported file type: .${extension}`);
    }
};

const parseTxt = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
};

const parseMd = async (file: File): Promise<string> => {
    const text = await parseTxt(file);
    // We want the raw text for reading, but marked parses to HTML.
    // For TTS, we might want to strip HTML tags or just read the raw markdown.
    // Using marked to parse and then stripping tags is a good way to get "readable" text
    // skipping code blocks might be desired, but for now let's keep it simple:
    // Just return raw text is often better for "reading" unless we want to interpret it.
    // Actually, stripping MD syntax makes it sound better.

    // Option 1: Read raw text (pronounces ### as hash hash hash)
    // Option 2: Parse to HTML then strip tags.
    const html = await marked.parse(text);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.innerText; // Helper to extract text content from HTML
};

const parseDocx = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
};

const parsePdf = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
            .map((item: any) => item.str)
            .join(' ');
        fullText += pageText + '\n\n';
    }

    return fullText;
};
