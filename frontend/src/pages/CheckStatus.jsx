import { useState } from 'react';
import { Search, CheckCircle, Clock, XCircle, Loader } from 'lucide-react';
import { api } from '../lib/api.js';
import { PageHeader } from './Academics.jsx';

export default function CheckStatus() {
  const [applicationId, setApplicationId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!applicationId.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await api.checkStatus(applicationId.trim());
      setResult(data);
    } catch (err) {
      setError(err.message || 'Application not found');
    } finally {
      setLoading(false);
    }
  };

  const statusConfig = {
    pending: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Pending Review' },
    approved: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', label: 'Approved' },
    rejected: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', label: 'Rejected' },
  };

  return (
    <div>
      <PageHeader title="Check Application Status" subtitle="Track your admission application" />
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <label className="label-field" htmlFor="appId">Enter Your Application ID</label>
            <div className="flex gap-3">
              <input
                id="appId"
                type="text"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                placeholder="e.g. SA-2026-12345"
                className="input-field"
              />
              <button type="submit" disabled={loading} className="btn-primary shrink-0 justify-center disabled:opacity-50">
                {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              </button>
            </div>
          </form>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>
          )}

          {result && (
            <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in-up">
              <div className={`p-4 rounded-lg border ${statusConfig[result.status].bg} ${statusConfig[result.status].border} mb-4`}>
                <div className="flex items-center gap-3">
                  {(() => {
                    const StatusIcon = statusConfig[result.status].icon;
                    return <StatusIcon className={`w-6 h-6 ${statusConfig[result.status].color}`} />;
                  })()}
                  <div>
                    <p className="text-sm text-gray-500">Application Status</p>
                    <p className={`font-bold ${statusConfig[result.status].color}`}>{statusConfig[result.status].label}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Application ID:</span><span className="font-medium text-navy-900">{result.application_id}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Student Name:</span><span className="font-medium text-navy-900">{result.student_name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Course:</span><span className="font-medium text-navy-900">{result.course_applied}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Submitted:</span><span className="font-medium text-navy-900">{new Date(result.created_at).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
