import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Mountain, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { useSettingsStore } from "@/stores/settingsStore";
export function MapPage() {
  const settings = useSettingsStore((state) => state.settings);
  const mapCenter = settings.mapCoordinates;
  const googleMapsEmbedUrl = settings.mapEmbedUrl;
  return (
    <>
      <SEO
        title={settings.mapSeoTitle || "Mapa a zastávky"}
        description={settings.mapSeoDescription || "Naplánujte si svoju cestu po stopách básnikov. Tu nájdete interaktívnu mapu a všetky praktické informácie."}
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
              Mapa a zastávky
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 max-w-3xl mx-auto text-body"
            >
              Naplánujte si svoju cestu po stopách básnikov. Tu nájdete interaktívnu mapu a všetky praktické informácie.
            </motion.p>
          </div>
        </header>
        <section className="section-padding container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="lg:col-span-2 h-[600px] rounded-lg overflow-hidden shadow-lg z-10 border"
            >
              <iframe
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Cesty básnikov"
              ></iframe>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-3xl">Praktické info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">D��žka trasy</h3>
                      <p className="text-muted-foreground">cca 15 km</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Predpokladaný čas</h3>
                      <p className="text-muted-foreground">4-5 hodín</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mountain className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Terén</h3>
                      <p className="text-muted-foreground">Stredne náročný, lesné chodníky</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Navigation className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">GPS Súradnice</h3>
                      <p className="text-muted-foreground text-sm">{mapCenter.join(', ')} (Štart)</p>
                    </div>
                  </div>
                  <Button asChild size="lg" className="w-full group">
                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${mapCenter[0]},${mapCenter[1]}`} target="_blank" rel="noopener noreferrer">
                      Otvoriť v Google Maps <Navigation className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}