import api from './axios';
import { authService } from './auth.service';

export const orderService = {
  getOrders: async () => {
    try {
      const profile = await authService.me().catch(() => null);
      const isAdmin = profile?.data?.role === 'ADMIN';
      
      if (!isAdmin) {
        // Prevent 403 Forbidden error for normal users/guests
        return { success: true, data: [] };
      }
      return api.get('/orders');
    } catch {
      return { success: true, data: [] };
    }
  },
  checkout: (data: any) => api.post('/orders', data),
  detail: async (id: string | number) => {
    try {
      const profile = await authService.me().catch(() => null);
      const isAdmin = profile?.data?.role === 'ADMIN';
      
      if (!isAdmin) {
        return { success: true, data: null };
      }
      return api.get(`/orders/${id}`);
    } catch {
      return { success: true, data: null };
    }
  },
};
