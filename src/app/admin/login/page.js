"use client";

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // We'll trust the AuthContext to update and handle redirection if they're an admin
      // But for better UX, let's do a quick local check if possible or just wait for AuthContext
      // Actually, since AuthContext uses onAuthStateChanged, it will trigger the redirect in dashboard
      router.push('/admin/dashboard');
    } catch (err) {
      console.error("Login attempt failed:", err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#f0f4f8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ background: 'var(--brand-primary)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
            <User size={30} color="white" />
          </div>
          <h1 style={{ fontSize: '24px', color: 'var(--brand-primary)' }}>NexStep Admin</h1>
          <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>Please log in to manage inquiries.</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '15px', top: '15px', color: '#94a3b8' }}>
              <Mail size={18} />
            </div>
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '14px 15px 14px 45px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '15px', outline: 'none', background: '#f8f9fa' }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '15px', top: '15px', color: '#94a3b8' }}>
              <Lock size={18} />
            </div>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '14px 15px 14px 45px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '15px', outline: 'none', background: '#f8f9fa' }}
            />
          </div>

          {error && (
            <div style={{ background: '#fee2e2', color: '#ef4444', padding: '12px', borderRadius: '8px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary" 
            style={{ width: '100%', height: '52px', justifyContent: 'center', fontSize: '16px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? <Loader2 size={24} className="animate-spin" /> : 'LOGIN TO DASHBOARD'}
          </button>
        </form>

        <div style={{ marginTop: '25px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>
            Forgot password? Please contact global administrator.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
