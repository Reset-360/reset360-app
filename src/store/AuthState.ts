import { create } from 'zustand';

import { persist, devtools } from 'zustand/middleware';
import { AUTH_STORAGE } from '../constants/storage-keys';
import { IUser } from '@/types/user';
import { IClient } from '@/types/client';

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

  accessToken?: string;
  setToken: (token: string) => void;

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
        setToken: (token) => set({ accessToken: token }),
        clearUser: () =>
          set({
            user: undefined,
            clientProfile: undefined,
            coachProfile: undefined,
            accessToken: undefined,
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
