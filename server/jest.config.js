export default {
  testEnvironment: 'node',
  transform: {},
  extensionsToTreatAsEsm: [],
  testMatch: ['**/__tests__/**/*.test.js'],
  setupFilesAfterSetup: [],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '/uploads/',
  ],
  // Increase timeout for mongodb-memory-server startup
  testTimeout: 30000,
};
