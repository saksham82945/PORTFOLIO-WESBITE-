import { useRef, useCallback } from 'react';
import { PERSONAL } from '../data/personalData';

const ProjectCard = ({ project }) => {
  const cardRef  = useRef(null);
  const glowRef  = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -10;
    const rotateY = ((x - cx) / cx) *  10;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.setProperty('--mouse-x', `${(x / rect.width)  * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  }, []);

  const categoryColor = {
    'Full Stack': 'var(--purple)',
    'Frontend':   'var(--teal)',
    'Backend':    'var(--amber)',
    'Three.js':   '#61DAFB',
  }[project.category] || 'var(--purple)';

  return (
    <div
      ref={cardRef}
      className="glass-card project-card"
      onClick={(e) => {
        // Prevent opening if they clicked the existing buttons directly
        if (e.target.closest('a')) return;
        const targetUrl = project.liveUrl || project.githubUrl;
        if (targetUrl) window.open(targetUrl, '_blank', 'noopener,noreferrer');
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease, box-shadow 0.2s ease', cursor: (project.liveUrl || project.githubUrl) ? 'pointer' : 'default' }}
    >
      {/* Preview */}
      <div style={{
        height: 180,
        background: `linear-gradient(135deg, rgba(127,119,221,0.08) 0%, rgba(93,202,165,0.05) 100%)`,
        borderRadius: '12px 12px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
      }}>
        {project.image
          ? <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🚀</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em' }}>
                {project.category.toUpperCase()}
              </div>
            </div>
          )
        }
        {/* Category badge */}
        <span style={{
          position: 'absolute', top: 12, right: 12,
          background: `${categoryColor}22`,
          color: categoryColor,
          border: `1px solid ${categoryColor}44`,
          borderRadius: 4,
          padding: '3px 8px',
          fontFamily: 'JetBrains Mono',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.1em',
        }}>
          {project.category}
        </span>
        {project.featured && (
          <span style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(239,159,39,0.2)',
            color: 'var(--amber)',
            border: '1px solid rgba(239,159,39,0.4)',
            borderRadius: 4,
            padding: '3px 8px',
            fontFamily: 'JetBrains Mono',
            fontSize: 10,
          }}>
            ★ Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 24px 24px' }}>
        <h3 style={{
          fontFamily: 'JetBrains Mono',
          fontSize: 16,
          fontWeight: 700,
          color: 'var(--white)',
          marginBottom: 8,
        }}>
          {project.title}
        </h3>
        <p style={{
          fontSize: 13,
          color: 'var(--muted)',
          lineHeight: 1.6,
          marginBottom: 16,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
          {project.tags.slice(0, 4).map(tag => (
            <span key={tag} style={{
              background: 'rgba(127,119,221,0.08)',
              color: 'var(--purple)',
              border: '1px solid rgba(127,119,221,0.2)',
              borderRadius: 4,
              padding: '2px 8px',
              fontFamily: 'JetBrains Mono',
              fontSize: 10,
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 12 }}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                color: 'var(--white)', textDecoration: 'none',
                fontFamily: 'JetBrains Mono', fontSize: 12,
                padding: '6px 14px',
                border: '1px solid var(--border)',
                borderRadius: 6,
                transition: 'all 0.2s ease',
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--purple)'; e.currentTarget.style.color = 'var(--purple)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--white)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                color: 'var(--teal)', textDecoration: 'none',
                fontFamily: 'JetBrains Mono', fontSize: 12,
                padding: '6px 14px',
                border: '1px solid rgba(93,202,165,0.3)',
                borderRadius: 6,
                transition: 'all 0.2s ease',
              }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(93,202,165,0.1)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
