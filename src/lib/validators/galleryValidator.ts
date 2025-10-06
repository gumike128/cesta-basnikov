import * as z from 'zod';
export const galleryImageSchema = z.object({
  src: z.string().url({ message: 'Prosím, zadajte platnú URL adresu obrázka.' }),
  alt: z.string().min(3, { message: 'Alternatívny text musí mať aspoň 3 znaky.' }),
  category: z.enum(['Sochy', 'Príroda', 'Podujatia', 'Trasa']),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
});
export type GalleryImageFormValues = z.infer<typeof galleryImageSchema>;