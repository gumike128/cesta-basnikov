import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Event } from '@/stores/initialData';
import { toast } from 'sonner';
import { useState } from 'react';
const registrationSchema = z.object({
  name: z.string().min(2, { message: 'Meno musí mať aspoň 2 znaky.' }),
  email: z.string().email({ message: 'Prosím, zadajte platnú e-mailovú adresu.' }),
});
type RegistrationFormValues = z.infer<typeof registrationSchema>;
interface EventRegistrationModalProps {
  event: Event | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export function EventRegistrationModal({ event, isOpen, onOpenChange }: EventRegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });
  const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, eventId: event?.id, eventTitle: event?.title }),
      });
      if (!response.ok) {
        throw new Error('Registrácia zlyhala. Skúste to prosím znova.');
      }
      toast.success(`Úspešne ste sa zaregistrovali na podujatie: ${event?.title}`);
      onOpenChange(false);
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Vyskytla sa neznáma chyba.');
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!event) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Registrácia na podujatie</DialogTitle>
          <DialogDescription>{event.title}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Meno
              </Label>
              <div className="col-span-3">
                <Input id="name" {...register('name')} />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                E-mail
              </Label>
              <div className="col-span-3">
                <Input id="email" {...register('email')} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registrujem...' : 'Zaregistrovať sa'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}