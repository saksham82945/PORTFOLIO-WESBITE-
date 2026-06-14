import { useState, useEffect } from 'react';

const useMouseParallax = (factor = 0.02) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * factor;
      const y = (e.clientY / window.innerHeight - 0.5) * factor;
      setPos({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [factor]);

  return pos;
};

export default useMouseParallax;
