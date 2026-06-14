import { useState } from 'react';
import api from '../utils/api';
import { PERSONAL } from '../data/personalData';

const ContactForm = () => {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim())                          e.name    = 'Name is required';
    if (!form.email.trim())                         e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email))     e.email   = 'Enter a valid email';
    if (!form.subject.trim())                       e.subject = 'Subject is required';
    if (!form.message.trim())                       e.message = 'Message is required';
    return e;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('loading');
    try {
      await api.post('/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrMsg(err.response?.data?.message || 'Failed to send. Please try again.');
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${errors[field] ? '#ff6b6b' : 'var(--border)'}`,
    borderRadius: 8,
    padding: '12px 16px',
    color: 'var(--white)',
    fontFamily: 'Inter',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s ease',
  });

  if (status === 'success') return (
    <div style={{
      textAlign: 'center', padding: '60px 20px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
    }}>
      <div style={{ fontSize: 64 }}>✅</div>
      <h3 style={{ fontFamily: 'JetBrains Mono', fontSize: 20, color: 'var(--teal)' }}>
        Message sent to the stars!
      </h3>
      <p style={{ color: 'var(--muted)', fontSize: 14 }}>
        I'll get back to you within 24 hours.
      </p>
      <button onClick={() => setStatus('idle')} className="btn-outline" style={{ marginTop: 8 }}>
        Send Another
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Name */}
        <div>
          <label style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
            NAME *
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Saksham Kumar"
            style={inputStyle('name')}
            onFocus={e => { e.target.style.borderColor = 'var(--purple)'; }}
            onBlur={e => { e.target.style.borderColor = errors.name ? '#ff6b6b' : 'var(--border)'; }}
          />
          {errors.name && <p style={{ color: '#ff6b6b', fontSize: 11, marginTop: 4 }}>{errors.name}</p>}
        </div>
        {/* Email */}
        <div>
          <label style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
            EMAIL *
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            style={inputStyle('email')}
            onFocus={e => { e.target.style.borderColor = 'var(--purple)'; }}
            onBlur={e => { e.target.style.borderColor = errors.email ? '#ff6b6b' : 'var(--border)'; }}
          />
          {errors.email && <p style={{ color: '#ff6b6b', fontSize: 11, marginTop: 4 }}>{errors.email}</p>}
        </div>
      </div>

      {/* Subject */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
          SUBJECT *
        </label>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Let's build something awesome together"
          style={inputStyle('subject')}
          onFocus={e => { e.target.style.borderColor = 'var(--purple)'; }}
          onBlur={e => { e.target.style.borderColor = errors.subject ? '#ff6b6b' : 'var(--border)'; }}
        />
        {errors.subject && <p style={{ color: '#ff6b6b', fontSize: 11, marginTop: 4 }}>{errors.subject}</p>}
      </div>

      {/* Message */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
          MESSAGE *
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project or opportunity..."
          rows={5}
          style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 120 }}
          onFocus={e => { e.target.style.borderColor = 'var(--purple)'; }}
          onBlur={e => { e.target.style.borderColor = errors.message ? '#ff6b6b' : 'var(--border)'; }}
        />
        {errors.message && <p style={{ color: '#ff6b6b', fontSize: 11, marginTop: 4 }}>{errors.message}</p>}
      </div>

      {status === 'error' && (
        <div style={{
          background: 'rgba(255,107,107,0.1)',
          border: '1px solid rgba(255,107,107,0.3)',
          borderRadius: 8,
          padding: '12px 16px',
          marginBottom: 16,
          color: '#ff6b6b',
          fontSize: 13,
        }}>
          {errMsg}
        </div>
      )}

      <button
        type="submit"
        className="btn-primary"
        disabled={status === 'loading'}
        style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
      >
        {status === 'loading' ? (
          <>
            <span style={{ width: 16, height: 16, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin-slow 0.8s linear infinite' }} />
            Launching...
          </>
        ) : (
          <>
            🚀 Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
