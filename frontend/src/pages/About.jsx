import { useEffect, useState } from 'react';
import { Target, Eye, Heart, Award } from 'lucide-react';
import { api } from '../lib/api.js';

export default function About() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    api.getSettings().then(setSettings).catch(() => {});
  }, []);

  return (
    <div>
      <PageHeader title="About Our Academy" subtitle="A legacy of educational excellence led by Sir Dasrat" />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-4 font-display">Our Story</h2>
              <p className="text-gray-600 mb-4">
                {settings.academy_name || 'Sindh Academy Nabsir Road'} was founded by {settings.founder_name || 'Sir Dasrat'} with a vision to provide quality education to students in Sindh. Located on Nabsir Road, our academy has been serving the community with dedication and excellence.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that every student deserves access to quality education in a nurturing environment. Our experienced faculty and modern teaching methods ensure that students not only excel academically but also develop as responsible, confident individuals.
              </p>
              <p className="text-gray-600">
                [This is placeholder content. The academy admin can update this text from the admin dashboard.]
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Target, title: 'Our Mission', text: 'To provide accessible, high-quality education that empowers students to achieve their full potential.' },
                { icon: Eye, title: 'Our Vision', text: 'To be a leading educational institution recognized for academic excellence and character building.' },
                { icon: Heart, title: 'Our Values', text: 'Integrity, dedication, respect, and a commitment to continuous improvement.' },
                { icon: Award, title: 'Our Promise', text: 'Every student receives personal attention and quality education in a safe environment.' },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl bg-navy-50 hover:bg-navy-100 transition-colors">
                  <item.icon className="w-8 h-8 text-gold-500 mb-3" />
                  <h3 className="font-bold text-navy-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PageHeader({ title, subtitle }) {
  return (
    <section className="bg-navy-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-3">{title}</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </section>
  );
}
