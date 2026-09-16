import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Send, Loader } from 'lucide-react';
import { api } from '../lib/api.js';
import { PageHeader } from './Academics.jsx';

export default function Contact() {
  const [settings, setSettings] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    api.getSettings().then(setSettings).catch(() => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate send — contact form messages are stored by admin in the future
    setTimeout(() => {
      setSending(false);
      setSent(true);
      e.target.reset();
    }, 1000);
  };

  return (
    <div>
      <PageHeader title="Contact Us" subtitle="We'd love to hear from you" />
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-6 font-display">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <MapPin className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-navy-900">Address</p>
                    <p className="text-gray-600 text-sm">{settings.contact_address || 'Nabsir Road, Sindh, Pakistan'}</p>
                  </div>
                </div>
                {settings.contact_phone && (
                  <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                    <Phone className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-navy-900">Phone</p>
                      <a href={`tel:${settings.contact_phone}`} className="text-gray-600 text-sm hover:text-gold-600">{settings.contact_phone}</a>
                    </div>
                  </div>
                )}
                {settings.contact_email && (
                  <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                    <Mail className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-navy-900">Email</p>
                      <a href={`mailto:${settings.contact_email}`} className="text-gray-600 text-sm hover:text-gold-600">{settings.contact_email}</a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-4">Thank you for reaching out. We'll get back to you soon.</p>
                  <button onClick={() => setSent(false)} className="btn-secondary">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl font-bold text-navy-900 mb-2">Send a Message</h2>
                  <div>
                    <label className="label-field" htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" required className="input-field" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="label-field" htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required className="input-field" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="label-field" htmlFor="message">Message</label>
                    <textarea id="message" name="message" required rows={4} className="input-field" placeholder="Your message" />
                  </div>
                  <button type="submit" disabled={sending} className="btn-primary w-full justify-center disabled:opacity-50">
                    {sending ? <><Loader className="w-5 h-5 animate-spin" /> Sending...</> : <><Send className="w-5 h-5" /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
