import { useEffect, useState } from 'react';
import { Search, Download, Eye, X, Check, Clock, XCircle, FileText } from 'lucide-react';
import { api } from '../../lib/api.js';

export default function ApplicationsTab() {
  const [applications, setApplications] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');

  const load = () => {
    setLoading(true);
    const params = { page, limit: 20 };
    if (search) params.search = search;
    if (statusFilter) params.status = statusFilter;
    if (courseFilter) params.course = courseFilter;
    api.getApplications(params)
      .then((data) => {
        setApplications(data.applications || []);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    api.getCourses().then(setCourses).catch(() => {});
  }, []);

  useEffect(() => { load(); }, [page, search, statusFilter, courseFilter]);

  const updateStatus = async (id, status) => {
    try {
      await api.updateApplicationStatus(id, status);
      setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
      if (selected?.id === id) setSelected((prev) => ({ ...prev, status }));
    } catch (err) {
      alert(err.message);
    }
  };

  const saveNotes = async () => {
    if (!selected) return;
    try {
      await api.updateApplicationNotes(selected.id, notes);
      setSelected((prev) => ({ ...prev, admin_notes: notes }));
    } catch (err) {
      alert(err.message);
    }
  };

  const exportCSV = async () => {
    try {
      const csv = await api.exportApplicationsCSV();
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'applications.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.message);
    }
  };

  const openDetail = (app) => {
    setSelected(app);
    setNotes(app.admin_notes || '');
  };

  const statusBadge = (status) => {
    const config = {
      pending: { bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock },
      approved: { bg: 'bg-green-100', text: 'text-green-700', icon: Check },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle },
    };
    const c = config[status] || config.pending;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
        <c.icon className="w-3 h-3" /> {status}
      </span>
    );
  };

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or application ID..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="input-field pl-10"
            />
          </div>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="input-field md:w-40">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select value={courseFilter} onChange={(e) => { setCourseFilter(e.target.value); setPage(1); }} className="input-field md:w-48">
            <option value="">All Courses</option>
            {courses.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <button onClick={exportCSV} className="btn-navy justify-center shrink-0">
            <Download className="w-5 h-5" /> Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading applications...</div>
        ) : applications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            No applications found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-navy-50 text-navy-800">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">App ID</th>
                  <th className="text-left px-4 py-3 font-semibold">Student</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Course</th>
                  <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Mobile</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="text-left px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-navy-900">{app.application_id}</td>
                    <td className="px-4 py-3">{app.student_name}</td>
                    <td className="px-4 py-3 hidden md:table-cell">{app.course_applied}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">{app.parent_mobile}</td>
                    <td className="px-4 py-3">{statusBadge(app.status)}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => openDetail(app)} className="text-gold-600 hover:text-gold-700">
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {total > 20 && (
          <div className="p-4 flex items-center justify-between text-sm">
            <span className="text-gray-500">{total} total applications</span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1.5 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50">Previous</button>
              <button disabled={page * 20 >= total} onClick={() => setPage(page + 1)} className="px-3 py-1.5 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-navy-900 text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
              <div>
                <h2 className="font-bold text-lg">{selected.student_name}</h2>
                <p className="text-gold-400 text-sm">{selected.application_id}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-300 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <Field label="Father's Name" value={selected.father_name} />
                <Field label="Date of Birth" value={selected.date_of_birth ? new Date(selected.date_of_birth).toLocaleDateString('en-PK') : '-'} />
                <Field label="Gender" value={selected.gender} />
                <Field label="Parent Mobile" value={selected.parent_mobile} />
                <Field label="Student Mobile" value={selected.student_mobile || '-'} />
                <Field label="Previous School" value={selected.previous_school || '-'} />
                <Field label="Course Applied" value={selected.course_applied} />
                <Field label="Academic Session" value={selected.academic_session} />
                <Field label="Previous Marks" value={selected.previous_marks || '-'} />
                <Field label="Submitted" value={new Date(selected.created_at).toLocaleDateString('en-PK')} />
              </div>
              <Field label="Address" value={selected.address} />
              {selected.photo_path && <div><p className="text-sm text-gray-500 mb-1">Student Photo:</p><img src={selected.photo_path} alt="Student" className="w-32 h-32 rounded-lg object-cover" /></div>}
              {selected.documents_path && <div><p className="text-sm text-gray-500 mb-1">Documents:</p>{selected.documents_path.split(', ').map((d, i) => <a key={i} href={d} target="_blank" rel="noopener noreferrer" className="text-gold-600 hover:underline text-sm block">Document {i + 1}</a>)}</div>}

              <div className="pt-4 border-t">
                <p className="text-sm font-semibold text-navy-900 mb-2">Status Actions</p>
                <div className="flex gap-2">
                  <button onClick={() => updateStatus(selected.id, 'approved')} className={`px-4 py-2 rounded-lg text-sm font-medium ${selected.status === 'approved' ? 'bg-green-500 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>Approve</button>
                  <button onClick={() => updateStatus(selected.id, 'pending')} className={`px-4 py-2 rounded-lg text-sm font-medium ${selected.status === 'pending' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'}`}>Pending</button>
                  <button onClick={() => updateStatus(selected.id, 'rejected')} className={`px-4 py-2 rounded-lg text-sm font-medium ${selected.status === 'rejected' ? 'bg-red-500 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}>Reject</button>
                </div>
              </div>
              <div className="pt-4 border-t">
                <label className="label-field" htmlFor="admin_notes">Admin Notes</label>
                <textarea id="admin_notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="input-field" placeholder="Add internal notes..." />
                <button onClick={saveNotes} className="btn-navy mt-2 text-sm py-2">Save Notes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-navy-900">{value || '-'}</p>
    </div>
  );
}
