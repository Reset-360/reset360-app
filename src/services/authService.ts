import { LoginParams, RegisterParams } from '@/types/auth';
import api from '@/lib/axios';
import { ACCESS_TOKEN } from '@/constants/storage-keys';

export const loginUser = async (request: LoginParams) => {
  try {
    const { data } = await api.post('/auth/login', request);

    const newAccessToken = data?.accessToken;
    localStorage.setItem(ACCESS_TOKEN, newAccessToken);

    return data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const registerUser = async (request: RegisterParams) => {
  try {
    const { data } = await api.post('/auth/register', request);

    const newAccessToken = data?.accessToken;
    localStorage.setItem(ACCESS_TOKEN, newAccessToken);

    return data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const getUser = async () => {
  try {
    const { data } = await api.get('/auth/me');
    return data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export const logoutUser = async () => {
  try {
    await api.post('/auth/logout');

    localStorage.removeItem(ACCESS_TOKEN);
  } catch (error: any) {
    throw error.response?.data || { message: 'Logout failed' };
  }
};