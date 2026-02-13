import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

/**
 * Fetch Individual Adapts Setting
 *
 * @return {*} 
 */
export const getTierPricing = async () => {
  try {
    const { data } = await api.get(`/settings/adapts/organization/pricing`);

    return data?.tiers ?? [];
  } catch (error: any) {
    console.log(error)
    throw error.response?.data || { message: 'Fetch failed' };
  }
}