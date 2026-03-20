"use client";

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { Search, Filter, Loader2, Calendar, Phone, Mail, CheckCircle, Trash2, ExternalLink } from 'lucide-react';

export default function InquiriesPage() {
  const { user, loading } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (!user || !user.isAdmin) return;

    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setInquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, [user]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'inquiries', id), { status: newStatus });
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!confirm("Delete this inquiry?")) return;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (err) {
      console.error("Error deleting inquiry:", err);
    }
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ["Full Name", "Phone", "Email", "Service", "Qualification", "Language", "Message", "Source", "Date", "Status"];
    const rows = inquiries.map(item => [
      item.fullName,
      item.phone,
      item.email || 'N/A',
      item.service,
      item.qualification || 'N/A',
      item.languageLevel || item.germanLevel || 'N/A',
      `"${(item.message || '').replace(/"/g, '""')}"`,
      item.source || 'Direct',
      item.createdAt?.toDate ? item.createdAt.toDate().toISOString() : 'N/A',
      item.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `NexStep_Inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter(item => {
    const matchesSearch = 
      item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.phone?.includes(searchTerm) || 
      item.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading || !user || !user.isAdmin) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--brand-primary)' }}>Student Inquiries</h1>
          <p style={{ color: 'var(--text-gray)', marginTop: '4px' }}>Track and follow up with nursing candidates</p>
        </div>
        <button 
          onClick={handleExportCSV}
          style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid var(--brand-secondary)', background: 'none', color: 'var(--brand-secondary)', fontWeight: '600', cursor: 'pointer' }}
        >
          EXPORT DATA (.CSV)
        </button>
      </div>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <div style={{ flex: 1, background: 'white', padding: '0 15px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Search size={18} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Search name, email, or phone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, border: 'none', padding: '12px 0', outline: 'none', fontSize: '15px' }}
          />
        </div>
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', background: 'white' }}
        >
          <option value="all">All Leads</option>
          <option value="new">Unseen Leads</option>
          <option value="contacted">Followed Up</option>
          <option value="closed">Closed / Resolved</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {filteredInquiries.map((item) => (
          <div key={item.id} style={{ 
            background: 'white', 
            padding: '24px', 
            borderRadius: '16px', 
            border: '1px solid #f1f5f9',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: item.status === 'new' ? '0 4px 12px rgba(0, 177, 176, 0.08)' : 'none',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <strong style={{ fontSize: '18px', color: 'var(--brand-primary)' }}>{item.fullName}</strong>
                  {item.source === 'chatbot' && <span style={{ background: '#ecfdf5', color: '#10b981', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>VIA CHATBOT</span>}
                  <span style={{ 
                    fontSize: '11px', 
                    padding: '4px 8px', 
                    borderRadius: '6px', 
                    background: item.status === 'new' ? '#fff1f2' : item.status === 'contacted' ? '#f0f9ff' : '#f8fafc',
                    color: item.status === 'new' ? '#e11d48' : item.status === 'contacted' ? '#0ea5e9' : '#64748b',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>{item.status}</span>
                </div>
                <div style={{ color: 'var(--text-gray)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '15px', marginTop: '8px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={14} /> {item.createdAt?.toDate ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(item.createdAt.toDate()) : 'Recent'}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><strong>Service:</strong> {item.service?.replace('_', ' ')}</span>
                </div>
              </div>

              {/* Action Buttons: CALL & MAIL */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <a 
                  href={`tel:${item.phone}`} 
                  title="Call Directly"
                  style={{ 
                    padding: '10px 15px', 
                    borderRadius: '8px', 
                    backgroundColor: '#f0f9ff', 
                    color: '#0ea5e9', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    textDecoration: 'none', 
                    fontSize: '13px', 
                    fontWeight: '600',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0f2fe'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f0f9ff'}
                >
                  <Phone size={16} /> CALL
                </a>
                <a 
                  href={`mailto:${item.email || ''}`}
                  title="Send Email"
                  style={{ 
                    padding: '10px 15px', 
                    borderRadius: '8px', 
                    backgroundColor: '#ecfdf5', 
                    color: '#10b981', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    textDecoration: 'none', 
                    fontSize: '13px', 
                    fontWeight: '600'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d1fae5'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ecfdf5'}
                >
                  <Mail size={16} /> EMAIL
                </a>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px', fontSize: '14px', lineHeight: '1.6', color: '#334155', border: '1px solid #edf2f7' }}>
              <div style={{ marginBottom: '8px', display: 'flex', gap: '20px' }}>
                <span><strong>Qualification:</strong> {item.qualification || 'N/A'}</span>
                <span><strong>Language Level:</strong> {item.languageLevel || item.germanLevel || 'N/A'}</span>
              </div>
              <strong>Message:</strong><br/>
              {item.message || 'No additional message provided.'}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '5px' }}>
               {item.status === 'new' && (
                 <button 
                  onClick={() => handleStatusUpdate(item.id, 'contacted')} 
                  style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#10b981', background: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                 >
                   <CheckCircle size={16} /> MARK CONTACTED
                 </button>
               )}
               {item.status === 'contacted' && (
                 <button 
                  onClick={() => handleStatusUpdate(item.id, 'closed')} 
                  style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#2563eb', background: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                 >
                   <CheckCircle size={16} /> CLOSE CASE
                 </button>
               )}
               <button 
                onClick={() => handleDeleteInquiry(item.id)} 
                style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #fee2e2', color: '#ef4444', background: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
               >
                 <Trash2 size={16} /> DELETE
               </button>
            </div>
          </div>
        ))}

        {filteredInquiries.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px', background: 'white', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
            <p style={{ color: 'var(--text-gray)', fontSize: '16px' }}>No inquiries found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
