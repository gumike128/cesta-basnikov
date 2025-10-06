import * as z from 'zod';
export const eventSchema = z.object({
  title: z.string().min(3, { message: 'Názov musí mať aspoň 3 znaky.' }),
  date: z.string().min(5, { message: 'Dátum je povinný.' }),
  description: z.string().min(10, { message: 'Popis musí mať aspoň 10 znakov.' }),
  type: z.enum(['Sympózium', 'Workshop', 'Prehliadka']),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
});
export type EventFormValues = z.infer<typeof eventSchema>;