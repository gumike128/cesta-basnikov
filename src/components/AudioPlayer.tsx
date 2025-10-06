import { useEffect, useRef } from 'react';
import { useAudioStore } from '@/stores/audioStore';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { Poet } from '@/stores/initialData';
interface AudioPlayerProps {
  track: Poet;
}
export function AudioPlayer({ track }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = useAudioStore((state) => state.currentTrack);
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const playTrack = useAudioStore((state) => state.playTrack);
  const pauseTrack = useAudioStore((state) => state.pauseTrack);
  const togglePlay = useAudioStore((state) => state.togglePlay);
  const isCurrentTrack = currentTrack?.id === track.id;
  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    if (isCurrentTrack) {
      // This track is the active one. Sync its state with the store.
      if (audioEl.src !== track.audioUrl) {
        audioEl.src = track.audioUrl;
      }
      if (isPlaying) {
        if (audioEl.paused) {
          audioEl.play().catch(e => console.error("Audio play failed:", e));
        }
      } else {
        if (!audioEl.paused) {
          audioEl.pause();
        }
      }
    } else {
      // This track is not the active one, so it should be paused.
      if (!audioEl.paused) {
        audioEl.pause();
      }
    }
  }, [isPlaying, isCurrentTrack, currentTrack, track]);
  const handleTogglePlay = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };
  return (
    <div className="flex items-center gap-4">
      <audio ref={audioRef} src={track.audioUrl} preload="metadata" onEnded={pauseTrack} />
      <Button onClick={handleTogglePlay} size="lg" className="flex items-center gap-2">
        {isCurrentTrack && isPlaying ? (
          <>
            <Pause className="h-5 w-5" /> Prehráva sa
          </>
        ) : (
          <>
            <Play className="h-5 w-5" /> Vypočuť báseň
          </>
        )}
      </Button>
    </div>
  );
}