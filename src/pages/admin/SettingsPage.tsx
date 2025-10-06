import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSettingsStore } from '@/stores/settingsStore';
import { settingsSchema, SettingsFormValues } from '@/lib/validators/settingsValidator';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
export function SettingsPage() {
  const { settings, updateSettings } = useSettingsStore();
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
  });
  const { fields: timelineFields, append: appendTimeline, remove: removeTimeline } = useFieldArray({
    control: form.control,
    name: "timelineEvents",
  });
  const { fields: goalFields, append: appendGoal, remove: removeGoal } = useFieldArray({
    control: form.control,
    name: "goals",
  });
  const { fields: partnerFields, append: appendPartner, remove: removePartner } = useFieldArray({
    control: form.control,
    name: "partners",
  });
  const onSubmit = (data: SettingsFormValues) => {
    try {
      updateSettings(data);
      toast.success('Nastavenia boli úspešne uložené.');
    } catch (error) {
      toast.error('Nepodarilo sa uložiť nastavenia.');
      console.error(error);
    }
  };
  return (
    <>
      <SEO title="Nastavenia" description="Spravujte globálne nastavenia stránky." />
      <div className="space-y-6">
        <h1 className="font-display text-4xl font-bold">Nastavenia stránky</h1>
        <p className="text-muted-foreground">
          Upravte obsah, kontaktné informácie a ďalšie globálne nastavenia.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader><CardTitle>Hlavná stránka (Hero sekcia)</CardTitle><CardDescription>Upravte hlavný titulok a popis na úvodnej stránke.</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="heroTitle" render={({ field }) => (<FormItem><FormLabel>Hlavný titulok</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="heroDescription" render={({ field }) => (<FormItem><FormLabel>Popis pod titulkom</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="heroBackgroundImageUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL adresa obrázka na pozadí (voliteľné)</FormLabel>
                    <FormControl><Input {...field} placeholder="https://images.unsplash.com/..." /></FormControl>
                    <FormDescription>Ak je pole prázdne, použije sa predvolený gradient.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Stránka "O projekte" - História</CardTitle><CardDescription>Spravujte udalosti na časovej osi.</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                {timelineFields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-4 rounded-md border p-4">
                    <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
                      <FormField control={form.control} name={`timelineEvents.${index}.year`} render={({ field }) => (<FormItem><FormLabel>Rok</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name={`timelineEvents.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Titulok</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name={`timelineEvents.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Popis</FormLabel><FormControl><Textarea {...field} rows={2} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                    <Button type="button" variant="destructive" size="icon" onClick={() => removeTimeline(index)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendTimeline({ year: '', title: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Pridať udalosť</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Stránka "O projekte" - Vízia a ciele</CardTitle><CardDescription>Spravujte ciele projektu. Názvy ikon nájdete na lucide.dev.</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                {goalFields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-4 rounded-md border p-4">
                    <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
                      <FormField control={form.control} name={`goals.${index}.icon`} render={({ field }) => (<FormItem><FormLabel>Názov ikony</FormLabel><FormControl><Input {...field} placeholder="Award" /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name={`goals.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Titulok</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name={`goals.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Popis</FormLabel><FormControl><Textarea {...field} rows={2} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                    <Button type="button" variant="destructive" size="icon" onClick={() => removeGoal(index)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendGoal({ icon: '', title: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Pridať cieľ</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Stránka "O projekte" - Partneri</CardTitle><CardDescription>Spravujte zoznam partnerov.</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                {partnerFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-4 rounded-md border p-4">
                    <FormField control={form.control} name={`partners.${index}.name`} render={({ field }) => (<FormItem className="flex-1"><FormLabel>Názov partnera</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <Button type="button" variant="destructive" size="icon" onClick={() => removePartner(index)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendPartner({ name: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Pridať partnera</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Kontaktné informácie</CardTitle><CardDescription>Tieto informácie sa zobrazia na kontaktnej stránke a v pätičke.</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="address" render={({ field }) => (<FormItem><FormLabel>Adresa</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Telefón</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>E-mail</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Sociálne siete</CardTitle><CardDescription>Zadajte plné URL adresy pre vaše profily.</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="facebookUrl" render={({ field }) => (<FormItem><FormLabel>Facebook URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="instagramUrl" render={({ field }) => (<FormItem><FormLabel>Instagram URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="youtubeUrl" render={({ field }) => (<FormItem><FormLabel>YouTube URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Nastavenia mapy</CardTitle><CardDescription>Konfigurácia pre mapu na stránke "Mapa a zastávky".</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="mapEmbedUrl" render={({ field }) => (<FormItem><FormLabel>URL pre vloženie Google Mapy</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormDescription>Získate ju z Google Maps: Zdieľať → Vložiť mapu → Skop��rovať HTML. Vložte sem iba URL z atribútu `src`.</FormDescription><FormMessage /></FormItem>)} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="mapCoordinates.0" render={({ field }) => (<FormItem><FormLabel>Šírka (Lat)</FormLabel><FormControl><Input type="number" step="any" {...field} /></FormControl><FormDescription>Napr. 48.876</FormDescription><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="mapCoordinates.1" render={({ field }) => (<FormItem><FormLabel>Dĺžka (Lon)</FormLabel><FormControl><Input type="number" step="any" {...field} /></FormControl><FormDescription>Napr. 18.456</FormDescription><FormMessage /></FormItem>)} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>SEO Nastavenia pre stránky</CardTitle><CardDescription>Spravujte meta dáta pre jednotlivé stránky webu.</CardDescription></CardHeader>
              <CardContent>
                <Tabs defaultValue="home">
                  <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
                    <TabsTrigger value="home">Úvod</TabsTrigger>
                    <TabsTrigger value="about">O projekte</TabsTrigger>
                    <TabsTrigger value="map">Mapa</TabsTrigger>
                    <TabsTrigger value="poets">Básnici</TabsTrigger>
                    <TabsTrigger value="gallery">Galéria</TabsTrigger>
                    <TabsTrigger value="events">Podujatia</TabsTrigger>
                    <TabsTrigger value="contact">Kontakt</TabsTrigger>
                  </TabsList>
                  {[
                    { page: 'home', title: 'Úvod' }, { page: 'about', title: 'O projekte' }, { page: 'map', title: 'Mapa' },
                    { page: 'poets', title: 'Básnici' }, { page: 'gallery', title: 'Galéria' }, { page: 'events', title: 'Podujatia' },
                    { page: 'contact', title: 'Kontakt' }
                  ].map(({ page, title }) => (
                    <TabsContent key={page} value={page} className="space-y-4 pt-4">
                      <h3 className="font-semibold">SEO pre stránku: {title}</h3>
                      <FormField control={form.control} name={`${page}SeoTitle` as any} render={({ field }) => (<FormItem><FormLabel>SEO Titulok</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name={`${page}SeoDescription` as any} render={({ field }) => (<FormItem><FormLabel>SEO Popis</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name={`${page}SeoKeywords` as any} render={({ field }) => (<FormItem><FormLabel>Kľúčové slová</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Oddeľujte čiarkou.</FormDescription><FormMessage /></FormItem>)} />
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full md:w-auto">
              {form.formState.isSubmitting ? 'Ukladám...' : 'Uložiť všetky nastavenia'}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}