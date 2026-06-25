import path from 'path';

/**
 * Validate that a resolved file path stays within the uploads directory.
 * Prevents path traversal attacks (e.g., ../../server.js).
 * @param {string} fileName - The filename to validate
 * @param {string} uploadsDir - The allowed uploads directory
 * @returns {string|null} Safe absolute path or null if traversal detected
 */
export const safePath = (fileName, uploadsDir) => {
  const resolved = path.resolve(uploadsDir, fileName);
  if (!resolved.startsWith(path.resolve(uploadsDir))) {
    return null;
  }
  return resolved;
};
