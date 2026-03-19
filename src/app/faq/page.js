"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FAQPage() {
  const [activeId, setActiveId] = useState(1);

  const faqs = [
    { id: 1, category: 'Nursing Ausbildung', q: 'What is Nursing Ausbildung?', a: 'Nursing Ausbildung is a 3-year vocational nursing training program in Germany. It combines classroom-based theoretical education with practical, hands-on clinical experience in German hospitals. You earn a monthly stipend of EUR 1,000 to EUR 1,400 while training, and upon completion, you receive an EU-recognized nursing qualification.' },
    { id: 2, category: 'Nursing Ausbildung', q: 'Who is eligible for Nursing Ausbildung?', a: 'Candidates who have completed 12 years of schooling (10+2 certificate), are between 18-35 years of age, and can achieve a B1/B2 German language level. No prior nursing degree is required — this is a training program, not a job placement.' },
    { id: 3, category: 'Nursing Ausbildung', q: 'Do I need to pay tuition fees?', a: 'No! The Nursing Ausbildung is completely tuition-free. In fact, you receive a monthly stipend that increases each year: approximately EUR 1,100 in year 1, EUR 1,200 in year 2, and EUR 1,300-1,400 in year 3.' },
    { id: 4, category: 'Nursing Ausbildung', q: 'What happens after completing the Ausbildung?', a: 'After completion, you receive a state-recognized nursing certificate valid across the entire European Union. You can then work as a registered nurse in Germany with a starting salary of EUR 2,800-3,500/month. You can also apply for permanent residency.' },
    { id: 5, category: 'Nurse Recruitment', q: 'How does Direct Nurse Recruitment work?', a: 'For qualified nurses (GNM/BSc/MSc), we handle the full process: qualification recognition (Anerkennung), job matching with German hospitals, visa processing, and relocation support. You receive a direct employment contract with a German hospital.' },
    { id: 6, category: 'Nurse Recruitment', q: 'What is Anerkennung?', a: 'Anerkennung is the official process of getting your Indian nursing qualification recognized by German authorities. Your education is evaluated against German standards. If there are gaps, you may need to pass a knowledge test or complete an adaptation program. NexStep Europe handles this entire process for you.' },
    { id: 7, category: 'Nurse Recruitment', q: 'What salary can I expect as a recruited nurse?', a: 'Recruited nurses in Germany earn EUR 2,800-3,500/month before full recognition. After Anerkennung is complete, salaries rise to EUR 3,500-4,200/month. Additional pay is provided for night shifts, weekends, and holidays. You also receive annual bonuses at many hospitals.' },
    { id: 8, category: 'Language', q: 'What German language level do I need?', a: 'For Nursing Ausbildung, you typically need B1 level. For Direct Recruitment, B2 level is usually required for professional licensing. NexStep Europe provides structured German language training from A1 through B2 to help you meet these requirements.' },
    { id: 9, category: 'Language', q: 'How long does it take to reach B2 level?', a: 'With dedicated, full-time study, most candidates reach B1 in 6-8 months and B2 in 10-14 months. NexStep Europe offers intensive coaching programs with certified German language teachers to ensure you progress efficiently.' },
    { id: 10, category: 'Visa & Documents', q: 'What documents do I need?', a: 'You will need: academic certificates (10th, 12th, nursing degree), German language certificate, CV in German format, motivation letter, valid passport, medical fitness certificate, police clearance certificate, and translated copies of all documents. We assist with preparing and translating everything.' },
    { id: 11, category: 'Family', q: 'Can I bring my family to Germany?', a: 'Yes! Germany offers family reunion visas. Your spouse can also work in Germany. Children receive free education and monthly child benefits of EUR 250 per child. Germany also provides paid maternity/paternity leave. NexStep Europe assists with the complete family relocation process.' },
    { id: 12, category: 'Family', q: 'What about healthcare and social security?', a: 'As a nurse in Germany, you receive comprehensive social security coverage including statutory health insurance, pension contributions, unemployment protection, and long-term care coverage. These benefits extend to your family members as well.' }
  ];

  const categories = [...new Set(faqs.map(f => f.category))];

  return (
    <main>
      {/* Hero */}
      <section style={{ background: 'var(--brand-primary)', padding: '80px 0 60px', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="label-red" style={{ justifyContent: 'center', color: 'var(--brand-secondary)' }}>FAQ</div>
            <h1 style={{ fontSize: '48px', color: 'white', marginBottom: '15px' }}>Frequently Asked Questions</h1>
            <p style={{ fontSize: '18px', opacity: 0.85, maxWidth: '600px', margin: '0 auto' }}>Everything you need to know about nursing careers in Germany.</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          {categories.map((cat, ci) => (
            <div key={ci} style={{ marginBottom: '50px' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '20px', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '4px', height: '28px', background: 'var(--brand-secondary)', borderRadius: '2px', display: 'inline-block' }}></span>
                {cat}
              </h2>
              {faqs.filter(f => f.category === cat).map((faq) => (
                <div key={faq.id} className={`faq-item ${activeId === faq.id ? 'active' : ''}`} style={{ border: '1px solid var(--border-color)', borderRadius: '6px', marginBottom: '10px', overflow: 'hidden' }}>
                  <div
                    className={`faq-question ${activeId === faq.id ? 'active' : ''}`}
                    onClick={() => setActiveId(faq.id === activeId ? null : faq.id)}
                    style={{ padding: '18px 20px', background: activeId === faq.id ? 'rgba(0,177,176,0.05)' : 'white' }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} style={{ transform: activeId === faq.id ? 'rotate(180deg)' : 'none', transition: '0.3s', flexShrink: 0 }} />
                  </div>
                  <div className="faq-answer" style={{ padding: activeId === faq.id ? '0 20px 18px' : '0 20px' }}>
                    <p style={{ color: 'var(--text-gray)', lineHeight: '1.8' }}>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--bg-secondary)', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '32px', marginBottom: '15px' }}>Still Have Questions?</h2>
          <p style={{ color: 'var(--text-gray)', marginBottom: '30px' }}>Book a free consultation call and our team will answer all your questions personally.</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">BOOK FREE CONSULTATION ↗</Link>
            <a href="tel:+919847300744" className="btn-primary" style={{ background: 'var(--brand-secondary)' }}>CALL +91 9847 300 744</a>
          </div>
        </div>
      </section>
    </main>
  );
}
