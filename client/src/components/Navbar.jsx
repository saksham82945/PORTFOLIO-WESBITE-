import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL, NAV_LINKS } from '../data/personalData';
import useScrollProgress from '../hooks/useScrollProgress';
import useResumeUrl from '../hooks/useResumeUrl';

const Navbar = () => {
  const resumeUrl = useResumeUrl();
  const [scrolled,      setScrolled]      = useState(false);
  const [hidden,        setHidden]        = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const lastScrollY = useRef(0);
  const progress    = useScrollProgress();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastScrollY.current && y > 200);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: '0 32px',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: scrolled ? 'rgba(2,0,16,0.85)' : 'transparent',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : 'none',
    transition: 'all 0.3s ease',
    transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: 2,
        width: `${progress}%`,
        background: 'linear-gradient(90deg, var(--purple), var(--teal))',
        zIndex: 200,
        transition: 'width 0.1s ease',
      }} />

      <nav style={navStyle}>
        {/* Logo */}
        <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: 'linear-gradient(135deg, var(--purple), var(--teal))',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 14, color: '#fff',
          }}>
            SK
          </div>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 600, color: 'var(--white)' }}>
            {PERSONAL.name.split(' ')[0]}
            <span style={{ color: 'var(--purple)' }}>.</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--muted)',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: 6,
                letterSpacing: '0.05em',
                transition: 'color 0.2s ease, background 0.2s ease',
              }}
              onMouseOver={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.background = 'rgba(127,119,221,0.08)'; }}
              onMouseOut={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'transparent'; }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="btn-primary"
            style={{ padding: '7px 18px', fontSize: 11, marginLeft: 8 }}
          >
            Resume ↓
          </a>
          <a
            href="/admin"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 32, height: 32, marginLeft: 8,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)', borderRadius: 8,
              textDecoration: 'none', transition: 'all 0.2s ease',
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--purple)'; e.currentTarget.style.background = 'rgba(127,119,221,0.1)'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            title="Admin Access"
          >
            🔒
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'none', flexDirection: 'column', gap: 5, padding: 8,
          }}
          className="hamburger-btn"
          aria-label="Toggle menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: 24, height: 1.5,
              background: menuOpen && i === 1 ? 'transparent' : 'var(--white)',
              transition: 'all 0.3s ease',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                : i === 2 ? 'rotate(-45deg) translate(5px,-5px)'
                : ''
                : '',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              background: 'rgba(2,0,16,0.97)',
              backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 32,
            }}
          >
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'JetBrains Mono', fontSize: 20, fontWeight: 600,
                  color: 'var(--white)', textDecoration: 'none',
                  letterSpacing: '0.05em',
                }}
              >
                {link.label}
              </a>
            ))}
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download className="btn-primary" style={{ marginTop: 16 }}>
              Download Resume
            </a>
            <a href="/admin" style={{ fontFamily: 'JetBrains Mono', fontSize: 14, color: 'var(--muted)', textDecoration: 'none', marginTop: 16 }}>
              🔒 Admin Access
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
