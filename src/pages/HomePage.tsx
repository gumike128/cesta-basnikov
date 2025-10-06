import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, Feather, GalleryHorizontal, Map, Mountain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContentStore } from '@/stores/contentStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { cn } from '@/lib/utils';
import { SEO } from '@/components/SEO';
import { ForestElement } from '@/components/layout/ForestElement';
const featureCards = [
  {
    icon: Mountain,
    title: 'Strážovské vrchy',
    description: 'Objavte malebnú krajinu, ktorá in��pirovala generácie umelcov.',
    link: '/mapa',
  },
  {
    icon: Feather,
    title: 'Básnici',
    description: 'Spoznajte život a dielo básnikov, ktorým je cesta venovaná.',
    link: '/basnici',
  },
  {
    icon: GalleryHorizontal,
    title: 'Umenie v prírode',
    description: 'Preskúmajte unikátne sochy a inštalácie pozdĺž celej trasy.',
    link: '/galeria',
  },
];
export function HomePage() {
  const events = useContentStore((state) => state.events);
  const galleryImages = useContentStore((state) => state.galleryImages);
  const settings = useSettingsStore((state) => state.settings);
  const nextEvent = events[0];
  const heroStyle = settings.heroBackgroundImageUrl
    ? { backgroundImage: `url(${settings.heroBackgroundImageUrl})` }
    : {};
  return (
    <>
      <SEO
        title={settings.homeSeoTitle || "Úvod"}
        description={settings.homeSeoDescription || "Objavte kultúrno-turistický projekt, ktorý spája slovenských básnikov, umenie v prírode a turizmus."}
      />
      <div className="animate-fade-in">
        {/* Hero Section */}
        <section
          className={cn(
            'relative flex h-[80vh] min-h-[500px] w-full items-center justify-center overflow-hidden text-center text-primary-foreground',
            settings.heroBackgroundImageUrl ? 'bg-cover bg-center' : 'bg-poet-gradient'
          )}
          style={heroStyle}
        >
          <div className="absolute inset-0 bg-forest/50"></div>
          <ForestElement name="fern" className="absolute bottom-0 left-0 w-64 h-64 text-white/10 opacity-50" />
          <ForestElement name="pine" className="absolute top-0 right-0 w-48 h-48 text-white/10 opacity-50 -rotate-45" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 container"
          >
            <h1 className="font-display text-5xl font-bold md:text-7xl lg:text-8xl">
              {settings.heroTitle}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80">
              {settings.heroDescription}
            </p>
            <Button asChild size="lg" className="mt-8 group">
              <Link to="/mapa">
                Objavte trasu <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </section>
        {/* Feature Cards Section */}
        <section className="section-padding container relative">
          <ForestElement name="leaf" className="absolute top-0 right-0 w-32 h-32 text-primary/10 -translate-y-1/2" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featureCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <CardHeader className="items-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <card.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="font-display text-2xl">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{card.description}</p>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button variant="link" asChild>
                      <Link to={card.link}>Zistiť viac <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
        {/* Next Event Section */}
        {nextEvent && (
          <section className="section-padding bg-secondary">
            <div className="container grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-4xl font-bold md:text-5xl">Najbližšie podujatie</h2>
                <p className="mt-4 text-body">
                  Nenechajte si ujsť jedinečnú príležitosť stretnúť umelcov a zažiť tvorivú atmosféru priamo v srdci prírody.
                </p>
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="flex items-start gap-4">
                      <Calendar className="mt-1 h-6 w-6 text-primary flex-shrink-0" />
                      <span>{nextEvent.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold">{nextEvent.date}</p>
                    <p className="mt-2 text-muted-foreground">{nextEvent.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="group">
                      <Link to="/podujatia">
                        Všetky podujatia <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="h-80 rounded-lg bg-cover bg-center shadow-lg"
                style={{ backgroundImage: `url(${galleryImages.find(img => img.category === 'Podujatia')?.src})` }}
              />
            </div>
          </section>
        )}
        {/* Gallery Preview Section */}
        <section className="section-padding container">
          <div className="text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">Galéria zážitkov</h2>
            <p className="mt-4 max-w-2xl mx-auto text-body">
              Nechajte sa uniesť krásou sôch, prírody a momentov zachytených na Ceste básnikov.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryImages.slice(0, 4).map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-lg"
              >
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-black/20"></div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="group">
              <Link to="/galeria">
                Prejsť do galérie <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}