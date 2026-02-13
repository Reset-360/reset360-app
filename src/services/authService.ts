import { LoginParams, RegisterParams } from '@/types/auth';
import axios from 'axios';
import useAuthStore from '@/store/AuthState';

// 🔐 Login user and store access token
export const loginUser = async (request: LoginParams) => {
  try {
    const { data } = await axios.post('/api/auth/login', request); // 📤 Send login request
    return data; // 📦 Return user data
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' }; // ❌ Handle login error
  }
};

// 📝 Register user and store access token
export const registerUser = async (request: RegisterParams) => {
  try {
    const { data } = await axios.post('/api/auth/register', request); // 📤 Send registration request
    return data; // 📦 Return user data
  } catch (error: any) {
    throw error.response?.data || { message: 'Register failed' }; // ❌ Handle registration error
  }
};

// 🙋‍♂️ Fetch current authenticated user
export const getUser = async () => {
  try {
    const { data } = await axios.get('/api/auth/me'); // 🔍 Get user info
    return data; // 📦 Return user data
  } catch (error: any) {
    throw error.response?.data || { message: 'Something went wrong' }; // ❌ Handle fetch error
  }
};

// 🚪 Logout user and clear token
export const logoutUser = async () => {
  try {
    await axios.post('/api/auth/logout'); // 📤 Send logout request
  } catch (error: any) {
    throw error.response?.data || { message: 'Logout failed' }; // ❌ Handle logout error
  }
};

// ✅ Check if user is authenticated
export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false; // 🖥️ Ensure running in browser
  const user = useAuthStore.getState().user; // 👤 Get user from store
  return !!user; // 🔍 Check presence of user and token
};