import api from '@/lib/axios';

/**
 * Create Individual Adapts Purchase record
 *
 * @export createIndividualPurchase
 * @return {*}
 */
export async function createIndividualPurchase(userId: string) {
  try {
    const { data } = await api.post(`/purchases`, {
      userId: userId,
      buyerType: 'individual',
      items: [
        {
          code: 'ADAPTS_SEAT',
          quantity: 1,
        },
      ],
    });

    return data;
  } catch (error: any) {
    console.log(error);
    throw error.response?.data || { message: 'Purchase failed' };
  }
}


/**
 * Create Paymongo intent
 *
 * @export createPaymongoIntent
 * @param {string} purhcaseId
 */
export async function createPaymongoIntent(purhcaseId: string) {
  try {
    const { data } = await api.post(`/payments/paymongo/intent`, {
      purchaseId: purhcaseId
    });

    return data;
  } catch (error: any) {
    console.log(error);
    throw error.response?.data || { message: 'Payment intent failed' };
  }
}

/**
 * Create Paymongo Hosted Checkout Page
 *
 * @export createPaymongoIntent
 * @param {string} purhcaseId
 */
export async function createPaymongoCheckout(purhcaseId: string) {
  try {
    const { data } = await api.post(`/payments/paymongo/checkout`, {
      purchaseId: purhcaseId
    });

    return data;
  } catch (error: any) {
    console.log(error);
    throw error.response?.data || { message: 'Checkout failed' };
  }
}