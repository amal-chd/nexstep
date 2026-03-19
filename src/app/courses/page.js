"use client";

import Link from 'next/link';
import { GraduationCap, BookOpen, Clock, Euro, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CoursesPage() {
  const curriculum = [
    { year: 'Year 1', stipend: '~EUR 1,100/month', topics: ['Fundamentals of Nursing', 'Anatomy & Physiology', 'Hygiene & Infection Control', 'Basic Patient Care', 'Medical Terminology in German'] },
    { year: 'Year 2', stipend: '~EUR 1,200/month', topics: ['Internal Medicine Nursing', 'Surgical Nursing', 'Pediatric Care', 'Psychiatry & Mental Health', 'Pharmacology'] },
    { year: 'Year 3', stipend: '~EUR 1,300–1,400/month', topics: ['Intensive & Emergency Care', 'Geriatric Nursing', 'Oncology Basics', 'Palliative Care', 'Final State Examination'] }
  ];

  const requirements = [
    { title: '12 Years of Schooling', desc: '10+2 certificate (any stream). Science background preferred but not mandatory.' },
    { title: 'German Language B1/B2', desc: 'We provide structured coaching from A1 to B2. Most programs require B1 at minimum.' },
    { title: 'Age 18–35 Years', desc: 'Most training institutes prefer candidates within this age range.' },
    { title: 'Medical Fitness', desc: 'A medical certificate proving physical and mental fitness for nursing work.' },
    { title: 'Clean Record', desc: 'Police clearance certificate from your home country is required.' },
    { title: 'Valid Passport', desc: 'A passport with at least 12 months validity remaining.' }
  ];

  return (
    <main>
      {/* Hero */}
      <section style={{ background: 'var(--brand-primary)', padding: '80px 0 60px', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="label-red" style={{ justifyContent: 'center', color: 'var(--brand-secondary)' }}>NURSING AUSBILDUNG</div>
            <h1 style={{ fontSize: '48px', color: 'white', marginBottom: '15px' }}>3-Year Nursing Training in Germany</h1>
            <p style={{ fontSize: '18px', opacity: 0.85, maxWidth: '650px', margin: '0 auto' }}>Tuition-free vocational training with a monthly stipend. Graduate with an EU-recognized nursing qualification.</p>
          </motion.div>
        </div>
      </section>

      {/* What Is It */}
      <section className="section">
        <div className="container grid-2">
          <div>
            <div className="label-red">WHAT IS AUSBILDUNG?</div>
            <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>Earn While You Learn in Germany</h2>
            <p style={{ color: 'var(--text-gray)', lineHeight: '1.8', marginBottom: '20px' }}>
              Nursing Ausbildung is Germany&apos;s renowned vocational training system. Unlike traditional university education, the Ausbildung combines classroom learning with hands-on clinical training at a hospital — and you get paid for it.
            </p>
            <p style={{ color: 'var(--text-gray)', lineHeight: '1.8', marginBottom: '25px' }}>
              The program lasts 3 years and covers 4,600+ hours of training. Upon completion, you receive a state-recognized nursing certificate that is valid across the entire European Union.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px' }}>
              {[
                { label: 'Duration', value: '3 Years' },
                { label: 'Tuition', value: 'FREE' },
                { label: 'Stipend', value: 'EUR 1,000–1,400/mo' },
                { label: 'Recognition', value: 'EU-Wide' }
              ].map((item, i) => (
                <div key={i} style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</span>
                  <p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--brand-primary)', marginTop: '5px' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img src="/images/hero_family.png" alt="Nursing Ausbildung in Germany" style={{ width: '100%', borderRadius: '8px' }} />
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="label-red" style={{ justifyContent: 'center' }}>CURRICULUM OVERVIEW</div>
            <h2 style={{ fontSize: '36px' }}>What You Will Learn Each Year</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {curriculum.map((year, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                style={{ background: 'white', padding: '35px 25px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid var(--brand-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '22px', color: 'var(--brand-primary)' }}>{year.year}</h3>
                  <span style={{ background: 'rgba(0,177,176,0.1)', color: 'var(--brand-secondary)', padding: '5px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>{year.stipend}</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {year.topics.map((topic, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                      <CheckCircle size={16} color="var(--brand-secondary)" /> {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="label-red" style={{ justifyContent: 'center' }}>ELIGIBILITY</div>
            <h2 style={{ fontSize: '36px' }}>Requirements for Nursing Ausbildung</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', maxWidth: '900px', margin: '0 auto' }}>
            {requirements.map((req, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'var(--brand-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', marginBottom: '5px' }}>{req.title}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-gray)', lineHeight: '1.6' }}>{req.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--brand-primary)', padding: '60px 0', textAlign: 'center', color: 'white' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: '36px', marginBottom: '15px' }}>Start Your Nursing Ausbildung Journey</h2>
          <p style={{ opacity: 0.85, marginBottom: '30px', fontSize: '16px' }}>Book a free eligibility assessment. We will evaluate your profile and guide you to the right pathway.</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary" style={{ background: 'var(--brand-secondary)' }}>BOOK FREE CONSULTATION ↗</Link>
            <a href="tel:+919847300744" className="btn-primary" style={{ background: 'transparent', border: '2px solid white' }}>CALL +91 9847 300 744</a>
          </div>
        </div>
      </section>
    </main>
  );
}
