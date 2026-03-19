"use client";

import Link from 'next/link';
import { CheckCircle, Users, Stethoscope, Globe, ArrowRight, Building } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServicesPage() {
  const benefits = [
    { icon: <Stethoscope size={28} />, title: 'Direct Hospital Placement', desc: 'We partner with 50+ German hospitals and clinics to place qualified nurses directly into permanent positions.' },
    { icon: <Globe size={28} />, title: 'Qualification Recognition', desc: 'Full support through the Anerkennung process — getting your existing nursing degree recognized in Germany.' },
    { icon: <Users size={28} />, title: 'Family Relocation', desc: 'Bring your family to Germany. Spouses can work, children get free education and monthly child benefits of EUR 250.' },
    { icon: <Building size={28} />, title: 'Post-Arrival Support', desc: 'Accommodation arrangement, bank account setup, resident registration, and cultural orientation upon landing in Germany.' }
  ];

  const process = [
    { step: '01', title: 'Eligibility Check', desc: 'We assess your nursing qualification, work experience, and German language level to determine the best pathway.' },
    { step: '02', title: 'German Language Training', desc: 'Structured B1/B2 German language coaching with certified teachers — the critical requirement for working in Germany.' },
    { step: '03', title: 'Document Preparation', desc: 'CV in German format, credential evaluation, motivation letter, and all documents translated and notarized.' },
    { step: '04', title: 'Hospital Matching', desc: 'We match your profile with German hospitals looking for nurses. You attend interviews and receive your job offer.' },
    { step: '05', title: 'Visa & Relocation', desc: 'Complete visa application support, flight booking, and post-arrival assistance including accommodation and onboarding.' }
  ];

  return (
    <main>
      {/* Hero */}
      <section style={{ background: 'var(--brand-primary)', padding: '80px 0 60px', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="label-red" style={{ justifyContent: 'center', color: 'var(--brand-secondary)' }}>OUR SERVICES</div>
            <h1 style={{ fontSize: '48px', color: 'white', marginBottom: '15px' }}>Nurse Recruitment</h1>
            <p style={{ fontSize: '18px', opacity: 0.85, maxWidth: '650px', margin: '0 auto' }}>Direct placement of qualified nurses into permanent positions at top German hospitals. Salary range: EUR 2,800 – EUR 4,200/month.</p>
          </motion.div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="section">
        <div className="container grid-2">
          <div>
            <div className="label-red">WHO IS THIS FOR?</div>
            <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>For Qualified & Experienced Nurses</h2>
            <p style={{ color: 'var(--text-gray)', marginBottom: '25px', lineHeight: '1.8' }}>
              If you already hold a GNM, BSc Nursing, or MSc Nursing degree with professional experience, our Nurse Recruitment service provides the fastest pathway to working in Germany. We handle everything — from qualification recognition (Anerkennung) to your first day at the hospital.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['GNM / BSc / MSc Nursing degree holders', 'Minimum 1–2 years clinical experience preferred', 'German language B1 or B2 level (we help you get there)', 'Age 21–45 years'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '500' }}>
                  <CheckCircle size={18} color="var(--brand-secondary)" /> {item}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn-primary" style={{ marginTop: '30px', display: 'inline-flex' }}>
              CHECK ELIGIBILITY ↗
            </Link>
          </div>
          <div>
            <img src="/images/about_consultants.png" alt="Nurse recruitment consultation" style={{ width: '100%', borderRadius: '8px' }} />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="label-red" style={{ justifyContent: 'center' }}>WHY CHOOSE US</div>
            <h2 style={{ fontSize: '36px' }}>Benefits of Nurse Recruitment with NexStep</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: 'white', padding: '35px 25px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: '55px', height: '55px', borderRadius: '50%', background: 'rgba(0,177,176,0.1)', color: 'var(--brand-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  {b.icon}
                </div>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{b.title}</h3>
                <p style={{ color: 'var(--text-gray)', fontSize: '14px', lineHeight: '1.7' }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="label-red" style={{ justifyContent: 'center' }}>THE PROCESS</div>
            <h2 style={{ fontSize: '36px' }}>Your Journey From India to Germany</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '700px', margin: '0 auto' }}>
            {process.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', gap: '25px', alignItems: 'flex-start' }}>
                <div style={{ width: '55px', height: '55px', borderRadius: '50%', background: 'var(--brand-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px', flexShrink: 0 }}>
                  {p.step}
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{p.title}</h3>
                  <p style={{ color: 'var(--text-gray)', fontSize: '14px', lineHeight: '1.7' }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link href="/contact" className="btn-primary">START YOUR APPLICATION ↗</Link>
          </div>
        </div>
      </section>

      {/* Salary CTA */}
      <section style={{ background: 'var(--brand-primary)', padding: '60px 0', textAlign: 'center', color: 'white' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: '36px', marginBottom: '15px' }}>Earn EUR 2,800 – EUR 4,200/month as a nurse in Germany</h2>
          <p style={{ opacity: 0.85, marginBottom: '30px', fontSize: '16px' }}>Plus night/weekend bonuses, annual increments, 25–30 days paid leave, and comprehensive social security.</p>
          <Link href="/contact" className="btn-primary" style={{ background: 'var(--brand-secondary)', color: 'white' }}>BOOK FREE CONSULTATION ↗</Link>
        </div>
      </section>
    </main>
  );
}
