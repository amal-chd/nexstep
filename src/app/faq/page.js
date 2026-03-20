"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: "What is Nursing Ausbildung in Germany?",
      a: "Nursing Ausbildung is a 3-year vocational training program where you combine classroom study with paid hospital work. It is tuition-free, and you receive a monthly stipend (approx. EUR 1,100–1,400). Upon completion, you get a state-recognized nursing certificate valid across the EU."
    },
    {
      q: "Do I need to know German to apply?",
      a: "Yes, German language proficiency is mandatory. Most Ausbildung programs require B1 level and hospitals require B2 for direct recruitment. We provide structured coaching from zero to B2 level."
    },
    {
      q: "What is the age limit for Nursing Ausbildung?",
      a: "While there is no strict legal age limit, most training institutes prefer candidates between 18 and 35 years old. Candidates above 35 may still be eligible for direct recruitment if they have experience."
    },
    {
      q: "Can I bring my family to Germany as a nurse?",
      a: "Yes! Qualified nurses in Germany can apply for family reunification. Spouses are generally granted work permits, and children are eligible for free education and child benefits (Kindergeld)."
    },
    {
      q: "How long does the entire process take?",
      a: "On average, it takes 10–14 months. This includes learning German (A1 to B2), document verification (Anerkennung), interview rounds, and visa processing."
    },
    {
      q: "How much is the initial investment?",
      a: "The training in Germany (Ausbildung) is tuition-free. Your costs in India include German language coaching, document translation, blocked account (if required) or processing fees. Contact us for a detailed fee structure."
    }
  ];

  return (
    <main>
      <section style={{ background: 'var(--brand-primary)', padding: '80px 0 60px', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="label-red" style={{ justifyContent: 'center', color: 'var(--brand-secondary)' }}>HELP CENTER</div>
            <h1 style={{ fontSize: '48px', color: 'white', marginBottom: '15px' }}>Frequently Asked Questions</h1>
            <p style={{ fontSize: '18px', opacity: 0.85, maxWidth: '600px', margin: '0 auto' }}>Everything you need to know about nursing careers and Ausbildung in Germany.</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-secondary)', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <HelpCircle size={48} color="var(--brand-primary)" style={{ marginBottom: '20px' }} />
          <h2 style={{ fontSize: '30px', marginBottom: '15px' }}>Still Have Questions?</h2>
          <p style={{ color: 'var(--text-gray)', marginBottom: '30px' }}>Our consultants are ready to answer all your specific queries.</p>
          <a href="/contact" className="btn-primary">GET A FREE CONSULTATION ↗</a>
        </div>
      </section>
    </main>
  );
}

function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', padding: '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--brand-primary)', paddingRight: '20px' }}>{faq.q}</span>
        <ChevronDown size={20} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s', flexShrink: 0 }} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ padding: '0 25px 25px', color: 'var(--text-gray)', lineHeight: '1.7', fontSize: '16px' }}>
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
