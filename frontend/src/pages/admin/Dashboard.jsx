import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, BookOpen, Users, Newspaper,
  Image, Star, Trophy, Settings, LogOut, Menu, X, GraduationCap
} from 'lucide-react';
import ApplicationsTab from './ApplicationsTab.jsx';
import CoursesTab from './CoursesTab.jsx';
import TeachersTab from './TeachersTab.jsx';
import NewsTab from './NewsTab.jsx';
import GalleryTab from './GalleryTab.jsx';
import TestimonialsTab from './TestimonialsTab.jsx';
import AchievementsTab from './AchievementsTab.jsx';
import SettingsTab from './SettingsTab.jsx';

const tabs = [
  { id: 'applications', label: 'Applications', icon: FileText },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'teachers', label: 'Teachers', icon: Users },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'testimonials', label: 'Testimonials', icon: Star },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('applications');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
    } else {
      setAuthed(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  if (!authed) return null;

  const renderTab = () => {
    switch (activeTab) {
      case 'applications': return <ApplicationsTab />;
      case 'courses': return <CoursesTab />;
      case 'teachers': return <TeachersTab />;
      case 'news': return <NewsTab />;
      case 'gallery': return <GalleryTab />;
      case 'testimonials': return <TestimonialsTab />;
      case 'achievements': return <AchievementsTab />;
      case 'settings': return <SettingsTab />;
      default: return <ApplicationsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-navy-900 text-white z-50 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-gold-500 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-navy-900" />
            </div>
            <div>
              <p className="font-bold text-sm font-display">Sindh Academy</p>
              <p className="text-gold-400 text-xs">Admin Dashboard</p>
            </div>
          </div>
        </div>
        <nav className="p-3 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-gold-500 text-navy-900' : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 lg:ml-0 min-w-0">
        {/* Top bar */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button className="lg:hidden text-navy-900" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-lg font-bold text-navy-900 capitalize">{tabs.find(t => t.id === activeTab)?.label}</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Admin Panel</span>
            </div>
          </div>
        </header>

        {/* Tab content */}
        <main className="p-4 md:p-6">
          {renderTab()}
        </main>
      </div>
    </div>
  );
}
