import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader } from 'lucide-react';
import { api } from '../../lib/api.js';

export default function CoursesTab() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api.getCourses().then((data) => { setCourses(data); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.target);
    const data = { name: formData.get('name'), description: formData.get('description'), duration: formData.get('duration') };
    try {
      if (editing) {
        await api.updateCourse(editing.id, data);
      } else {
        await api.createCourse(data);
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
    if (!confirm('Delete this course?')) return;
    try {
      await api.deleteCourse(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600 text-sm">{courses.length} courses</p>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary text-sm py-2">
          <Plus className="w-4 h-4" /> Add Course
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-navy-900 mb-1">{course.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{course.description || 'No description'}</p>
              {course.duration && <p className="text-gold-600 text-sm font-medium">{course.duration}</p>}
              <div className="flex gap-2 mt-3">
                <button onClick={() => { setEditing(course); setShowForm(true); }} className="text-navy-600 hover:text-navy-900"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(course.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-navy-900">{editing ? 'Edit Course' : 'Add Course'}</h2>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="label-field">Course Name *</label>
                <input name="name" defaultValue={editing?.name || ''} required className="input-field" />
              </div>
              <div>
                <label className="label-field">Description</label>
                <textarea name="description" defaultValue={editing?.description || ''} rows={3} className="input-field" />
              </div>
              <div>
                <label className="label-field">Duration</label>
                <input name="duration" defaultValue={editing?.duration || ''} className="input-field" placeholder="e.g. 2 years" />
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
