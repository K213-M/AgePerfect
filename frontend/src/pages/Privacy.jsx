import { PageHeader } from './Academics.jsx';

export default function Privacy() {
  return (
    <div>
      <PageHeader title="Privacy Policy" subtitle="How we handle your information" />
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-bold text-navy-900 mb-3">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              Sindh Academy Nabsir Road collects personal information submitted through the online admission form, including student name, parent/guardian name, date of birth, contact numbers, address, and academic history. Optional documents such as student photos and academic records may also be submitted.
            </p>

            <h2 className="text-xl font-bold text-navy-900 mb-3 mt-6">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              The information collected through the admission form is used solely for the purpose of processing admission applications, communicating with applicants and their families, and maintaining academic records. We do not sell, rent, or share your personal information with third parties.
            </p>

            <h2 className="text-xl font-bold text-navy-900 mb-3 mt-6">Data Security</h2>
            <p className="text-gray-600 mb-4">
              All application data is stored securely and is accessible only to authorized academy administrators. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or disclosure.
            </p>

            <h2 className="text-xl font-bold text-navy-900 mb-3 mt-6">Data Retention</h2>
            <p className="text-gray-600 mb-4">
              Application data is retained for the duration necessary to process admissions and maintain academic records. You may request deletion of your application data by contacting the academy administration.
            </p>

            <h2 className="text-xl font-bold text-navy-900 mb-3 mt-6">Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the right to access, correct, or request deletion of your personal information held by the academy. To exercise these rights, please contact the academy administration.
            </p>

            <h2 className="text-xl font-bold text-navy-900 mb-3 mt-6">Contact</h2>
            <p className="text-gray-600 mb-4">
              For any questions or concerns regarding this privacy policy or your personal data, please contact the academy through the Contact Us page.
            </p>

            <p className="text-sm text-gray-400 mt-6">Last updated: {new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
