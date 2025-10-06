import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
import { GlobalAudioPlayer } from './components/GlobalAudioPlayer';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { ForestElement } from './components/layout/ForestElement';
export function App() {
  return (
    <div className="flex min-h-screen flex-col relative overflow-x-hidden">
      <ForestElement name="fern" className="absolute -top-12 -left-12 w-48 h-48 text-primary/10 opacity-50 rotate-45" />
      <ForestElement name="leaf" className="absolute -top-8 -right-8 w-32 h-32 text-primary/10 opacity-50 -rotate-12" />
      <ForestElement name="pine" className="absolute bottom-0 -right-10 w-48 h-48 text-primary/10 opacity-30" />
      <ForestElement name="branch" className="absolute bottom-1/4 -left-16 w-48 h-48 text-primary/10 opacity-40 rotate-90" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <GlobalAudioPlayer />
      <ScrollToTopButton />
      <Toaster richColors />
    </div>
  );
}