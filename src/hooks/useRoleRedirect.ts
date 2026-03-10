'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { EUserRole } from '@/types/user'

export function useRoleRedirect() {
  const router = useRouter()

  const redirectByRole = (role?: EUserRole, replace: boolean = false) => {
    if (!role) {
      toast.error('User role not found.')
      return
    }

    const routeMap: Partial<Record<EUserRole, string>> = {
      [EUserRole.CLIENT]: '/client/dashboard',
      [EUserRole.COACH]: '/coach/dashboard',
      [EUserRole.ORG_ADMIN]: '/org/dashboard',
      [EUserRole.ADMIN]: '/',
    }

    const target = routeMap[role]

    if (target) {
      if (replace) {
        router.replace(target)
      } else {
        router.push(target)
      }
      
      console.log(`redirect to ${target} with replace=${replace}`)
    } else {
      toast.error('Unauthorized access.')
    }
  }

  return { redirectByRole }
}