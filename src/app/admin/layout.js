"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, MessageSquareText, BookOpen, Globe2, Settings, Bell, LogOut, PanelLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import '@/app/globals.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!loading) {
      if (!user && !isLoginPage) {
        router.replace('/admin/login');
      } else if (user && !user.isAdmin && !isLoginPage) {
        // Logged in but NOT admin
        router.replace('/');
      } else if (user && user.isAdmin && isLoginPage) {
        // Already logged in as admin, visiting login
        router.replace('/admin/dashboard');
      }
    }
  }, [user, loading, pathname, router, isLoginPage]);

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { name: 'Inquiries', icon: <MessageSquareText size={20} />, path: '/admin/inquiries' },
    { name: 'Blogs', icon: <BookOpen size={20} />, path: '/admin/blogs' },
  ];

  if (isLoginPage) {
    if (user && user.isAdmin) return null; // Avoid flicker during redirect
    return <>{children}</>;
  }

  if (loading || !user || !user.isAdmin) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', background: '#f8fafc' }}>
        <Loader2 size={40} className="animate-spin" color="var(--brand-primary)" />
        <p style={{ color: 'var(--text-gray)', fontWeight: '500' }}>Checking Permissions...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f9' }}>

      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? '260px' : '80px',
        backgroundColor: 'var(--brand-primary)',
        borderRight: '1px solid rgba(255,255,255,0.1)',
        transition: 'width 0.3s',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        color: 'white'
      }}>
        <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: sidebarOpen ? 'space-between' : 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {sidebarOpen && <span style={{ fontWeight: '800', fontSize: '1.4rem', color: 'white', letterSpacing: '0.5px' }}>NexStep Admin</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <PanelLeft size={24} />
          </button>
        </div>

        <nav style={{ flex: 1, padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== '/admin/dashboard');
            return (
              <Link key={item.path} href={item.path} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.85rem 1.5rem',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                backgroundColor: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                borderLeft: isActive ? '4px solid var(--brand-secondary)' : '4px solid transparent',
                textDecoration: 'none',
                transition: 'all 0.2s',
                justifyContent: sidebarOpen ? 'flex-start' : 'center'
              }}>
                <span style={{ color: isActive ? 'var(--brand-secondary)' : 'inherit', display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                {sidebarOpen && <span style={{ fontSize: '0.95rem', fontWeight: isActive ? '600' : '500' }}>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass)' }}>
          <button 
            onClick={async () => {
              await signOut(auth);
              router.push('/admin/login');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              width: '100%',
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              justifyContent: sidebarOpen ? 'flex-start' : 'center'
            }}
          >
            <LogOut size={20} color="#ef4444" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <header style={{
          height: '70px',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 2rem',
          backgroundColor: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'var(--brand-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {user?.email?.[0].toUpperCase() || 'A'}
              </div>
              {sidebarOpen && <div style={{ fontSize: '0.9rem' }}>
                <div style={{ fontWeight: '600' }}>{user?.email?.split('@')[0] || 'Admin User'}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Super Admin</div>
              </div>}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
