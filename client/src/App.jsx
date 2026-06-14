import { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Loader from './components/Loader';

// Lazy-load pages for code splitting
const Home       = lazy(() => import('./pages/Home'));
const About      = lazy(() => import('./pages/About'));
const Skills     = lazy(() => import('./pages/Skills'));
const Projects   = lazy(() => import('./pages/Projects'));
const Experience = lazy(() => import('./pages/Experience'));
const Blog       = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Contact    = lazy(() => import('./pages/Contact'));
const Admin      = lazy(() => import('./pages/Admin'));

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.35 }}
  >
    {children}
  </motion.div>
);

// Footer
const Footer = () => (
  <footer style={{
    borderTop: '1px solid var(--border)',
    padding: '32px 24px',
    textAlign: 'center',
    position: 'relative',
  }}>
    <div style={{
      fontFamily: 'JetBrains Mono', fontSize: 11,
      color: 'var(--muted)', letterSpacing: '0.1em',
    }}>
      © {new Date().getFullYear()} SAKSHAM.KUMAR // BUILT WITH MERN + THREE.JS + GSAP
      <span style={{ color: 'var(--purple)', marginLeft: 8 }}>♥</span>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 12 }}>
      {[
        { href: '#about', label: 'About' },
        { href: '#projects', label: 'Projects' },
        { href: '#contact', label: 'Contact' },
      ].map(l => (
        <a key={l.label} href={l.href}
          style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.05em' }}
          onMouseOver={e => e.currentTarget.style.color = 'var(--purple)'}
          onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}
        >
          {l.label}
        </a>
      ))}
    </div>
  </footer>
);

// Main single-page layout
const MainLayout = () => (
  <>
    <Navbar />
    <main>
      <Suspense fallback={<div />}>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Blog />
        <Contact />
      </Suspense>
    </main>
    <Footer />
  </>
);

const App = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {!loaded && <Loader key="loader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/blog/:slug" element={
            <Suspense fallback={<div />}>
              <Navbar />
              <BlogDetail />
              <Footer />
            </Suspense>
          } />
          <Route path="/admin" element={
            <Suspense fallback={<div />}>
              <Admin />
            </Suspense>
          } />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
