import { useState, useEffect } from 'react';

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return progress;
};

export default useScrollProgress;
