import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

// ── Login Page ───────────────────────────────────────────────
const AdminLogin = ({ onLogin }) => {
  const [form, setForm]     = useState({ email: 'admin@portfolio.com', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminName', data.name);
      onLogin(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative' }}>
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        style={{
          position: 'absolute', top: 32, left: 32, background: 'none', border: '1px solid var(--border)',
          color: 'var(--muted)', padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
          fontFamily: 'JetBrains Mono', fontSize: 12, display: 'flex', alignItems: 'center', gap: 8,
          transition: 'all 0.2s'
        }}
        onMouseOver={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--purple)'; }}
        onMouseOut={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
      >
        ← Back to Site
      </button>

      <div className="glass-card" style={{ padding: '48px 40px', width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔐</div>
          <h1 style={{ fontFamily: 'JetBrains Mono', fontSize: 20, fontWeight: 700 }}>Admin Access</h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 8 }}>Mission Control — Restricted Zone</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)',
            borderRadius: 8, padding: '12px 16px', marginBottom: 20, color: '#ff6b6b', fontSize: 13,
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          {['email', 'password'].map(field => (
            <div key={field} style={{ marginBottom: 16 }}>
              <label style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
                {field.toUpperCase()}
              </label>
              <input
                type={field === 'password' ? 'password' : 'email'}
                value={form[field]}
                onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                required
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)', borderRadius: 8,
                  padding: '12px 16px', color: 'var(--white)',
                  fontFamily: 'Inter', fontSize: 14, outline: 'none',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--purple)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)'; }}
              />
            </div>
          ))}
          <button type="submit" className="btn-primary" disabled={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
            {loading ? 'Authenticating...' : 'Login →'}
          </button>
        </form>
      </div>
    </div>
  );
};

