import { useEffect, useRef } from 'react';
import { useAudioStore } from '@/stores/audioStore';
import { Button } from '@/components/ui/button';
import { Play, Pause, X, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function GlobalAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = useAudioStore((state) => state.currentTrack);
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const togglePlay = useAudioStore((state) => state.togglePlay);
  const pauseTrack = useAudioStore((state) => state.pauseTrack);
  const closePlayer = useAudioStore((state) => state.closePlayer);
  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    if (currentTrack && isPlaying) {
      audioEl.play().catch(e => console.error("Audio play failed:", e));
    } else {
      audioEl.pause();
    }
  }, [isPlaying, currentTrack]);
  useEffect(() => {
    const audioEl = audioRef.current;
    if (audioEl && currentTrack) {
      if (audioEl.src !== currentTrack.audioUrl) {
        audioEl.src = currentTrack.audioUrl;
      }
      if (isPlaying) {
        audioEl.play().catch(e => console.error("Audio play failed:", e));
      }
    }
  }, [currentTrack, isPlaying]);
  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-lg border bg-background/80 p-4 shadow-lg backdrop-blur-sm"
        >
          <audio ref={audioRef} src={currentTrack.audioUrl} preload="metadata" onEnded={pauseTrack} />
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex-shrink-0 rounded-md bg-secondary p-2 text-secondary-foreground">
                <Music className="h-5 w-5" />
              </div>
              <div className="truncate">
                <p className="font-semibold truncate">{currentTrack.name}</p>
                <p className="text-sm text-muted-foreground truncate">{currentTrack.years}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button onClick={togglePlay} size="icon" variant="ghost">
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button onClick={closePlayer} size="icon" variant="ghost">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}