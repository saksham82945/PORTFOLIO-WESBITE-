import { describe, it, expect } from '@jest/globals';
import { escapeHtml } from '../utils/escapeHtml.js';
import { safePath } from '../utils/safePath.js';
import path from 'path';

describe('escapeHtml', () => {
  it('should escape & character', () => {
    expect(escapeHtml('a & b')).toBe('a &amp; b');
  });

  it('should escape < and > characters', () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    );
  });

  it('should escape double quotes', () => {
    expect(escapeHtml('say "hello"')).toBe('say &quot;hello&quot;');
  });

  it('should escape single quotes', () => {
    expect(escapeHtml("it's")).toBe('it&#x27;s');
  });

  it('should return empty string for non-string input', () => {
    expect(escapeHtml(null)).toBe('');
    expect(escapeHtml(undefined)).toBe('');
    expect(escapeHtml(42)).toBe('');
  });

  it('should leave safe strings unchanged', () => {
    expect(escapeHtml('Hello World')).toBe('Hello World');
  });
});

describe('safePath', () => {
  const uploadsDir = path.resolve('/app/uploads');

  it('should return resolved path for safe filename', () => {
    const result = safePath('1234567890-doc.pdf', uploadsDir);
    expect(result).toBe(path.join(uploadsDir, '1234567890-doc.pdf'));
  });

  it('should return null for path traversal attempt', () => {
    const result = safePath('../../etc/passwd', uploadsDir);
    expect(result).toBeNull();
  });

  it('should return null for another traversal pattern', () => {
    const result = safePath('../server.js', uploadsDir);
    expect(result).toBeNull();
  });

  it('should accept nested safe paths', () => {
    const result = safePath('subfolder/doc.pdf', uploadsDir);
    expect(result).toBe(path.join(uploadsDir, 'subfolder', 'doc.pdf'));
  });
});
