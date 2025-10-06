import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Feather, GalleryHorizontal, Calendar, BarChart3 } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { useContentStore } from '@/stores/contentStore';
export function AdminDashboardPage() {
  const poetsCount = useContentStore((state) => state.poets.length);
  const galleryImagesCount = useContentStore((state) => state.galleryImages.length);
  const eventsCount = useContentStore((state) => state.events.length);
  const summaryCards = [
    {
      title: 'Básnici',
      count: poetsCount,
      icon: Feather,
      link: '/admin/poets',
      color: 'text-sky-500',
    },
    {
      title: 'Obrázky v galérii',
      count: galleryImagesCount,
      icon: GalleryHorizontal,
      link: '/admin/gallery',
      color: 'text-emerald-500',
    },
    {
      title: 'Podujatia',
      count: eventsCount,
      icon: Calendar,
      link: '/admin/events',
      color: 'text-amber-500',
    },
    {
      title: 'Návštevnosť (7 dní)',
      count: '1.5k', // Mock data
      icon: BarChart3,
      link: '/admin/analytics',
      color: 'text-indigo-500',
    },
  ];
  return (
    <>
      <SEO title="Admin Dashboard" description="Prehľad obsahu na stránke Cesta básnikov." />
      <div className="space-y-8">
        <h1 className="font-display text-4xl font-bold">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <Card key={card.title} className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className={`h-5 w-5 text-muted-foreground ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.count}</div>
                <Link to={card.link} className="text-xs text-muted-foreground flex items-center gap-1 hover:text-primary">
                  Spravovať <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold mb-4">Rýchle akcie</h2>
          <p className="text-muted-foreground">
            Vitajte v administrácii Cesty básnikov. Použite navigáciu naľavo pre správu obsahu.
          </p>
        </div>
      </div>
    </>
  );
}