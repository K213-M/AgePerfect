import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { api } from '../lib/api.js';

export default function TestimonialList({ limit }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTestimonials()
      .then((data) => {
        setTestimonials(limit ? data.slice(0, limit) : data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [limit]);

  if (loading) return <div className="text-center py-8 text-gray-500">Loading testimonials...</div>;
  if (testimonials.length === 0) return <div className="text-center py-8 text-gray-500">No testimonials available yet.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {testimonials.map((t) => (
        <div key={t.id} className="card p-6 relative">
          <Quote className="w-10 h-10 text-gold-300 absolute top-4 right-4" />
          <div className="flex gap-1 mb-3">
            {Array.from({ length: t.rating || 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
            ))}
          </div>
          <p className="text-gray-700 mb-4 italic">"{t.testimonial}"</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center text-gold-400 font-bold">
              {t.student_name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-navy-900">{t.student_name}</p>
              {t.course && <p className="text-sm text-gray-500">{t.course}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
