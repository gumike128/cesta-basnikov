import { useState } from 'react';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { PoetsDataTable } from '@/components/admin/poets/PoetsDataTable';
import { AddPoetSheet } from '@/components/admin/poets/AddPoetSheet';
export function ManagePoetsPage() {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  return (
    <>
      <SEO title="Správa básnikov" description="Spravujte básnikov a ich diela." />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-4xl font-bold">Správa básnikov</h1>
          <Button onClick={() => setIsAddSheetOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Pridať básnika
          </Button>
        </div>
        <p className="text-muted-foreground">
          Tu môžete pridávať, upravovať a mazať básnikov a ich sochy.
        </p>
        <PoetsDataTable />
      </div>
      <AddPoetSheet isOpen={isAddSheetOpen} onOpenChange={setIsAddSheetOpen} />
    </>
  );
}