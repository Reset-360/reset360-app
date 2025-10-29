'use client'

import { useRouter } from 'next/navigation'
import api from '@/lib/axios'
import { ACCESS_TOKEN } from '@/constants/storage-keys'
import useAuthStore from '@/store/AuthState'

export default function useLogout() {
  const router = useRouter()
  const clearUser = useAuthStore(state => state.clearUser);

  const handleLogout = async () => {
    try {
       await api.post(`/auth/logout`);

      clearUser()
      localStorage.removeItem(ACCESS_TOKEN);
      router.replace('/login')
    } catch (err) {
      console.error('Logout failed:', err)

      localStorage.removeItem(ACCESS_TOKEN); 
      router.replace('/login')
    }
  }

  return handleLogout
}
