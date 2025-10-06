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
import { Event } from '@/stores/initialData';
interface DeleteEventAlertProps {
  event: Event | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export function DeleteEventAlert({ event, isOpen, onOpenChange }: DeleteEventAlertProps) {
  const deleteEvent = useContentStore((state) => state.deleteEvent);
  const handleDelete = () => {
    if (!event) return;
    try {
      deleteEvent(event.id);
      toast.success(`Podujatie "${event.title}" bolo úspešne odstránené.`);
    } catch (error) {
      toast.error('Nepodarilo sa odstrániť podujatie.');
      console.error(error);
    }
    onOpenChange(false);
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Naozaj chcete odstrániť toto podujatie?</AlertDialogTitle>
          <AlertDialogDescription>
            Táto akcia je nezvratná. Záznam o podujatí "{event?.title}" bude natrvalo odstránený.
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