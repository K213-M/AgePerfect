import GalleryGrid from '../components/GalleryGrid.jsx';
import { PageHeader } from './Academics.jsx';

export default function Gallery() {
  return (
    <div>
      <PageHeader title="Photo Gallery" subtitle="A glimpse into life at our academy" />
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid />
        </div>
      </section>
    </div>
  );
}
