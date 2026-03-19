"use client";

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section style={{ background: 'var(--brand-primary)', padding: '60px 0', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="label-red" style={{ justifyContent: 'center', color: 'var(--brand-secondary)' }}>GET IN TOUCH</div>
            <h1 className="responsive-title" style={{ color: 'white', marginBottom: '15px' }}>Book Your Free Consultation</h1>
            <p style={{ fontSize: 'min(18px, 4.5vw)', opacity: 0.85, maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>Take the first step toward your nursing career in Germany. Our expert counsellors are here to help.</p>
          </motion.div>
        </div>
      </section>



      {/* Contact Section */}
      <section className="section">
        <div className="container grid-2" style={{ gap: '60px' }}>

          {/* Contact Form (Now on Top/Left) */}
          <div className="mobile-card" style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', order: 1 }}>
            <h2 className="responsive-subtitle" style={{ marginBottom: '25px' }}>Send Us a Message</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <input type="text" placeholder="Full Name *" style={{ padding: '14px 18px', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '15px', outline: 'none', background: '#f8f9fa' }} />
              <input type="tel" placeholder="Phone / WhatsApp *" style={{ padding: '14px 18px', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '15px', outline: 'none', background: '#f8f9fa' }} />
              <input type="email" placeholder="Email Address" style={{ padding: '14px 18px', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '15px', outline: 'none', background: '#f8f9fa' }} />
              <select style={{ padding: '14px 18px', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '15px', outline: 'none', background: '#f8f9fa', color: 'var(--text-dark)' }}>
                <option value="">Select Service *</option>
                <option value="ausbildung">Nursing Ausbildung</option>
                <option value="recruitment">Nurse Recruitment</option>
              </select>
              <select style={{ padding: '14px 18px', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '15px', outline: 'none', background: '#f8f9fa', color: 'var(--text-dark)' }}>
                <option value="">Qualification *</option>
                <option value="plus2">10+2 (Plus Two)</option>
                <option value="gnm">GNM Nursing</option>
                <option value="bsc">BSc Nursing</option>
                <option value="msc">MSc Nursing</option>
                <option value="other">Other</option>
              </select>
              <select style={{ padding: '14px 18px', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '15px', outline: 'none', background: '#f8f9fa', color: 'var(--text-dark)' }}>
                <option value="">German Language Level</option>
                <option value="none">No German</option>
                <option value="a1">A1</option>
                <option value="a2">A2</option>
                <option value="b1">B1</option>
                <option value="b2">B2 or higher</option>
              </select>
              <textarea placeholder="Your Message (optional)" rows={4} style={{ padding: '14px 18px', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '15px', outline: 'none', resize: 'vertical', background: '#f8f9fa' }}></textarea>
              <button type="submit" className="btn-primary" style={{ padding: '18px', fontSize: '16px', width: '100%', justifyContent: 'center' }}>
                BOOK FREE CONSULTATION ↗
              </button>
            </form>
          </div>

          {/* Contact Info (Now on Bottom/Right) */}
          <div style={{ order: 2 }}>
            <h2 className="responsive-subtitle" style={{ marginBottom: '15px' }}>Let&apos;s Talk About Your Future</h2>
            <p style={{ color: 'var(--text-gray)', marginBottom: '40px', lineHeight: '1.8' }}>
              Whether you are a fresh 10+2 graduate looking at Nursing Ausbildung or an experienced nurse seeking direct recruitment to Germany — we have the perfect pathway for you. Reach out and we will assess your eligibility for free.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--brand-secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={22} />
                </div>
                <div>
                  <h4 style={{ marginBottom: '5px' }}>Call / WhatsApp</h4>
                  <a href="tel:+919847300744" style={{ color: 'var(--brand-primary)', fontWeight: '700', fontSize: '20px' }}>+91 9847 300 744</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--brand-secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={22} />
                </div>
                <div>
                  <h4 style={{ marginBottom: '5px' }}>Email Us</h4>
                  <a href="mailto:info@nexstepeurope.com" style={{ color: 'var(--brand-primary)', fontWeight: '700' }}>info@nexstepeurope.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--brand-secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 style={{ marginBottom: '5px' }}>Our Office</h4>
                  <p style={{ color: 'var(--text-gray)', fontWeight: '500' }}>Kerala, India</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--brand-secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock size={22} />
                </div>
                <div>
                  <h4 style={{ marginBottom: '5px' }}>Working Hours</h4>
                  <p style={{ color: 'var(--text-gray)', fontWeight: '500' }}>Mon – Sat: 9:00 AM – 6:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
