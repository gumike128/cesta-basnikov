import * as z from 'zod';
const timelineEventSchema = z.object({
  year: z.string().min(4, { message: 'Rok musí mať aspoň 4 znaky.' }),
  title: z.string().min(3, { message: 'Titulok musí mať aspoň 3 znaky.' }),
  description: z.string().min(10, { message: 'Popis musí mať aspoň 10 znakov.' }),
});
const goalSchema = z.object({
  icon: z.string().min(2, { message: 'Ikona je povinná.' }),
  title: z.string().min(3, { message: 'Titulok musí mať aspoň 3 znaky.' }),
  description: z.string().min(10, { message: 'Popis musí mať aspoň 10 znakov.' }),
});
const partnerSchema = z.object({
  name: z.string().min(2, { message: 'Názov partnera je povinný.' }),
});
export const settingsSchema = z.object({
  heroTitle: z.string().min(3, { message: 'Titulok musí mať aspoň 3 znaky.' }),
  heroDescription: z.string().min(10, { message: 'Popis musí mať aspoň 10 znakov.' }),
  heroBackgroundImageUrl: z.string().url({ message: 'Prosím, zadajte platnú URL adresu.' }).optional().or(z.literal('')),
  address: z.string().min(5, { message: 'Adresa musí mať aspoň 5 znakov.' }),
  phone: z.string().min(9, { message: 'Telefónne číslo musí mať aspoň 9 znakov.' }),
  email: z.string().email({ message: 'Prosím, zadajte platnú e-mailovú adresu.' }),
  facebookUrl: z.string().url({ message: 'Prosím, zadajte platnú URL adresu.' }).or(z.literal('')),
  instagramUrl: z.string().url({ message: 'Prosím, zadajte platnú URL adresu.' }).or(z.literal('')),
  youtubeUrl: z.string().url({ message: 'Prosím, zadajte platnú URL adresu.' }).or(z.literal('')),
  mapEmbedUrl: z.string().url({ message: 'Prosím, zadajte platnú URL adresu pre vloženie mapy.' }),
  mapCoordinates: z.tuple([
    z.preprocess(
      (val) => (String(val).trim() === '' ? undefined : val),
      z.coerce.number({ invalid_type_error: 'Zadajte platné číslo.' }).min(-90, "Neplatná šírka.").max(90, "Neplatná šírka.")
    ),
    z.preprocess(
      (val) => (String(val).trim() === '' ? undefined : val),
      z.coerce.number({ invalid_type_error: 'Zadajte platné číslo.' }).min(-180, "Neplatná dĺžka.").max(180, "Neplatná dĺžka.")
    ),
  ]),
  timelineEvents: z.array(timelineEventSchema),
  goals: z.array(goalSchema),
  partners: z.array(partnerSchema),
  // SEO Fields
  homeSeoTitle: z.string().optional(),
  homeSeoDescription: z.string().optional(),
  homeSeoKeywords: z.string().optional(),
  aboutSeoTitle: z.string().optional(),
  aboutSeoDescription: z.string().optional(),
  aboutSeoKeywords: z.string().optional(),
  mapSeoTitle: z.string().optional(),
  mapSeoDescription: z.string().optional(),
  mapSeoKeywords: z.string().optional(),
  poetsSeoTitle: z.string().optional(),
  poetsSeoDescription: z.string().optional(),
  poetsSeoKeywords: z.string().optional(),
  gallerySeoTitle: z.string().optional(),
  gallerySeoDescription: z.string().optional(),
  gallerySeoKeywords: z.string().optional(),
  eventsSeoTitle: z.string().optional(),
  eventsSeoDescription: z.string().optional(),
  eventsSeoKeywords: z.string().optional(),
  contactSeoTitle: z.string().optional(),
  contactSeoDescription: z.string().optional(),
  contactSeoKeywords: z.string().optional(),
});
export type SettingsFormValues = z.infer<typeof settingsSchema>;