"use client";

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { Calendar, Trash2, Plus, Loader2, Image as ImageIcon, FileText, Send } from 'lucide-react';

export default function BlogsPage() {
  const { user, loading } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [blogForm, setBlogForm] = useState({ title: '', image: '', excerpt: '' });
  const [blogLoading, setBlogLoading] = useState(false);

  useEffect(() => {
    if (!user || !user.isAdmin) return;

    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setBlogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, [user]);

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    if (!blogForm.title) return;
    setBlogLoading(true);
    try {
      await addDoc(collection(db, 'blogs'), {
        ...blogForm,
        img: blogForm.image || '/images/blog_1.png', 
        createdAt: serverTimestamp()
      });
      setBlogForm({ title: '', image: '', excerpt: '' });
      alert("Blog post published successfully!");
    } catch (err) {
      console.error("Error creating blog:", err);
      alert("Failed to publish blog.");
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

  if (loading || !user || !user.isAdmin) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', animation: 'fadeIn 0.5s ease-out' }}>
      
      {/* Blog List */}
      <div>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--brand-primary)' }}>Published Articles</h1>
          <p style={{ color: 'var(--text-gray)', marginTop: '4px' }}>Manage educational content and news</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {blogs.map((blog) => (
            <div key={blog.id} style={{ 
              background: 'white', 
              padding: '1.5rem', 
              borderRadius: '16px', 
              border: '1px solid #f1f5f9',
              display: 'flex',
              gap: '20px',
              alignItems: 'center'
            }}>
              <img 
                src={blog.img || blog.image} 
                alt={blog.title} 
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '12px', background: '#f1f5f9' }} 
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--brand-primary)' }}>{blog.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 2 }}>{blog.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '12px', fontSize: '12px', color: '#94a3b8' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={14} /> {blog.createdAt?.toDate ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short' }).format(blog.createdAt.toDate()) : 'Recently'}</span>
                  <button 
                    onClick={() => handleDeleteBlog(blog.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Trash2 size={14} /> DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
          {blogs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
              <p style={{ color: '#94a3b8' }}>No articles published yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Form */}
      <div style={{ position: 'sticky', top: '20px', height: 'fit-content' }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--brand-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Plus size={24} color="var(--brand-secondary)" /> New Article
          </h2>
          
          <form onSubmit={handleCreateBlog} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', paddingBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#475569' }}>Article Title</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '0 15px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <FileText size={18} color="#94a3b8" />
                <input 
                  type="text" 
                  placeholder="e.g Nursing Career in Germany..." 
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                  style={{ width: '100%', padding: '12px 0', background: 'none', border: 'none', outline: 'none' }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', paddingBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#475569' }}>Banner Image URL</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '0 15px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <ImageIcon size={18} color="#94a3b8" />
                <input 
                  type="text" 
                  placeholder="https://..." 
                  value={blogForm.image}
                  onChange={(e) => setBlogForm({...blogForm, image: e.target.value})}
                  style={{ width: '100%', padding: '12px 0', background: 'none', border: 'none', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', paddingBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#475569' }}>Excerpt (Summary)</label>
              <textarea 
                placeholder="Brief summary for list view..." 
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
                rows="4"
                style={{ width: '100%', padding: '12px 15px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', resize: 'none' }}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={blogLoading}
              style={{ padding: '14px', borderRadius: '10px', backgroundColor: 'var(--brand-primary)', color: 'white', fontWeight: '700', border: 'none', cursor: 'pointer', transition: 'all 0.2s', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              {blogLoading ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /> PUBLISH ARTICLE</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
