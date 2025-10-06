import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { PoetForm } from './PoetForm';
import { PoetFormValues } from '@/lib/validators/poetValidator';
import { useContentStore } from '@/stores/contentStore';
import { toast } from 'sonner';
import { Poet } from '@/stores/initialData';
interface EditPoetSheetProps {
  poet: Poet | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export function EditPoetSheet({ poet, isOpen, onOpenChange }: EditPoetSheetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const updatePoet = useContentStore((state) => state.updatePoet);
  const handleSubmit = (data: PoetFormValues) => {
    if (!poet) return;
    setIsSubmitting(true);
    try {
      updatePoet({ ...data, id: poet.id });
      toast.success(`Údaje básnika ${data.name} boli úspešne aktualizované.`);
      onOpenChange(false);
    } catch (error) {
      toast.error('Nepodarilo sa aktualizovať údaje.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-[90vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Upraviť básnika</SheetTitle>
          <SheetDescription>
            Aktualizujte údaje o básnikovi a jeho soche.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          {poet && <PoetForm onSubmit={handleSubmit} defaultValues={poet} isSubmitting={isSubmitting} />}
        </div>
      </SheetContent>
    </Sheet>
  );
}