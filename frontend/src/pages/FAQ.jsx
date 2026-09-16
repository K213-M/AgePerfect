import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PageHeader } from './Academics.jsx';

const faqs = [
  { q: 'How can I apply for admission?', a: 'You can apply online through our Online Admission page. Fill out the application form, upload optional documents, and submit. You will receive a unique Application ID to track your status.' },
  { q: 'What documents are required for admission?', a: 'A student photo and previous academic documents are optional but recommended. The required fields include student name, father\'s name, date of birth, parent mobile number, address, and the class you are applying for.' },
  { q: 'How can I check my application status?', a: 'Visit the Check Application Status page and enter your Application ID. You will see the current status of your application (pending, approved, or rejected).' },
  { q: 'What classes/courses are offered?', a: 'We offer classes from primary to intermediate level. Visit our Academics page for the full list of courses and programs.' },
  { q: 'Where is the academy located?', a: 'We are located on Nabsir Road, Sindh, Pakistan. You can find our exact address and contact details on the Contact Us page.' },
  { q: 'How can I contact the academy?', a: 'You can contact us through the Contact Us page, by phone, or via WhatsApp if a WhatsApp number is configured by the academy.' },
  { q: 'Are admissions currently open?', a: 'Admission availability is shown on the Online Admission page. If admissions are closed, a notice will be displayed at the top of the form.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      <PageHeader title="Frequently Asked Questions" subtitle="Find answers to common questions" />
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-navy-900">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gold-500 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5 text-gray-600 text-sm animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
