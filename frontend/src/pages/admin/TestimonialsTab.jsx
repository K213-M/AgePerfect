import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader, Star } from 'lucide-react';
import { api } from '../../lib/api.js';

export default function TestimonialsTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api.getTestimonials().then((data) => { setItems(data); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.target);
    const data = {
      student_name: formData.get('student_name'),
      course: formData.get('course'),
      testimonial: formData.get('testimonial'),
      rating: parseInt(formData.get('rating')) || 5,
    };
    try {
      if (editing) {
        await api.updateTestimonial(editing.id, data);
      } else {
        await api.createTestimonial(data);
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
    if (!confirm('Delete this testimonial?')) return;
    try {
      await api.deleteTestimonial(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600 text-sm">{items.length} testimonials</p>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary text-sm py-2">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((t) => (
            <div key={t.id} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex gap-1 mb-2">
                {Array.from({ length: t.rating || 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />)}
              </div>
              <p className="text-gray-700 text-sm italic mb-3">"{t.testimonial}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-navy-900">{t.student_name}</p>
                  {t.course && <p className="text-xs text-gray-500">{t.course}</p>}
                </div>
                <div className="flex gap-2">
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
              <h2 className="text-lg font-bold text-navy-900">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="label-field">Student Name *</label>
                <input name="student_name" defaultValue={editing?.student_name || ''} required className="input-field" />
              </div>
              <div>
                <label className="label-field">Course</label>
                <input name="course" defaultValue={editing?.course || ''} className="input-field" placeholder="e.g. Class 10" />
              </div>
              <div>
                <label className="label-field">Testimonial *</label>
                <textarea name="testimonial" defaultValue={editing?.testimonial || ''} required rows={4} className="input-field" />
              </div>
              <div>
                <label className="label-field">Rating</label>
                <select name="rating" defaultValue={editing?.rating || 5} className="input-field">
                  {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}
                </select>
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
