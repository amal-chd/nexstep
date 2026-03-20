"use client";
import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Chatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', qualification: '', languageLevel: '' });
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! 👋 Welcome to NexStep Europe. I will help you explore your nursing career in Germany.\n\n**What is your full name?**' }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (pathname?.startsWith('/admin')) return null;

  const stepsFlow = [
    { field: 'name', nextQ: 'Nice to meet you! **What is your WhatsApp or phone number** so our team can reach you?' },
    { field: 'phone', nextQ: 'Which service are you interested in?' },
    { field: 'service', nextQ: 'What is your current qualification? (e.g., 10+2, GNM, BSc Nursing, MSc Nursing)', options: ['Nursing Ausbildung', 'Direct Nurse Recruitment'] },
    { field: 'qualification', nextQ: 'What is your current German language level?', options: ['GNM', 'BSc Nursing', 'Post Basic', 'Other'] },
    { field: 'languageLevel', nextQ: 'Thank you! 🎉 Our team will review your profile and contact you within 24 hours with a personalized pathway. Meanwhile, feel free to call us at +91 9847 300 744.', options: ['None (Beginner)', 'A1', 'A2', 'B1', 'B2+'] }
  ];

  const handleSend = async (e, manualValue = null) => {
    if (e) e.preventDefault();
    const input = manualValue || (e ? e.target.elements.message.value : '');
    if (!input.trim() || isTyping) return;

    // Add user message
    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    if (e) e.target.reset();

    if (step < stepsFlow.length) {
      const currentStepObj = stepsFlow[step];
      const newFormData = { ...formData, [currentStepObj.field]: input };
      setFormData(newFormData);
      
      setIsTyping(true);
      
      // Artificial delay for realism
      setTimeout(async () => {
        setIsTyping(false);
        const botMsg = { sender: 'bot', text: currentStepObj.nextQ };
        setMessages(prev => [...prev, botMsg]);
        setStep(prev => prev + 1);
        
        if (step === stepsFlow.length - 1) {
          // Final step reached, save to Firestore
          try {
            await addDoc(collection(db, 'inquiries'), {
              fullName: newFormData.name,
              phone: newFormData.phone,
              email: 'Lead from Chatbot',
              service: newFormData.service.includes('Ausbildung') ? 'Nursing_Ausbildung' : 'Nurse_Recruitment',
              qualification: newFormData.qualification,
              languageLevel: newFormData.languageLevel,
              status: 'new',
              source: 'chatbot',
              createdAt: serverTimestamp()
            });
            console.log('Lead saved to admin panel!');
          } catch (error) {
            console.error('Error saving lead:', error);
          }
        }
      }, 1200);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '25px',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 30px rgba(0, 177, 176, 0.5)',
          cursor: 'pointer',
          display: isOpen ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3000000,
          pointerEvents: 'auto'
        }}
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Window (Pure CSS Toggle) */}
      <div
        style={{
          position: 'fixed',
          bottom: '25px',
          right: '25px',
          width: 'calc(100% - 50px)',
          maxWidth: '350px',
          height: '500px',
          background: 'white',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          display: 'flex',
          visibility: isOpen ? 'visible' : 'hidden',
          pointerEvents: isOpen ? 'auto' : 'none',
          opacity: isOpen ? 1 : 0,
          flexDirection: 'column',
          zIndex: 2000000, // Even higher than before
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)'
        }}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, var(--brand-primary), #1a3070)',
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white'
        }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0, color: 'white' }}>NexStep Europe</h3>
            <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Step Into Your Future 🩺</span>
          </div>
          <button 
            type="button"
            onClick={() => setIsOpen(false)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div style={{
          flex: 1,
          padding: '1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          background: '#f8f9fa'
        }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              background: msg.sender === 'user' ? 'var(--brand-primary)' : 'white',
              color: msg.sender === 'user' ? 'white' : 'var(--text-dark)',
              padding: '0.75rem 1rem',
              borderRadius: '16px',
              borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
              borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '16px',
              maxWidth: '85%',
              fontSize: '0.9rem',
              lineHeight: '1.5',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              whiteSpace: 'pre-line',
              position: 'relative'
            }}>
              {msg.text.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} style={{ color: 'var(--brand-secondary)', fontWeight: '800' }}>{part}</strong> : part)}
              {msg.sender === 'bot' && idx === messages.length - 1 && stepsFlow[step-1]?.options && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                  {stepsFlow[step-1].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSend(null, opt)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        border: '1px solid var(--brand-secondary)',
                        background: 'white',
                        color: 'var(--brand-secondary)',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          background: 'var(--brand-secondary)',
                          color: 'white'
                        }
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div style={{ alignSelf: 'flex-start', background: 'white', padding: '10px 15px', borderRadius: '15px', display: 'flex', gap: '4px' }}>
              <div className="typing-dot" style={{ width: '6px', height: '6px', background: '#94a3b8', borderRadius: '50%', animation: 'bounce 1s infinite' }}></div>
              <div className="typing-dot" style={{ width: '6px', height: '6px', background: '#94a3b8', borderRadius: '50%', animation: 'bounce 1s infinite 0.2s' }}></div>
              <div className="typing-dot" style={{ width: '6px', height: '6px', background: '#94a3b8', borderRadius: '50%', animation: 'bounce 1s infinite 0.4s' }}></div>
              <style>{`
                @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
              `}</style>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} style={{
          padding: '1rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          gap: '0.5rem',
          background: 'white'
        }}>
          <input 
            name="message"
            type="text" 
            placeholder="Type your answer..." 
            disabled={step >= stepsFlow.length}
            style={{
              flex: 1,
              background: '#f8f9fa',
              border: '1px solid var(--border-color)',
              color: 'var(--text-dark)',
              padding: '0.75rem 1rem',
              borderRadius: '50px',
              outline: 'none',
              fontSize: '0.9rem'
            }}
          />
          <button 
            type="submit"
            disabled={step >= stepsFlow.length}
            style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              background: 'var(--brand-secondary)',
              color: 'white',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: step >= stepsFlow.length ? 'not-allowed' : 'pointer',
              opacity: step >= stepsFlow.length ? 0.5 : 1,
              flexShrink: 0
            }}
          >
            <Send size={18} style={{ marginLeft: '-2px' }} />
          </button>
        </form>
      </div>
    </div>
  );
}
