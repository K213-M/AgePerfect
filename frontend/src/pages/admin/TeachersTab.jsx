import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader, User } from 'lucide-react';
import { api } from '../../lib/api.js';

export default function TeachersTab() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api.getTeachers().then((data) => { setTeachers(data); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.target);
    try {
      if (editing) {
        await api.updateTeacher(editing.id, formData);
      } else {
        await api.createTeacher(formData);
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
    if (!confirm('Delete this teacher?')) return;
    try {
      await api.deleteTeacher(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600 text-sm">{teachers.length} teachers</p>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary text-sm py-2">
          <Plus className="w-4 h-4" /> Add Teacher
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachers.map((t) => (
            <div key={t.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-square bg-navy-50 flex items-center justify-center">
                {t.photo_url ? <img src={t.photo_url} alt={t.name} className="w-full h-full object-cover" /> : <User className="w-16 h-16 text-navy-200" />}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-navy-900">{t.name}</h3>
                <p className="text-gold-600 text-sm">{t.designation || 'Faculty'}</p>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{t.bio || ''}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => { setEditing(t); setShowForm(true); }} className="text-navy-600 hover:text-navy-900"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(t.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-navy-900">{editing ? 'Edit Teacher' : 'Add Teacher'}</h2>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="label-field">Name *</label>
                <input name="name" defaultValue={editing?.name || ''} required className="input-field" />
              </div>
              <div>
                <label className="label-field">Designation</label>
                <input name="designation" defaultValue={editing?.designation || ''} className="input-field" placeholder="e.g. Subject Teacher" />
              </div>
              <div>
                <label className="label-field">Bio</label>
                <textarea name="bio" defaultValue={editing?.bio || ''} rows={3} className="input-field" />
              </div>
              <div>
                <label className="label-field">Photo</label>
                <input name="photo" type="file" accept="image/*" className="input-field" />
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
