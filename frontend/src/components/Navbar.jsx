import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, Phone } from 'lucide-react';
import { api } from '../lib/api.js';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/academics', label: 'Academics' },
  { to: '/teachers', label: 'Teachers' },
  { to: '/admission', label: 'Admission' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/news', label: 'News' },
  { to: '/contact', label: 'Contact' },
  { to: '/faq', label: 'FAQ' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState({});
  const location = useLocation();

  useEffect(() => {
    api.getSettings().then(setSettings).catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy-900 shadow-lg' : 'bg-navy-900/95'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-lg bg-gold-500 flex items-center justify-center group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-navy-900" />
            </div>
            <div className="leading-tight">
              <span className="block text-white font-bold text-sm md:text-base font-display">
                {settings.academy_name || 'Sindh Academy'}
              </span>
              <span className="block text-gold-400 text-xs">Nabsir Road</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-gold-400 bg-white/5'
                      : 'text-gray-200 hover:text-gold-400 hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/admission" className="btn-primary ml-2 text-sm py-2">
              Apply Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-gold-400 bg-white/10'
                        : 'text-gray-200 hover:text-gold-400 hover:bg-white/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link to="/admission" className="btn-primary mt-2 justify-center">
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
