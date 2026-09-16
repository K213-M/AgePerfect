import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertCircle, Loader, Send } from 'lucide-react';
import { api } from '../lib/api.js';
import { PageHeader } from './Academics.jsx';

export default function Admission() {
  const [settings, setSettings] = useState({});
  const [courses, setCourses] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.getSettings(), api.getCourses()])
      .then(([s, c]) => { setSettings(s); setCourses(c); })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(null);

    const formData = new FormData(e.target);
    try {
      const result = await api.submitApplication(formData);
      setSuccess(result.applicationId);
      e.target.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div>
        <PageHeader title="Online Admission" subtitle="Apply for admission to Sindh Academy Nabsir Road" />
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Application Submitted Successfully</h2>
              <p className="text-gray-600 mb-6">Your application has been received. Please save your Application ID for future reference.</p>
              <div className="bg-navy-50 rounded-lg p-6 mb-6">
                <p className="text-sm text-gray-500 mb-1">Your Application ID</p>
                <p className="text-2xl font-bold text-navy-900 font-display tracking-wider">{success}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/check-status" className="btn-primary justify-center">Check Application Status</Link>
                <button onClick={() => setSuccess(null)} className="btn-secondary justify-center">Submit Another Application</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const admissionClosed = settings.admission_open === 'false';

  return (
    <div>
      <PageHeader title="Online Admission" subtitle="Apply for admission to Sindh Academy Nabsir Road" />
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {admissionClosed && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <p className="text-red-700 text-sm">Admissions are currently closed. Please check back later or contact the academy for more information.</p>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-5">
            <h2 className="text-xl font-bold text-navy-900 mb-2">Student Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label-field" htmlFor="student_name">Student Full Name *</label>
                <input id="student_name" name="student_name" type="text" required className="input-field" placeholder="Enter student's full name" />
              </div>
              <div>
                <label className="label-field" htmlFor="father_name">Father's Name *</label>
                <input id="father_name" name="father_name" type="text" required className="input-field" placeholder="Enter father's name" />
              </div>
              <div>
                <label className="label-field" htmlFor="date_of_birth">Date of Birth *</label>
                <input id="date_of_birth" name="date_of_birth" type="date" required className="input-field" />
              </div>
              <div>
                <label className="label-field" htmlFor="gender">Gender *</label>
                <select id="gender" name="gender" required className="input-field">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <h2 className="text-xl font-bold text-navy-900 pt-2">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label-field" htmlFor="parent_mobile">Parent Mobile Number *</label>
                <input id="parent_mobile" name="parent_mobile" type="tel" required className="input-field" placeholder="03XX-XXXXXXX" />
              </div>
              <div>
                <label className="label-field" htmlFor="student_mobile">Student Mobile Number</label>
                <input id="student_mobile" name="student_mobile" type="tel" className="input-field" placeholder="03XX-XXXXXXX (optional)" />
              </div>
            </div>
            <div>
              <label className="label-field" htmlFor="address">Address *</label>
              <textarea id="address" name="address" required rows={2} className="input-field" placeholder="Enter complete address" />
            </div>

            <h2 className="text-xl font-bold text-navy-900 pt-2">Academic Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label-field" htmlFor="previous_school">Previous School</label>
                <input id="previous_school" name="previous_school" type="text" className="input-field" placeholder="Previous school name (optional)" />
              </div>
              <div>
                <label className="label-field" htmlFor="course_applied">Class / Course Applying For *</label>
                <select id="course_applied" name="course_applied" required className="input-field">
                  <option value="">Select class/course</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="label-field" htmlFor="academic_session">Academic Session *</label>
                <input id="academic_session" name="academic_session" type="text" required className="input-field" placeholder="e.g. 2026-2027" defaultValue="2026-2027" />
              </div>
              <div>
                <label className="label-field" htmlFor="previous_marks">Previous Marks / Grade</label>
                <input id="previous_marks" name="previous_marks" type="text" className="input-field" placeholder="e.g. 85% or A (optional)" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-navy-900 pt-2">Optional Documents</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label-field" htmlFor="photo">Student Photo (optional)</label>
                <input id="photo" name="photo" type="file" accept="image/*" className="input-field" />
              </div>
              <div>
                <label className="label-field" htmlFor="documents">Documents (optional)</label>
                <input id="documents" name="documents" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="input-field" />
              </div>
            </div>

            <button type="submit" disabled={submitting || admissionClosed} className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? (<><Loader className="w-5 h-5 animate-spin" /> Submitting...</>) : (<><Send className="w-5 h-5" /> Submit Application</>)}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
