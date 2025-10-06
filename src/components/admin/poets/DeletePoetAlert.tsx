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
import { Poet } from '@/stores/initialData';
interface DeletePoetAlertProps {
  poet: Poet | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export function DeletePoetAlert({ poet, isOpen, onOpenChange }: DeletePoetAlertProps) {
  const deletePoet = useContentStore((state) => state.deletePoet);
  const handleDelete = () => {
    if (!poet) return;
    try {
      deletePoet(poet.id);
      toast.success(`Básnik ${poet.name} bol úspešne odstránený.`);
    } catch (error) {
      toast.error('Nepodarilo sa odstrániť básnika.');
      console.error(error);
    }
    onOpenChange(false);
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Naozaj chcete odstrániť tohto básnika?</AlertDialogTitle>
          <AlertDialogDescription>
            Táto akcia je nezvratn��. Záznam o básnikovi "{poet?.name}" bude natrvalo odstránený.
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