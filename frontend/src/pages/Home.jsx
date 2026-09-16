import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  ArrowRight, GraduationCap, Users, Award, BookOpen,
  CheckCircle, TrendingUp, Phone, MapPin, Sparkles
} from 'lucide-react';
import { api } from '../lib/api.js';
import CourseList from '../components/CourseList.jsx';
import TeacherList from '../components/TeacherList.jsx';
import NewsList from '../components/NewsList.jsx';
import GalleryGrid from '../components/GalleryGrid.jsx';
import TestimonialList from '../components/TestimonialList.jsx';

export default function Home() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    api.getSettings().then(setSettings).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-900 text-white overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #d4af37 0%, transparent 50%), radial-gradient(circle at 80% 80%, #d4af37 0%, transparent 40%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 rounded-full px-4 py-1.5 mb-6">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span className="text-gold-400 text-sm font-medium">Welcome to {settings.academy_name || 'Sindh Academy Nabsir Road'}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-4">
                Quality Education for a <span className="text-gold-400">Brighter Future.</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                Led by {settings.founder_name || 'Sir Dasrat'}, our academy provides exceptional learning experiences that shape confident, capable, and successful students.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/admission" className="btn-primary justify-center">
                  Apply Online Admission <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/about" className="btn-secondary justify-center">
                  Explore Our Academy
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center animate-scale-in">
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 p-1.5">
                  <div className="w-full h-full rounded-full bg-navy-800 flex items-center justify-center">
                    <div className="text-center">
                      <GraduationCap className="w-24 h-24 text-gold-400 mx-auto mb-4" />
                      <p className="text-gold-400 font-display text-xl">{settings.founder_name || 'Sir Dasrat'}</p>
                      <p className="text-gray-400 text-sm">Founder & Principal</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center shadow-xl">
                  <Award className="w-10 h-10 text-navy-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 -mt-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: 'Students Enrolled', value: '—' },
              { icon: BookOpen, label: 'Courses Offered', value: '—' },
              { icon: Award, label: 'Years of Excellence', value: '—' },
              { icon: TrendingUp, label: 'Success Rate', value: '—' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-navy-50 hover:bg-navy-100 transition-colors">
                <stat.icon className="w-8 h-8 text-gold-500 mx-auto mb-3" />
                <p className="text-2xl font-bold text-navy-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-xs text-gray-400 mt-1">Updated by academy</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Our Courses</h2>
          <p className="section-subtitle">Comprehensive academic programs designed to nurture every student's potential.</p>
          <CourseList limit={3} />
          <div className="text-center mt-8">
            <Link to="/academics" className="btn-navy">View All Courses <ArrowRight className="w-5 h-5" /></Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-display">Why Choose Us</h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">What makes {settings.academy_name || 'Sindh Academy'} the right choice for your child's education.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'Quality Education', desc: 'Expert-led instruction with a focus on conceptual understanding and practical application.' },
              { icon: Users, title: 'Experienced Faculty', desc: 'Dedicated teachers committed to each student\'s individual growth and success.' },
              { icon: Award, title: 'Proven Results', desc: 'A track record of academic excellence and student achievements across all levels.' },
              { icon: CheckCircle, title: 'Safe Environment', desc: 'A secure and supportive campus where students feel valued and encouraged.' },
              { icon: TrendingUp, title: 'Modern Curriculum', desc: 'Up-to-date learning materials aligned with current educational standards.' },
              { icon: Sparkles, title: 'Personal Attention', desc: 'Small class sizes ensuring every student gets the attention they deserve.' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                <div className="w-12 h-12 rounded-lg bg-gold-500/20 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Our Teachers & Faculty</h2>
          <p className="section-subtitle">Meet the dedicated educators who shape our students' futures.</p>
          <TeacherList limit={3} />
          <div className="text-center mt-8">
            <Link to="/teachers" className="btn-navy">Meet All Teachers <ArrowRight className="w-5 h-5" /></Link>
          </div>
        </div>
      </section>

      {/* Student Success */}
      <section className="py-16 bg-gradient-to-br from-navy-50 to-gold-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4 font-display">Student Success Stories</h2>
              <p className="text-gray-600 mb-6">
                At {settings.academy_name || 'Sindh Academy'}, we believe every student has the potential to excel. Our approach combines rigorous academics with personal mentorship, creating an environment where students don't just learn — they thrive.
              </p>
              <ul className="space-y-3 mb-8">
                {['Personalized learning paths', 'Regular progress monitoring', 'Strong parent-teacher communication', 'Focus on character building'].map((point, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-500 shrink-0" />
                    <span className="text-navy-800">{point}</span>
                  </li>
                ))}
              </ul>
              <Link to="/testimonials" className="btn-primary">Read Testimonials <ArrowRight className="w-5 h-5" /></Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['Excellence', 'Dedication', 'Integrity', 'Growth'].map((word, i) => (
                <div key={i} className={`p-6 rounded-xl text-center ${i % 2 === 0 ? 'bg-navy-900 text-white' : 'bg-gold-500 text-navy-900'}`}>
                  <p className="text-2xl font-bold font-display">{word}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">News & Announcements</h2>
          <p className="section-subtitle">Stay updated with the latest happenings at our academy.</p>
          <NewsList limit={3} />
          <div className="text-center mt-8">
            <Link to="/news" className="btn-navy">View All News <ArrowRight className="w-5 h-5" /></Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Photo Gallery</h2>
          <p className="section-subtitle">A glimpse into life at our academy.</p>
          <GalleryGrid limit={8} />
          <div className="text-center mt-8">
            <Link to="/gallery" className="btn-navy">View Full Gallery <ArrowRight className="w-5 h-5" /></Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Student Testimonials</h2>
          <p className="section-subtitle">Hear what our students and parents have to say.</p>
          <TestimonialList limit={4} />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Ready to Join Our Academy?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Take the first step towards a brighter future. Apply for admission online or contact us for more information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/admission" className="btn-primary justify-center">Apply Online <ArrowRight className="w-5 h-5" /></Link>
            <Link to="/contact" className="btn-secondary justify-center">Contact Us</Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            {settings.contact_phone && (
              <a href={`tel:${settings.contact_phone}`} className="flex items-center gap-2 text-gray-300 hover:text-gold-400 transition-colors">
                <Phone className="w-4 h-4" /> {settings.contact_phone}
              </a>
            )}
            <span className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-4 h-4" /> {settings.contact_address || 'Nabsir Road, Sindh, Pakistan'}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
