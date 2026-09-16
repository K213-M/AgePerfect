import { useEffect, useState } from 'react';
import { BookOpen, Clock } from 'lucide-react';
import { api } from '../lib/api.js';

export default function CourseList({ limit }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCourses()
      .then((data) => {
        setCourses(limit ? data.slice(0, limit) : data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [limit]);

  if (loading) return <div className="text-center py-8 text-gray-500">Loading courses...</div>;
  if (courses.length === 0) return <div className="text-center py-8 text-gray-500">No courses available yet.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div key={course.id} className="card p-6 hover:border-gold-400 border-2 border-transparent">
          <div className="w-12 h-12 rounded-lg bg-navy-900 flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-gold-400" />
          </div>
          <h3 className="text-lg font-bold text-navy-900 mb-2">{course.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{course.description || 'Description coming soon.'}</p>
          {course.duration && (
            <div className="flex items-center gap-1.5 text-sm text-gold-600 font-medium">
              <Clock className="w-4 h-4" />
              {course.duration}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
