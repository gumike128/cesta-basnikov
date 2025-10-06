import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { EventForm } from './EventForm';
import { EventFormValues } from '@/lib/validators/eventValidator';
import { useContentStore } from '@/stores/contentStore';
import { toast } from 'sonner';
import { Event } from '@/stores/initialData';
interface EditEventSheetProps {
  event: Event | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export function EditEventSheet({ event, isOpen, onOpenChange }: EditEventSheetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateEvent = useContentStore((state) => state.updateEvent);
  const handleSubmit = (data: EventFormValues) => {
    if (!event) return;
    setIsSubmitting(true);
    try {
      updateEvent({ ...data, id: event.id });
      toast.success(`Podujatie "${data.title}" bolo úspešne aktualizované.`);
      onOpenChange(false);
    } catch (error) {
      toast.error('Nepodarilo sa aktualizovať podujatie.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-[90vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Upraviť podujatie</SheetTitle>
          <SheetDescription>
            Aktualizujte údaje o podujatí.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          {event && <EventForm onSubmit={handleSubmit} defaultValues={event} isSubmitting={isSubmitting} />}
        </div>
      </SheetContent>
    </Sheet>
  );
}