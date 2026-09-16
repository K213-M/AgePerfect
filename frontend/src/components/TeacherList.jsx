import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { api } from '../lib/api.js';

export default function TeacherList({ limit }) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTeachers()
      .then((data) => {
        setTeachers(limit ? data.slice(0, limit) : data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [limit]);

  if (loading) return <div className="text-center py-8 text-gray-500">Loading teachers...</div>;
  if (teachers.length === 0) return <div className="text-center py-8 text-gray-500">No teacher information available yet.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {teachers.map((teacher) => (
        <div key={teacher.id} className="card overflow-hidden">
          <div className="aspect-square bg-navy-100 flex items-center justify-center">
            {teacher.photo_url ? (
              <img src={teacher.photo_url} alt={teacher.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-20 h-20 text-navy-300" />
            )}
          </div>
          <div className="p-5">
            <h3 className="font-bold text-navy-900 text-lg">{teacher.name}</h3>
            <p className="text-gold-600 text-sm font-medium mb-2">{teacher.designation || 'Faculty Member'}</p>
            <p className="text-gray-600 text-sm">{teacher.bio || 'Bio coming soon.'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
