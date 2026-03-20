"use client";

import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { TrendingUp, Users, MessageSquare, Newspaper, Loader2, Calendar, Phone, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (!user || !user.isAdmin) return;

    // Fetch Inquiries (last 100 for stats)
    const qInquiries = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'), limit(100));
    const unsubInquiries = onSnapshot(qInquiries, (snapshot) => {
      setInquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Fetch Blogs
    const qBlogs = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubBlogs = onSnapshot(qBlogs, (snapshot) => {
      setBlogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubInquiries();
      unsubBlogs();
    };
  }, [user]);

  const stats = {
    totalInquiries: inquiries.length,
    newInquiries: inquiries.filter(i => i.status === 'new').length,
    totalBlogs: blogs.length,
    chatbotLeads: inquiries.filter(i => i.source === 'chatbot').length
  };

  if (loading || !user || !user.isAdmin) {
    return (
      <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <Loader2 size={40} className="animate-spin" color="var(--brand-primary)" />
        <p style={{ color: 'var(--text-gray)', fontWeight: '500' }}>Verifying Access...</p>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Welcome Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, var(--brand-primary) 0%, #1a3070 100%)', 
        padding: '40px', 
        borderRadius: '24px', 
        color: 'white', 
        marginBottom: '40px',
        boxShadow: '0 20px 40px rgba(18, 33, 90, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '10px' }}>Welcome back, Admin 👋</h2>
          <p style={{ fontSize: '16px', opacity: 0.9, maxWidth: '600px' }}>
            Your study abroad platform is performing well today. You have <strong>{stats.newInquiries} new leads</strong> waiting for your attention.
          </p>
          <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
            <Link href="/admin/inquiries" style={{ background: 'var(--brand-secondary)', color: 'white', padding: '12px 24px', borderRadius: '10px', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              View All Inquiries <ArrowRight size={18} />
            </Link>
            <Link href="/admin/blogs" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '12px 24px', borderRadius: '10px', fontWeight: '700', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
              Post Blog Post
            </Link>
          </div>
        </div>
        <div style={{ position: 'absolute', right: '-50px', top: '-50px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px', marginBottom: '40px' }}>
        {[
          { label: 'Total Inquiries', value: stats.totalInquiries, icon: <Users />, color: '#4361ee' },
          { label: 'New Leads', value: stats.newInquiries, icon: <TrendingUp />, color: '#10b981' },
          { label: 'Chatbot Leads', value: stats.chatbotLeads, icon: <MessageSquare />, color: '#0ea5e9' },
          { label: 'Published Blogs', value: stats.totalBlogs, icon: <Newspaper />, color: '#f59e0b' }
        ].map((item, idx) => (
          <div key={idx} style={{ background: 'white', padding: '25px', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: `${item.color}15`, color: item.color }}>{item.icon}</div>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--brand-primary)', marginBottom: '5px' }}>{item.value}</h3>
            <p style={{ color: 'var(--text-gray)', fontSize: '14px', fontWeight: '500' }}>{item.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
        {/* Recent Inquiries List */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--brand-primary)' }}>Quick Inbox</h3>
            <Link href="/admin/inquiries" style={{ color: 'var(--brand-secondary)', fontWeight: '600', fontSize: '14px' }}>View All</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {inquiries.slice(0, 5).map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', borderRadius: '15px', background: '#f8fafc', border: '1px solid transparent', transition: 'all 0.2s' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '12px', backgroundColor: 'var(--brand-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px' }}>
                  {item.fullName?.[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--brand-primary)' }}>{item.fullName}</h4>
                    {item.source === 'chatbot' && <span style={{ fontSize: '9px', fontWeight: '900', background: '#def7ec', color: '#03543f', padding: '2px 6px', borderRadius: '4px' }}>CHATBOT</span>}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-gray)', marginTop: '2px' }}>{item.service?.replace('_', ' ')} • {item.createdAt?.toDate ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short' }).format(item.createdAt.toDate()) : 'Recently'}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                   <span style={{ 
                     fontSize: '10px', 
                     fontWeight: '700', 
                     padding: '4px 8px', 
                     borderRadius: '6px', 
                     background: item.status === 'new' ? '#fff1f2' : item.status === 'contacted' ? '#f0f9ff' : '#f8fafc',
                     color: item.status === 'new' ? '#e11d48' : item.status === 'contacted' ? '#0ea5e9' : '#64748b',
                     textTransform: 'uppercase'
                   }}>{item.status}</span>
                </div>
              </div>
            ))}
            {inquiries.length === 0 && <p style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No inquiries yet.</p>}
          </div>
        </div>

        {/* Lead Analytics Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--brand-primary)', marginBottom: '25px' }}>Source Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
                  <span style={{ fontWeight: '600' }}>AI Chatbot</span>
                  <span style={{ color: 'var(--brand-secondary)', fontWeight: '700' }}>{Math.round((stats.chatbotLeads / (stats.totalInquiries || 1)) * 100)}%</span>
                </div>
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(stats.chatbotLeads / (stats.totalInquiries || 1)) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #00B1B0 0%, #00d2d3 100%)' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
                  <span style={{ fontWeight: '600' }}>Web Forms</span>
                  <span style={{ color: 'var(--brand-primary)', fontWeight: '700' }}>{Math.round(((stats.totalInquiries - stats.chatbotLeads) / (stats.totalInquiries || 1)) * 100)}%</span>
                </div>
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${((stats.totalInquiries - stats.chatbotLeads) / (stats.totalInquiries || 1)) * 100}%`, height: '100%', background: 'var(--brand-primary)' }}></div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '30px', padding: '20px', borderRadius: '15px', background: '#f0f9ff', border: '1px solid #e0f2fe' }}>
              <p style={{ fontSize: '13px', color: '#0369a1', lineHeight: '1.5' }}>
                <TrendingUp size={14} style={{ marginRight: '5px' }} /> 
                <strong>Insight:</strong> {stats.chatbotLeads > inquiries.length / 2 ? 'The Chatbot is currently your primary lead source.' : 'Web forms are generating most of your leads.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
