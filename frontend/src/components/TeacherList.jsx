import { useEffect, useState } from 'react';
import { User, X, GraduationCap, BookOpen, Award, ArrowRight } from 'lucide-react';
import { api } from '../lib/api.js';

export default function TeacherList({ limit }) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teachers.map((teacher, i) => (
          <div
            key={teacher.id}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-navy-100 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'both' }}
          >
            {/* Navy header band */}
            <div className="h-20 bg-gradient-to-r from-navy-900 to-navy-700 relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400" />
            </div>

            {/* Circular photo */}
            <div className="flex justify-center -mt-14 mb-2">
              <div className="relative">
                <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-br from-gold-400 to-gold-600 shadow-lg group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden bg-navy-100 ring-2 ring-white">
                    {teacher.photo_url ? (
                      <img
                        src={teacher.photo_url}
                        alt={teacher.name}
                        className="w-full h-full object-cover animate-scale-in"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-12 h-12 text-navy-300" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="px-5 pb-5 text-center">
              <h3 className="font-display text-xl font-bold text-navy-900">{teacher.name}</h3>
              <p className="text-gold-600 text-sm font-semibold tracking-wide uppercase mt-1">
                {teacher.designation || 'Faculty Member'}
              </p>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2">{teacher.bio || 'Bio coming soon.'}</p>

              <button
                onClick={() => setSelected(teacher)}
                className="mt-4 inline-flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gold-500 hover:text-navy-900 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                View Profile <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative h-28 bg-gradient-to-r from-navy-900 to-navy-700">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Photo */}
            <div className="flex justify-center -mt-16 mb-3">
              <div className="w-32 h-32 rounded-full p-1.5 bg-gradient-to-br from-gold-400 to-gold-600 shadow-xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-navy-100 ring-2 ring-white">
                  {selected.photo_url ? (
                    <img src={selected.photo_url} alt={selected.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-14 h-14 text-navy-300" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="px-6 pb-6 text-center">
              <h3 className="font-display text-2xl font-bold text-navy-900">{selected.name}</h3>
              <p className="text-gold-600 font-semibold tracking-wide uppercase text-sm mt-1">
                {selected.designation || 'Faculty Member'}
              </p>

              <div className="mt-4 space-y-3 text-left">
                {selected.bio && (
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                    <p className="text-gray-600 text-sm leading-relaxed">{selected.bio}</p>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                  <p className="text-gray-600 text-sm">Experienced Biology educator dedicated to student success.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                  <p className="text-gray-600 text-sm">Helps students prepare for board exams and entrance tests.</p>
                </div>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="mt-5 bg-navy-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-800 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
