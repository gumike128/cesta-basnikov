import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useSettingsStore } from "@/stores/settingsStore";
import { IconRenderer } from "@/components/IconRenderer";
import { SEO } from "@/components/SEO";
import { ForestElement } from "@/components/layout/ForestElement";
export function AboutPage() {
  const settings = useSettingsStore((state) => state.settings);
  const { timelineEvents, goals, partners } = settings;
  return (
    <>
      <SEO
        title={settings.aboutSeoTitle || "O projekte"}
        description={settings.aboutSeoDescription || "Spoznajte príbeh, víziu a ľudí, ktorí stoja za unikátnym spojením umenia, prírody a poézie."}
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
              O projekte
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 max-w-3xl mx-auto text-body"
            >
              Spoznajte príbeh, víziu a ľudí, ktorí stoja za unikátnym spojením umenia, prírody a poézie.
            </motion.p>
          </div>
        </header>
        {/* History Timeline Section */}
        <section className="section-padding container relative">
          <ForestElement name="branch" className="absolute top-16 left-0 w-32 h-32 text-primary/10 -rotate-90" />
          <h2 className="text-center font-display text-4xl font-bold md:text-5xl">Naša história</h2>
          <div className="relative mt-12">
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border" aria-hidden="true"></div>
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative mb-12"
              >
                <div className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="w-1/2">
                    <Card className={`p-6 ${index % 2 === 0 ? 'ml-8' : 'mr-8'}`}>
                      <p className="font-bold text-primary text-xl">{event.year}</p>
                      <h3 className="mt-2 text-2xl font-semibold font-display">{event.title}</h3>
                      <p className="mt-2 text-muted-foreground">{event.description}</p>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-8 ring-background"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        {/* Vision and Goals Section */}
        <section className="section-padding bg-secondary relative overflow-hidden">
          <ForestElement name="pine" className="absolute -bottom-12 -right-12 w-64 h-64 text-primary/5 opacity-50" />
          <div className="container">
            <div className="text-center">
              <h2 className="font-display text-4xl font-bold md:text-5xl">Vízia a ciele</h2>
              <p className="mt-4 max-w-3xl mx-auto text-body">
                Našou víziou je vytvoriť trvalú hodnotu, ktorá obohatí kultúrny život, podporí turizmus a posilní vzťah človeka k prírode a umeniu.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {goals.map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center p-8 bg-background/50">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <IconRenderer iconName={goal.icon} className="h-8 w-8" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-semibold">{goal.title}</h3>
                    <p className="mt-2 text-muted-foreground">{goal.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Partners Section */}
        <section className="section-padding container">
          <div className="text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">Partneri a podpora</h2>
            <p className="mt-4 max-w-3xl mx-auto text-body">
              Projekt by nebol možný bez podpory našich partnerov a darcov. Ďakujeme!
            </p>
          </div>
          <div className="mt-12 flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {partners.map((partner, i) => (
              <div key={i} className="h-12 w-40 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                {partner.name}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}