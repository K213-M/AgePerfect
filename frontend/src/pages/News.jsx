import NewsList from '../components/NewsList.jsx';
import { PageHeader } from './Academics.jsx';

export default function News() {
  return (
    <div>
      <PageHeader title="News & Announcements" subtitle="Stay updated with the latest from our academy" />
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsList />
        </div>
      </section>
    </div>
  );
}
