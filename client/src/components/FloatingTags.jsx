import { FLOATING_TAGS } from '../data/personalData';

const FloatingTags = () => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
    {FLOATING_TAGS.map((tag, i) => (
      <span
        key={tag.label}
        className={`floating-tag`}
        style={{
          color: tag.color,
          borderColor: `${tag.color}55`,
          boxShadow: `0 0 8px ${tag.color}22`,
        }}
      >
        {tag.label}
      </span>
    ))}
  </div>
);

export default FloatingTags;
