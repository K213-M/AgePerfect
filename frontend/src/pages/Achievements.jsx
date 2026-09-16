import { useEffect, useState } from 'react';
import { Trophy, Calendar } from 'lucide-react';
import { api } from '../lib/api.js';
import { PageHeader } from './Academics.jsx';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAchievements()
      .then((data) => { setAchievements(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Our Achievements" subtitle="Celebrating excellence and milestones" />
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading achievements...</div>
          ) : achievements.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No achievements published yet. Check back soon.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((a) => (
                <div key={a.id} className="card p-6">
                  <div className="w-12 h-12 rounded-lg bg-gold-100 flex items-center justify-center mb-4">
                    <Trophy className="w-6 h-6 text-gold-600" />
                  </div>
                  <h3 className="font-bold text-navy-900 text-lg mb-2">{a.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{a.description || 'Description coming soon.'}</p>
                  {a.year && (
                    <div className="flex items-center gap-1.5 text-sm text-gold-600 font-medium">
                      <Calendar className="w-4 h-4" /> {a.year}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="mt-8 p-4 rounded-lg bg-navy-50 text-center text-sm text-gray-500">
            Achievement content is managed by the academy admin. Placeholder content shown here will be updated with real information.
          </div>
        </div>
      </section>
    </div>
  );
}
