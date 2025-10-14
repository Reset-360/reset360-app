import { ACCESS_TOKEN } from '@/constants/storage-keys';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add access token automatically if available
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//  Handle 401 errors (refresh token or redirect to login)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Improve this
    // if (error.response?.status === 401) {
    //   try {
    //     // try refresh
    //     const refreshRes = await axios.post(
    //       `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
    //       {},
    //       { withCredentials: true }
    //     );
    //     const newAccessToken = refreshRes.data.accessToken;
    //     localStorage.setItem(ACCESS_TOKEN, newAccessToken);

    //     // retry original request
    //     error.config.headers.Authorization = `Bearer ${newAccessToken}`;
    //     return api(error.config);
    //   } catch (error) {
    //     localStorage.removeItem(ACCESS_TOKEN);
    //     if (typeof window !== 'undefined') {
    //       window.location.href = '/login';
    //     }
    //   }
    // }
    return Promise.reject(error);
  }
);
export default api;
