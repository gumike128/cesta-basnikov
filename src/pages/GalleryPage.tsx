import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { GalleryImage } from "@/stores/initialData";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import { SEO } from "@/components/SEO";
import { useContentStore } from "@/stores/contentStore";
import { useSettingsStore } from "@/stores/settingsStore";
const categories: Array<'Všetko' | GalleryImage['category']> = ['Všetko', 'Sochy', 'Príroda', 'Podujatia', 'Trasa'];
export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<'Všetko' | GalleryImage['category']>('Všetko');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const galleryImages = useContentStore((state) => state.galleryImages);
  const settings = useSettingsStore((state) => state.settings);
  const filteredImages = useMemo(() => {
    if (activeCategory === 'Všetko') {
      return galleryImages;
    }
    return galleryImages.filter((image) => image.category === activeCategory);
  }, [activeCategory, galleryImages]);
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  return (
    <>
      <SEO
        title={settings.gallerySeoTitle || "Galéria"}
        description={settings.gallerySeoDescription || "Vizuálne zážitky z Cesty básnikov. Objavte krásu sôch, prírody a nezabudnuteľných momentov."}
      />
      <div className="animate-fade-in">
        <header className="section-padding bg-secondary text-center">
          <div className="container">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-5xl font-bold md:text-6xl"
            >
              Galéria
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 max-w-3xl mx-auto text-body"
            >
              Vizuálne zážitky z Cesty básnikov. Objavte krásu sôch, prírody a nezabudnuteľných momentov.
            </motion.p>
          </div>
        </header>
        <section className="section-padding container">
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-w-1 aspect-h-1 overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-white text-sm">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={filteredImages.map(img => ({ src: img.src, alt: img.alt, title: img.alt }))}
        index={lightboxIndex}
      />
    </>
  );
}