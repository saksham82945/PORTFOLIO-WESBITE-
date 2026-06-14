import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SkillBar from '../components/SkillBar';
import ScrollReveal from '../components/ScrollReveal';
import { SKILLS } from '../data/personalData';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const iconsRef = useRef(null);

  useEffect(() => {
    const icons = iconsRef.current?.querySelectorAll('.tech-icon');
    if (!icons) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(icons,
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.5, stagger: 0.05, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: iconsRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <ScrollReveal>
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <div className="section-tag" style={{ marginBottom: 12 }}>// SKILL MATRIX</div>
          <h2 className="section-title">
            Technical <span style={{ color: 'var(--purple)' }}>Arsenal</span>
          </h2>
          <div className="scanline-divider" style={{ maxWidth: 300, margin: '16px auto 0' }} />
        </div>
      </ScrollReveal>

      {/* Skill Bars Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 80 }}>
        {/* Frontend */}
        <ScrollReveal from={{ opacity: 0, x: -40 }} to={{ opacity: 1, x: 0 }}>
          <div className="glass-card" style={{ padding: '32px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <span style={{ fontSize: 20 }}>⚡</span>
              <h3 style={{ fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--purple)' }}>
                FRONTEND
              </h3>
            </div>
            {SKILLS.frontend.map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} percent={skill.percent} delay={i * 0.1} />
            ))}
          </div>
        </ScrollReveal>

        {/* Backend */}
        <ScrollReveal from={{ opacity: 0, x: 40 }} to={{ opacity: 1, x: 0 }}>
          <div className="glass-card" style={{ padding: '32px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <span style={{ fontSize: 20 }}>🔧</span>
              <h3 style={{ fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--teal)' }}>
                BACKEND
              </h3>
            </div>
            {SKILLS.backend.map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} percent={skill.percent} delay={i * 0.1} />
            ))}
          </div>
        </ScrollReveal>

        {/* Tools — full width */}
        <ScrollReveal style={{ gridColumn: '1 / -1' }}>
          <div className="glass-card" style={{ padding: '32px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <span style={{ fontSize: 20 }}>🛠️</span>
              <h3 style={{ fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--amber)' }}>
                TOOLS & OTHERS
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 48px' }}>
              {SKILLS.tools.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} percent={skill.percent} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Tech Icon Grid */}
      <ScrollReveal>
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <div className="section-tag">// TECH STACK</div>
        </div>
      </ScrollReveal>

      <div
        ref={iconsRef}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 16 }}
      >
        {SKILLS.icons.map((tech, i) => (
          <div
            key={tech}
            className="tech-icon glass-card"
            style={{
              padding: '16px 8px',
              textAlign: 'center',
              cursor: 'default',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              opacity: 0,
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.1) translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(127,119,221,0.3)';
              e.currentTarget.style.borderColor = 'rgba(127,119,221,0.4)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            <div style={{
              fontFamily: 'JetBrains Mono', fontSize: 9,
              color: 'var(--purple)', fontWeight: 600,
              letterSpacing: '0.05em', wordBreak: 'break-word',
            }}>
              {tech}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #skills > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
          #skills .tech-icon-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
