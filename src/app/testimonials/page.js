"use client";

import Link from 'next/link';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: 'Anitha Raj',
      role: 'BSc Nursing → Nurse at Charite Hospital, Berlin',
      text: 'NexStep Europe made my dream come true. From German language classes to my first day at Charite Hospital in Berlin — they guided me through every step. I now earn over EUR 3,500/month and my family is planning to join me soon.',
      rating: 5
    },
    {
      name: 'Sreejith K.',
      role: 'GNM → Nursing Ausbildung Student, Munich',
      text: 'I was unsure about the Ausbildung pathway after my GNM, but the team at NexStep helped me understand the process clearly. Now I am in my second year of training in Munich, earning a stipend, and loving every moment.',
      rating: 5
    },
    {
      name: 'Priya Thomas',
      role: 'MSc Nursing → ICU Nurse, Hamburg',
      text: 'The qualification recognition process seemed overwhelming, but NexStep handled the entire Anerkennung for me. Within 8 months of contacting them, I was working in the ICU of a top Hamburg hospital. The salary and work-life balance are incredible.',
      rating: 5
    },
    {
      name: 'Deepak M.',
      role: 'BSc Nursing → Geriatric Care, Frankfurt',
      text: 'What impressed me most was their honesty about the German language requirement. They did not make false promises — instead they provided excellent B2 coaching and only applied once I was truly ready. That professionalism is why I succeeded.',
      rating: 5
    },
    {
      name: 'Lakshmi S.',
      role: 'GNM → Nurse, Stuttgart',
      text: 'I came from a small town in Kerala and never imagined I would work in Europe. NexStep Europe not only helped me with the visa but also arranged my accommodation and helped me settle in. My family is so proud.',
      rating: 5
    },
    {
      name: 'Rajan Nair',
      role: 'BSc Nursing → Nursing Ausbildung, Dusseldorf',
      text: 'The Ausbildung program is amazing — I get paid EUR 1,200/month while learning, there are no tuition fees, and at the end I will have an EU-recognized qualification. Thank you NexStep for making this possible!',
      rating: 5
    }
  ];

  return (
    <main>
      {/* Hero */}
      <section style={{ background: 'var(--brand-primary)', padding: '80px 0 60px', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="label-red" style={{ justifyContent: 'center', color: 'var(--brand-secondary)' }}>SUCCESS STORIES</div>
            <h1 style={{ fontSize: '48px', color: 'white', marginBottom: '15px' }}>Testimonials</h1>
            <p style={{ fontSize: '18px', opacity: 0.85, maxWidth: '600px', margin: '0 auto' }}>Hear from nurses who have successfully built their careers in Germany with NexStep Europe.</p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ background: 'white', padding: '35px 30px', borderRadius: '8px', boxShadow: 'var(--shadow-md)', position: 'relative', borderTop: '4px solid var(--brand-secondary)' }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '15px' }}>
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} fill="var(--brand-secondary)" color="var(--brand-secondary)" />
                  ))}
                </div>
                <p style={{ color: 'var(--text-gray)', fontSize: '14px', lineHeight: '1.8', marginBottom: '20px', fontStyle: 'italic' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--brand-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '18px' }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '15px' }}>{t.name}</strong>
                    <span style={{ fontSize: '12px', color: 'var(--brand-secondary)' }}>{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--bg-secondary)', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '32px', marginBottom: '15px' }}>Your Success Story Starts Here</h2>
          <p style={{ color: 'var(--text-gray)', marginBottom: '30px' }}>Join 500+ nurses who have already stepped into their future with NexStep Europe.</p>
          <Link href="/contact" className="btn-primary">BOOK FREE CONSULTATION ↗</Link>
        </div>
      </section>
    </main>
  );
}
