import api from '@/lib/axios';

/**
 * Fetch Individual Adapts Setting
 *
 * @return {*} 
 */
export const getIndividualPricing = async () => {
  try {
    const { data } = await api.get(`/settings/adapts/individual/pricing`);

    return data;
  } catch (error: any) {
    console.log(error)
    throw error.response?.data || { message: 'Fetch failed' };
  }
}
