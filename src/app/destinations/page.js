"use client";

import Link from 'next/link';
import { CheckCircle, MapPin, Building, Users, Euro, Heart, Shield, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DestinationsPage() {
  const whyGermany = [
    { icon: <Building size={28} />, title: '36,000+ Open Nursing Positions', desc: 'Germany has one of Europe\'s most severe nursing shortages, creating unprecedented demand for international nurses every year.' },
    { icon: <Euro size={28} />, title: 'Competitive Salaries', desc: 'Earn EUR 2,800–4,200/month with additional pay for night shifts, weekends, and holidays. Annual bonuses at many hospitals.' },
    { icon: <Shield size={28} />, title: 'Social Security & Healthcare', desc: 'Comprehensive coverage including health insurance, pension, unemployment protection, and long-term care for you and your family.' },
    { icon: <Heart size={28} />, title: 'Family Benefits', desc: 'EUR 250/child monthly benefits, free education, paid parental leave, and spousal work permits. Germany is one of the most family-friendly countries.' },
    { icon: <GraduationCap size={28} />, title: 'Career Growth', desc: 'Specialize in ICU, oncology, geriatrics, or pediatrics. Continuous professional development with salary increases for specializations.' },
    { icon: <Users size={28} />, title: 'Permanent Residency Pathway', desc: 'After 2–5 years of working, apply for permanent residency. Full citizenship is available after 6–8 years in Germany.' }
  ];

  const cities = [
    { name: 'Berlin', desc: 'Capital city with 80+ hospitals. Charite is one of Europe\'s largest university hospitals.', openings: '5,000+' },
    { name: 'Munich', desc: 'Bavaria\'s capital with world-class healthcare facilities and the highest nursing salaries in Germany.', openings: '3,500+' },
    { name: 'Hamburg', desc: 'Germany\'s second largest city with a strong healthcare sector and multicultural environment.', openings: '2,800+' },
    { name: 'Frankfurt', desc: 'Financial hub with excellent international connectivity and modern hospital infrastructure.', openings: '2,200+' },
    { name: 'Stuttgart', desc: 'Industrial powerhouse with well-funded hospitals and strong demand for geriatric care nurses.', openings: '1,800+' },
    { name: 'Dusseldorf', desc: 'Rhineland city known for high quality of life and a growing healthcare sector.', openings: '1,500+' }
  ];

  return (
    <main>
      {/* Hero */}
      <section style={{ background: 'var(--brand-primary)', padding: '80px 0 60px', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="label-red" style={{ justifyContent: 'center', color: 'var(--brand-secondary)' }}>DESTINATION</div>
            <h1 style={{ fontSize: '48px', color: 'white', marginBottom: '15px' }}>Nursing Careers in Germany</h1>
            <p style={{ fontSize: '18px', opacity: 0.85, maxWidth: '650px', margin: '0 auto' }}>Discover why Germany is the #1 destination for international nurses — with 36,000+ open positions, competitive salaries, and a clear path to permanent residency.</p>
          </motion.div>
        </div>
      </section>

      {/* Key Stats */}
      <section style={{ background: 'var(--bg-dark)', padding: '40px 0', color: 'white' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '30px', textAlign: 'center' }}>
          {[
            { stat: '36,000+', label: 'Open Nursing Jobs/Year' },
            { stat: 'EUR 3,500+', label: 'Avg. Monthly Salary' },
            { stat: '30 Days', label: 'Annual Paid Leave' },
            { stat: '98%', label: 'Visa Approval Rate' }
          ].map((item, i) => (
            <div key={i}>
              <h3 style={{ fontSize: '28px', color: 'var(--brand-secondary)', marginBottom: '5px' }}>{item.stat}</h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Germany */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="label-red" style={{ justifyContent: 'center' }}>WHY GERMANY?</div>
            <h2 style={{ fontSize: '36px' }}>Why Nurses Choose Germany</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {whyGermany.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                <div style={{ width: '55px', height: '55px', borderRadius: '50%', background: 'rgba(0,177,176,0.1)', color: 'var(--brand-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-gray)', fontSize: '14px', lineHeight: '1.7' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Cities */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="label-red" style={{ justifyContent: 'center' }}>TOP CITIES</div>
            <h2 style={{ fontSize: '36px' }}>Where Nurses Work in Germany</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {cities.map((city, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', borderLeft: '4px solid var(--brand-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={18} color="var(--brand-secondary)" /> {city.name}
                  </h3>
                  <span style={{ background: 'rgba(0,177,176,0.1)', color: 'var(--brand-secondary)', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '600' }}>
                    {city.openings} jobs
                  </span>
                </div>
                <p style={{ color: 'var(--text-gray)', fontSize: '14px', lineHeight: '1.7' }}>{city.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Pathways */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="label-red" style={{ justifyContent: 'center' }}>YOUR OPTIONS</div>
            <h2 style={{ fontSize: '36px' }}>Two Pathways to Germany</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ background: 'white', padding: '35px', borderRadius: '8px', boxShadow: 'var(--shadow-md)', borderTop: '4px solid var(--brand-primary)' }}>
              <h3 style={{ fontSize: '22px', color: 'var(--brand-primary)', marginBottom: '15px' }}>Nursing Ausbildung</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-gray)', marginBottom: '20px' }}>3-year training program for fresh graduates (10+2).</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '25px' }}>
                {['No tuition fees', 'EUR 1,000–1,400/month stipend', 'EU-recognized qualification', 'No prior nursing degree needed'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <CheckCircle size={16} color="var(--brand-secondary)" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/courses" className="btn-primary" style={{ display: 'inline-flex' }}>LEARN MORE ↗</Link>
            </div>
            <div style={{ background: 'white', padding: '35px', borderRadius: '8px', boxShadow: 'var(--shadow-md)', borderTop: '4px solid var(--brand-secondary)' }}>
              <h3 style={{ fontSize: '22px', color: 'var(--brand-secondary)', marginBottom: '15px' }}>Nurse Recruitment</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-gray)', marginBottom: '20px' }}>Direct placement for qualified nurses (GNM/BSc/MSc).</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '25px' }}>
                {['EUR 2,800–4,200/month salary', 'Qualification recognition support', 'Family relocation assistance', 'Permanent residency pathway'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <CheckCircle size={16} color="var(--brand-secondary)" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/services" className="btn-primary" style={{ display: 'inline-flex', background: 'var(--brand-secondary)' }}>LEARN MORE ↗</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--brand-primary)', padding: '60px 0', textAlign: 'center', color: 'white' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: '36px', marginBottom: '15px' }}>Ready to Start Your Career in Germany?</h2>
          <p style={{ opacity: 0.85, marginBottom: '30px', fontSize: '16px' }}>Book a free consultation and get your personalized pathway assessment within 24 hours.</p>
          <Link href="/contact" className="btn-primary" style={{ background: 'var(--brand-secondary)' }}>BOOK FREE CONSULTATION ↗</Link>
        </div>
      </section>
    </main>
  );
}
