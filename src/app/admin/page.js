"use client";

import { Users, UserCheck, MessageSquareText, FileText } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Leads', value: '1,245', icon: <Users size={24} color="#4361EE" />, bg: 'rgba(67, 97, 238, 0.1)', change: '+12% this month' },
    { title: 'Converted', value: '382', icon: <UserCheck size={24} color="#00F0FF" />, bg: 'rgba(0, 240, 255, 0.1)', change: '+5% this month' },
    { title: 'Chatbot Leads', value: '410', icon: <MessageSquareText size={24} color="#9D4EDD" />, bg: 'rgba(157, 78, 221, 0.1)', change: '+22% this month' },
    { title: 'Active Applications', value: '150', icon: <FileText size={24} color="#A0AEC0" />, bg: 'rgba(160, 174, 192, 0.1)', change: '-2% this month' },
  ];

  const chartData = [
    { name: 'Jan', leads: 400 }, { name: 'Feb', leads: 300 }, { name: 'Mar', leads: 550 },
    { name: 'Apr', leads: 480 }, { name: 'May', leads: 600 }, { name: 'Jun', leads: 800 },
    { name: 'Jul', leads: 750 }
  ];

  const recentLeads = [
    { name: 'Anjali Nair', course: 'Nursing Ausbildung', country: 'Germany', status: 'New', source: 'Chatbot', time: '10 mins ago' },
    { name: 'Dr. Rahul Varma', course: 'Direct Recruitment', country: 'Germany', status: 'Contacted', source: 'Website Form', time: '1 hr ago' },
    { name: 'Priya Thomas', course: 'BSc Nursing Entry', country: 'Germany', status: 'Converted', source: 'Social Media', time: '3 hrs ago' },
    { name: 'Sreejith K.', course: 'Nursing Ausbildung', country: 'Germany', status: 'New', source: 'Chatbot', time: '5 hrs ago' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: '700' }}>Dashboard Overview</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Welcome back! Here is what is happening today.</p>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-glass)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '500' }}>{stat.title}</span>
              <div style={{ background: stat.bg, width: '45px', height: '45px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon}
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>{stat.value}</h2>
              <span style={{ color: 'var(--accent-neon-blue)', fontSize: '0.85rem' }}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Chart Section */}
        <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-glass)', borderRadius: '16px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: '600' }}>Lead Generation Trend</h3>
          <div style={{ width: '100%', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-purple)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--accent-purple)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-glass)" />
                <Tooltip />
                <Area type="monotone" dataKey="leads" stroke="var(--accent-purple)" fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Leads */}
        <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-glass)', borderRadius: '16px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Recent Leads</h3>
            <button style={{ color: 'var(--accent-purple)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>View All</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentLeads.map((lead, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ fontWeight: '600' }}>{lead.name}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lead.course} • {lead.country}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '50px', 
                    background: lead.status === 'New' ? 'rgba(0, 240, 255, 0.1)' : lead.status === 'Converted' ? 'rgba(67, 97, 238, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                    color: lead.status === 'New' ? 'var(--accent-neon-blue)' : lead.status === 'Converted' ? 'var(--accent-indigo)' : 'var(--text-secondary)'
                  }}>
                    {lead.status}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lead.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
