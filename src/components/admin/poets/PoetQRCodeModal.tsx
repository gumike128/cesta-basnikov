import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Poet } from '@/stores/initialData';
import { Download } from 'lucide-react';
interface PoetQRCodeModalProps {
  poet: Poet | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export function PoetQRCodeModal({ poet, isOpen, onOpenChange }: PoetQRCodeModalProps) {
  if (!poet) return null;
  // Create a deep link to the poet's page which will trigger the modal and audio
  const deepLinkUrl = `${window.location.origin}/basnici/${poet.id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(deepLinkUrl)}`;
  const handleDownload = () => {
    fetch(qrCodeUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `qr-code-${poet.name.toLowerCase().replace(/\s+/g, '-')}.png`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      })
      .catch(err => console.error('QR Code download failed:', err));
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">QR Kód pre {poet.name}</DialogTitle>
          <DialogDescription>
            Naskenujte tento kód pre otvorenie stránky básnika a vypočutie audio nahrávky.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-6 py-4">
          <div className="rounded-lg border p-2 bg-white">
            <img src={qrCodeUrl} alt={`QR Kód pre ${poet.name}`} width={250} height={250} />
          </div>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Stiahnuť QR Kód
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}