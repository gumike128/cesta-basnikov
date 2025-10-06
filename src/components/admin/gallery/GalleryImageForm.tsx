import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GalleryImage } from '@/stores/initialData';
import { galleryImageSchema, GalleryImageFormValues } from '@/lib/validators/galleryValidator';
import { Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
const categories: GalleryImage['category'][] = ['Sochy', 'Príroda', 'Podujatia', 'Trasa'];
interface GalleryImageFormProps {
  onSubmit: (data: GalleryImageFormValues) => void;
  defaultValues?: Partial<GalleryImage>;
  isSubmitting: boolean;
}
export function GalleryImageForm({ onSubmit, defaultValues, isSubmitting }: GalleryImageFormProps) {
  const form = useForm<GalleryImageFormValues>({
    resolver: zodResolver(galleryImageSchema),
    defaultValues: {
      src: defaultValues?.src || '',
      alt: defaultValues?.alt || '',
      category: defaultValues?.category,
      seoTitle: defaultValues?.seoTitle || '',
      seoDescription: defaultValues?.seoDescription || '',
      seoKeywords: defaultValues?.seoKeywords || '',
    },
  });
  const generateSeo = () => {
    const alt = form.getValues('alt');
    form.setValue('seoTitle', `${alt} | Galéria | Cesta básnikov`);
    form.setValue('seoDescription', `Fotografia z Cesty básnikov: ${alt}.`);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="src" render={({ field }) => (
          <FormItem><FormLabel>URL adresa obrázka</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="alt" render={({ field }) => (
          <FormItem><FormLabel>Alternatívny text (popis)</FormLabel><FormControl><Input placeholder="Socha v prírode..." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="category" render={({ field }) => (
          <FormItem>
            <FormLabel>Kategória</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Vyberte kategóriu" /></SelectTrigger></FormControl>
              <SelectContent>{categories.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <Accordion type="single" collapsible>
          <AccordionItem value="seo">
            <AccordionTrigger>SEO Nastavenia (voliteľné)</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={generateSeo}><Sparkles className="mr-2 h-4 w-4" /> Generovať návrh</Button>
              <FormField control={form.control} name="seoTitle" render={({ field }) => (
                <FormItem><FormLabel>SEO Titulok</FormLabel><FormControl><Input placeholder="Kamenná socha v lese | Galéria" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="seoDescription" render={({ field }) => (
                <FormItem><FormLabel>SEO Popis (Meta Description)</FormLabel><FormControl><Textarea placeholder="Fotografia z Cesty básnikov..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="seoKeywords" render={({ field }) => (
                <FormItem><FormLabel>Kľúčové slová</FormLabel><FormControl><Input placeholder="socha, príroda, galéria..." {...field} /></FormControl><FormDescription>Oddeľujte čiarkou.</FormDescription><FormMessage /></FormItem>
              )} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Ukladám...' : 'Uložiť zmeny'}
        </Button>
      </form>
    </Form>
  );
}