import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  from = { opacity: 0, y: 40 },
  to   = { opacity: 1, y: 0 },
  duration = 0.8,
  delay = 0,
  className = '',
  style = {},
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el, from, {
        ...to,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ opacity: 0, ...style }}>
      {children}
    </div>
  );
};

export default ScrollReveal;
