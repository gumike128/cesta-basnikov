import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Event } from '@/stores/initialData';
import { eventSchema, EventFormValues } from '@/lib/validators/eventValidator';
import { Sparkles } from 'lucide-react';
const eventTypes: Event['type'][] = ['Sympózium', 'Workshop', 'Prehliadka'];
interface EventFormProps {
  onSubmit: (data: EventFormValues) => void;
  defaultValues?: Partial<Event>;
  isSubmitting: boolean;
}
export function EventForm({ onSubmit, defaultValues, isSubmitting }: EventFormProps) {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      date: defaultValues?.date || '',
      description: defaultValues?.description || '',
      type: defaultValues?.type,
      seoTitle: defaultValues?.seoTitle || '',
      seoDescription: defaultValues?.seoDescription || '',
      seoKeywords: defaultValues?.seoKeywords || '',
    },
  });
  const generateSeo = () => {
    const title = form.getValues('title');
    const description = form.getValues('description');
    form.setValue('seoTitle', `${title} | Podujatia | Cesta básnikov`);
    form.setValue('seoDescription', description.substring(0, 160));
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem><FormLabel>Názov podujatia</FormLabel><FormControl><Input placeholder="22. medzinárodné sympózium" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="date" render={({ field }) => (
          <FormItem><FormLabel>Dátum</FormLabel><FormControl><Input placeholder="15. - 25. Júl 2024" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="type" render={({ field }) => (
          <FormItem>
            <FormLabel>Typ podujatia</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Vyberte typ" /></SelectTrigger></FormControl>
              <SelectContent>{eventTypes.map((type) => (<SelectItem key={type} value={type}>{type}</SelectItem>))}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem><FormLabel>Popis</FormLabel><FormControl><Textarea placeholder="Stručný popis podujatia..." rows={5} {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <Accordion type="single" collapsible>
          <AccordionItem value="seo">
            <AccordionTrigger>SEO Nastavenia (voliteľné)</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={generateSeo}><Sparkles className="mr-2 h-4 w-4" /> Generovať návrh</Button>
              <FormField control={form.control} name="seoTitle" render={({ field }) => (
                <FormItem><FormLabel>SEO Titulok</FormLabel><FormControl><Input placeholder="Názov podujatia | Cesta básnikov" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="seoDescription" render={({ field }) => (
                <FormItem><FormLabel>SEO Popis (Meta Description)</FormLabel><FormControl><Textarea placeholder="Popis podujatia pre vyhľadáva��e..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="seoKeywords" render={({ field }) => (
                <FormItem><FormLabel>Kľúčové slová</FormLabel><FormControl><Input placeholder="podujatie, workshop, sympózium..." {...field} /></FormControl><FormDescription>Oddeľujte čiarkou.</FormDescription><FormMessage /></FormItem>
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