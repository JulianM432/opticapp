import { apiClient } from './client';
import type { AuthUser, LoginCredentials } from '@/types/auth';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthUser> => {
    const { data } = await apiClient.post<AuthUser>('/auth/login', credentials);
    return data;
  },

  logout: async (): Promise<{ message: string }> => {
    const { data } = await apiClient.post<{ message: string }>('/auth/logout');
    return data;
  },

  me: async (): Promise<AuthUser> => {
    const { data } = await apiClient.get<AuthUser>('/auth/me');
    return data;
  },
};
