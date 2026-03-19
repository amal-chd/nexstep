"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Stethoscope, BookOpen, GraduationCap, Building, ChevronDown, CheckCircle, ArrowRight, Play, Phone, Mail, MapPin, Heart, Users, Award, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(1);

  const services = [
    {
      title: 'Nursing Ausbildung',
      text: 'A 3-year vocational nursing training program in Germany combining classroom learning with hands-on clinical experience in leading hospitals.',
      points: [
        'No tuition fees — earn €1,000–€1,400/month stipend',
        'EU-recognized nursing qualification',
        'Pathway to permanent residency in Germany'
      ],
      num: '01',
      icon: <GraduationCap size={32} />
    },
    {
      title: 'Nurse Recruitment',
      text: 'Direct placement of qualified nurses into permanent positions at top European hospitals and healthcare facilities.',
      points: [
        'Salary €2,800–€4,200/month based on experience',
        'Full qualification recognition support (Anerkennung)',
        'Family relocation & integration assistance'
      ],
      num: '02',
      icon: <Heart size={32} />
    },
    {
      title: 'Complete Support',
      text: 'End-to-end assistance from German language training and document preparation to visa processing and post-arrival support.',
      points: [
        'German language coaching (A1 to B2)',
        'Visa application & interview preparation',
        'Accommodation & onboarding in Germany'
      ],
      num: '03',
      icon: <Globe size={32} />
    }
  ];

  const countries = [
    { name: 'Germany', num: '01', img: '/images/germany.png', text: 'The top destination for nursing careers with 36,000+ open nursing positions annually.' },
    { name: 'France', num: '02', img: '/images/france.png', text: 'Growing demand for international nurses in public and private healthcare sectors.' },
    { name: 'Canada', num: '03', img: '/images/canada.png', text: 'Excellent nursing salaries and one of the best immigration pathways for healthcare workers.' },
    { name: 'Australia', num: '04', img: '/images/australia.png', text: 'High demand for skilled nurses with competitive wages and a great quality of life.' }
  ];

  const faqs = [
    { id: 1, q: 'What is Nursing Ausbildung and who is it for?', a: 'Nursing Ausbildung is a 3-year vocational nursing training program in Germany. It is ideal for candidates who have completed 12 years of schooling (10+2) and want to build a nursing career in Europe. No prior nursing degree is required.' },
    { id: 2, q: 'What German language level do I need?', a: 'You need to achieve a B1 or B2 level in German (CEFR). NexStep Europe provides structured German language training from A1 to B2 to help you meet this requirement before applying.' },
    { id: 3, q: 'Do I earn a salary during the Ausbildung?', a: 'Yes! Unlike traditional education, the Ausbildung is tuition-free and you receive a monthly stipend of €1,000–€1,400 that increases each year of the program.' },
    { id: 4, q: 'How does the Nurse Recruitment process work?', a: 'For qualified nurses, we handle the full process — qualification recognition (Anerkennung), job matching with German hospitals, visa processing, and relocation support. You can earn €2,800–€4,200/month as a recognized nurse in Germany.' },
    { id: 5, q: 'Can I bring my family to Germany?', a: 'Yes. Germany offers family reunion visas. Your spouse can also work in Germany, and children receive free education and monthly child benefits (€250/child). We assist with the full family relocation process.' }
  ];

  const blogs = [
    { date: 'MAR 10, 2025', title: 'Why Germany Needs 36,000+ Nurses Every Year', img: '/images/blog_1.png' },
    { date: 'MAR 15, 2025', title: 'Nursing Ausbildung vs. Direct Recruitment — Which Path Is Right?', img: '/images/blog_2.png' },
    { date: 'MAR 20, 2025', title: 'Life as an Indian Nurse in Germany: Salary, Benefits & Culture', img: '/images/blog_3.png' }
  ];

  return (
    <main>
      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="hero-map-bg"></div>
        <div className="container hero-container">
          <div className="hero-content">
            <div className="label-red">NEXSTEP EUROPE</div>
            <h1 className="hero-title">Step Into Your Future</h1>
            <p className="hero-desc">Your trusted partner for Nursing Ausbildung and Nurse Recruitment in Germany. From language training to placement — we guide you every step of the way.</p>
            <Link href="/contact" className="btn-primary">
              BOOK FREE CONSULTATION ↗
            </Link>
          </div>
          <div className="hero-image">
            <img src="/images/hero_family.png" alt="Begin your nursing career in Europe" style={{ borderRadius: '10px' }} />
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="hide-mobile"
              style={{ position: 'absolute', bottom: '-20px', left: '-50px', background: 'white', padding: '15px', borderRadius: '8px', boxShadow: 'var(--shadow-md)', display: 'flex', gap: '15px', alignItems: 'center' }}
            >
              <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--brand-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '22px', flexShrink: 0 }}>✓</div>
              <div>
                <strong style={{ display: 'block', fontSize: '14px', color: 'var(--brand-primary)' }}>Placement Confirmed!</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-gray)' }}>Ready for Germany</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 1.5 STATS BAR */}
      <section style={{ background: 'var(--brand-primary)', padding: '25px 0', color: 'white' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-around', gap: '30px', flexWrap: 'wrap', textAlign: 'center' }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{ fontSize: '36px', fontWeight: '800', color: 'white' }}>500+</div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px' }}>Nurses Placed</div>
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{ fontSize: '36px', fontWeight: '800', color: 'white' }}>98%</div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px' }}>Visa Success Rate</div>
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{ fontSize: '36px', fontWeight: '800', color: 'white' }}>50+</div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px' }}>Partner Hospitals</div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="services section">
        <div className="container">
          <div className="label-red" style={{ justifyContent: 'center' }}>OUR SERVICES</div>
          <h2 className="hero-title" style={{ fontSize: '36px', maxWidth: '650px', margin: '0 auto 20px' }}>Two Pathways to Your Nursing Career in Europe</h2>
          
          <div className="services-grid">
            {services.map((srv, i) => (
              <Link href={i === 0 ? "/courses" : i === 1 ? "/services" : "/contact"} key={i} className="service-card" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                <div className="service-number">{srv.num}</div>
                <div className="service-content">
                  <div className="service-icon">{srv.icon}</div>
                  <h3 className="service-title">{srv.title}</h3>
                  <p style={{ fontSize: '14px', marginBottom: '20px' }}>{srv.text}</p>
                  <ul className="service-list">
                    {srv.points.map((pt, idx) => (
                      <li key={idx}>{pt}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 'auto', color: 'var(--brand-secondary)', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    LEARN MORE <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT US */}
      <section className="about">
        <div className="container about-container">
          <div className="about-content">
            <div className="label-red">ABOUT NEXSTEP EUROPE</div>
            <h2 className="about-title">Your Trusted Partner for Nursing Careers in Germany</h2>
            <ul className="about-list">
              <li>Nursing Ausbildung Placement</li>
              <li>Direct Nurse Recruitment to German Hospitals</li>
              <li>German Language Training (A1–B2)</li>
              <li>Visa Processing & Document Support</li>
            </ul>
            
            <p style={{ marginTop: '20px' }}>NexStep Europe specializes exclusively in nursing career pathways to Germany. We partner directly with German hospitals and Ausbildung training institutes to offer guaranteed placements. Our team handles everything — from German language coaching and credential recognition to visa filing and post-arrival support.</p>

            <div className="ceo-box">
              <img src="/images/about_ceo.png" alt="Founder" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <strong style={{ display: 'block', color: 'var(--text-dark)' }}>NexStep Europe</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-gray)' }}>Step Into Your Future</span>
              </div>
            </div>

            <Link href="/about" className="btn-primary">LEARN MORE ↗</Link>
          </div>
          <div className="about-image">
            <img src="/images/about_consultants.png" alt="Nursing consultation session" style={{ borderRadius: '10px 10px 0 0' }} />
          </div>
        </div>
      </section>

      {/* 4. STATS BAR */}
      <section className="stats-bar">
        <div className="container stats-grid">
          <div className="stat-item">
            <div className="stat-icon"><Award size={40} /></div>
            <div style={{ textAlign: 'left' }}>
              <h3>500+</h3>
              <p>Nurses Placed</p>
            </div>
          </div>
          <div className="stat-item border-left">
            <div className="stat-icon"><Stethoscope size={40} /></div>
            <div style={{ textAlign: 'left' }}>
              <h3>98%</h3>
              <p>Visa Success Rate</p>
            </div>
          </div>
          <div className="stat-item border-left">
            <div className="stat-icon"><Users size={40} /></div>
            <div style={{ textAlign: 'left' }}>
              <h3>50+</h3>
              <p>Partner Hospitals</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COUNTRIES */}
      <section className="countries section">
        <div className="container">
          <div className="label-red" style={{ justifyContent: 'center' }}>DESTINATIONS</div>
          <h2 className="hero-title" style={{ fontSize: '36px', maxWidth: '600px', margin: '0 auto' }}>Top Destinations for Nursing Careers</h2>

          <div className="countries-grid">
            {countries.map((c, i) => (
              <div key={i} className="country-card" style={{ opacity: c.name === 'Germany' ? 1 : 0.7, position: 'relative' }}>
                <div className="country-number">{c.num}</div>
                {c.name !== 'Germany' && (
                  <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#ff4d4d', color: 'white', padding: '4px 12px', fontSize: '11px', fontWeight: '700', borderRadius: '4px', zIndex: 10 }}>NOT ACCEPTING</div>
                )}
                {c.name === 'Germany' && (
                  <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--brand-secondary)', color: 'white', padding: '4px 12px', fontSize: '11px', fontWeight: '700', borderRadius: '4px', zIndex: 10 }}>ACTIVE</div>
                )}
                <img src={c.img} alt={c.name} className="country-img" style={{ filter: c.name === 'Germany' ? 'none' : 'grayscale(100%)' }} />
                <h3 className="country-title">{c.name}</h3>
                <p className="country-desc">{c.text}</p>
                <Link href={c.name === 'Germany' ? "/destinations" : "#"} className="country-link" style={{ pointerEvents: c.name === 'Germany' ? 'auto' : 'none', color: c.name === 'Germany' ? 'var(--brand-secondary)' : 'var(--text-gray)' }}>
                  {c.name === 'Germany' ? 'READ MORE ▶' : 'CLOSED'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ & CONTACT SECTION */}
      <section className="faq-section bg-secondary">
        <div className="container">
          <div className="faq-container">
            {/* Left Image Side */}
            <div className="faq-image-side">
              <img src="/images/faq_travelers.png" alt="Nurses preparing for Germany" />
              <div className="faq-badge">
                <div style={{ background: 'var(--brand-secondary)', color: 'white', padding: '5px', borderRadius: '50%' }}><CheckCircle size={16} /></div>
                <div>Guaranteed Placement</div>
              </div>
              <div className="faq-badge bottom" style={{ background: 'var(--brand-secondary)', color: 'white' }}>
                <CheckCircle size={20} />
                <span>Free German Language Support</span>
                <span style={{ fontSize: '10px', marginLeft: '10px' }}>LEARN MORE ↗</span>
              </div>
            </div>

            {/* Right Accordion Side */}
            <div className="faq-content">
              <div className="label-red">FREQUENTLY ASKED QUESTIONS</div>
              <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Everything You Need to Know</h2>
              
              <div style={{ marginTop: '30px' }}>
                {faqs.map((faq) => (
                  <div key={faq.id} className={`faq-item ${activeFaq === faq.id ? 'active' : ''}`}>
                    <div className={`faq-question ${activeFaq === faq.id ? 'active' : ''}`} onClick={() => setActiveFaq(faq.id === activeFaq ? null : faq.id)}>
                      <span>{activeFaq === faq.id ? '🟢' : '⚫'} {faq.q}</span>
                      <ChevronDown size={18} style={{ transform: activeFaq === faq.id ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
                    </div>
                    <div className="faq-answer">
                      <p style={{ color: 'var(--text-gray)', paddingLeft: '25px' }}>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. QUICK CONTACT */}
      <section className="section" style={{ paddingBottom: '40px' }}>
        <div className="container" style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <img src="/images/contact_agent.png" alt="NexStep Europe support team" style={{ width: '100%', borderRadius: '4px' }} />
          </div>
          <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div className="label-red">GET IN TOUCH</div>
              <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Start Your Nursing Career Today</h2>
              <p style={{ color: 'var(--text-gray)', fontSize: '15px', marginBottom: '20px' }}>Book a free consultation with our team. We'll assess your eligibility and guide you through the best pathway — Nursing Ausbildung or Direct Recruitment.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ background: 'var(--brand-secondary)', color: 'white', padding: '10px', borderRadius: '50%', height: '40px', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Phone size={20} /></div>
                <div>
                  <h4 style={{ fontSize: '14px' }}>Call Us</h4>
                  <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>+91 9847 300 744</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ background: 'var(--brand-secondary)', color: 'white', padding: '10px', borderRadius: '50%', height: '40px', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Mail size={20} /></div>
                <div>
                  <h4 style={{ fontSize: '14px' }}>Email Us</h4>
                  <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>info@nexstepeurope.com</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px', gridColumn: 'span 2' }}>
                <div style={{ background: 'var(--brand-secondary)', color: 'white', padding: '10px', borderRadius: '50%', height: '40px', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><MapPin size={20} /></div>
                <div>
                  <h4 style={{ fontSize: '14px' }}>Visit Us</h4>
                  <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>Kerala, India</p>
                </div>
              </div>
            </div>
            <Link href="/contact" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
              BOOK FREE CONSULTATION ↗
            </Link>
          </div>
        </div>
      </section>

      {/* 8. BLOG SECTION */}
      <section className="section bg-secondary">
        <div className="container">
          <div className="label-red" style={{ justifyContent: 'center' }}>INSIGHTS & GUIDES</div>
          <h2 className="hero-title" style={{ fontSize: '36px', textAlign: 'center', marginBottom: '40px' }}>Latest News & Articles<br/>From Our Blog</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {blogs.map((b, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '4px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ position: 'relative' }}>
                  <img src={b.img} alt={b.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: '15px', left: '15px', background: 'var(--brand-primary)', color: 'white', padding: '5px 10px', fontSize: '12px', fontWeight: 'bold', borderRadius: '2px' }}>
                    {b.date}
                  </div>
                </div>
                <div style={{ padding: '25px 20px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>{b.title}</h3>
                  <Link href="/blog" style={{ color: 'var(--brand-secondary)', fontWeight: '600', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>READ MORE ▶</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
