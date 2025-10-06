import { useState } from 'react';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { EventsDataTable } from '@/components/admin/events/EventsDataTable';
import { AddEventSheet } from '@/components/admin/events/AddEventSheet';
export function ManageEventsPage() {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  return (
    <>
      <SEO title="Správa podujatí" description="Spravujte podujatia a registrácie." />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-4xl font-bold">Správa podujatí</h1>
          <Button onClick={() => setIsAddSheetOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Pridať podujatie
          </Button>
        </div>
        <p className="text-muted-foreground">
          Tu mô��ete pridávať, upravovať a mazať podujatia.
        </p>
        <EventsDataTable />
      </div>
      <AddEventSheet isOpen={isAddSheetOpen} onOpenChange={setIsAddSheetOpen} />
    </>
  );
}