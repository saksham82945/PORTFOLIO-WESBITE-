import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StarField from '../components/StarField';
import OrbitRings from '../components/OrbitRings';
import FloatingTags from '../components/FloatingTags';
import TypeWriter from '../components/TypeWriter';
import { PERSONAL } from '../data/personalData';
import useResumeUrl from '../hooks/useResumeUrl';

const HUDCoordinates = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const id = setInterval(() => {
      setCoords({
        x: (Math.random() * 180).toFixed(1),
        y: (Math.random() * 90).toFixed(1),
      });
    }, 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: 32,
      fontFamily: 'JetBrains Mono', fontSize: 10,
      color: 'var(--purple)', letterSpacing: '0.15em', zIndex: 50,
      animation: 'hud-pulse 2s ease-in-out infinite',
    }}>
      ORB: {coords.x}° / {coords.y}°
    </div>
  );
};

const ScrollIndicator = () => (
  <div style={{
    position: 'fixed', bottom: 24, right: 32,
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    zIndex: 50,
  }}>
    <div style={{
      fontFamily: 'JetBrains Mono', fontSize: 9, letterSpacing: '0.25em',
      color: 'var(--muted)', writingMode: 'vertical-rl', textOrientation: 'mixed',
    }}>
      SCROLL
    </div>
    <div style={{
      width: 1, height: 48,
      background: 'linear-gradient(to bottom, var(--purple), transparent)',
      animation: 'float-1 2s ease-in-out infinite',
    }} />
  </div>
);

const Home = () => {
  const resumeUrl = useResumeUrl();
  return (
  <section
    id="home"
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '80px 24px 40px',
    }}
  >
    <StarField />

    {/* HUD Corners */}
    <div className="hud-corner hud-corner-tl" />
    <div className="hud-corner hud-corner-tr" />
    <div className="hud-corner hud-corner-bl" />
    <div className="hud-corner hud-corner-br" />

    {/* Orbit rings + floating tags centered */}
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
      <div style={{ position: 'relative', width: 420, height: 420 }}>
        <OrbitRings />
      </div>
    </div>
    <FloatingTags />

    {/* Hero Content */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ textAlign: 'center', position: 'relative', zIndex: 10, maxWidth: 760 }}
    >
      {/* HUD Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(127,119,221,0.08)',
          border: '1px solid rgba(127,119,221,0.3)',
          borderRadius: 999, padding: '6px 16px',
          marginBottom: 32,
        }}
      >
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: PERSONAL.availableForWork ? 'var(--teal)' : 'var(--amber)',
          boxShadow: `0 0 8px ${PERSONAL.availableForWork ? 'var(--teal)' : 'var(--amber)'}`,
          animation: 'hud-pulse 2s ease-in-out infinite',
        }} />
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.15em', color: 'var(--purple)' }}>
          FULL STACK DEVELOPER
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        style={{
          fontSize: 'clamp(48px, 8vw, 80px)',
          fontWeight: 800,
          letterSpacing: '-2px',
          lineHeight: 1.05,
          color: 'var(--white)',
          marginBottom: 20,
        }}
      >
        {PERSONAL.name.split(' ')[0]}{' '}
        <span style={{ color: 'var(--purple)' }}>{PERSONAL.name.split(' ')[1]}</span>
      </motion.h1>

      {/* Typewriter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          fontFamily: 'JetBrains Mono',
          fontSize: 'clamp(16px, 2.5vw, 22px)',
          color: 'var(--muted)',
          minHeight: 32,
          marginBottom: 40,
        }}
      >
        <TypeWriter strings={PERSONAL.typewriterStrings} />
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}
      >
        <a href="#projects" className="btn-primary">
          View Projects →
        </a>
        <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download className="btn-outline">
          ↓ Download CV
        </a>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{ display: 'flex', gap: 20, justifyContent: 'center' }}
      >
        {[
          { href: PERSONAL.links.github,   label: 'GitHub', icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          )},
          { href: PERSONAL.links.linkedin, label: 'LinkedIn', icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          )},
          { href: PERSONAL.links.twitter,  label: 'Twitter', icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          )},
        ].filter(s => s.href).map(social => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              color: 'var(--muted)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--purple)'; e.currentTarget.style.color = 'var(--purple)'; e.currentTarget.style.background = 'rgba(127,119,221,0.08)'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
          >
            {social.icon}
          </a>
        ))}
      </motion.div>
    </motion.div>

    <HUDCoordinates />
    <ScrollIndicator />
  </section>
  );
};

export default Home;
