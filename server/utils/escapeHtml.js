/**
 * Escape HTML special characters to prevent XSS
 * @param {string} str - Untrusted user input
 * @returns {string} Escaped string safe for HTML insertion
 */
export const escapeHtml = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};
