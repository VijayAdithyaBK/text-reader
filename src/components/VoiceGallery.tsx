import { clsx } from "clsx";
import type { VoiceOption } from "./Controls";
import { Search, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";

interface VoiceGalleryProps {
    voices: VoiceOption[];
    selectedVoice: VoiceOption | null;
    onSelect: (voice: VoiceOption) => void;
}

export const VoiceGallery = ({ voices, selectedVoice, onSelect }: VoiceGalleryProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGender, setSelectedGender] = useState<string>('All');
    const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Helper to extract a friendly name from the technical ID string
    // e.g. "en-US-GuyNeural" -> "Guy"
    // e.g. "en-IN-NeerjaExpressiveNeural" -> "Neerja"
    const getFriendlyName = (voice: VoiceOption) => {
        try {
            // Remove the Gender part if it exists in name "ShortName (Gender)"
            const params = voice.name.split('(')[0].trim().split('-');
            // Last part is usually "NameNeural"
            const namePart = params[params.length - 1];
            return namePart.replace("Neural", "").replace("Multilingual", "");
        } catch (e) {
            return voice.name;
        }
    };

    const getEthnicity = (locale: string) => {
        const map: Record<string, string> = {
            'en-US': 'American', 'en-GB': 'British', 'en-AU': 'Australian', 'en-CA': 'Canadian',
            'en-IN': 'Indian', 'en-IE': 'Irish', 'en-NZ': 'New Zealand', 'en-PH': 'Filipino',
            'en-SG': 'Singaporean', 'en-ZA': 'South African', 'fr-FR': 'French', 'fr-CA': 'Canadian French',
            'de-DE': 'German', 'it-IT': 'Italian', 'es-ES': 'Spanish', 'es-MX': 'Mexican',
            'ja-JP': 'Japanese', 'ko-KR': 'Korean', 'zh-CN': 'Chinese (Mandarin)', 'zh-TW': 'Taiwanese',
            'ru-RU': 'Russian', 'pt-BR': 'Brazilian', 'pt-PT': 'Portuguese', 'nl-NL': 'Dutch',
            'tr-TR': 'Turkish', 'sv-SE': 'Swedish', 'pl-PL': 'Polish', 'hi-IN': 'Indian (Hindi)',
            'ar-SA': 'Arabic (Saudi)', 'ar-EG': 'Arabic (Egyptian)'
        };
        // Fallback: use the language/country code if not found, e.g. "en-KE" -> "en-KE"
        return map[locale] || locale;
    };

    const getLanguage = (locale: string) => {
        const langCode = locale.split('-')[0];
        const map: Record<string, string> = {
            'af': 'Afrikaans', 'am': 'Amharic', 'ar': 'Arabic', 'az': 'Azerbaijani', 'bg': 'Bulgarian',
            'bn': 'Bengali', 'bs': 'Bosnian', 'ca': 'Catalan', 'cs': 'Czech', 'cy': 'Welsh',
            'da': 'Danish', 'de': 'German', 'el': 'Greek', 'en': 'English', 'es': 'Spanish',
            'et': 'Estonian', 'fa': 'Persian', 'fi': 'Finnish', 'fil': 'Filipino', 'fr': 'French',
            'ga': 'Irish', 'gl': 'Galician', 'gu': 'Gujarati', 'he': 'Hebrew', 'hi': 'Hindi',
            'hr': 'Croatian', 'hu': 'Hungarian', 'id': 'Indonesian', 'is': 'Icelandic', 'it': 'Italian',
            'iu': 'Inuktitut', 'ja': 'Japanese', 'jv': 'Javanese', 'ka': 'Georgian', 'kk': 'Kazakh',
            'km': 'Khmer', 'kn': 'Kannada', 'ko': 'Korean', 'lo': 'Lao', 'lt': 'Lithuanian',
            'lv': 'Latvian', 'mk': 'Macedonian', 'ml': 'Malayalam', 'mn': 'Mongolian', 'mr': 'Marathi',
            'ms': 'Malay', 'mt': 'Maltese', 'my': 'Burmese', 'nb': 'Norwegian', 'ne': 'Nepali',
            'nl': 'Dutch', 'pl': 'Polish', 'ps': 'Pashto', 'pt': 'Portuguese', 'ro': 'Romanian',
            'ru': 'Russian', 'si': 'Sinhala', 'sk': 'Slovak', 'sl': 'Slovenian', 'so': 'Somali',
            'sq': 'Albanian', 'sr': 'Serbian', 'su': 'Sundanese', 'sv': 'Swedish', 'sw': 'Swahili',
            'ta': 'Tamil', 'te': 'Telugu', 'th': 'Thai', 'tr': 'Turkish', 'uk': 'Ukrainian',
            'ur': 'Urdu', 'uz': 'Uzbek', 'vi': 'Vietnamese', 'zh': 'Chinese', 'zu': 'Zulu'
        };
        return map[langCode] || langCode.toUpperCase();
    };

    // Get unique languages for filter
    const availableLanguages = useMemo(() => {
        const langs = new Set<string>();
        voices.forEach(v => {
            if (v.source === 'server') langs.add(getLanguage(v.lang));
        });
        return Array.from(langs).sort();
    }, [voices]);

    // Get unique categories for filter
    const availableCategories = useMemo(() => {
        const cats = new Set<string>();
        voices.forEach(v => {
            if (v.category) cats.add(v.category);
        });
        // Capitalize and sort
        return Array.from(cats).map(c => c.charAt(0).toUpperCase() + c.slice(1)).sort();
    }, [voices]);

    const filteredVoices = useMemo(() => {
        const lowerSearch = searchTerm.toLowerCase();
        return voices.filter(v => {
            // Allow server AND preset voices
            if (v.source !== 'server' && v.source !== 'preset') return false;

            // Search Filter
            const matchesSearch =
                v.name.toLowerCase().includes(lowerSearch) ||
                v.lang.toLowerCase().includes(lowerSearch) ||
                getEthnicity(v.lang).toLowerCase().includes(lowerSearch) ||
                getLanguage(v.lang).toLowerCase().includes(lowerSearch) ||
                (v.category && v.category.toLowerCase().includes(lowerSearch));

            // Gender Filter
            const genderMatch =
                selectedGender === 'All' ? true :
                    selectedGender === 'Male' ? v.name.includes('(Male)') :
                        selectedGender === 'Female' ? v.name.includes('(Female)') : true;

            // Language Filter
            const langMatch = selectedLanguage === 'All' ? true : getLanguage(v.lang) === selectedLanguage;

            // Category Filter
            const categoryMatch = selectedCategory === 'All' ? true :
                selectedCategory === 'Standard' ? !v.category :
                    (v.category && v.category.toLowerCase() === selectedCategory.toLowerCase());

            return matchesSearch && genderMatch && langMatch && categoryMatch;
        });
    }, [voices, searchTerm, selectedGender, selectedLanguage, selectedCategory]);

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Voice Gallery <span className="text-slate-400 font-normal text-sm">({filteredVoices.length})</span></h3>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row gap-3">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search names, regions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 rounded-xl border border-indigo-100 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 placeholder:text-slate-400"
                        />
                    </div>

                    {/* Category Dropdown (Custom) */}
                    <CustomDropdown
                        label={selectedCategory === 'All' ? 'All Categories' : selectedCategory}
                        options={['All', 'Standard', ...availableCategories]}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        width="min-w-[140px]"
                    />

                    {/* Language Dropdown (Custom) */}
                    <CustomDropdown
                        label={selectedLanguage === 'All' ? 'All Languages' : selectedLanguage}
                        options={['All', ...availableLanguages]}
                        value={selectedLanguage}
                        onChange={setSelectedLanguage}
                        width="min-w-[160px]"
                    />

                    {/* Gender Dropdown (Custom) */}
                    <CustomDropdown
                        label={selectedGender === 'All' ? 'All Genders' : selectedGender}
                        options={['All', 'Female', 'Male']}
                        value={selectedGender}
                        onChange={setSelectedGender}
                        width="min-w-[140px]"
                    />
                </div>
            </div>

            <div className="h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {filteredVoices.map((voice) => {
                        const isSelected = selectedVoice?.id === voice.id;
                        const friendlyName = getFriendlyName(voice);
                        const ethnicity = getEthnicity(voice.lang);
                        const language = getLanguage(voice.lang);
                        const gender = voice.name.includes("Female") ? "Female" : voice.name.includes("Male") ? "Male" : "Voice";

                        return (
                            <button
                                key={voice.id}
                                onClick={() => onSelect(voice)}
                                className={clsx(
                                    "flex flex-col p-4 rounded-[1.2rem] border transition-all duration-200 text-left bg-white relative overflow-hidden group",
                                    isSelected
                                        ? "border-[#6366f1] ring-2 ring-[#6366f1]/10 shadow-md"
                                        : "border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100"
                                )}
                            >
                                {/* Active Indicator Strip */}
                                {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#6366f1]" />}

                                <div className="flex justify-between items-start w-full mb-1">
                                    <span className="font-bold text-lg text-slate-800 tracking-tight group-hover:text-[#6366f1] transition-colors">{friendlyName}</span>

                                    {/* Badge: Language code OR Preset Category */}
                                    {voice.source === 'preset' ? (
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-indigo-500 px-2 py-0.5 rounded-full shadow-sm shadow-indigo-200">
                                            {voice.category || 'Special'}
                                        </span>
                                    ) : (
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full ring-1 ring-slate-200/50">
                                            {voice.lang.split('-')[1] || voice.lang}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 mt-auto">
                                    <span className={clsx("w-2 h-2 rounded-full", isSelected ? "bg-green-400 animate-pulse" : "bg-slate-300")} />
                                    <div className="flex flex-col">
                                        <p className="text-xs text-slate-700 font-bold">{language} <span className="font-normal text-slate-500">({ethnicity})</span></p>
                                        <p className="text-[10px] text-slate-400 font-medium">Neural {gender}</p>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>

                {filteredVoices.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-48 text-slate-400">
                        <Search className="w-8 h-8 opacity-50 mb-2" />
                        <p>No voices found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Internal Custom Dropdown Component
const CustomDropdown = ({ label, options, value, onChange, width = "w-full" }: { label: string, options: string[], value: string, onChange: (val: string) => void, width?: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`relative ${width}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-full bg-white hover:border-indigo-200 border border-indigo-100 transition-all rounded-xl px-4 py-2 flex items-center justify-between gap-2 group shadow-sm text-sm"
            >
                <span className="font-medium text-slate-700 truncate">{label}</span>
                <ChevronDown className={clsx("w-4 h-4 text-slate-400 transition-transform shrink-0", isOpen && "rotate-180")} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-indigo-100 overflow-hidden z-50 p-1 w-full min-w-[160px] max-h-[300px] overflow-y-auto custom-scrollbar">
                        {options.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => {
                                    onChange(opt);
                                    setIsOpen(false);
                                }}
                                className={clsx(
                                    "w-full text-left px-4 py-2 rounded-lg text-xs font-bold transition-colors",
                                    value === opt ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                                )}
                            >
                                {opt === 'All' ? (label.includes('Gender') ? 'All Genders' : 'All Languages') : opt}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
