"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        {/* Logo */}
        <Link href="/" className="nav-logo">
          <img src="/images/logo.png" alt="NexStep Europe" />
        </Link>
        
        {/* Navigation Menu (Desktop) */}
        <div className="nav-menu">
          <Link href="/" className="nav-item">HOME</Link>
          <Link href="/courses" className="nav-item">NURSING AUSBILDUNG</Link>
          <Link href="/services" className="nav-item">NURSE RECRUITMENT</Link>
          <Link href="/destinations" className="nav-item">GERMANY <ChevronDown size={14} /></Link>
          <Link href="/blog" className="nav-item">BLOG</Link>
        </div>

        {/* Actions (Desktop) */}
        <div className="nav-actions">
          <a href="tel:+919847300744" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            📞 +91 9847 300 744
          </a>
          <Link href="/contact" className="btn-primary">
            BOOK CONSULTATION ↗
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button type="button" className="hamburger" onClick={() => setIsMobileOpen(true)} aria-label="Toggle Menu" style={{ padding: '15px', minWidth: '60px', minHeight: '60px' }}>
          <Menu size={32} />
        </button>
      </div>

      {/* Mobile Menu Slide-in (Standard CSS) */}
      <div 
        className="mobile-dropdown"
        style={{ 
          transform: isMobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          display: 'flex',
          pointerEvents: isMobileOpen ? 'auto' : 'none',
          visibility: isMobileOpen ? 'visible' : 'hidden'
        }}
      >
        <div style={{ padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <button type="button" onClick={() => setIsMobileOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--brand-primary)', cursor: 'pointer' }}>
                    <X size={32} />
                </button>
            </div>
            
            <Link href="/" className="nav-item" style={{ fontSize: '18px', padding: '12px 0' }} onClick={() => setIsMobileOpen(false)}>HOME</Link>
            <Link href="/courses" className="nav-item" style={{ fontSize: '18px', padding: '12px 0' }} onClick={() => setIsMobileOpen(false)}>NURSING AUSBILDUNG</Link>
            <Link href="/services" className="nav-item" style={{ fontSize: '18px', padding: '12px 0' }} onClick={() => setIsMobileOpen(false)}>NURSE RECRUITMENT</Link>
            <Link href="/destinations" className="nav-item" style={{ fontSize: '18px', padding: '12px 0' }} onClick={() => setIsMobileOpen(false)}>GERMANY</Link>
            <Link href="/blog" className="nav-item" style={{ fontSize: '18px', padding: '12px 0' }} onClick={() => setIsMobileOpen(false)}>BLOG</Link>
            
            <div style={{ height: '1px', background: 'var(--border-color)', margin: '15px 0' }}></div>
            
            <a href="tel:+919847300744" style={{ fontWeight: '700', color: 'var(--brand-primary)', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              📞 +91 9847 300 744
            </a>
            <Link href="/contact" className="btn-primary" style={{ width: '100%', padding: '18px', marginTop: '20px' }} onClick={() => setIsMobileOpen(false)}>
              BOOK CONSULTATION ↗
            </Link>
        </div>
      </div>
    </nav>
  );
}
