import { useState, useEffect, useRef } from 'react';

const useTypewriter = (strings = [], speed = 80, pause = 2500) => {
  const [displayed, setDisplayed] = useState('');
  const [strIdx, setStrIdx]       = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [deleting, setDeleting]   = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    const current = strings[strIdx] || '';

    if (!deleting && charIdx < current.length) {
      timeout.current = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout.current = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout.current = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setStrIdx(i => (i + 1) % strings.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout.current);
  }, [charIdx, deleting, strIdx, strings, speed, pause]);

  return displayed;
};

export default useTypewriter;
