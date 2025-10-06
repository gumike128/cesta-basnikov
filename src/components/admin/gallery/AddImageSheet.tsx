import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { GalleryImageForm } from './GalleryImageForm';
import { GalleryImageFormValues } from '@/lib/validators/galleryValidator';
import { useContentStore } from '@/stores/contentStore';
import { toast } from 'sonner';
interface AddImageSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export function AddImageSheet({ isOpen, onOpenChange }: AddImageSheetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addGalleryImage = useContentStore((state) => state.addGalleryImage);
  const handleSubmit = (data: GalleryImageFormValues) => {
    setIsSubmitting(true);
    try {
      addGalleryImage(data);
      toast.success(`Obrázok bol úspešne pridaný do galérie.`);
      onOpenChange(false);
    } catch (error) {
      toast.error('Nepodarilo sa pridať obrázok.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md w-[90vw]">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Pridať nový obrázok</SheetTitle>
          <SheetDescription>
            Vyplňte údaje o novom obrázku do galérie.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <GalleryImageForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </SheetContent>
    </Sheet>
  );
}