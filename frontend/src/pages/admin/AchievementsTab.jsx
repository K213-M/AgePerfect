import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader, Trophy } from 'lucide-react';
import { api } from '../../lib/api.js';

export default function AchievementsTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api.getAchievements().then((data) => { setItems(data); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.target);
    const data = { title: formData.get('title'), description: formData.get('description'), year: formData.get('year') };
    try {
      if (editing) {
        await api.updateAchievement(editing.id, data);
      } else {
        await api.createAchievement(data);
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
    if (!confirm('Delete this achievement?')) return;
    try {
      await api.deleteAchievement(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600 text-sm">{items.length} achievements</p>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary text-sm py-2">
          <Plus className="w-4 h-4" /> Add Achievement
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((a) => (
            <div key={a.id} className="bg-white rounded-xl shadow-sm p-5">
              <Trophy className="w-8 h-8 text-gold-500 mb-2" />
              <h3 className="font-bold text-navy-900 mb-1">{a.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{a.description || ''}</p>
              {a.year && <p className="text-gold-600 text-sm font-medium">{a.year}</p>}
              <div className="flex gap-2 mt-3">
                <button onClick={() => { setEditing(a); setShowForm(true); }} className="text-navy-600 hover:text-navy-900"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(a.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-navy-900">{editing ? 'Edit Achievement' : 'Add Achievement'}</h2>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="label-field">Title *</label>
                <input name="title" defaultValue={editing?.title || ''} required className="input-field" />
              </div>
              <div>
                <label className="label-field">Description</label>
                <textarea name="description" defaultValue={editing?.description || ''} rows={3} className="input-field" />
              </div>
              <div>
                <label className="label-field">Year</label>
                <input name="year" defaultValue={editing?.year || ''} className="input-field" placeholder="e.g. 2024" />
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
