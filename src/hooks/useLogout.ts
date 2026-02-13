'use client'

import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/AuthState'
import useEntitlementStore from '@/store/EntitlementState'
import useQuizStore from '@/store/QuizState'
import { useCallback } from 'react'
import { logoutUser } from '@/services/authService'
import usePaymentStore from '@/store/PaymentState'

export function useLogout() {
  const router = useRouter();
  const clearUser = useAuthStore(state => state.clearUser);
  const resetEntitlement = useEntitlementStore(state => state.resetEntitlement);
  const resetQuiz = useQuizStore(state => state.resetQuiz);
  const resetPayment = usePaymentStore(s => s.resetPayment)

  const handleLogout = useCallback(
    async (redirectTo = '/') => {
      try {
        await logoutUser();
      } catch (err) {
        console.error('Logout error', err);
      } finally {
        // Clear all persisted state
        clearUser();
        resetEntitlement();
        resetQuiz();
        resetPayment();

        // Refresh and redirect
        router.refresh();
        router.replace(redirectTo);
      }
    },
    [clearUser, resetEntitlement, resetQuiz, router]
  );

  return handleLogout;
}
