"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, MessageSquareText, BookOpen, Globe2, Settings, Bell, LogOut, PanelLeft } from 'lucide-react';
import { useState } from 'react';
import '@/app/globals.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Leads', icon: <Users size={20} />, path: '/admin/leads' },
    { name: 'Chatbot Leads', icon: <MessageSquareText size={20} />, path: '/admin/chatbot' },
    { name: 'Courses', icon: <BookOpen size={20} />, path: '/admin/courses' },
    { name: 'Destinations', icon: <Globe2 size={20} />, path: '/admin/destinations' },
    { name: 'CMS & Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? '260px' : '80px',
        backgroundColor: 'var(--bg-tertiary)',
        borderRight: '1px solid var(--border-glass)',
        transition: 'width 0.3s',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: sidebarOpen ? 'space-between' : 'center', borderBottom: '1px solid var(--border-glass)' }}>
          {sidebarOpen && <span style={{ fontWeight: '800', fontSize: '1.2rem', color: 'white' }}>NexStep Admin</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <PanelLeft size={24} />
          </button>
        </div>

        <nav style={{ flex: 1, padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== '/admin');
            return (
              <Link key={item.path} href={item.path} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.85rem 1.5rem',
                color: isActive ? 'white' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'rgba(67, 97, 238, 0.15)' : 'transparent',
                borderRight: isActive ? '4px solid var(--accent-indigo)' : '4px solid transparent',
                textDecoration: 'none',
                transition: 'all 0.2s',
                justifyContent: sidebarOpen ? 'flex-start' : 'center'
              }}>
                <span style={{ color: isActive ? 'var(--accent-indigo)' : 'inherit' }}>{item.icon}</span>
                {sidebarOpen && <span style={{ fontSize: '0.95rem', fontWeight: isActive ? '600' : '400' }}>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass)' }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            width: '100%',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            justifyContent: sidebarOpen ? 'flex-start' : 'center'
          }}>
            <LogOut size={20} color="var(--text-muted)" />
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
          backgroundColor: 'var(--bg-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', position: 'relative' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--accent-purple)', width: '15px', height: '15px', borderRadius: '50%', fontSize: '0.6rem', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'var(--accent-indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                A
              </div>
              {sidebarOpen && <div style={{ fontSize: '0.9rem' }}>
                <div style={{ fontWeight: '600' }}>Admin User</div>
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
