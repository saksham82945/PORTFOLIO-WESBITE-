import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { BLOG_POSTS } from '../data/personalData';
import api from '../utils/api';

const BlogCard = ({ post, onClick }) => {
  const categoryColors = {
    'MERN Stack': 'var(--purple)',
    'Three.js':   '#61DAFB',
    'Career':     'var(--teal)',
    'React':      '#61DAFB',
  };
  const color = categoryColors[post.category] || 'var(--purple)';

  return (
    <div
      className="glass-card"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        overflow: 'hidden',
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(127,119,221,0.15)';
        e.currentTarget.style.borderColor = 'rgba(127,119,221,0.3)';
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      {/* Cover */}
      <div style={{
        height: 160,
        background: `linear-gradient(135deg, ${color}15 0%, rgba(93,202,165,0.05) 100%)`,
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 40,
      }}>
        {post.category === 'Three.js' ? '🌌' : post.category === 'Career' ? '🚀' : '⚡'}
      </div>

      <div style={{ padding: '20px 24px' }}>
        {/* Category + read time */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{
            background: `${color}18`,
            color,
            border: `1px solid ${color}33`,
            borderRadius: 4,
            padding: '3px 8px',
            fontFamily: 'JetBrains Mono',
            fontSize: 10,
          }}>
            {post.category}
          </span>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--muted)' }}>
            {post.readTime}
          </span>
        </div>

        <h3 style={{
          fontFamily: 'JetBrains Mono', fontSize: 15, fontWeight: 700,
          color: 'var(--white)', marginBottom: 10, lineHeight: 1.4,
        }}>
          {post.title}
        </h3>
        <p style={{
          fontSize: 13, color: 'var(--muted)', lineHeight: 1.7,
          marginBottom: 16,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {post.excerpt}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{post.date}</span>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--purple)' }}>
            Read More →
          </span>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const [posts, setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get('/blog');
        setPosts(data);
      } catch {
        setPosts(BLOG_POSTS);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <section id="blog" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <ScrollReveal>
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <div className="section-tag" style={{ marginBottom: 12 }}>// BLOG</div>
          <h2 className="section-title">
            Transmission <span style={{ color: 'var(--purple)' }}>Log</span>
          </h2>
          <div className="scanline-divider" style={{ maxWidth: 300, margin: '16px auto 0' }} />
        </div>
      </ScrollReveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {loading
          ? Array(3).fill(0).map((_, i) => (
              <div key={i} className="glass-card" style={{ height: 340 }} />
            ))
          : posts.map((post, i) => (
              <ScrollReveal key={post._id || post.slug} delay={i * 0.1}>
                <BlogCard post={post} onClick={() => navigate(`/blog/${post.slug}`)} />
              </ScrollReveal>
            ))
        }
      </div>

      <style>{`
        @media (max-width: 1024px) { #blog .blog-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { #blog .blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default Blog;
