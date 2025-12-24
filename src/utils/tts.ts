export interface TTSOptions {
    voice: SpeechSynthesisVoice | null;
    rate: number;
    pitch: number;
}

export class TTSController {
    private synthesis: SpeechSynthesis;
    private utterance: SpeechSynthesisUtterance | null = null;

    constructor() {
        this.synthesis = window.speechSynthesis;
    }

    getVoices(): SpeechSynthesisVoice[] {
        return this.synthesis.getVoices();
    }

    speak(text: string, options: TTSOptions) {
        this.cancel(); // Stop previous

        this.utterance = new SpeechSynthesisUtterance(text);
        if (options.voice) this.utterance.voice = options.voice;
        this.utterance.rate = options.rate;
        this.utterance.pitch = options.pitch;

        this.synthesis.speak(this.utterance);
    }

    pause() {
        this.synthesis.pause();
    }

    resume() {
        this.synthesis.resume();
    }

    cancel() {
        this.synthesis.cancel();
    }

    isSpeaking() {
        return this.synthesis.speaking;
    }
}

export const tts = new TTSController();
