import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail, Facebook, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';

export default function Footer() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    api.getSettings().then(setSettings).catch(() => {});
  }, []);

  return (
    <footer className="bg-navy-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gold-500 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-navy-900" />
              </div>
              <div>
                <span className="block text-white font-bold font-display">
                  {settings.academy_name || 'Sindh Academy Nabsir Road'}
                </span>
                <span className="block text-gold-400 text-xs">Founded by {settings.founder_name || 'Sir Dasrat'}</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 max-w-md">
              Quality education for a brighter future. A premium educational institution committed to excellence and student success.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-900 flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-900 flex items-center justify-center transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">About Academy</Link></li>
              <li><Link to="/academics" className="hover:text-gold-400 transition-colors">Academics</Link></li>
              <li><Link to="/admission" className="hover:text-gold-400 transition-colors">Online Admission</Link></li>
              <li><Link to="/teachers" className="hover:text-gold-400 transition-colors">Teachers & Faculty</Link></li>
              <li><Link to="/gallery" className="hover:text-gold-400 transition-colors">Gallery</Link></li>
              <li><Link to="/check-status" className="hover:text-gold-400 transition-colors">Check Application Status</Link></li>
              <li><Link to="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <span>{settings.contact_address || 'Nabsir Road, Sindh, Pakistan'}</span>
              </li>
              {settings.contact_phone && (
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                  <a href={`tel:${settings.contact_phone}`} className="hover:text-gold-400 transition-colors">{settings.contact_phone}</a>
                </li>
              )}
              {settings.contact_email && (
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                  <a href={`mailto:${settings.contact_email}`} className="hover:text-gold-400 transition-colors">{settings.contact_email}</a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} {settings.academy_name || 'Sindh Academy Nabsir Road'}. All rights reserved.</p>
          <Link to="/admin/login" className="hover:text-gold-400 transition-colors text-xs">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
