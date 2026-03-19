"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Prevent scrolling and notify other components when menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('nav-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('nav-open');
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('nav-open');
    };
  }, [isMobileOpen]);

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
          <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            📞 +91 9847 300 744
          </div>
          <Link href="/contact" className="btn-primary">
            BOOK CONSULTATION ↗
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button 
          type="button" 
          className="hamburger" 
          onClick={() => setIsMobileOpen(true)} 
          aria-label="Open Menu" 
          style={{ 
            padding: '15px', 
            minWidth: '60px', 
            minHeight: '60px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            opacity: isMobileOpen ? 0 : 1,
            pointerEvents: isMobileOpen ? 'none' : 'auto',
            transition: 'opacity 0.2s ease'
          }}
        >
          <Menu size={32} />
        </button>
      </div>

      {/* Overlay Backdrop */}
      <div 
        onClick={() => setIsMobileOpen(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 99999,
          display: isMobileOpen ? 'block' : 'none',
          opacity: isMobileOpen ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />

      {/* Mobile Menu Slide-in */}
      <div 
        className="mobile-dropdown"
        style={{ 
          transform: isMobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          pointerEvents: isMobileOpen ? 'auto' : 'none',
          visibility: isMobileOpen ? 'visible' : 'hidden',
          zIndex: 9999999
        }}
      >
        <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
            {/* Close Button Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontWeight: '800', color: 'var(--brand-primary)', fontSize: '20px' }}>NexStep</span>
                <button 
                  type="button" 
                  onClick={() => setIsMobileOpen(false)} 
                  aria-label="Close Menu"
                  style={{ 
                    background: 'var(--brand-primary)', 
                    border: 'none', 
                    color: 'white', 
                    padding: '10px', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}
                >
                    <X size={28} />
                </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <Link href="/" className="nav-item" style={{ fontSize: '20px', padding: '15px 0', borderBottom: '1px solid #f0f0f0' }} onClick={() => setIsMobileOpen(false)}>HOME</Link>
                <Link href="/courses" className="nav-item" style={{ fontSize: '20px', padding: '15px 0', borderBottom: '1px solid #f0f0f0' }} onClick={() => setIsMobileOpen(false)}>NURSING AUSBILDUNG</Link>
                <Link href="/services" className="nav-item" style={{ fontSize: '20px', padding: '15px 0', borderBottom: '1px solid #f0f0f0' }} onClick={() => setIsMobileOpen(false)}>NURSE RECRUITMENT</Link>
                <Link href="/destinations" className="nav-item" style={{ fontSize: '20px', padding: '15px 0', borderBottom: '1px solid #f0f0f0' }} onClick={() => setIsMobileOpen(false)}>GERMANY</Link>
                <Link href="/blog" className="nav-item" style={{ fontSize: '20px', padding: '15px 0', borderBottom: '1px solid #f0f0f0' }} onClick={() => setIsMobileOpen(false)}>BLOG</Link>
            </div>
            
            <div style={{ marginTop: 'auto', paddingTop: '30px' }}>
                <div style={{ color: 'var(--text-gray)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Get in touch</div>
                <a href="tel:+919847300744" style={{ fontWeight: '800', color: 'var(--brand-primary)', fontSize: '22px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  📞 +91 9847 300 744
                </a>
                <Link href="/contact" className="btn-primary" style={{ width: '100%', padding: '20px', marginTop: '25px', borderRadius: '8px', fontSize: '16px' }} onClick={() => setIsMobileOpen(false)}>
                  FREE CONSULTATION ↗
                </Link>
            </div>
        </div>
      </div>
    </nav>
  );
}
