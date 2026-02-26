import api, { axios } from '@/lib/axios';

/**
 * Create Individual Adapts Purchase record
 *
 * @export registerOrganization
 * @return {*}
 */
export async function registerOrganization(orgRequest: any) {
  try {
    // use axios for public, without auth/credentials routes
    const { data } = await axios.post(`/organizations/register`, orgRequest);

    return data;
  } catch (error: any) {
    console.log(error);
    throw error.response?.data || { message: 'Registration failed' };
  }
}

export const getMemberProfile = async (userId: string) => {
  try {
    const { data } = await api.get(`/users/${userId}/org-profile`);
    return data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export const getOrgLatestPurchase = async (orgId: string) => {
  try {
    const { data } = await api.get(`/organizations/${orgId}/purchases/latest`);
    return data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export async function generateSeatCodesBatch(orgRequest: any) {
  try {
    const { data } = await api.post(`/seat-codes/generate/batch`, orgRequest);

    return data;
  } catch (error: any) {
    console.log(error);
    throw error.response?.data || { message: 'Registration failed' };
  }
}