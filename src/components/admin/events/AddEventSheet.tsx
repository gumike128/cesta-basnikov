import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { EventForm } from './EventForm';
import { EventFormValues } from '@/lib/validators/eventValidator';
import { useContentStore } from '@/stores/contentStore';
import { toast } from 'sonner';
interface AddEventSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export function AddEventSheet({ isOpen, onOpenChange }: AddEventSheetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addEvent = useContentStore((state) => state.addEvent);
  const handleSubmit = (data: EventFormValues) => {
    setIsSubmitting(true);
    try {
      addEvent(data);
      toast.success(`Podujatie "${data.title}" bolo úspešne pridané.`);
      onOpenChange(false);
    } catch (error) {
      toast.error('Nepodarilo sa pridať podujatie.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-[90vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Pridať nové podujatie</SheetTitle>
          <SheetDescription>
            Vyplňte údaje o novom podujatí.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <EventForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </SheetContent>
    </Sheet>
  );
}