import { useState } from 'react';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { GalleryGrid } from '@/components/admin/gallery/GalleryGrid';
import { AddImageSheet } from '@/components/admin/gallery/AddImageSheet';
export function ManageGalleryPage() {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  return (
    <>
      <SEO title="Správa galérie" description="Spravujte obrázky v galérii." />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-4xl font-bold">Správa galérie</h1>
          <Button onClick={() => setIsAddSheetOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Pridať obrázok
          </Button>
        </div>
        <p className="text-muted-foreground">
          Tu môžete pridávať, upravovať a mazať obrázky v galérii.
        </p>
        <GalleryGrid />
      </div>
      <AddImageSheet isOpen={isAddSheetOpen} onOpenChange={setIsAddSheetOpen} />
    </>
  );
}