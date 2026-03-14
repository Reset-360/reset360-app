import { ACCESS_TOKEN } from '@/constants/storage-keys';
import axiosLib from 'axios';

/**
 * Typed error thrown by the profile API service.
 * Carries the HTTP status and any field-level validation errors
 * returned by the server so callers can surface them in the UI.
 */
export class ApiServiceError extends Error {
  constructor(
    public readonly status: number,
    public readonly errors: Record<string, string> = {}
  ) {
    const firstMessage = Object.values(errors)[0] ?? 'Failed to update profile';
    super(firstMessage);
    this.name = 'ApiServiceError';
  }
}

export class ApiValidationError extends Error {
  details: Record<string, string>;

  constructor(details: Record<string, string>) {
    super("Validation failed");
    this.details = details;
  }
}

// Public routes (without creds)
export const axios = axiosLib.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// next api routes
const api = axios.create({
  baseURL: '/api/proxy',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Handle invalid/expired token responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      // Skip redirect for login or home requests
      const currentPath = window.location.pathname;

      // Skip redirect if user is already on login or home
      if (currentPath === '/login' || currentPath === '/') {
        return Promise.reject(error);
      }

      // Clear token from storage
      localStorage.removeItem(ACCESS_TOKEN);

      // Redirect to login page
      if (typeof window !== 'undefined') {
        console.log('redirected from interceptor');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
