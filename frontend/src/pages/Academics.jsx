import CourseList from '../components/CourseList.jsx';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function PageHeader({ title, subtitle }) {
  return (
    <section className="bg-navy-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-3">{title}</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </section>
  );
}

export default function Academics() {
  return (
    <div>
      <PageHeader title="Academics & Courses" subtitle="Comprehensive academic programs for every level" />
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CourseList />
          <div className="mt-12 p-8 rounded-xl bg-navy-900 text-white text-center">
            <h2 className="text-2xl font-bold mb-3 font-display">Ready to Enroll?</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">Apply online today and take the first step toward a brighter future.</p>
            <Link to="/admission" className="btn-primary">Apply Now <ArrowRight className="w-5 h-5" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
