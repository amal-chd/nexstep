import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer>
      {/* Footer Top CTA Banner */}
      <div className="footer-cta">
        <div className="container footer-cta-container">
          <div>
            <h3>Step Into Your Future With Us.</h3>
            <p>Book a free consultation today</p>
          </div>
          <div className="footer-phone">
            <span style={{ fontSize: '32px' }}>✆</span>
            <a href="tel:+919847300744" style={{ color: 'white' }}>+91 9847 300 744</a>
          </div>
        </div>
      </div>

      {/* Footer Main */}
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Newsletter / Brand */}
          <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Link href="/">
              <img src="/images/logo.png" alt="NexStep Europe" style={{ height: '55px', objectFit: 'contain', filter: 'brightness(0) invert(1)', alignSelf: 'flex-start' }} />
            </Link>
            <p style={{ fontSize: '13px', lineHeight: '1.8', color: 'rgba(255,255,255,0.7)' }}>
              Step Into Your Future — Your trusted partner for Nursing Ausbildung and Nurse Recruitment in Germany. We guide you from language training to placement.
            </p>
            <div style={{ position: 'relative', marginTop: '10px' }}>
              <input 
                type="email" 
                placeholder="Email Address"
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: 'none',
                  borderRadius: '4px',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  outline: 'none'
                }}
              />
              <button style={{
                position: 'absolute',
                right: '4px',
                top: '4px',
                bottom: '4px',
                background: 'var(--brand-secondary)',
                color: 'white',
                border: 'none',
                padding: '0 15px',
                borderRadius: '2px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                ➔
              </button>
            </div>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><Link href="/courses">Nursing Ausbildung</Link></li>
              <li><Link href="/services">Nurse Recruitment</Link></li>
              <li><Link href="/courses">German Language Training</Link></li>
              <li><Link href="/services">Visa Processing</Link></li>
              <li><Link href="/contact">Document Support</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/testimonials">Testimonials</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4>Contact Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={18} color="var(--brand-secondary)" style={{ marginTop: '4px', flexShrink: 0 }} />
                <p style={{ fontSize: '14px', lineHeight: '1.6' }}>Kerala, India</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Phone size={18} color="var(--brand-secondary)" style={{ flexShrink: 0 }} />
                <a href="tel:+919847300744" style={{ fontSize: '14px' }}>+91 9847 300 744</a>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Mail size={18} color="var(--brand-secondary)" style={{ flexShrink: 0 }} />
                <a href="mailto:info@nexstepeurope.com" style={{ fontSize: '14px' }}>info@nexstepeurope.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="container" style={{
          marginTop: '60px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'center',
          fontSize: '12px'
        }}>
          <p>© Copyright 2025 NexStep Europe. All rights reserved. — Step Into Your Future</p>
        </div>
      </div>
    </footer>
  );
}
