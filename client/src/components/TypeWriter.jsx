import useTypewriter from '../hooks/useTypewriter';

const TypeWriter = ({ strings, speed = 80, pause = 2500, style = {} }) => {
  const text = useTypewriter(strings, speed, pause);

  return (
    <span style={style}>
      {text}
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          background: 'var(--purple)',
          marginLeft: '3px',
          verticalAlign: 'middle',
          animation: 'cursor-blink 1s step-end infinite',
        }}
      />
    </span>
  );
};

export default TypeWriter;
