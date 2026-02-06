'use client'

import { useRouter } from 'next/navigation'
import api from '@/lib/axios'
import { ACCESS_TOKEN } from '@/constants/storage-keys'
import useAuthStore from '@/store/AuthState'
import useEntitlementStore from '@/store/EntitlementState'
import useQuizStore from '@/store/QuizState'
import { useCallback } from 'react'
import { logoutUser } from '@/services/authService'

export function useLogout() {
  const router = useRouter();
  const clearUser = useAuthStore(state => state.clearUser);
  const resetEntitlement = useEntitlementStore(state => state.resetEntitlement);
  const resetQuiz = useQuizStore(state => state.resetQuiz);

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

        // Refresh and redirect
        router.refresh();
        router.replace(redirectTo);
      }
    },
    [clearUser, resetEntitlement, resetQuiz, router]
  );

  return handleLogout;
}
