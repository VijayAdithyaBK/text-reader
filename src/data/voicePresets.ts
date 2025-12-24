import type { VoiceOption } from "../components/Controls";

export interface VoicePreset extends VoiceOption {
    baseVoiceId: string;
    pitch: number;
    rate: number;
    category: 'character' | 'celebrity' | 'cartoon';
}

export const VOICE_PRESETS: VoicePreset[] = [
    // Presidents / Historical
    {
        id: 'preset-lincoln',
        name: 'Abraham Lincoln',
        lang: 'en-US',
        source: 'preset',
        baseVoiceId: 'en-US-ChristopherNeural',
        pitch: -15,
        rate: -0.15,
        category: 'historical' as any
    },
    {
        id: 'preset-obama-sim',
        name: 'Barack (Simulated)',
        lang: 'en-US',
        source: 'preset',
        baseVoiceId: 'en-US-RogerNeural',
        pitch: -5,
        rate: -0.10,
        category: 'celebrity' as any
    },

    // Anime / Cartoon
    {
        id: 'preset-anime-girl',
        name: 'Anime Schoolgirl',
        lang: 'ja-JP',
        source: 'preset',
        baseVoiceId: 'ja-JP-NanamiNeural', // Or a high-pitched English voice
        pitch: 25,
        rate: 0.15,
        category: 'anime' as any
    },
    {
        id: 'preset-anime-hero',
        name: 'Shonen Hero',
        lang: 'ja-JP',
        source: 'preset',
        baseVoiceId: 'ja-JP-KeitaNeural',
        pitch: 5,
        rate: 0.20,
        category: 'anime' as any
    },
    {
        id: 'preset-chipmunk',
        name: 'Squeaky Chipmunk',
        lang: 'en-US',
        source: 'preset',
        baseVoiceId: 'en-US-AnaNeural',
        pitch: 50,
        rate: 0.30,
        category: 'cartoon' as any
    },
    {
        id: 'preset-villain',
        name: 'Movie Villain',
        lang: 'en-GB',
        source: 'preset',
        baseVoiceId: 'en-GB-RyanNeural',
        pitch: -30,
        rate: -0.20,
        category: 'cartoon' as any
    },

    // Narration
    {
        id: 'preset-narrator-epic',
        name: 'Epic Narrator',
        lang: 'en-US',
        source: 'preset',
        baseVoiceId: 'en-US-EricNeural',
        pitch: -10,
        rate: -0.05,
        category: 'celebrity' as any
    }
];
