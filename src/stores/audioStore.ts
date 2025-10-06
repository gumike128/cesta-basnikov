import { create } from 'zustand';
import { Poet } from '@/stores/initialData';
interface AudioState {
  currentTrack: Poet | null;
  isPlaying: boolean;
  playTrack: (track: Poet) => void;
  pauseTrack: () => void;
  togglePlay: () => void;
  closePlayer: () => void;
}
export const useAudioStore = create<AudioState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  playTrack: (track) => {
    const { currentTrack, isPlaying } = get();
    if (currentTrack?.id === track.id) {
      if (!isPlaying) {
        set({ isPlaying: true });
      }
    } else {
      set({ currentTrack: track, isPlaying: true });
    }
  },
  pauseTrack: () => set({ isPlaying: false }),
  togglePlay: () => {
    if (get().currentTrack) {
      set((state) => ({ isPlaying: !state.isPlaying }));
    }
  },
  closePlayer: () => set({ currentTrack: null, isPlaying: false }),
}));