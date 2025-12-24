export class AudioRecorder {
    private mediaRecorder: MediaRecorder | null = null;
    private chunks: Blob[] = [];

    async startRecording(): Promise<void> {
        try {
            // internal hack: prompts user to share tab audio
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true, // Required to get audio in displayMedia
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    sampleRate: 44100
                }
            });

            // We only care about audio
            const audioTrack = stream.getAudioTracks()[0];
            if (!audioTrack) {
                throw new Error("No audio track selected. Make sure to share 'Tab Audio'.");
            }

            // Create a new stream with just audio to record
            const audioStream = new MediaStream([audioTrack]);

            this.mediaRecorder = new MediaRecorder(audioStream);
            this.chunks = [];

            this.mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    this.chunks.push(e.data);
                }
            };

            this.mediaRecorder.onstop = () => {
                // Stop all tracks to clear the sharing indicator
                stream.getTracks().forEach(track => track.stop());
            };

            this.mediaRecorder.start();
        } catch (err) {
            console.error("Error starting recording:", err);
            throw err;
        }
    }

    stopRecording(): Promise<Blob> {
        return new Promise((resolve, reject) => {
            if (!this.mediaRecorder) {
                reject(new Error("Recorder not started"));
                return;
            }

            this.mediaRecorder.onstop = () => {
                // combined onstop logic
                const blob = new Blob(this.chunks, { type: 'audio/webm' });
                this.chunks = [];
                resolve(blob);
            };

            this.mediaRecorder.stop();
            // Also stop the stream tracks if not already handled
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
            this.mediaRecorder = null;
        });
    }
}

export const recorder = new AudioRecorder();
