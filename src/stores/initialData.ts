export interface Poet {
  id: number;
  name: string;
  years: string;
  imageUrl: string;
  bio: string;
  audioUrl: string;
  coordinates: [number, number];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}
export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: 'Sochy' | 'Príroda' | 'Podujatia' | 'Trasa';
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}
export interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  type: 'Sympózium' | 'Workshop' | 'Prehliadka';
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}
export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}
export interface Goal {
  icon: string;
  title: string;
  description: string;
}
export interface Partner {
  name: string;
}
export const poets: Poet[] = [
  {
    id: 1,
    name: 'Ján Roy',
    years: '1884-1929',
    imageUrl: 'https://images.unsplash.com/photo-1588693485629-3a7d112b3a4d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: 'Ján Roy bol slovenský básnik a prekladateľ, predstaviteľ druhej vlny slovenskej moderny. Jeho tvorba je charakteristická hlbokou reflexiou a symbolizmom.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coordinates: [48.879, 18.459],
    seoTitle: '', seoDescription: '', seoKeywords: '',
  },
  {
    id: 2,
    name: 'Ján Smrek',
    years: '1898-1982',
    imageUrl: 'https://images.unsplash.com/photo-1621332249283-a614f3c84451?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: 'Ján Smrek, vlastným menom Ján Čietek, bol významný slovenský básnik, spisovateľ, redaktor a publicista. Jeho dielo je oslavou života, lásky a krásy.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coordinates: [48.878, 18.461],
    seoTitle: '', seoDescription: '', seoKeywords: '',
  },
  {
    id: 3,
    name: 'Fraňo Tekel',
    years: '1885-1945',
    imageUrl: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: 'Fraňo Tekel bol menej známy, no o to zaujímavejší básnik, ktorého tvorba sa zameriavala na prírodnú lyriku a folklórne motívy z okolia Strážovských vrchov.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coordinates: [48.877, 18.463],
    seoTitle: '', seoDescription: '', seoKeywords: '',
  },
  {
    id: 4,
    name: 'Elena Fiebigová',
    years: '1902-1986',
    imageUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: 'Elena Fiebigová, známa aj pod pseudonymom Elena Šoltésová, bola slovenská spisovateľka, redaktorka a publicistka, ktorá sa vo svojej tvorbe venovala postaveniu ženy v spoločnosti.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    coordinates: [48.876, 18.465],
    seoTitle: '', seoDescription: '', seoKeywords: '',
  },
];
export const galleryImages: GalleryImage[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1516146544193-b54a65682f16?q=80&w=800&auto=format&fit=crop', alt: 'Kamenná socha v lese', category: 'Sochy', seoTitle: '', seoDescription: '', seoKeywords: '' },
  { id: 2, src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop', alt: 'Horský potok v Strážovských vrchoch', category: 'Príroda', seoTitle: '', seoDescription: '', seoKeywords: '' },
  { id: 3, src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop', alt: 'Ľudia na vonkajšom podujatí', category: 'Podujatia', seoTitle: '', seoDescription: '', seoKeywords: '' },
  { id: 4, src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop', alt: 'Turistický chodník vedúci lesom', category: 'Trasa', seoTitle: '', seoDescription: '', seoKeywords: '' },
  { id: 5, src: 'https://images.unsplash.com/photo-1595434949384-a5265539325e?q=80&w=800&auto=format&fit=crop', alt: 'Abstraktná drevená socha', category: 'Sochy', seoTitle: '', seoDescription: '', seoKeywords: '' },
  { id: 6, src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&auto=format&fit=crop', alt: 'Vodopád v hustej zeleni', category: 'Príroda', seoTitle: '', seoDescription: '', seoKeywords: '' },
  { id: 7, src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd51725?q=80&w=800&auto=format&fit=crop', alt: 'Skupina ľudí na workshope', category: 'Podujatia', seoTitle: '', seoDescription: '', seoKeywords: '' },
  { id: 8, src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop', alt: 'Značenie na strome pri jazere', category: 'Trasa', seoTitle: '', seoDescription: '', seoKeywords: '' },
];
export const events: Event[] = [
  {
    id: 1,
    title: '22. medzinárodné sympózium',
    date: '15. - 25. Júl 2024',
    description: 'Stretnutie umelcov z celého sveta, tvorba nových diel priamo v prírode. Verejnosti prístupné workshopy a prednášky.',
    type: 'Sympózium',
    seoTitle: '', seoDescription: '', seoKeywords: '',
  },
  {
    id: 2,
    title: 'Workshop písania poézie',
    date: '5. August 2024',
    description: 'Inšpirujte sa prírodou a objavte v sebe básnika pod vedením renomovaných autorov.',
    type: 'Workshop',
    seoTitle: '', seoDescription: '', seoKeywords: '',
  },
  {
    id: 3,
    title: 'Komentovaná prehliadka s kurátorom',
    date: 'Každú prvú sobotu v mesiaci',
    description: 'Spoznajte príbehy, ktoré sa skrývajú za jednotlivými sochami a inštaláciami na trase.',
    type: 'Prehliadka',
    seoTitle: '', seoDescription: '', seoKeywords: '',
  },
];
export const timelineEvents: TimelineEvent[] = [
  { year: '2022', title: 'Vznik myšlienky', description: 'Projekt Cesta básnikov sa zrodil z iniciatívy lokálnych umelcov a nadšencov pre prírodu.' },
  { year: '2023', title: 'Prvé sympózium', description: 'Uskutočnil sa prvý ročník medzinárodného sochárskeho sympózia, ktoré položilo základ umeleckej trasy.' },
  { year: '2024', title: 'Otvorenie pre verejnosť', description: 'Cesta básnikov bola slávnostne otvorená a sprístupnená širokej verejnosti.' },
  { year: 'Budúcnosť', title: 'Rozvoj a nové diela', description: 'Plánujeme ďalšie rozširovanie trasy, nové umelecké diela a sprievodné kultúrne podujatia.' },
];
export const goals: Goal[] = [
  { icon: 'Award', title: 'Podpora kultúry', description: 'Oživovať odkaz slovenských básnikov a podporovať súčasné umenie.' },
  { icon: 'Users', title: 'Rozvoj turizmu', description: 'Prilákať návštevníkov do regiónu Strážovských vrchov a ponúknuť im jedinečný zážitok.' },
  { icon: 'Heart', title: 'Budovanie komunity', description: 'Spájať ľudí s láskou k umeniu, prírode a literatúre prostredníctvom spoločných aktivít.' },
];
export const partners: Partner[] = [
  { name: 'Logo partnera 1' },
  { name: 'Logo partnera 2' },
  { name: 'Logo partnera 3' },
  { name: 'Logo partnera 4' },
  { name: 'Logo partnera 5' },
];