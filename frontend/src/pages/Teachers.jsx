import TeacherList from '../components/TeacherList.jsx';
import { PageHeader } from './Academics.jsx';

export default function Teachers() {
  return (
    <div>
      <PageHeader title="Teachers & Faculty" subtitle="Meet the dedicated educators behind our students' success" />
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TeacherList />
        </div>
      </section>
    </div>
  );
}
