import axios, { isAxiosError } from 'axios';

export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export function getApiErrorMessage(error: unknown): string {
  if (
    isAxiosError<{ message?: string }>(error) &&
    error.response?.data?.message
  ) {
    return error.response.data.message;
  }

  return 'No se pudo cargar la información';
}

export function getApiErrorStatus(error: unknown): number | undefined {
  if (isAxiosError(error)) {
    return error.response?.status;
  }

  return undefined;
}
