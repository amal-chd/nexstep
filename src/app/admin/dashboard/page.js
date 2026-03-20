"use client";

import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { LogOut, Trash2, CheckCircle, Mail, Phone, Calendar, User, Search, Filter } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { addDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquiries, setInquiries] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Blog form state
  const [blogForm, setBlogForm] = useState({ title: '', image: '', excerpt: '' });
  const [blogLoading, setBlogLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/admin/login');
      } else if (!user.isAdmin) {
        router.push('/');
      }
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;

    // Fetch Inquiries
    const qInquiries = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
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

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    if (!blogForm.title) return;
    setBlogLoading(true);
    try {
      await addDoc(collection(db, 'blogs'), {
        ...blogForm,
        img: blogForm.image || '/images/blog_1.png', // Fallback
        createdAt: serverTimestamp()
      });
      setBlogForm({ title: '', image: '', excerpt: '' });
      alert("Blog created successfully!");
    } catch (err) {
      console.error("Error creating blog:", err);
      alert("Failed to create blog.");
    } finally {
      setBlogLoading(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      await deleteDoc(doc(db, 'blogs', id));
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  const filteredInquiries = inquiries.filter(item => {
    const matchesSearch = 
      item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.phone?.includes(searchTerm) || 
      item.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading || !user) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Admin Console...</div>;

  return (
    <div style={{ background: '#f4f7f9', minHeight: '100vh', padding: '40px 20px' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ color: 'var(--brand-primary)', fontSize: '32px' }}>NexStep Console</h1>
            <p style={{ color: 'var(--text-gray)' }}>Admin Dashboard</p>
          </div>
          <button onClick={handleLogout} className="btn-primary" style={{ background: '#ef4444', height: '45px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <LogOut size={18} /> LOGOUT
          </button>
        </header>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '1px solid #e2e8f0', paddingBottom: '1px' }}>
          <button 
            onClick={() => setActiveTab('inquiries')}
            style={{ padding: '12px 25px', borderRadius: '8px 8px 0 0', border: 'none', background: activeTab === 'inquiries' ? 'white' : 'transparent', color: activeTab === 'inquiries' ? 'var(--brand-primary)' : 'var(--text-gray)', fontWeight: '700', cursor: 'pointer', borderBottom: activeTab === 'inquiries' ? '3px solid var(--brand-secondary)' : 'none' }}
          >
            INQUIRIES ({inquiries.length})
          </button>
          <button 
            onClick={() => setActiveTab('blogs')}
            style={{ padding: '12px 25px', borderRadius: '8px 8px 0 0', border: 'none', background: activeTab === 'blogs' ? 'white' : 'transparent', color: activeTab === 'blogs' ? 'var(--brand-primary)' : 'var(--text-gray)', fontWeight: '700', cursor: 'pointer', borderBottom: activeTab === 'blogs' ? '3px solid var(--brand-secondary)' : 'none' }}
          >
            BLOG POSTS ({blogs.length})
          </button>
        </div>

        {activeTab === 'inquiries' ? (
          <>
            {/* Inquiry Filters */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
              <div style={{ flex: 1, minWidth: '300px', display: 'flex', alignItems: 'center', gap: '10px', background: '#f8f9fa', padding: '0 15px', borderRadius: '8px' }}>
                <Search size={18} color="#94a3b8" />
                <input 
                  type="text" 
                  placeholder="Search inquiries..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ flex: 1, background: 'none', border: 'none', padding: '12px 0', outline: 'none' }}
                />
              </div>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }}
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {filteredInquiries.map((item) => (
                <div key={item.id} style={{ background: 'white', padding: '25px', borderRadius: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', border: item.status === 'new' ? '1px solid #e0f2fe' : 'none', position: 'relative' }}>
                  <div>
                    <strong style={{ fontSize: '18px', display: 'block' }}>{item.fullName}</strong>
                    <span style={{ fontSize: '13px', color: 'var(--text-gray)' }}>{item.createdAt?.toDate ? new Intl.DateTimeFormat('en-GB').format(item.createdAt.toDate()) : 'Recently'}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px' }}>{item.phone}</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-gray)' }}>{item.email}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px' }}><strong>Srv:</strong> {item.service}</div>
                    <div style={{ fontSize: '13px' }}><strong>Lvl:</strong> {item.languageLevel}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <select 
                      value={item.status || 'new'} 
                      onChange={(e) => handleStatusUpdate(item.id, e.target.value)}
                      style={{ padding: '5px 10px', borderRadius: '4px', fontSize: '12px' }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button onClick={() => handleDeleteInquiry(item.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
            {/* Create Blog Form */}
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', height: 'fit-content' }}>
              <h3 style={{ marginBottom: '20px' }}>Create New Blog</h3>
              <form onSubmit={handleCreateBlog} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                  placeholder="Blog Title" 
                  value={blogForm.title} 
                  onChange={e => setBlogForm({...blogForm, title: e.target.value})} 
                  style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
                  required
                />
                <input 
                  placeholder="Image URL (optional)" 
                  value={blogForm.image} 
                  onChange={e => setBlogForm({...blogForm, image: e.target.value})} 
                  style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
                />
                <textarea 
                  placeholder="Excerpt/Content" 
                  rows={4}
                  value={blogForm.excerpt} 
                  onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})} 
                  style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
                />
                <button type="submit" disabled={blogLoading} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  {blogLoading ? 'CREATING...' : 'PUBLISH BLOG'}
                </button>
              </form>
            </div>

            {/* Blog List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {blogs.map(blog => (
                <div key={blog.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <img src={blog.img} style={{ width: '80px', height: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '16px' }}>{blog.title}</h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-gray)' }}>{blog.createdAt?.toDate ? new Intl.DateTimeFormat('en-GB').format(blog.createdAt.toDate()) : 'Recently'}</span>
                  </div>
                  <button onClick={() => handleDeleteBlog(blog.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                </div>
              ))}
              {blogs.length === 0 && <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-gray)' }}>No blog posts yet.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
