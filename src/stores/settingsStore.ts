import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SettingsFormValues } from '@/lib/validators/settingsValidator';
import { timelineEvents, goals, partners } from './initialData';
interface SettingsState {
  settings: SettingsFormValues;
  updateSettings: (newSettings: SettingsFormValues) => void;
}
const initialSettings: SettingsFormValues = {
  heroTitle: 'Cesta básnikov',
  heroDescription: 'Kde sa stretáva umenie, príroda a poézia.',
  heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  address: 'Adresa projektu, 972 22, Slovensko',
  phone: '+421 123 456 789',
  email: 'info@cestabasnikov.sk',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  youtubeUrl: 'https://youtube.com',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5296.589386420521!2d18.45082731589636!3d48.876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUyJzMzLjYiTiAxOMKwMjcnMjEuNiJF!5e0!3m2!1sen!2sus!4v1620208113420!5m2!1sen!2sus',
  mapCoordinates: [48.876, 18.456],
  timelineEvents: timelineEvents,
  goals: goals,
  partners: partners,
  homeSeoTitle: 'Cesta básnikov | Úvod',
  homeSeoDescription: 'Objavte kult��rno-turistický projekt, ktorý spája slovenských básnikov, umenie v prírode a turizmus v Strážovských vrchoch.',
  homeSeoKeywords: 'cesta básnikov, turizmus, slovensko, umenie, poézia',
  aboutSeoTitle: 'O projekte | Cesta básnikov',
  aboutSeoDescription: 'Spoznajte príbeh, víziu a ľudí, ktorí stoja za unikátnym spojením umenia, prírody a poézie.',
  aboutSeoKeywords: 'história, vízia, ciele, partneri, o projekte',
  mapSeoTitle: 'Mapa a zastávky | Cesta básnikov',
  mapSeoDescription: 'Naplánujte si svoju cestu po stopách básnikov. Tu nájdete interaktívnu mapu a všetky praktické informácie.',
  mapSeoKeywords: 'mapa, trasa, gps, turistika, zastávky',
  poetsSeoTitle: 'Básnici a sochy | Cesta básnikov',
  poetsSeoDescription: 'Zoznámte sa s osobnosťami, ktorých dielo a odkaz formovali slovenskú kultúru.',
  poetsSeoKeywords: 'básnici, sochy, biografie, umelci, ján roy, ján smrek',
  gallerySeoTitle: 'Galéria | Cesta básnikov',
  gallerySeoDescription: 'Vizuálne zážitky z Cesty básnikov. Objavte krásu sôch, prírody a nezabudnuteľných momentov.',
  gallerySeoKeywords: 'galéria, fotky, videá, sochy, príroda, podujatia',
  eventsSeoTitle: 'Podujatia | Cesta básnikov',
  eventsSeoDescription: 'Zapojte sa do života Cesty básnikov. Program plný sympózií, workshopov a prehliadok.',
  eventsSeoKeywords: 'podujatia, kalendár, sympózium, workshop, registrácia',
  contactSeoTitle: 'Kontakt | Cesta básnikov',
  contactSeoDescription: 'Máte otázky, nápady alebo sa chcete zapojiť? Neváhajte nás kontaktovať.',
  contactSeoKeywords: 'kontakt, adresa, email, telefón, formulár',
};
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: initialSettings,
      updateSettings: (newSettings) => set({ settings: newSettings }),
    }),
    {
      name: 'site-settings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);