import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import ScrollReveal from '../components/ScrollReveal';
import { PROJECTS } from '../data/personalData';
import api from '../utils/api';

const FILTERS = ['All', 'Full Stack', 'Frontend', 'Backend', 'Three.js'];

const SkeletonCard = () => (
  <div className="glass-card" style={{ height: 380 }}>
    <div style={{ height: 180, background: 'rgba(255,255,255,0.03)', borderRadius: '12px 12px 0 0', animation: 'shimmer 1.5s infinite' }} />
    <div style={{ padding: '20px 24px' }}>
      {[60, 100, 80, 40].map((w, i) => (
        <div key={i} style={{
          height: 12, borderRadius: 6,
          background: 'rgba(255,255,255,0.04)',
          width: `${w}%`, marginBottom: 12,
        }} />
      ))}
    </div>
  </div>
);

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects]         = useState([]);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        setProjects(data);
      } catch {
        // Fallback to local data
        setProjects(PROJECTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <ScrollReveal>
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <div className="section-tag" style={{ marginBottom: 12 }}>// PROJECTS</div>
          <h2 className="section-title">
            Mission <span style={{ color: 'var(--purple)' }}>Control</span>
          </h2>
          <div className="scanline-divider" style={{ maxWidth: 300, margin: '16px auto 0' }} />
          <p style={{ color: 'var(--muted)', marginTop: 16, fontSize: 14 }}>
            {projects.length} projects deployed into the universe
          </p>
        </div>
      </ScrollReveal>

      {/* Filter bar */}
      <ScrollReveal>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '8px 20px',
                borderRadius: 6,
                fontFamily: 'JetBrains Mono',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.2s ease',
                background: activeFilter === f ? 'var(--purple)' : 'rgba(127,119,221,0.06)',
                color: activeFilter === f ? '#fff' : 'var(--muted)',
                boxShadow: activeFilter === f ? '0 0 16px rgba(127,119,221,0.3)' : 'none',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24,
      }}>
        {loading
          ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : filtered.map((project, i) => (
              <ScrollReveal key={project._id || project.id} delay={i * 0.08}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))
        }
      </div>

      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔭</div>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: 14 }}>
            No projects found in this galaxy.
          </p>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          #projects .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          #projects .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
