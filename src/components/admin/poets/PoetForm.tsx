import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Poet } from '@/stores/initialData';
import { poetSchema, PoetFormValues } from '@/lib/validators/poetValidator';
import { Sparkles } from 'lucide-react';
interface PoetFormProps {
  onSubmit: (data: PoetFormValues) => void;
  defaultValues?: Partial<Poet>;
  isSubmitting: boolean;
}
export function PoetForm({ onSubmit, defaultValues, isSubmitting }: PoetFormProps) {
  const form = useForm<PoetFormValues>({
    resolver: zodResolver(poetSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      years: defaultValues?.years || '',
      imageUrl: defaultValues?.imageUrl || '',
      bio: defaultValues?.bio || '',
      audioUrl: defaultValues?.audioUrl || '',
      coordinates: defaultValues?.coordinates || [0, 0],
      seoTitle: defaultValues?.seoTitle || '',
      seoDescription: defaultValues?.seoDescription || '',
      seoKeywords: defaultValues?.seoKeywords || '',
    },
  });
  const generateSeo = () => {
    const name = form.getValues('name');
    const bio = form.getValues('bio');
    form.setValue('seoTitle', `${name} | Cesta básnikov`);
    form.setValue('seoDescription', bio.substring(0, 160));
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem><FormLabel>Meno</FormLabel><FormControl><Input placeholder="Ján Roy" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="years" render={({ field }) => (
          <FormItem><FormLabel>Roky (narodenie-úmrtie)</FormLabel><FormControl><Input placeholder="1884-1929" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="imageUrl" render={({ field }) => (
          <FormItem><FormLabel>URL adresa obrázka</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="audioUrl" render={({ field }) => (
          <FormItem><FormLabel>URL adresa audio nahrávky</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="bio" render={({ field }) => (
          <FormItem><FormLabel>Biografia</FormLabel><FormControl><Textarea placeholder="Stručná biografia básnika..." rows={5} {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="coordinates.0" render={({ field }) => (
            <FormItem><FormLabel>Zemepisná šírka (Lat)</FormLabel><FormControl><Input type="number" step="any" placeholder="48.879" {...field} /></FormControl><FormDescription>Napr. 48.879</FormDescription><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="coordinates.1" render={({ field }) => (
            <FormItem><FormLabel>Zemepisná dĺžka (Lon)</FormLabel><FormControl><Input type="number" step="any" placeholder="18.459" {...field} /></FormControl><FormDescription>Napr. 18.459</FormDescription><FormMessage /></FormItem>
          )} />
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="seo">
            <AccordionTrigger>SEO Nastavenia (voliteľné)</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={generateSeo}><Sparkles className="mr-2 h-4 w-4" /> Generovať návrh</Button>
              <FormField control={form.control} name="seoTitle" render={({ field }) => (
                <FormItem><FormLabel>SEO Titulok</FormLabel><FormControl><Input placeholder="Ján Roy | Cesta básnikov" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="seoDescription" render={({ field }) => (
                <FormItem><FormLabel>SEO Popis (Meta Description)</FormLabel><FormControl><Textarea placeholder="Stručná biografia pre vyh��adávače..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="seoKeywords" render={({ field }) => (
                <FormItem><FormLabel>Kľúčové slová</FormLabel><FormControl><Input placeholder="básnik, socha, biografia..." {...field} /></FormControl><FormDescription>Oddeľujte čiarkou.</FormDescription><FormMessage /></FormItem>
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