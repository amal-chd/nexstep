"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Stethoscope, BookOpen, GraduationCap, Building, ChevronDown, CheckCircle, ArrowRight, Play, Phone, Mail, MapPin, Heart, Users, Award, Globe, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(1);
  const [blogs, setBlogs] = useState([
    { id: '1', date: 'MAR 10, 2025', title: 'Why Germany Needs 36,000+ Nurses Every Year', img: '/images/blog_1.png' },
    { id: '2', date: 'MAR 15, 2025', title: 'Nursing Ausbildung vs. Direct Recruitment — Which Path Is Right?', img: '/images/blog_2.png' },
    { id: '3', date: 'MAR 20, 2025', title: 'Life as an Indian Nurse in Germany: Salary, Benefits & Culture', img: '/images/blog_3.png' }
  ]);

  const [contactForm, setContactForm] = useState({ fullName: '', phone: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState({ loading: false, success: false, error: null });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'), limit(3));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const fetchedBlogs = snapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data(),
            date: doc.data().createdAt?.toDate() ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(doc.data().createdAt.toDate()).toUpperCase() : doc.data().date
          }));
          setBlogs(fetchedBlogs);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.fullName || !contactForm.phone) {
      setContactStatus({ ...contactStatus, error: 'Full name and phone are required.' });
      return;
    }
    setContactStatus({ loading: true, success: false, error: null });
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...contactForm,
        service: 'general_consultation',
        qualification: 'not_specified',
        languageLevel: 'not_specified',
        createdAt: serverTimestamp(),
        status: 'new'
      });
      setContactStatus({ loading: false, success: true, error: null });
      setContactForm({ fullName: '', phone: '', email: '', message: '' });
    } catch (err) {
      console.error("Contact Error:", err);
      setContactStatus({ loading: false, success: false, error: 'Failed to submit. Please try again.' });
    }
  };

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

      {/* 5. COUNTRIES */}
      <section className="countries section">
        <div className="container">
          <div className="label-red" style={{ justifyContent: 'center' }}>DESTINATIONS</div>
          <h2 className="hero-title" style={{ fontSize: '36px', maxWidth: '600px', margin: '0 auto' }}>Top Destinations for Nursing Careers</h2>

          <div className="countries-grid">
            {countries.map((c, i) => (
              <div key={i} className="country-card" style={{ opacity: c.name === 'Germany' ? 1 : 0.7, position: 'relative' }}>
                <div className="country-number">{c.num}</div>
                <div style={{ position: 'absolute', top: '20px', right: '20px', background: c.name === 'Germany' ? 'var(--brand-secondary)' : '#ff4d4d', color: 'white', padding: '4px 12px', fontSize: '11px', fontWeight: '700', borderRadius: '4px', zIndex: 10 }}>
                  {c.name === 'Germany' ? 'ACTIVE' : 'NOT ACCEPTING'}
                </div>
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
            <AnimatePresence mode="wait">
              {contactStatus.success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key="success"
                  style={{ background: '#ecfdf5', padding: '30px', borderRadius: '12px', textAlign: 'center' }}
                >
                  <CheckCircle2 color="#10b981" size={48} style={{ margin: '0 auto 15px' }} />
                  <h3 style={{ color: 'var(--brand-primary)', marginBottom: '10px' }}>Consultation Requested!</h3>
                  <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>We have received your details and will call you back shortly.</p>
                  <button onClick={() => setContactStatus({ ...contactStatus, success: false })} style={{ marginTop: '20px', color: 'var(--brand-secondary)', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer' }}>REQUEST ANOTHER</button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div>
                    <div className="label-red">GET IN TOUCH</div>
                    <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Start Your Nursing Career Today</h2>
                    <p style={{ color: 'var(--text-gray)', fontSize: '15px', marginBottom: '20px' }}>Book a free consultation with our team. We'll assess your eligibility and guide you through the best pathway — Nursing Ausbildung or Direct Recruitment.</p>
                  </div>
                  <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      <input type="text" placeholder="Full Name *" value={contactForm.fullName} onChange={(e) => setContactForm({...contactForm, fullName: e.target.value})} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                      <input type="tel" placeholder="Phone *" value={contactForm.phone} onChange={(e) => setContactForm({...contactForm, phone: e.target.value})} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                    <input type="email" placeholder="Email Address" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    <textarea placeholder="Message (optional)" value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} rows={2} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}></textarea>
                    {contactStatus.error && <p style={{ color: '#ef4444', fontSize: '12px' }}>{contactStatus.error}</p>}
                    <button type="submit" disabled={contactStatus.loading} className="btn-primary" style={{ alignSelf: 'flex-start', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {contactStatus.loading ? <Loader2 className="animate-spin" size={18} /> : 'BOOK FREE CONSULTATION ↗'}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '10px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ background: 'var(--brand-secondary)', color: 'white', padding: '10px', borderRadius: '50%', height: '40px', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Phone size={20} /></div>
                <div><h4 style={{ fontSize: '14px' }}>Call Us</h4><p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>+91 9847 300 744</p></div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ background: 'var(--brand-secondary)', color: 'white', padding: '10px', borderRadius: '50%', height: '40px', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Mail size={20} /></div>
                <div><h4 style={{ fontSize: '14px' }}>Email Us</h4><p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>info@nexstepeurope.de</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BLOG SECTION */}
      <section className="section bg-secondary">
        <div className="container">
          <div className="label-red" style={{ justifyContent: 'center' }}>INSIGHTS & GUIDES</div>
          <h2 className="hero-title" style={{ fontSize: '36px', textAlign: 'center', marginBottom: '40px' }}>Latest News & Articles<br />From Our Blog</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {blogs.map((b) => (
              <div key={b.id} style={{ background: 'white', borderRadius: '4px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
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
