import { useEffect, useState } from 'react';
import { Plus, Trash2, Loader, Image } from 'lucide-react';
import { api } from '../../lib/api.js';

export default function GalleryTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api.getGallery().then((data) => { setItems(data); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.target);
    try {
      await api.createGalleryItem(formData);
      setShowForm(false);
      e.target.reset();
      load();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return;
    try {
      await api.deleteGalleryItem(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600 text-sm">{items.length} images</p>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm py-2">
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden group relative">
              {item.image_url ? (
                <img src={item.image_url} alt={item.title || 'Gallery'} className="w-full aspect-square object-cover" />
              ) : (
                <div className="w-full aspect-square bg-navy-50 flex items-center justify-center"><Image className="w-10 h-10 text-navy-200" /></div>
              )}
              {item.title && <p className="p-2 text-sm font-medium text-navy-900 truncate">{item.title}</p>}
              <button onClick={() => handleDelete(item.id)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-navy-900 mb-4">Add Gallery Image</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="label-field">Image *</label>
                <input name="image" type="file" accept="image/*" required className="input-field" />
              </div>
              <div>
                <label className="label-field">Title</label>
                <input name="title" className="input-field" placeholder="Optional title" />
              </div>
              <div>
                <label className="label-field">Category</label>
                <input name="category" className="input-field" placeholder="e.g. Events, Campus" />
              </div>
              <button type="submit" disabled={saving} className="btn-primary w-full justify-center disabled:opacity-50">
                {saving ? <Loader className="w-5 h-5 animate-spin" /> : 'Upload'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
