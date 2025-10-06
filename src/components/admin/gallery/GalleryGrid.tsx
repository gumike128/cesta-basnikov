import { useState } from 'react';
import { useContentStore } from '@/stores/contentStore';
import { GalleryImage } from '@/stores/initialData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { EditImageSheet } from './EditImageSheet';
import { DeleteImageAlert } from './DeleteImageAlert';
export function GalleryGrid() {
  const images = useContentStore((state) => state.galleryImages);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [deletingImage, setDeletingImage] = useState<GalleryImage | null>(null);
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {images.map((image) => (
          <Card key={image.id} className="group relative overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="truncate text-sm font-semibold">{image.alt}</p>
              <p className="text-xs text-white/80">{image.category}</p>
            </div>
            <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => setEditingImage(image)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => setDeletingImage(image)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <EditImageSheet
        image={editingImage}
        isOpen={!!editingImage}
        onOpenChange={(isOpen) => !isOpen && setEditingImage(null)}
      />
      <DeleteImageAlert
        image={deletingImage}
        isOpen={!!deletingImage}
        onOpenChange={(isOpen) => !isOpen && setDeletingImage(null)}
      />
    </>
  );
}