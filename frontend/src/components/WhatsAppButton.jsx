import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { api } from '../lib/api.js';

export default function WhatsAppButton() {
  const [number, setNumber] = useState('');

  useEffect(() => {
    api.getSettings().then((s) => setNumber(s.whatsapp_number || '')).catch(() => {});
  }, []);

  if (!number) return null;

  const cleanNumber = number.replace(/[^0-9]/g, '');
  const fullNumber = cleanNumber.startsWith('0') ? '92' + cleanNumber.slice(1) : cleanNumber;

  return (
    <a
      href={`https://wa.me/${fullNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
}
