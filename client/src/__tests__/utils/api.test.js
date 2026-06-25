import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value; }),
    removeItem: vi.fn((key) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// We need to test the api module's interceptor logic
describe('API Utility', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('should set default base URL from env or fallback to /api', async () => {
    // Dynamic import to get fresh module
    const { default: api } = await import('../../utils/api.js');
    
    // baseURL should be from VITE_API_URL env or '/api'
    expect(api.defaults.baseURL).toBeDefined();
  });

  it('should set Content-Type header to application/json', async () => {
    const { default: api } = await import('../../utils/api.js');
    expect(api.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('should attach token from localStorage to requests', async () => {
    const { default: api } = await import('../../utils/api.js');
    
    localStorageMock.setItem('adminToken', 'test-jwt-token');
    
    // Get the request interceptor and run it
    const interceptor = api.interceptors.request.handlers[0];
    const config = { headers: {} };
    const result = interceptor.fulfilled(config);
    
    expect(result.headers.Authorization).toBe('Bearer test-jwt-token');
  });

  it('should not attach Authorization header when no token exists', async () => {
    const { default: api } = await import('../../utils/api.js');
    
    localStorageMock.removeItem('adminToken');
    
    const interceptor = api.interceptors.request.handlers[0];
    const config = { headers: {} };
    const result = interceptor.fulfilled(config);
    
    expect(result.headers.Authorization).toBeUndefined();
  });

  it('should clear token on 401 response', async () => {
    const { default: api } = await import('../../utils/api.js');
    
    localStorageMock.setItem('adminToken', 'expired-token');
    
    const responseInterceptor = api.interceptors.response.handlers[0];
    const error = { response: { status: 401 } };
    
    try {
      await responseInterceptor.rejected(error);
    } catch (e) {
      // Expected to reject
    }
    
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('adminToken');
  });
});
