import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Poet } from '@/stores/initialData';
import { AudioPlayer } from './AudioPlayer';
interface PoetDetailModalProps {
  poet: Poet | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export function PoetDetailModal({ poet, isOpen, onOpenChange }: PoetDetailModalProps) {
  if (!poet) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl">{poet.name}</DialogTitle>
          <DialogDescription>{poet.years}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img
              src={poet.imageUrl}
              alt={poet.name}
              className="h-64 w-full max-w-[200px] rounded-md object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-semibold">Biografia</h3>
              <p className="mt-2 text-sm text-muted-foreground">{poet.bio}</p>
            </div>
            <div className="mt-6">
              <AudioPlayer track={poet} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}