import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '../components/ScrollReveal';
import { PERSONAL, EDUCATION, ACHIEVEMENTS } from '../data/personalData';

gsap.registerPlugin(ScrollTrigger);

const StatCard = ({ value, suffix, label, delay }) => {
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { textContent: 0 },
        {
          textContent: value,
          duration: 2,
          delay,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          onUpdate() { el.textContent = Math.round(+el.textContent) + suffix; },
        }
      );
    });
    return () => ctx.revert();
  }, [value, suffix, delay]);

  return (
    <div className="glass-card" style={{ padding: '28px 24px', textAlign: 'center' }}>
      <div ref={numRef} style={{
        fontFamily: 'JetBrains Mono', fontSize: 40, fontWeight: 800,
        color: 'var(--purple)', marginBottom: 8,
      }}>
        0{suffix}
      </div>
      <div style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--muted)', letterSpacing: '0.05em' }}>
        {label}
      </div>
    </div>
  );
};

const About = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const entries = timelineRef.current?.querySelectorAll('.timeline-entry');
    if (!entries) return;
    const ctx = gsap.context(() => {
      entries.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, x: i % 2 === 0 ? 60 : -60 },
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
    <section id="about" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <ScrollReveal>
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <div className="section-tag" style={{ marginBottom: 12 }}>// ABOUT ME</div>
          <h2 className="section-title">
            The <span style={{ color: 'var(--purple)' }}>Developer</span> Behind the Code
          </h2>
          <div className="scanline-divider" style={{ maxWidth: 300, margin: '16px auto 0' }} />
        </div>
      </ScrollReveal>

      {/* Split layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.5fr)', gap: 64, alignItems: 'start', marginBottom: 80 }}>
        {/* Left — Avatar card */}
        <ScrollReveal from={{ opacity: 0, x: -40 }} to={{ opacity: 1, x: 0 }}>
          <div className="glass-card glass-card-glow" style={{ padding: 32, textAlign: 'center', position: 'relative' }}>
            {/* Avatar */}
            <div style={{
              width: 140, height: 140,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--purple), var(--teal))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: 56,
              position: 'relative',
              border: '3px solid var(--purple)',
              boxShadow: '0 0 30px rgba(127,119,221,0.4)',
            }}>
              👨‍💻
              {/* Orbit mini ring */}
              <div style={{
                position: 'absolute', inset: -12,
                borderRadius: '50%',
                border: '1px solid rgba(127,119,221,0.2)',
                animation: 'spin-slow 8s linear infinite',
              }} />
            </div>

            <h3 style={{ fontFamily: 'JetBrains Mono', fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
              {PERSONAL.name}
            </h3>
            <p style={{ color: 'var(--purple)', fontSize: 13, fontFamily: 'JetBrains Mono', marginBottom: 16 }}>
              {PERSONAL.role}
            </p>

            {/* Status badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(93,202,165,0.1)',
              border: '1px solid rgba(93,202,165,0.3)',
              borderRadius: 999, padding: '5px 14px', marginBottom: 24,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', animation: 'hud-pulse 2s infinite' }} />
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--teal)', letterSpacing: '0.1em' }}>
                Available for work
              </span>
            </div>

            {/* Info rows */}
            {[
              { icon: '📍', label: PERSONAL.location },
              { icon: '✉️', label: PERSONAL.email },
              { icon: '📱', label: PERSONAL.phone },
            ].map(row => (
              <div key={row.label} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 0', borderBottom: '1px solid var(--border)',
                textAlign: 'left',
              }}>
                <span style={{ fontSize: 16 }}>{row.icon}</span>
                <span style={{ fontSize: 12, color: 'var(--muted)', wordBreak: 'break-all' }}>{row.label}</span>
              </div>
            ))}

            {/* Social Links */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 20 }}>
              {[
                { href: PERSONAL.links.github, label: 'GH' },
                { href: PERSONAL.links.linkedin, label: 'LI' },
                { href: PERSONAL.links.twitter, label: 'TW' },
              ].filter(s => s.href).map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: 'rgba(127,119,221,0.08)',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--purple)',
                    textDecoration: 'none', transition: 'all 0.2s',
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(127,119,221,0.2)'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(127,119,221,0.08)'; }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Right — Bio */}
        <div>
          <ScrollReveal from={{ opacity: 0, x: 40 }} to={{ opacity: 1, x: 0 }}>
            {PERSONAL.bio.map((para, i) => (
              <p key={i} style={{
                fontSize: 15, color: 'var(--muted)', lineHeight: 1.8,
                marginBottom: 20,
              }}>
                {para}
              </p>
            ))}
          </ScrollReveal>

          {/* Achievements */}
          <ScrollReveal delay={0.2}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 32 }}>
              {ACHIEVEMENTS.map(a => (
                <div key={a.id} className="glass-card" style={{ padding: '16px 20px' }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{a.icon}</div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                    {a.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
                    {a.description}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Stats row */}
      <ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 80 }}>
          {PERSONAL.stats.map((stat, i) => (
            <StatCard key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} delay={i * 0.15} />
          ))}
        </div>
      </ScrollReveal>

      {/* Education Timeline */}
      <ScrollReveal>
        <div style={{ marginBottom: 24 }}>
          <div className="section-tag" style={{ marginBottom: 8 }}>// EDUCATION</div>
          <div className="scanline-divider" />
        </div>
      </ScrollReveal>

      <div ref={timelineRef} style={{ position: 'relative', paddingLeft: 32 }}>
        <div style={{ position: 'absolute', left: 5, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, var(--purple), var(--teal))' }} />
        {EDUCATION.map(ed => (
          <div key={ed.id} className="timeline-entry" style={{ position: 'relative', marginBottom: 40 }}>
            <div className="timeline-dot" style={{ position: 'absolute', left: -32, top: 4 }} />
            <div className="glass-card" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 4 }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 15, fontWeight: 700 }}>
                  {ed.degree}
                </span>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--amber)' }}>
                  CGPA: {ed.cgpa}
                </span>
              </div>
              <div style={{ color: 'var(--purple)', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                {ed.institution} — {ed.location}
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 8 }}>{ed.duration}</div>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>{ed.description}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
          #about .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
