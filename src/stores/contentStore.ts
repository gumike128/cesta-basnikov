import { create } from 'zustand';
import { 
  poets as initialPoets, 
  galleryImages as initialGalleryImages, 
  events as initialEvents, 
  Poet, 
  GalleryImage, 
  Event 
} from '@/stores/initialData';
import { produce } from 'immer';
export interface ContentState {
  poets: Poet[];
  galleryImages: GalleryImage[];
  events: Event[];
  // Poet actions
  addPoet: (poet: Omit<Poet, 'id'>) => void;
  updatePoet: (poet: Poet) => void;
  deletePoet: (poetId: number) => void;
  // Gallery actions
  addGalleryImage: (image: Omit<GalleryImage, 'id'>) => void;
  updateGalleryImage: (image: GalleryImage) => void;
  deleteGalleryImage: (imageId: number) => void;
  // Event actions
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (eventId: number) => void;
}
export const useContentStore = create<ContentState>((set) => ({
  poets: initialPoets,
  galleryImages: initialGalleryImages,
  events: initialEvents,
  addPoet: (poetData) =>
    set(produce((state: ContentState) => {
      const newId = state.poets.length > 0 ? Math.max(...state.poets.map(p => p.id)) + 1 : 1;
      const newPoet: Poet = { id: newId, ...poetData };
      state.poets.push(newPoet);
    })),
  updatePoet: (updatedPoet) =>
    set(produce((state: ContentState) => {
      const index = state.poets.findIndex(p => p.id === updatedPoet.id);
      if (index !== -1) {
        state.poets[index] = updatedPoet;
      }
    })),
  deletePoet: (poetId) =>
    set(produce((state: ContentState) => {
      state.poets = state.poets.filter(p => p.id !== poetId);
    })),
  addGalleryImage: (imageData) =>
    set(produce((state: ContentState) => {
      const newId = state.galleryImages.length > 0 ? Math.max(...state.galleryImages.map(img => img.id)) + 1 : 1;
      const newImage: GalleryImage = { id: newId, ...imageData };
      state.galleryImages.push(newImage);
    })),
  updateGalleryImage: (updatedImage) =>
    set(produce((state: ContentState) => {
      const index = state.galleryImages.findIndex(img => img.id === updatedImage.id);
      if (index !== -1) {
        state.galleryImages[index] = updatedImage;
      }
    })),
  deleteGalleryImage: (imageId) =>
    set(produce((state: ContentState) => {
      state.galleryImages = state.galleryImages.filter(img => img.id !== imageId);
    })),
  addEvent: (eventData) =>
    set(produce((state: ContentState) => {
      const newId = state.events.length > 0 ? Math.max(...state.events.map(e => e.id)) + 1 : 1;
      const newEvent: Event = { id: newId, ...eventData };
      state.events.push(newEvent);
    })),
  updateEvent: (updatedEvent) =>
    set(produce((state: ContentState) => {
      const index = state.events.findIndex(e => e.id === updatedEvent.id);
      if (index !== -1) {
        state.events[index] = updatedEvent;
      }
    })),
  deleteEvent: (eventId) =>
    set(produce((state: ContentState) => {
      state.events = state.events.filter(e => e.id !== eventId);
    })),
}));