import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { PoetForm } from './PoetForm';
import { PoetFormValues } from '@/lib/validators/poetValidator';
import { useContentStore } from '@/stores/contentStore';
import { toast } from 'sonner';
interface AddPoetSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export function AddPoetSheet({ isOpen, onOpenChange }: AddPoetSheetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addPoet = useContentStore((state) => state.addPoet);
  const handleSubmit = (data: PoetFormValues) => {
    setIsSubmitting(true);
    try {
      addPoet(data);
      toast.success(`Básnik ${data.name} bol úspešne pridaný.`);
      onOpenChange(false);
    } catch (error) {
      toast.error('Nepodarilo sa prida�� básnika.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-[90vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Pridať nového básnika</SheetTitle>
          <SheetDescription>
            Vyplňte údaje o novom básnikovi a jeho soche.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <PoetForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </SheetContent>
    </Sheet>
  );
}