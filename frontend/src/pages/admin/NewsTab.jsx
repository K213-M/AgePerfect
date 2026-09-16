import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader, Newspaper } from 'lucide-react';
import { api } from '../../lib/api.js';

export default function NewsTab() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api.getNews().then((data) => { setNews(data); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.target);
    try {
      if (editing) {
        await api.updateNews(editing.id, formData);
      } else {
        await api.createNews(formData);
      }
      setShowForm(false);
      setEditing(null);
      load();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this news item?')) return;
    try {
      await api.deleteNews(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600 text-sm">{news.length} news items</p>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary text-sm py-2">
          <Plus className="w-4 h-4" /> Add News
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {item.image_url ? (
                <img src={item.image_url} alt={item.title} className="w-full h-32 object-cover" />
              ) : (
                <div className="w-full h-32 bg-navy-50 flex items-center justify-center"><Newspaper className="w-10 h-10 text-navy-200" /></div>
              )}
              <div className="p-4">
                <p className="text-xs text-gold-600 mb-1">{item.published_date ? new Date(item.published_date).toLocaleDateString('en-PK') : ''}</p>
                <h3 className="font-bold text-navy-900 text-sm mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs line-clamp-2">{item.content}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => { setEditing(item); setShowForm(true); }} className="text-navy-600 hover:text-navy-900"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-navy-900">{editing ? 'Edit News' : 'Add News'}</h2>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="label-field">Title *</label>
                <input name="title" defaultValue={editing?.title || ''} required className="input-field" />
              </div>
              <div>
                <label className="label-field">Content *</label>
                <textarea name="content" defaultValue={editing?.content || ''} required rows={5} className="input-field" />
              </div>
              <div>
                <label className="label-field">Published Date</label>
                <input name="published_date" type="date" defaultValue={editing?.published_date ? editing.published_date.split('T')[0] : ''} className="input-field" />
              </div>
              <div>
                <label className="label-field">Image</label>
                <input name="image" type="file" accept="image/*" className="input-field" />
              </div>
              <button type="submit" disabled={saving} className="btn-primary w-full justify-center disabled:opacity-50">
                {saving ? <Loader className="w-5 h-5 animate-spin" /> : 'Save'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
