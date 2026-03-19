"use client";

import Link from 'next/link';
import { CheckCircle, Award, Users, Heart, Target, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const values = [
    { icon: <Target size={28} />, title: 'Focused Expertise', desc: 'We specialize exclusively in nursing career pathways to Germany — Ausbildung and Recruitment. This singular focus means we deliver results.' },
    { icon: <Users size={28} />, title: 'Direct Partnerships', desc: 'We partner directly with 50+ German hospitals and Ausbildung training institutes for guaranteed placements.' },
    { icon: <Heart size={28} />, title: 'End-to-End Support', desc: 'From German language training and document prep to visa filing and post-arrival accommodation — we handle everything.' },
    { icon: <Award size={28} />, title: 'Proven Track Record', desc: '500+ nurses successfully placed in Germany with a 98% visa approval rate.' }
  ];

  return (
    <main>
      {/* Hero */}
      <section style={{ background: 'var(--brand-primary)', padding: '80px 0 60px', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="label-red" style={{ justifyContent: 'center', color: 'var(--brand-secondary)' }}>ABOUT US</div>
            <h1 style={{ fontSize: '48px', color: 'white', marginBottom: '15px' }}>About NexStep Europe</h1>
            <p style={{ fontSize: '18px', opacity: 0.85, maxWidth: '600px', margin: '0 auto' }}>Step Into Your Future — Your trusted partner for nursing careers in Germany.</p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container grid-2">
          <div>
            <div className="label-red">OUR MISSION</div>
            <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>Bridging Indian Nursing Talent with German Healthcare Needs</h2>
            <p style={{ color: 'var(--text-gray)', lineHeight: '1.8', marginBottom: '20px' }}>
              Germany faces a massive shortage of over 36,000 nurses every year. At the same time, India produces some of the world&apos;s most skilled and dedicated nursing professionals. NexStep Europe exists to bridge this gap.
            </p>
            <p style={{ color: 'var(--text-gray)', lineHeight: '1.8', marginBottom: '25px' }}>
              We provide two distinct pathways — the Nursing Ausbildung (a 3-year vocational training program for fresh graduates) and Direct Nurse Recruitment (for experienced GNM/BSc/MSc nurses). Our end-to-end support covers German language training, document preparation, visa processing, and post-arrival integration.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['500+ nurses successfully placed', '98% visa approval rate', '50+ partner hospitals in Germany', 'Complete German language training (A1 to B2)'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
                  <CheckCircle size={18} color="var(--brand-secondary)" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <img src="/images/about_consultants.png" alt="About NexStep Europe" style={{ width: '100%', borderRadius: '8px' }} />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="label-red" style={{ justifyContent: 'center' }}>WHY NEXSTEP EUROPE</div>
            <h2 style={{ fontSize: '36px' }}>What Sets Us Apart</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: 'white', padding: '35px 25px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0,177,176,0.1)', color: 'var(--brand-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{v.title}</h3>
                <p style={{ color: 'var(--text-gray)', fontSize: '14px', lineHeight: '1.7' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--brand-primary)', padding: '60px 0', textAlign: 'center', color: 'white' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: '36px', marginBottom: '15px' }}>Ready to Step Into Your Future?</h2>
          <p style={{ opacity: 0.85, marginBottom: '30px', fontSize: '16px' }}>Book a free consultation call and we will assess your eligibility within 24 hours.</p>
          <Link href="/contact" className="btn-primary" style={{ background: 'var(--brand-secondary)' }}>BOOK FREE CONSULTATION ↗</Link>
        </div>
      </section>
    </main>
  );
}
