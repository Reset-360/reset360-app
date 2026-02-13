import api from '@/lib/axios';
import axios from 'axios';

export const getClientProfile = async (userId: string) => {
  try {
    const { data } = await axios.get(`/api/proxy/client/profiles/by-userid/${userId}`);
    return data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export const getClientPurchases = async () => {
  try {
    const { data } = await axios.get(`/api/proxy/me/purchases`);
    
    return data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
}


/**
 * Get current active purchase
 *
 * @export getActivePurchase
 * @return {*}
 */
export async function getActivePurchase() {
  try {
    const { data } = await axios.get(`/api/proxy/me/purchases/active`);

    return data;
  } catch (error: any) {
    console.log(error);
    throw error.response?.data || { message: 'Something went wrong' };
  }
}