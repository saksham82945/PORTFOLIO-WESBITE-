import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { BLOG_POSTS } from '../data/personalData';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/blog/${slug}`);
        setPost(data);
      } catch {
        const local = BLOG_POSTS.find(p => p.slug === slug);
        if (local) setPost(local);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: 'JetBrains Mono', color: 'var(--purple)' }}>Loading transmission...</div>
    </div>
  );

  if (!post) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <div style={{ fontSize: 48 }}>🔭</div>
      <p style={{ fontFamily: 'JetBrains Mono', color: 'var(--muted)' }}>Post not found in this galaxy.</p>
      <button onClick={() => navigate('/#blog')} className="btn-outline">← Back to Blog</button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', padding: '100px 24px 80px', maxWidth: 800, margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'var(--purple)', fontFamily: 'JetBrains Mono', fontSize: 13,
        marginBottom: 32, display: 'flex', alignItems: 'center', gap: 8,
      }}>
        ← Back
      </button>

      <div style={{
        display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16,
      }}>
        <span style={{
          background: 'rgba(127,119,221,0.1)', color: 'var(--purple)',
          border: '1px solid rgba(127,119,221,0.2)',
          borderRadius: 4, padding: '3px 10px',
          fontFamily: 'JetBrains Mono', fontSize: 11,
        }}>
          {post.category}
        </span>
        <span style={{ color: 'var(--muted)', fontSize: 12 }}>{post.readTime}</span>
        <span style={{ color: 'var(--muted)', fontSize: 12 }}>{post.date}</span>
      </div>

      <h1 style={{
        fontFamily: 'JetBrains Mono', fontSize: 'clamp(24px, 4vw, 36px)',
        fontWeight: 800, lineHeight: 1.2, marginBottom: 32,
      }}>
        {post.title}
      </h1>

      <div className="glass-card" style={{ padding: '40px 48px' }}>
        <div style={{
          color: 'var(--muted)', lineHeight: 1.9, fontSize: 15,
          whiteSpace: 'pre-line',
        }}>
          {post.content}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
