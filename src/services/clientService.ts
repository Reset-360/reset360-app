import api from '@/lib/axios';

export const getClientProfile = async (userId: string) => {
  try {
    const { data } = await api.get(`/client/profiles/by-userid/${userId}`);
    return data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};