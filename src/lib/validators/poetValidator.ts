import * as z from 'zod';
export const poetSchema = z.object({
  name: z.string().min(2, { message: 'Meno musí mať aspoň 2 znaky.' }),
  years: z.string().min(4, { message: 'Roky sú povinné.' }),
  imageUrl: z.string().url({ message: 'Prosím, zadajte platnú URL adresu obrázka.' }),
  bio: z.string().min(10, { message: 'Biografia musí mať aspoň 10 znakov.' }),
  audioUrl: z.string().url({ message: 'Prosím, zadajte platnú URL adresu audio nahrávky.' }),
  coordinates: z.tuple([
    z.preprocess(
      (val) => (String(val).trim() === '' ? undefined : val),
      z.coerce.number({ invalid_type_error: 'Zadajte platné číslo.' }).min(-90, "Neplatná šírka.").max(90, "Neplatná šírka.")
    ),
    z.preprocess(
      (val) => (String(val).trim() === '' ? undefined : val),
      z.coerce.number({ invalid_type_error: 'Zadajte platné číslo.' }).min(-180, "Neplatná dĺžka.").max(180, "Neplatná dĺžka.")
    ),
  ]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
});
export type PoetFormValues = z.infer<typeof poetSchema>;