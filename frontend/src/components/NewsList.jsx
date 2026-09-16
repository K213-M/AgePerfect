import { useEffect, useState } from 'react';
import { Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api.js';

export default function NewsList({ limit }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getNews()
      .then((data) => {
        setNews(limit ? data.slice(0, limit) : data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [limit]);

  if (loading) return <div className="text-center py-8 text-gray-500">Loading news...</div>;
  if (news.length === 0) return <div className="text-center py-8 text-gray-500">No news available yet.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <div key={item.id} className="card overflow-hidden">
          {item.image_url ? (
            <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
          ) : (
            <div className="w-full h-48 bg-navy-100 flex items-center justify-center">
              <Newspaper className="w-12 h-12 text-navy-300" />
            </div>
          )}
          <div className="p-5">
            <p className="text-xs text-gold-600 font-medium mb-1">
              {item.published_date ? new Date(item.published_date).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
            </p>
            <h3 className="font-bold text-navy-900 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-3">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
