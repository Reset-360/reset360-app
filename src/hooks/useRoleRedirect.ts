'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { EUserRole } from '@/types/user'

export function useRoleRedirect() {
  const router = useRouter()

  const redirectByRole = (role?: EUserRole) => {
    if (!role) {
      toast.error('User role not found.')
      return
    }

    const routeMap: Partial<Record<EUserRole, string>> = {
      [EUserRole.CLIENT]: '/client/dashboard',
      [EUserRole.COACH]: '/coach/dashboard',
    }

    const target = routeMap[role]

    if (target) {
      router.push(target);
    } else {
      toast.error('Unauthorized access.');
    }
  }

  return { redirectByRole }
}
