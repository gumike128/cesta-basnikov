import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Poet } from "@/stores/initialData";
import { Search, Mic } from "lucide-react";
import { motion } from "framer-motion";
import { PoetDetailModal } from "@/components/PoetDetailModal";
import { useAudioStore } from "@/stores/audioStore";
import { SEO } from "@/components/SEO";
import { useContentStore } from "@/stores/contentStore";
import { useSettingsStore } from "@/stores/settingsStore";
export function PoetsPage() {
  const { poetId } = useParams<{ poetId?: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPoet, setSelectedPoet] = useState<Poet | null>(null);
  const playTrack = useAudioStore((state) => state.playTrack);
  const poets = useContentStore((state) => state.poets);
  const settings = useSettingsStore((state) => state.settings);
  useEffect(() => {
    if (poetId) {
      const poetFromUrl = poets.find(p => p.id === parseInt(poetId, 10));
      if (poetFromUrl) {
        setSelectedPoet(poetFromUrl);
        playTrack(poetFromUrl);
      }
    }
  }, [poetId, poets, playTrack]);
  const filteredPoets = useMemo(() => {
    return poets.filter((poet) =>
      poet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, poets]);
  const handleOpenModal = (poet: Poet) => {
    setSelectedPoet(poet);
  };
  return (
    <>
      <SEO
        title={settings.poetsSeoTitle || "Básnici a sochy"}
        description={settings.poetsSeoDescription || "Zoznámte sa s osobnosťami, ktorých dielo a odkaz formovali slovenskú kultúru a inšpirovali vznik tejto cesty."}
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
              Básnici a sochy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 max-w-3xl mx-auto text-body"
            >
              Zoznámte sa s osobnosťami, ktorých dielo a odkaz formovali slovenskú kultúru a inšpirovali vznik tejto cesty.
            </motion.p>
          </div>
        </header>
        <section className="section-padding container">
          <div className="mb-12 flex flex-col md:flex-row gap-4 justify-center">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Vyhľadať básnika..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPoets.map((poet, index) => (
              <motion.div
                key={poet.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col h-full">
                  <CardHeader className="p-0 cursor-pointer" onClick={() => handleOpenModal(poet)}>
                    <img src={poet.imageUrl} alt={poet.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                  </CardHeader>
                  <CardContent className="p-6 flex-grow cursor-pointer" onClick={() => handleOpenModal(poet)}>
                    <CardTitle className="font-display text-2xl">{poet.name}</CardTitle>
                    <p className="text-muted-foreground">{poet.years}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex justify-between items-center">
                    <Button variant="outline" size="sm" onClick={() => handleOpenModal(poet)}>Biografia</Button>
                    <Button variant="ghost" size="icon" onClick={() => playTrack(poet)} aria-label={`Prehrať báseň od ${poet.name}`}>
                      <Mic className="h-5 w-5 text-primary" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      <PoetDetailModal
        poet={selectedPoet}
        isOpen={!!selectedPoet}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedPoet(null);
          }
        }}
      />
    </>
  );
}