import { SEO } from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useContentStore } from '@/stores/contentStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
// Mock data for analytics
const trafficData = [
  { name: 'Pred 6 dňami', Návštevy: 120 },
  { name: 'Pred 5 dňami', Návštevy: 190 },
  { name: 'Pred 4 dňami', Návštevy: 210 },
  { name: 'Pred 3 dňami', Návštevy: 180 },
  { name: 'Predvčerom', Návštevy: 250 },
  { name: 'Včera', Návštevy: 230 },
  { name: 'Dnes', Návštevy: 310 },
];
const engagementData = [
  { name: 'Ján Roy', Prehrania: 150 },
  { name: 'Ján Smrek', Prehrania: 210 },
  { name: 'Fraňo Tekel', Prehrania: 90 },
  { name: 'Elena Fiebigová', Prehrania: 120 },
];
const contentPopularityData = [
  { name: 'Básnici', Zobrazenia: 1200 },
  { name: 'Galéria', Zobrazenia: 950 },
  { name: 'Mapa', Zobrazenia: 1500 },
  { name: 'Podujatia', Zobrazenia: 700 },
];
export function AnalyticsPage() {
  const poetsCount = useContentStore((state) => state.poets.length);
  const galleryImagesCount = useContentStore((state) => state.galleryImages.length);
  const eventsCount = useContentStore((state) => state.events.length);
  return (
    <>
      <SEO title="Analytika" description="Prehľad analytických dát stránky Cesta básnikov." />
      <div className="space-y-8">
        <h1 className="font-display text-4xl font-bold">Analytika</h1>
        <p className="text-muted-foreground">Prehľad návštevnosti, popularity obsahu a interakcií používateľov (dáta sú momentálne simulované).</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>Celkový obsah</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center"><span className="text-muted-foreground">Počet básnikov</span> <span className="font-bold">{poetsCount}</span></div>
                    <div className="flex justify-between items-center"><span className="text-muted-foreground">Obrázkov v galérii</span> <span className="font-bold">{galleryImagesCount}</span></div>
                    <div className="flex justify-between items-center"><span className="text-muted-foreground">Počet podujatí</span> <span className="font-bold">{eventsCount}</span></div>
                </CardContent>
            </Card>
             <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Návštevnosť webu (posledných 7 dní)</CardTitle>
                    <CardDescription>Počet unikátnych návštev za deň.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={trafficData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Návštevy" stroke="#e57a44" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Popularita obsahu</CardTitle>
                    <CardDescription>Celkový počet zobrazení jednotlivých sekcií.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={contentPopularityData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" fontSize={12} />
                            <YAxis type="category" dataKey="name" fontSize={12} width={80} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Zobrazenia" fill="#2c3e31" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Prehrania audio nahrávok</CardTitle>
                    <CardDescription>Počet prehratí básní podľa autorov.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={engagementData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" fontSize={12} />
                            <YAxis fontSize={12} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Prehrania" fill="#e57a44" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}