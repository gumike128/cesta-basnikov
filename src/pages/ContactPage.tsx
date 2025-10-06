import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { SEO } from '@/components/SEO';
import { useSettingsStore } from '@/stores/settingsStore';
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Meno musí mať aspoň 2 znaky.' }),
  email: z.string().email({ message: 'Prosím, zadajte platnú e-mailovú adresu.' }),
  message: z.string().min(10, { message: 'Správa musí mať aspoň 10 znakov.' }),
});
type ContactFormValues = z.infer<typeof contactSchema>;
export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const settings = useSettingsStore((state) => state.settings);
  const contactInfo = [
    { icon: MapPin, text: settings.address },
    { icon: Phone, text: settings.phone },
    { icon: Mail, text: settings.email },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Nepodarilo sa odoslať správu.');
      }
      toast.success('Vaša správa bola úspešne odoslaná!');
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Vyskytla sa chyba.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <SEO
        title={settings.contactSeoTitle || "Kontakt"}
        description={settings.contactSeoDescription || "Máte otázky, nápady alebo sa chcete zapojiť? Neváhajte nás kontaktovať."}
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
              Kontakt
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 max-w-3xl mx-auto text-body"
            >
              Máte otázky, nápady alebo sa chcete zapojiť? Neváhajte nás kontaktovať.
            </motion.p>
          </div>
        </header>
        <section className="section-padding container">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl font-bold">Napíšte nám</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Meno</Label>
                    <Input id="name" type="text" placeholder="Vaše meno" {...register('name')} />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="vas@email.com" {...register('email')} />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Správa</Label>
                  <Textarea id="message" placeholder="Vaša správa..." rows={6} {...register('message')} />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Odosielam...' : 'Odoslať správu'}
                </Button>
              </form>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl font-bold">Kontaktné údaje</h2>
              <div className="mt-8 space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <info.icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <span className="text-lg">{info.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 h-80 w-full rounded-lg bg-muted overflow-hidden border">
                <iframe
                  src={settings.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa lokácie"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}