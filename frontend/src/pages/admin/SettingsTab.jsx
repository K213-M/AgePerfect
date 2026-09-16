import { useEffect, useState } from 'react';
import { Save, Loader, CheckCircle } from 'lucide-react';
import { api } from '../../lib/api.js';

export default function SettingsTab() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.getSettings().then((data) => { setSettings(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const updated = await api.updateSettings(settings);
      setSettings(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-8 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-2xl">
      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center gap-2 text-green-700 text-sm">
          <CheckCircle className="w-5 h-5" /> Settings saved successfully.
        </div>
      )}
      <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm p-6 space-y-5">
        <div>
          <h3 className="font-bold text-navy-900 mb-3">Admission Status</h3>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.admission_open !== 'false'}
              onChange={(e) => handleChange('admission_open', String(e.target.checked))}
              className="w-5 h-5 rounded border-gray-300 text-gold-500 focus:ring-gold-400"
            />
            <span className="text-sm text-navy-800">Admissions are currently open</span>
          </label>
        </div>

        <div className="border-t pt-5">
          <h3 className="font-bold text-navy-900 mb-3">Academy Information</h3>
          <div className="space-y-4">
            <div>
              <label className="label-field">Academy Name</label>
              <input value={settings.academy_name || ''} onChange={(e) => handleChange('academy_name', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="label-field">Founder / Teacher Name</label>
              <input value={settings.founder_name || ''} onChange={(e) => handleChange('founder_name', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="label-field">Location</label>
              <input value={settings.academy_location || ''} onChange={(e) => handleChange('academy_location', e.target.value)} className="input-field" />
            </div>
          </div>
        </div>

        <div className="border-t pt-5">
          <h3 className="font-bold text-navy-900 mb-3">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <label className="label-field">Contact Phone</label>
              <input value={settings.contact_phone || ''} onChange={(e) => handleChange('contact_phone', e.target.value)} className="input-field" placeholder="03XX-XXXXXXX" />
            </div>
            <div>
              <label className="label-field">Contact Email</label>
              <input value={settings.contact_email || ''} onChange={(e) => handleChange('contact_email', e.target.value)} className="input-field" placeholder="info@academy.com" />
            </div>
            <div>
              <label className="label-field">Contact Address</label>
              <textarea value={settings.contact_address || ''} onChange={(e) => handleChange('contact_address', e.target.value)} rows={2} className="input-field" />
            </div>
            <div>
              <label className="label-field">WhatsApp Number</label>
              <input value={settings.whatsapp_number || ''} onChange={(e) => handleChange('whatsapp_number', e.target.value)} className="input-field" placeholder="03XX-XXXXXXX (leave empty to hide WhatsApp button)" />
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary justify-center disabled:opacity-50">
          {saving ? <Loader className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Save Settings</>}
        </button>
      </form>
    </div>
  );
}
