import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useContentStore } from '@/stores/contentStore';
import { toast } from 'sonner';
import { GalleryImage } from '@/stores/initialData';
interface DeleteImageAlertProps {
  image: GalleryImage | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export function DeleteImageAlert({ image, isOpen, onOpenChange }: DeleteImageAlertProps) {
  const deleteGalleryImage = useContentStore((state) => state.deleteGalleryImage);
  const handleDelete = () => {
    if (!image) return;
    try {
      deleteGalleryImage(image.id);
      toast.success(`Obrázok bol úspešne odstránený.`);
    } catch (error) {
      toast.error('Nepodarilo sa odstrániť obrázok.');
      console.error(error);
    }
    onOpenChange(false);
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Naozaj chcete odstrániť tento obrázok?</AlertDialogTitle>
          <AlertDialogDescription>
            Táto akcia je nezvratná. Obrázok "{image?.alt}" bude natrvalo odstránený z galérie.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Zrušiť</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Odstrániť
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}