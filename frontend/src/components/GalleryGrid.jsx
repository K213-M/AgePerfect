import { useEffect, useState } from 'react';
import { Image } from 'lucide-react';
import { api } from '../lib/api.js';

export default function GalleryGrid({ limit }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getGallery()
      .then((data) => {
        setItems(limit ? data.slice(0, limit) : data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [limit]);

  if (loading) return <div className="text-center py-8 text-gray-500">Loading gallery...</div>;
  if (items.length === 0) return <div className="text-center py-8 text-gray-500">No photos available yet.</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.id} className="card overflow-hidden group cursor-pointer">
          <div className="aspect-square overflow-hidden">
            {item.image_url ? (
              <img src={item.image_url} alt={item.title || 'Gallery'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            ) : (
              <div className="w-full h-full bg-navy-100 flex items-center justify-center">
                <Image className="w-10 h-10 text-navy-300" />
              </div>
            )}
          </div>
          {item.title && (
            <div className="p-3">
              <p className="text-sm font-medium text-navy-900">{item.title}</p>
              {item.category && <p className="text-xs text-gray-500">{item.category}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
