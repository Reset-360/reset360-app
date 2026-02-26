import { create } from 'zustand';

import { persist, devtools } from 'zustand/middleware';
import { AUTH_STORAGE } from '../constants/storage-keys';
import { IUser } from '@/types/user';
import { IClient } from '@/types/client';
import { IOrganization, IOrgMember } from '@/types/organization';

export type Theme = 'dark' | 'light' | 'system';

interface AuthState {
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;

  user?: IUser;
  setUser: (user: IUser) => void;

  clientProfile?: IClient;
  setClientProfile: (profile: IClient) => void;

  coachProfile?: IClient;
  setCoachProfile: (profile: IClient) => void;

  orgMember?: IOrgMember;
  setOrgMember: (member: IOrgMember) => void;

  organization?: IOrganization;
  setOrganization: (org: IOrganization) => void;

  clearUser: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        hasHydrated: false,

        setUser: (user: IUser) => set(() => ({ user })),
        setClientProfile: (profile: IClient) => set(() => ({ clientProfile: profile })),
        setCoachProfile: (profile: IClient) => set(() => ({ coachProfile: profile })),
        setOrgMember: (member: IOrgMember) => set(() => ({ orgMember: member })),
        setOrganization: (org: IOrganization) => set(() => ({ organization: org })),
        clearUser: () =>
          set({
            user: undefined,
            clientProfile: undefined,
            coachProfile: undefined,
            orgMember: undefined,
            organization: undefined,
          }),

        setHasHydrated: (v) => set({ hasHydrated: v }),
      }),
      {
        name: AUTH_STORAGE,
        onRehydrateStorage: () => (state) => {
          // 🧊 Mark store as hydrated once persistence has loaded
          state?.setHasHydrated(true);
        },
      }
    )
  )
);

export default useAuthStore;
