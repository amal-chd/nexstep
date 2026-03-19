"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BlogPage() {
  const articles = [
    {
      date: 'MAR 20, 2025',
      title: 'Why Germany Needs 36,000+ Nurses Every Year',
      excerpt: 'Germany is facing one of Europe\'s most severe nursing shortages. With an aging population and expanding healthcare infrastructure, over 36,000 nursing positions remain unfilled annually — creating unprecedented opportunities for international nurses.',
      img: '/images/blog_1.png',
      tag: 'Industry Insights'
    },
    {
      date: 'MAR 15, 2025',
      title: 'Nursing Ausbildung vs. Direct Recruitment — Which Path Is Right for You?',
      excerpt: 'Two pathways, one destination. The Nursing Ausbildung is a 3-year training program ideal for fresh graduates, while Direct Recruitment suits experienced nurses. Here is a detailed comparison to help you decide.',
      img: '/images/blog_2.png',
      tag: 'Career Guide'
    },
    {
      date: 'MAR 10, 2025',
      title: 'Life as an Indian Nurse in Germany: Salary, Benefits & Culture',
      excerpt: 'What does daily life look like for Indian nurses working in Germany? From competitive salaries EUR 2,800–4,200/month to 30 days paid leave and family benefits — discover what awaits you.',
      img: '/images/blog_3.png',
      tag: 'Nurse Stories'
    },
    {
      date: 'FEB 28, 2025',
      title: 'Step-by-Step: How to Get Your German B2 Certificate',
      excerpt: 'The German language requirement is the biggest hurdle for most nursing candidates. Here is our proven approach to going from zero German to B2 level in 10–14 months with structured coaching.',
      img: '/images/faq_travelers.png',
      tag: 'Language Tips'
    },
    {
      date: 'FEB 20, 2025',
      title: 'Understanding Anerkennung: Nursing Qualification Recognition in Germany',
      excerpt: 'Anerkennung is the process of getting your Indian nursing degree officially recognized in Germany. Learn about the documentation, timelines, and how NexStep Europe handles this for you.',
      img: '/images/about_consultants.png',
      tag: 'Visa & Documents'
    },
    {
      date: 'FEB 10, 2025',
      title: 'Family Benefits for Nurses in Germany: What You Need to Know',
      excerpt: 'Germany offers EUR 250/child monthly benefits, free education, paid parental leave, and spousal work permits. Here is everything about bringing your family to Germany as a nurse.',
      img: '/images/contact_agent.png',
      tag: 'Family & Life'
    }
  ];

  return (
    <main>
      {/* Hero */}
      <section style={{ background: 'var(--brand-primary)', padding: '80px 0 60px', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="label-red" style={{ justifyContent: 'center', color: 'var(--brand-secondary)' }}>INSIGHTS & GUIDES</div>
            <h1 style={{ fontSize: '48px', color: 'white', marginBottom: '15px' }}>Blog & Resources</h1>
            <p style={{ fontSize: '18px', opacity: 0.85, maxWidth: '600px', margin: '0 auto' }}>Expert guides, real stories, and essential information for your nursing career in Germany.</p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {articles.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.3s', cursor: 'pointer' }}>
                <div style={{ position: 'relative' }}>
                  <img src={a.img} alt={a.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '15px', left: '15px', background: 'var(--brand-secondary)', color: 'white', padding: '4px 12px', fontSize: '12px', fontWeight: '600', borderRadius: '3px' }}>
                    {a.tag}
                  </div>
                  <div style={{ position: 'absolute', bottom: '15px', left: '15px', background: 'var(--brand-primary)', color: 'white', padding: '5px 10px', fontSize: '12px', fontWeight: 'bold', borderRadius: '2px' }}>
                    {a.date}
                  </div>
                </div>
                <div style={{ padding: '25px 20px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '12px', lineHeight: '1.4' }}>{a.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-gray)', lineHeight: '1.7', marginBottom: '15px' }}>{a.excerpt}</p>
                  <span style={{ color: 'var(--brand-secondary)', fontWeight: '600', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>READ MORE ▶</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--bg-secondary)', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '32px', marginBottom: '15px' }}>Ready to Start Your Journey?</h2>
          <p style={{ color: 'var(--text-gray)', marginBottom: '30px' }}>Book a free consultation and get personalized guidance for your nursing career in Germany.</p>
          <Link href="/contact" className="btn-primary">BOOK FREE CONSULTATION ↗</Link>
        </div>
      </section>
    </main>
  );
}
