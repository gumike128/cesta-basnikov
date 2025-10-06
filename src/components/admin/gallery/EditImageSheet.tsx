import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { GalleryImageForm } from './GalleryImageForm';
import { GalleryImageFormValues } from '@/lib/validators/galleryValidator';
import { useContentStore } from '@/stores/contentStore';
import { toast } from 'sonner';
import { GalleryImage } from '@/stores/initialData';
interface EditImageSheetProps {
  image: GalleryImage | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export function EditImageSheet({ image, isOpen, onOpenChange }: EditImageSheetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateGalleryImage = useContentStore((state) => state.updateGalleryImage);
  const handleSubmit = (data: GalleryImageFormValues) => {
    if (!image) return;
    setIsSubmitting(true);
    try {
      updateGalleryImage({ ...data, id: image.id });
      toast.success(`Obrázok bol úspešne aktualizovaný.`);
      onOpenChange(false);
    } catch (error) {
      toast.error('Nepodarilo sa aktualizovať obrázok.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md w-[90vw]">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Upraviť obrázok</SheetTitle>
          <SheetDescription>
            Aktualizujte údaje o obrázku v galérii.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          {image && <GalleryImageForm onSubmit={handleSubmit} defaultValues={image} isSubmitting={isSubmitting} />}
        </div>
      </SheetContent>
    </Sheet>
  );
}