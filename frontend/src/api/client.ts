import axios, { isAxiosError } from 'axios';

export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export function getApiErrorMessage(
  error: unknown,
  fallback = 'No se pudo cargar la información',
): string {
  if (
    isAxiosError<{ message?: string }>(error) &&
    error.response?.data?.message
  ) {
    return error.response.data.message;
  }

  return fallback;
}

export function getApiErrorStatus(error: unknown): number | undefined {
  if (isAxiosError(error)) {
    return error.response?.status;
  }

  return undefined;
}
