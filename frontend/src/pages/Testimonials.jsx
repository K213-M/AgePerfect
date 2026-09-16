import TestimonialList from '../components/TestimonialList.jsx';
import { PageHeader } from './Academics.jsx';

export default function Testimonials() {
  return (
    <div>
      <PageHeader title="Student Testimonials" subtitle="What our students and parents say about us" />
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialList />
        </div>
      </section>
    </div>
  );
}
