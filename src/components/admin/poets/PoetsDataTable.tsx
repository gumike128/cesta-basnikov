import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, QrCode } from 'lucide-react';
import { useContentStore } from '@/stores/contentStore';
import { Poet } from '@/stores/initialData';
import { EditPoetSheet } from './EditPoetSheet';
import { DeletePoetAlert } from './DeletePoetAlert';
import { PoetQRCodeModal } from './PoetQRCodeModal';
export function PoetsDataTable() {
  const poets = useContentStore((state) => state.poets);
  const [editingPoet, setEditingPoet] = useState<Poet | null>(null);
  const [deletingPoet, setDeletingPoet] = useState<Poet | null>(null);
  const [qrCodePoet, setQrCodePoet] = useState<Poet | null>(null);
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Meno</TableHead>
              <TableHead>Roky</TableHead>
              <TableHead className="text-right">Akcie</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {poets.length > 0 ? (
              poets.map((poet) => (
                <TableRow key={poet.id}>
                  <TableCell className="font-medium">{poet.name}</TableCell>
                  <TableCell>{poet.years}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Otvoriť menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingPoet(poet)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Upraviť
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setQrCodePoet(poet)}>
                          <QrCode className="mr-2 h-4 w-4" />
                          QR Kód
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeletingPoet(poet)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Odstrániť
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  Žiadni básnici neboli nájdení.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <EditPoetSheet
        poet={editingPoet}
        isOpen={!!editingPoet}
        onOpenChange={(isOpen) => !isOpen && setEditingPoet(null)}
      />
      <DeletePoetAlert
        poet={deletingPoet}
        isOpen={!!deletingPoet}
        onOpenChange={(isOpen) => !isOpen && setDeletingPoet(null)}
      />
      <PoetQRCodeModal
        poet={qrCodePoet}
        isOpen={!!qrCodePoet}
        onOpenChange={(isOpen) => !isOpen && setQrCodePoet(null)}
      />
    </>
  );
}