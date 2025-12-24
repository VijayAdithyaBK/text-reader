import { useState, useEffect, useRef } from 'react';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { FileUploader } from './components/FileUploader';
import { TextInput } from './components/TextInput';
import { VoiceGallery } from './components/VoiceGallery';
import type { VoiceOption } from './components/Controls';
import { SpeedControl } from './components/SpeedControl';
import { PitchControl } from './components/PitchControl';
import { DownloadButton } from './components/DownloadButton';
import { WaveformPlayer } from './components/WaveformPlayer';
import { Play, Pause } from 'lucide-react';
import { VOICE_PRESETS } from './data/voicePresets';

function App() {
  const [text, setText] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Audio State
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption | null>(null);

  const [rate, setRate] = useState(0);
  const [pitch, setPitch] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const BACKEND_URL = "http://localhost:8000";

    // ...

    const fetchVoices = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/voices`);
        if (!res.ok) throw new Error("Failed to fetch voices");
        const data = await res.json();
        const serverVoices: VoiceOption[] = data.map((v: any) => ({
          name: `${v.ShortName} (${v.Gender})`, lang: v.Locale, source: 'server', id: v.ShortName
        }));

        // Merge Presets at the top or bottom? Let's put them at the top.
        setVoices([...VOICE_PRESETS, ...serverVoices]);

        const defaultVoice = VOICE_PRESETS[0] || serverVoices.find((v: any) => v.id.includes("Guy")) || serverVoices[0];
        setSelectedVoice(defaultVoice);
      } catch (err) { console.error(err); }
    };
    fetchVoices();
    audioRef.current = new Audio();
    return () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; } };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => { setIsPlaying(false); setCurrentTime(0); };
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      if (audio.duration === Infinity) {
        audio.currentTime = 1e101;
        audio.ontimeupdate = function () {
          this.ontimeupdate = () => { return; }
          audio.currentTime = 0;
          return;
        }
      }
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, []);

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleFileLoaded = (loadedText: string, fileName: string) => { setText(loadedText); };
  const generateAudioUrl = async () => {
    if (!selectedVoice || !text) return null;
    const BACKEND_URL = "http://localhost:8000";
    const r = rate >= 0 ? `+${Math.round(rate * 100)}%` : `${Math.round(rate * 100)}%`;
    const p = pitch >= 0 ? `+${Math.round(pitch)}Hz` : `${Math.round(pitch)}Hz`;

    // If it's a preset, use the baseVoiceId. Otherwise use the ID.
    const voiceId = selectedVoice.source === 'preset' ? selectedVoice.baseVoiceId : selectedVoice.id;

    const res = await fetch(`${BACKEND_URL}/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice: voiceId, rate: r, pitch: p })
    });
    if (!res.ok) throw new Error("TTS Generation failed");
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }

  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio || !text) return;
    if (isPlaying) {
      audio.pause();
    } else {
      if (audio.src && !audio.ended && audio.currentTime > 0) {
        audio.play();
      } else {
        setIsLoading(true);
        try {
          const url = await generateAudioUrl();
          if (url) { audio.src = url; audio.play(); }
        } catch (e) { alert("Failed to play audio. Is backend running?"); }
        finally { setIsLoading(false); }
      }
    }
  };

  const handleStop = () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; } };

  const handleDownload = async () => {
    if (!text) return;
    setIsLoading(true);
    try {
      const url = await generateAudioUrl();
      if (url) {
        const a = document.createElement('a'); a.href = url; a.download = `voice-${Date.now()}.mp3`; a.click(); URL.revokeObjectURL(url);
      }
    } catch (e) { alert("Failed to download."); }
    finally { setIsLoading(false); }
  };

  useEffect(() => { if (audioRef.current) { handleStop(); } }, [text, selectedVoice, rate, pitch]);

  return (
    <Layout>
      <Header />

      {/* 
        Grid Layout Updated
        Row 1: Input (Left 8) | Controls Stack (Right 4)
        Row 2: Voice Gallery (Full 12)
      */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 min-h-[600px] mt-2 relative z-10 w-full max-w-7xl mx-auto">

        {/* Left Column (Input) */}
        <div className="md:col-span-8 min-h-[500px]">
          <TextInput text={text} setText={setText} />
        </div>

        {/* Right Column Stack */}
        <div className="md:col-span-4 flex flex-col gap-4">

          {/* 1. Play Bar */}
          <div className="relative z-20">
            <WaveformPlayer
              isPlaying={isPlaying}
              isLoading={isLoading}
              currentTime={currentTime}
              duration={duration}
              onTogglePlay={handlePlayPause}
              onSeek={handleSeek}
            />
          </div>

          {/* 2. Download Button */}
          <div className="h-20 relative z-20">
            <DownloadButton onDownload={handleDownload} isLoading={isLoading} />
          </div>

          {/* 3. Pace & Pitch Stack */}
          <div className="flex flex-col gap-4">
            {/* Pace (Speed) */}
            <div className="bg-[#D1FAE5] rounded-[2rem] shadow-sm overflow-hidden flex flex-col justify-center h-[140px]">
              <SpeedControl speed={rate} setSpeed={setRate} />
            </div>
            {/* Pitch */}
            <div className="bg-[#FFEDD5] rounded-[2rem] shadow-sm overflow-hidden flex flex-col justify-center h-[140px]">
              <PitchControl pitch={pitch} setPitch={setPitch} />
            </div>
          </div>

        </div>

        {/* Bottom Row: Voice Gallery */}
        <div className="md:col-span-12 relative z-20 mt-2">
          <VoiceGallery
            voices={voices}
            selectedVoice={selectedVoice}
            onSelect={(voice) => {
              setSelectedVoice(voice);
              // If preset, apply specific pitch/rate
              if (voice.source === 'preset' && voice.rate !== undefined && voice.pitch !== undefined) {
                setRate(voice.rate);
                setPitch(voice.pitch);
              } else {
                // Reset to defaults if switching back to normal voice? 
                // Optional: keeping current settings is usually better UX unless explicitly resetting.
                // setRate(0); setPitch(0); 
              }
            }}
          />
        </div>

      </div>
    </Layout>
  );
}

export default App;
