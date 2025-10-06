import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Event } from "@/stores/initialData";
import { Calendar } from "@/components/ui/calendar";
import { EventRegistrationModal } from "@/components/EventRegistrationModal";
import { SEO } from "@/components/SEO";
import { useContentStore } from "@/stores/contentStore";
import { useSettingsStore } from "@/stores/settingsStore";
export function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const events = useContentStore((state) => state.events);
  const settings = useSettingsStore((state) => state.settings);
  return (
    <>
      <SEO
        title={settings.eventsSeoTitle || "Podujatia"}
        description={settings.eventsSeoDescription || "Zapojte sa do života Cesty básnikov. Ponúkame program plný sympózií, workshopov a komentovaných prehliadok."}
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
              Podujatia
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 max-w-3xl mx-auto text-body"
            >
              Zapojte sa do života Cesty básnikov. Ponúkame program plný sympózií, workshopov a komentovaných prehliadok.
            </motion.p>
          </div>
        </header>
        <section className="section-padding container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="flex h-full flex-col">
                  <CardHeader>
                    <span className="text-sm font-semibold text-primary">{event.type}</span>
                    <CardTitle className="font-display text-2xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <p className="mt-4 text-muted-foreground">{event.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => setSelectedEvent(event)}>Registrovať sa</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="section-padding bg-secondary">
          <div className="container text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">Kalendár podujatí</h2>
            <p className="mt-4 max-w-2xl mx-auto text-body">
              Prehľad všetkých plánovaných akcií na jednom mieste.
            </p>
            <div className="mt-8 flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border bg-background shadow-md"
              />
            </div>
          </div>
        </section>
      </div>
      <EventRegistrationModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedEvent(null);
          }
        }}
      />
    </>
  );
}