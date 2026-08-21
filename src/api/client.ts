import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export type HealthResponse = {
  status: 'ok' | 'degraded';
  mongodb: 'connected' | 'disconnected';
};

export const fetchHealth = async (): Promise<HealthResponse> => {
  const { data } = await apiClient.get<HealthResponse>('/health');
  return data;
};
