import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PaymentState {
  purchaseId?: string;
  paymentId?: string;
  paymentIntentId?: string;
  clientKey?: string;

  setPurchaseId: (id: string) => void;
  setPaymentId: (id: string) => void;
  setPaymentIntentId: (id: string) => void;
  setClientKey: (id: string) => void;

  resetPayment: () => void;
}

const usePaymentStore = create<PaymentState>()(
  devtools((set) => ({
    setPurchaseId: (purchaseId: string) => set({ purchaseId }),
    setPaymentId: (paymentId: string) => set({ paymentId }),
    setPaymentIntentId: (paymentIntentId: string) => set({ paymentIntentId }),
    setClientKey: (clientKey: string) => set({ clientKey }),
    clearUser: () =>
      set({
        purchaseId: undefined,
        paymentId: undefined,
        paymentIntentId: undefined,
        clientKey: undefined,
      }),
  }))
);

export default usePaymentStore;
