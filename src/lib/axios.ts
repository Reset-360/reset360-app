import { ACCESS_TOKEN } from '@/constants/storage-keys';
import axios from 'axios';

const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: '/api/proxy',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add access token automatically if available
// api.interceptors.request.use(
//   (config) => {
//     if (typeof window !== 'undefined') {
//       const token = localStorage.getItem(ACCESS_TOKEN);
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

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
