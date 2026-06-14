import { useEffect, useRef, useState } from 'react';

const Loader = ({ onDone }) => {
  const [count, setCount]   = useState(3);
  const [phase, setPhase]   = useState('counting'); // counting | launch | fading
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const steps = [
      () => setCount(3),
      () => setCount(2),
      () => setCount(1),
      () => { setCount(0); setPhase('launch'); },
    ];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < steps.length) {
        steps[i]();
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setPhase('fading');
          setOpacity(0);
          setTimeout(onDone, 600);
        }, 400);
      }
    }, 550);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div
      className="loader-overlay"
      style={{ opacity, transition: 'opacity 0.6s ease', pointerEvents: opacity === 0 ? 'none' : 'all' }}
    >
      {/* Expanding rings */}
      {[80, 140, 200].map((size, i) => (
        <div
          key={i}
          className="loader-ring"
          style={{
            width: size, height: size,
            animationDelay: `${i * 0.3}s`,
            borderColor: i % 2 === 0 ? 'var(--purple)' : 'var(--teal)',
          }}
        />
      ))}

      {/* Logo / name */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <div style={{
          fontFamily: 'JetBrains Mono',
          fontSize: 11,
          letterSpacing: '0.3em',
          color: 'var(--purple)',
          marginBottom: 24,
          textTransform: 'uppercase',
        }}>
          Initializing Portfolio
        </div>

        {/* Countdown / LAUNCH */}
        <div style={{
          fontFamily: 'JetBrains Mono',
          fontSize: phase === 'launch' ? 48 : 72,
          fontWeight: 700,
          color: phase === 'launch' ? 'var(--teal)' : 'var(--white)',
          transition: 'all 0.3s ease',
          letterSpacing: -2,
          minHeight: 90,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {phase === 'launch' ? '🚀 LAUNCH' : count}
        </div>

        <div style={{
          fontFamily: 'JetBrains Mono',
          fontSize: 10,
          letterSpacing: '0.2em',
          color: 'var(--muted)',
          marginTop: 16,
        }}>
          SAKSHAM.KUMAR // PORTFOLIO v1.0
        </div>
      </div>
    </div>
  );
};

export default Loader;
