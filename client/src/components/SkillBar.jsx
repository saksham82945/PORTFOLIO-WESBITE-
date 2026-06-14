import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SkillBar = ({ name, percent, delay = 0 }) => {
  const fillRef = useRef(null);
  const numRef  = useRef(null);

  useEffect(() => {
    const fill = fillRef.current;
    const num  = numRef.current;
    if (!fill || !num) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: fill,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(fill, { width: '0%' }, {
        width: `${percent}%`,
        duration: 1.2,
        delay,
        ease: 'power2.out',
      });

      tl.fromTo(
        num,
        { textContent: 0 },
        {
          textContent: percent,
          duration: 1.2,
          delay: delay - 1.2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate() { num.textContent = Math.round(+num.textContent) + '%'; },
        },
        '<'
      );
    });

    return () => ctx.revert();
  }, [percent, delay]);

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: 'var(--white)' }}>
          {name}
        </span>
        <span
          ref={numRef}
          style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: 'var(--purple)' }}
        >
          0%
        </span>
      </div>
      <div className="skill-bar-track">
        <div ref={fillRef} className="skill-bar-fill" style={{ width: 0 }} />
      </div>
    </div>
  );
};

export default SkillBar;