// ── Admin Dashboard ──────────────────────────────────────────
const AdminDashboard = ({ admin, onLogout }) => {
  const [tab, setTab]         = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [blogs, setBlogs]       = useState([]);
  const [documents, setDocuments] = useState([]);
  const [modal, setModal]       = useState(null); // { type, data }
  const [form, setForm]         = useState({});
  const [uploadFile, setUploadFile] = useState(null);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const [p, m, b, d] = await Promise.all([
        api.get('/projects'),
        api.get('/contact'),
        api.get('/blog'),
        api.get('/documents'),
      ]);
      setProjects(p.data);
      setMessages(m.data);
      setBlogs(b.data);
      setDocuments(d.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects(ps => ps.filter(p => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete project');
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await api.delete(`/blog/${id}`);
      setBlogs(bs => bs.filter(b => b._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete post');
    }
  };

  const deleteDocument = async (id) => {
    if (!window.confirm('Delete this document?')) return;
    try {
      await api.delete(`/documents/${id}`);
      setDocuments(ds => ds.filter(d => d._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete document');
    }
  };

  const markRead = async (id) => {
    await api.patch(`/contact/${id}/read`);
    setMessages(ms => ms.map(m => m._id === id ? { ...m, read: true } : m));
  };

  const saveProject = async () => {
    try {
      if (form._id) {
        const { data } = await api.put(`/projects/${form._id}`, form);
        setProjects(ps => ps.map(p => p._id === data._id ? data : p));
      } else {
        const { data } = await api.post('/projects', form);
        setProjects(ps => [data, ...ps]);
      }
      setModal(null); setForm({});
    } catch (err) { alert(err.response?.data?.message); }
  };

  const saveBlog = async () => {
    try {
      if (form._id) {
        const { data } = await api.put(`/blog/${form._id}`, form);
        setBlogs(bs => bs.map(b => b._id === data._id ? data : b));
      } else {
        const { data } = await api.post('/blog', form);
        setBlogs(bs => [data, ...bs]);
      }
      setModal(null); setForm({});
    } catch (err) { alert(err.response?.data?.message); }
  };

  const saveDocument = async () => {
    try {
      if (!uploadFile) return alert('Please select a file');
      const formData = new FormData();
      formData.append('file', uploadFile);
      if (form.title) formData.append('title', form.title);
      if (form.category) formData.append('category', form.category);

      const { data } = await api.post('/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setDocuments(ds => [data, ...ds]);
      setModal(null); setForm({}); setUploadFile(null);
    } catch (err) { alert(err.response?.data?.message); }
  };

  const tabs = [
    { key: 'projects', label: '🚀 Projects', count: projects.length },
    { key: 'messages', label: '✉️ Messages', count: messages.filter(m => !m.read).length },
    { key: 'blogs',    label: '📝 Blog',     count: blogs.length },
    { key: 'documents',label: '📁 Documents',count: documents.length },
  ];

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border)', borderRadius: 8,
    padding: '10px 14px', color: 'var(--white)', fontFamily: 'Inter',
    fontSize: 13, outline: 'none', marginBottom: 12,
  };

  return (
    <div style={{ minHeight: '100vh', padding: '80px 24px 40px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <div>
          <h1 style={{ fontFamily: 'JetBrains Mono', fontSize: 24, fontWeight: 800 }}>
            Mission Control <span style={{ color: 'var(--purple)' }}>⚡</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>Welcome back, {admin.name}</p>
        </div>
        <button onClick={onLogout} className="btn-outline" style={{ fontSize: 12 }}>
          Logout →
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{
              padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontFamily: 'JetBrains Mono', fontSize: 12, transition: 'all 0.2s',
              background: tab === t.key ? 'var(--purple)' : 'rgba(127,119,221,0.06)',
              color: tab === t.key ? '#fff' : 'var(--muted)',
            }}>
            {t.label} {t.count > 0 && <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: '1px 6px', fontSize: 10, marginLeft: 4 }}>{t.count}</span>}
          </button>
        ))}
      </div>

      {/* Projects Tab */}
      {tab === 'projects' && (
        <div className="glass-card">
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700 }}>Projects</span>
            <button className="btn-primary" style={{ padding: '7px 16px', fontSize: 11 }}
              onClick={() => { setForm({ category: 'Full Stack', tags: [] }); setModal('project'); }}>
              + Add Project
            </button>
          </div>
          <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Links</th><th>Actions</th></tr></thead>
            <tbody>
              {projects.map(p => (
                <tr key={p._id}>
                  <td style={{ color: 'var(--white)', fontWeight: 600, fontSize: 13 }}>{p.title}</td>
                  <td><span style={{ color: 'var(--purple)', fontSize: 12, fontFamily: 'JetBrains Mono' }}>{p.category}</span></td>
                  <td style={{ color: 'var(--muted)', fontSize: 12 }}>{p.date}</td>
                  <td style={{ fontSize: 12 }}>
                    {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--purple)', marginRight: 8 }}>GH</a>}
                    {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal)' }}>Live</a>}
                  </td>
                  <td>
                    <button onClick={() => { setForm(p); setModal('project'); }}
                      style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', color: 'var(--muted)', fontSize: 12, marginRight: 8 }}>
                      Edit
                    </button>
                    <button onClick={() => deleteProject(p._id)}
                      style={{ background: 'none', border: '1px solid rgba(255,107,107,0.3)', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', color: '#ff6b6b', fontSize: 12 }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Messages Tab */}
      {tab === 'messages' && (
        <div className="glass-card">
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700 }}>
              Messages ({messages.filter(m => !m.read).length} unread)
            </span>
          </div>
          <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {messages.map(m => (
                <tr key={m._id} style={{ opacity: m.read ? 0.5 : 1 }}>
                  <td style={{ fontWeight: 600, fontSize: 13 }}>{m.name}</td>
                  <td style={{ fontSize: 12, color: 'var(--muted)' }}>{m.email}</td>
                  <td style={{ fontSize: 12 }}>{m.subject}</td>
                  <td style={{ fontSize: 11, color: 'var(--muted)' }}>{new Date(m.createdAt).toLocaleDateString()}</td>
                  <td>
                    {m.read
                      ? <span style={{ color: 'var(--muted)', fontSize: 11 }}>Read</span>
                      : <button onClick={() => markRead(m._id)}
                          style={{ background: 'none', border: '1px solid var(--teal)', borderRadius: 4, padding: '3px 8px', cursor: 'pointer', color: 'var(--teal)', fontSize: 11 }}>
                          Mark Read
                        </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Blog Tab */}
      {tab === 'blogs' && (
        <div className="glass-card">
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700 }}>Blog Posts</span>
            <button className="btn-primary" style={{ padding: '7px 16px', fontSize: 11 }}
              onClick={() => { setForm({ published: true }); setModal('blog'); }}>
              + Add Post
            </button>
          </div>
          <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><th>Title</th><th>Category</th><th>Read Time</th><th>Published</th><th>Actions</th></tr></thead>
            <tbody>
              {blogs.map(b => (
                <tr key={b._id}>
                  <td style={{ color: 'var(--white)', fontWeight: 600, fontSize: 13 }}>{b.title}</td>
                  <td><span style={{ color: 'var(--purple)', fontSize: 12, fontFamily: 'JetBrains Mono' }}>{b.category}</span></td>
                  <td style={{ fontSize: 12, color: 'var(--muted)' }}>{b.readTime}</td>
                  <td>
                    <span style={{ color: b.published ? 'var(--teal)' : 'var(--muted)', fontSize: 12 }}>
                      {b.published ? '● Live' : '○ Draft'}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => { setForm(b); setModal('blog'); }}
                      style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', color: 'var(--muted)', fontSize: 12, marginRight: 8 }}>
                      Edit
                    </button>
                    <button onClick={() => deleteBlog(b._id)}
                      style={{ background: 'none', border: '1px solid rgba(255,107,107,0.3)', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', color: '#ff6b6b', fontSize: 12 }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Documents Tab */}
      {tab === 'documents' && (
        <div className="glass-card">
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700 }}>Documents</span>
            <button className="btn-primary" style={{ padding: '7px 16px', fontSize: 11 }}
              onClick={() => { setForm({ category: 'Resume' }); setUploadFile(null); setModal('document'); }}>
              + Upload Document
            </button>
          </div>
          <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><th>Title</th><th>Category</th><th>Upload Date</th><th>File Name</th><th>Actions</th></tr></thead>
            <tbody>
              {documents.map(d => (
                <tr key={d._id}>
                  <td style={{ color: 'var(--white)', fontWeight: 600, fontSize: 13 }}>{d.title}</td>
                  <td><span style={{ color: 'var(--teal)', fontSize: 12, fontFamily: 'JetBrains Mono' }}>{d.category}</span></td>
                  <td style={{ fontSize: 12, color: 'var(--muted)' }}>{new Date(d.createdAt).toLocaleDateString()}</td>
                  <td style={{ fontSize: 12, color: 'var(--muted)' }}>{d.fileName}</td>
                  <td>
                    <a href={d.fileUrl} target="_blank" rel="noopener noreferrer"
                      style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', color: 'var(--white)', fontSize: 12, marginRight: 8, textDecoration: 'none' }}>
                      View
                    </a>
                    <button onClick={() => deleteDocument(d._id)}
                      style={{ background: 'none', border: '1px solid rgba(255,107,107,0.3)', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', color: '#ff6b6b', fontSize: 12 }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(2,0,16,0.9)', backdropFilter: 'blur(8px)',
          zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        }}>
          <div className="glass-card" style={{ padding: '32px 36px', width: '100%', maxWidth: 600, maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'JetBrains Mono', fontSize: 16, fontWeight: 700 }}>
                {form._id ? 'Edit' : 'Add'} {modal === 'project' ? 'Project' : modal === 'blog' ? 'Blog Post' : 'Document'}
              </h3>
              <button onClick={() => { setModal(null); setForm({}); setUploadFile(null); }}
                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 20 }}>✕</button>
            </div>

            {modal === 'project' && (
              <>
                {[
                  { key: 'title',       label: 'Title',       type: 'text' },
                  { key: 'description', label: 'Description', type: 'textarea' },
                  { key: 'githubUrl',   label: 'GitHub URL',  type: 'text' },
                  { key: 'liveUrl',     label: 'Live URL',    type: 'text' },
                  { key: 'image',       label: 'Image URL',   type: 'text' },
                  { key: 'date',        label: 'Date',        type: 'text' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>
                      {f.label.toUpperCase()}
                    </label>
                    {f.type === 'textarea'
                      ? <textarea rows={3} value={form[f.key] || ''} onChange={e => setForm(fr => ({ ...fr, [f.key]: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }} />
                      : <input type={f.type} value={form[f.key] || ''} onChange={e => setForm(fr => ({ ...fr, [f.key]: e.target.value }))} style={inputStyle} />
                    }
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>CATEGORY</label>
                  <select value={form.category || 'Full Stack'} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ ...inputStyle }}>
                    {['Full Stack', 'Frontend', 'Backend', 'Three.js'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>TAGS (comma separated)</label>
                  <input type="text" value={Array.isArray(form.tags) ? form.tags.join(', ') : form.tags || ''} onChange={e => setForm(f => ({ ...f, tags: e.target.value.split(',').map(t => t.trim()) }))} style={inputStyle} />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 16 }}>
                  <input type="checkbox" checked={form.featured || false} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>Featured project</span>
                </label>
                <button onClick={saveProject} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Save Project</button>
              </>
            )}

            {modal === 'blog' && (
              <>
                {[
                  { key: 'title',    label: 'Title',   type: 'text' },
                  { key: 'slug',     label: 'Slug',    type: 'text' },
                  { key: 'excerpt',  label: 'Excerpt', type: 'textarea' },
                  { key: 'content',  label: 'Content', type: 'textarea' },
                  { key: 'category', label: 'Category', type: 'text' },
                  { key: 'readTime', label: 'Read Time', type: 'text' },
                  { key: 'date',     label: 'Date',    type: 'text' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>
                      {f.label.toUpperCase()}
                    </label>
                    {f.type === 'textarea'
                      ? <textarea rows={f.key === 'content' ? 6 : 3} value={form[f.key] || ''} onChange={e => setForm(fr => ({ ...fr, [f.key]: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }} />
                      : <input type={f.type} value={form[f.key] || ''} onChange={e => setForm(fr => ({ ...fr, [f.key]: e.target.value }))} style={inputStyle} />
                    }
                  </div>
                ))}
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 16 }}>
                  <input type="checkbox" checked={form.published !== false} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} />
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>Published</span>
                </label>
                <button onClick={saveBlog} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Save Post</button>
              </>
            )}

            {modal === 'document' && (
              <>
                <div>
                  <label style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>TITLE</label>
                  <input type="text" value={form.title || ''} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={inputStyle} placeholder="Leave empty to use file name" />
                </div>
                <div>
                  <label style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>CATEGORY</label>
                  <select value={form.category || 'Resume'} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ ...inputStyle }}>
                    {['Resume', 'CV', 'Project Report', 'Certificate', 'Other'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>FILE</label>
                  <input type="file" onChange={e => setUploadFile(e.target.files[0])} style={{ ...inputStyle, padding: '8px 10px' }} />
                </div>
                <button onClick={saveDocument} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }} disabled={!uploadFile}>
                  Upload Document
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Main Admin Page ──────────────────────────────────────────
const Admin = () => {
  const [admin, setAdmin] = useState(() => {
    const token = localStorage.getItem('adminToken');
    const name  = localStorage.getItem('adminName');
    return token ? { token, name } : null;
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    setAdmin(null);
  };

  if (!admin) return <AdminLogin onLogin={setAdmin} />;
  return <AdminDashboard admin={admin} onLogout={handleLogout} />;
};

export default Admin;
