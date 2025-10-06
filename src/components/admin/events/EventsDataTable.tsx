import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { useContentStore } from '@/stores/contentStore';
import { Event } from '@/stores/initialData';
import { EditEventSheet } from './EditEventSheet';
import { DeleteEventAlert } from './DeleteEventAlert';
export function EventsDataTable() {
  const events = useContentStore((state) => state.events);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Názov</TableHead>
              <TableHead>Dátum</TableHead>
              <TableHead>Typ</TableHead>
              <TableHead className="text-right">Akcie</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length > 0 ? (
              events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Otvoriť menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingEvent(event)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Upraviť
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeletingEvent(event)} className="text-red-600">
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
                <TableCell colSpan={4} className="h-24 text-center">
                  ��iadne podujatia neboli nájdené.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <EditEventSheet
        event={editingEvent}
        isOpen={!!editingEvent}
        onOpenChange={(isOpen) => !isOpen && setEditingEvent(null)}
      />
      <DeleteEventAlert
        event={deletingEvent}
        isOpen={!!deletingEvent}
        onOpenChange={(isOpen) => !isOpen && setDeletingEvent(null)}
      />
    </>
  );
}