import { LoginParams, RegisterParams } from '@/types/auth';
import api from '@/lib/axios';
import axios from 'axios';
import { ACCESS_TOKEN } from '@/constants/storage-keys';
import useAuthStore from '@/store/AuthState';

// 🔐 Login user and store access token
export const loginUser = async (request: LoginParams) => {
  try {
    const { data } = await axios.post('/api/auth/login', request); // 📤 Send login request

    const newAccessToken = data?.accessToken; // 🧾 Extract access token
    localStorage.setItem(ACCESS_TOKEN, newAccessToken); // 💾 Save token to localStorage

    return data; // 📦 Return user data
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' }; // ❌ Handle login error
  }
};

// 📝 Register user and store access token
export const registerUser = async (request: RegisterParams) => {
  try {
    const { data } = await api.post('/auth/register', request); // 📤 Send registration request

    const newAccessToken = data?.accessToken; // 🧾 Extract access token
    localStorage.setItem(ACCESS_TOKEN, newAccessToken); // 💾 Save token to localStorage

    return data; // 📦 Return user data
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' }; // ❌ Handle registration error
  }
};

// 🙋‍♂️ Fetch current authenticated user
export const getUser = async () => {
  try {
    const { data } = await api.get('/auth/me'); // 🔍 Get user info
    return data; // 📦 Return user data
  } catch (error: any) {
    throw error.response?.data || { message: 'Something went wrong' }; // ❌ Handle fetch error
  }
};

// 🚪 Logout user and clear token
export const logoutUser = async () => {
  try {
    await api.post('/auth/logout'); // 📤 Send logout request

    localStorage.removeItem(ACCESS_TOKEN); // 🧹 Remove token from localStorage
  } catch (error: any) {
    throw error.response?.data || { message: 'Logout failed' }; // ❌ Handle logout error
  }
};

// ✅ Check if user is authenticated
export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false; // 🖥️ Ensure running in browser
  const user = useAuthStore.getState().user; // 👤 Get user from store
  return !!user && !!localStorage.getItem(ACCESS_TOKEN); // 🔍 Check presence of user and token
};