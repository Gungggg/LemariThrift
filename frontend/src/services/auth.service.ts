import api from './axios';

function decodeJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export const authService = {
  login: (data: any) => api.post('/auth/login', data),
  register: (data: any) => api.post('/auth/register', data),
  logout: () => {
    // Backend has no logout endpoint, just clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return Promise.resolve({ success: true });
  },
  me: async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not logged in');
    
    const payload = decodeJwt(token);
    if (!payload) throw new Error('Invalid token');

    return {
      success: true,
      data: {
        id: payload.sub || 'unknown',
        name: payload.email ? payload.email.split('@')[0] : 'User',
        email: payload.email || '',
        role: payload.role || 'USER'
      }
    };
  },
};
