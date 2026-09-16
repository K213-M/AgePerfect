import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, Lock, User, Loader, ArrowLeft } from 'lucide-react';
import { api } from '../../lib/api.js';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await api.login(username, password);
      localStorage.setItem('admin_token', result.token);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-gray-400 hover:text-gold-400 flex items-center gap-2 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Website
        </Link>
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-gold-500 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-9 h-9 text-navy-900" />
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Admin Portal</h1>
          <p className="text-gray-400 text-sm mt-1">Sindh Academy Nabsir Road</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-6 md:p-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">{error}</div>
          )}
          <div>
            <label className="label-field" htmlFor="username">Username</label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="input-field pl-10" placeholder="admin" />
            </div>
          </div>
          <div>
            <label className="label-field" htmlFor="password">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field pl-10" placeholder="••••••••" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-50">
            {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'Sign In'}
          </button>
          <p className="text-xs text-gray-400 text-center">Default credentials: admin / admin123 (change after first login)</p>
        </form>
      </div>
    </div>
  );
}
