import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '../components/ScrollReveal';
import { EXPERIENCE, PERSONAL } from '../data/personalData';
import useResumeUrl from '../hooks/useResumeUrl';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const tlRef = useRef(null);
  const resumeUrl = useResumeUrl();

  useEffect(() => {
    const entries = tlRef.current?.querySelectorAll('.exp-entry');
    if (!entries) return;
    const ctx = gsap.context(() => {
      entries.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, x: i % 2 === 0 ? 80 : -80 },
          {
            opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" style={{ padding: '100px 24px', maxWidth: 1000, margin: '0 auto' }}>
      <ScrollReveal>
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <div className="section-tag" style={{ marginBottom: 12 }}>// EXPERIENCE</div>
          <h2 className="section-title">
            Mission <span style={{ color: 'var(--purple)' }}>Log</span>
          </h2>
          <div className="scanline-divider" style={{ maxWidth: 300, margin: '16px auto 0' }} />
        </div>
      </ScrollReveal>

      {/* Timeline */}
      <div ref={tlRef} style={{ position: 'relative' }}>
        {/* Center line */}
        <div className="timeline-line" />

        {EXPERIENCE.map((exp, i) => (
          <div
            key={exp.id}
            className="exp-entry"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 40px 1fr',
              gap: 24,
              marginBottom: 56,
              alignItems: 'start',
            }}
          >
            {/* Left: date/meta for even, card for odd */}
            <div style={{ textAlign: 'right', paddingTop: 8 }}>
              {i % 2 === 0 ? (
                <div>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--teal)', letterSpacing: '0.1em' }}>
                    {exp.type.toUpperCase()}
                  </span>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                    {exp.duration}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{exp.location}</div>
                </div>
              ) : (
                <ExpCard exp={exp} />
              )}
            </div>

            {/* Center dot */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="timeline-dot" style={{ marginTop: 8 }} />
            </div>

            {/* Right */}
            <div>
              {i % 2 === 0 ? (
                <ExpCard exp={exp} />
              ) : (
                <div style={{ paddingTop: 8 }}>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--teal)', letterSpacing: '0.1em' }}>
                    {exp.type.toUpperCase()}
                  </span>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                    {exp.duration}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{exp.location}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Download Resume */}
      <ScrollReveal>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download className="btn-primary" style={{ fontSize: 13 }}>
            ↓ Download Full Resume
          </a>
        </div>
      </ScrollReveal>

      <style>{`
        @media (max-width: 768px) {
          .exp-entry {
            grid-template-columns: 40px 1fr !important;
          }
          .exp-entry > div:first-child { display: none !important; }
        }
      `}</style>
    </section>
  );
};

const ExpCard = ({ exp }) => (
  <div className="glass-card" style={{ padding: '20px 24px' }}>
    <h3 style={{ fontFamily: 'JetBrains Mono', fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
      {exp.role}
    </h3>
    <a
      href={exp.companyUrl || '#'}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: 'var(--purple)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
    >
      {exp.companyFull}
    </a>
    <ul style={{ marginTop: 12, paddingLeft: 16 }}>
      {exp.description.map((point, i) => (
        <li key={i} style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 4 }}>
          {point}
        </li>
      ))}
    </ul>
  </div>
);

export default Experience;
